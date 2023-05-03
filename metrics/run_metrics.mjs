//import {spawn} from "child_process";
import { execSync } from "child_process";
//import {axios} from "axios";
import axios from "axios";
const regex = /\/([\w-]+)\/([\w-]+)/i;

// function to convert a npmjs repo to a github equivalent by finding the owner
/**
 * @param {string | undefined} repo
 */
async function npmToGit(repo) {
  const url = `https://registry.npmjs.com/${repo}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const { repository } = response.data;
      if (repository && repository.url) {
        const gitUrl = repository.url;
        if (gitUrl.includes('github')) {
          const match = gitUrl.toLowerCase().match(regex);
          if (match && match.length === 3) {
            const [_, owner] = match;
            return owner;
          }
        }
      }
    }
  } catch (error) {
    console.error(`Failed to get Git URL for ${repo}: ${error}`);
  }
  return null;
}

/**
 * @param {string} repo_url
 * return { ingestible: true, bus_factor, license, ramp_up, responsiveness, correctness, dependency_score, pull_req_score };
 */
async function childProcess(repo_url) {
  const token = process.env.GITHUB_TOKEN; // gets GITHUB token

  if (!token) {
    console.error("GitHub token not found in the environment. Please set the GITHUB_TOKEN environment variable.");
    process.exit(1);
  }  
  let owner, repo, url_parts;

  // check if url continas github or npmjs
  if(repo_url.toLowerCase().includes('github') || repo_url.toLowerCase().includes('npmjs')) {
    console.log('Repo URL is valid');
  }

  //if npmjs repo, change to github repo
  if (repo_url.toLowerCase().includes('github')) {
    url_parts = repo_url.split('/');
    owner = url_parts[3];
    repo = url_parts[4];
    //console.log('Owner: ', owner);
    //console.log('Repo: ', repo);
  } else if (repo_url.toLowerCase().includes('npmjs')) {
    repo = repo_url.split('/').pop();
    owner = await npmToGit(repo);
    //console.log('Owner: ', owner);
    //console.log('Repo: ', repo);
  } else {
    console.error('Unsupported repository URL: ' + repo_url);
  }

  // Calculates bus factor metric and wait for it to finish
  let bus_factor = 0;
  const bf_result = execSync(`python3 metrics/bus_factor.py ${owner} ${repo} ${token}`);
  bus_factor = parseFloat(bf_result.toString()) || 0;
  console.log("bus_factor: ", bus_factor)
  if (bus_factor < 0.5) {
    console.error(`Not ingestible due to low bus_factor: ${bus_factor}`);
    return { ingestible: false, bus_factor, license: 0, ramp_up: 0, responsiveness: 0, correctness: 0, dependency_score: 0, pull_req_score: 0 };
  }

  // Calculates license metric
  const lic_result = execSync(`python3 metrics/license.py ${owner} ${repo} ${token}`);
  let license = parseFloat(lic_result.toString()) || 0;
  console.log("license: ", license)
  if (license < 0.5) {
    console.error(`Not ingestible due to low license: ${license}`);
    return { ingestible: false, bus_factor, license, ramp_up: 0, responsiveness: 0, correctness: 0, dependency_score: 0, pull_req_score: 0 };
  }

  // Calculates ramp up metric
  const ru_result = execSync(`python3 metrics/ramp_up.py ${owner} ${repo} ${token}`);
  let ramp_up = parseFloat(ru_result.toString()) || 0;
  console.log("ramp_up: ", ramp_up)
  if (ramp_up < 0.5) {
    console.error(`Not ingestible due to low ramp_up: ${ramp_up}`);
    return { ingestible: false, bus_factor, license, ramp_up, responsiveness: 0, correctness: 0, dependency_score: 0, pull_req_score: 0 };
  }
  
  // Calculates reponsiveness metric
  const resp_result = execSync(`python3 metrics/responsive_maintainer.py ${owner} ${repo} ${token}`);
  let responsiveness = parseFloat(resp_result.toString()) || 0;
  console.log("responsiveness: ", responsiveness)
  if (responsiveness < 0.5) {
    console.error(`Not ingestible due to low responsiveness: ${responsiveness}`);
    return { ingestible: false, bus_factor, license, ramp_up, responsiveness, correctness: 0, dependency_score: 0, pull_req_score: 0 };
  }

  // Calculates the correctness metric
  // Note: the correctness script creates a local folder: Repo-Analysis after running. To test the script again, the folder needs to be deleted before running.
  const cor_result = execSync(`python3 metrics/correctness.py ${owner} ${repo} ${token} ${responsiveness.toString()}`);
  let correctness = 0;
  // there might be error deleting the folder, but it is fine
  // if the folder is not deleted, the error will occur
  // we can ignore the error and just get he correctness score
  if(cor_result.toString().includes("Error while deleting folder")) {
    // if system is windows, remove the folder
    if (process.platform === "win32") {
      execSync(`rmdir /s /q Repo-Analysis`);
    } else {
      execSync(`rm -rf Repo-Analysis`);
    }

    // get the correctness score
    let result = cor_result.toString().split("\n")[1]
    if (result){
      correctness = parseFloat(result) || 0;
    }
  }  else {
    correctness = parseFloat(cor_result.toString()) || 0;
  }

  console.log("correctness: ", correctness)
  if (correctness < 0.5) {
    console.error(`Not ingestible due to low correctness: ${correctness}`);
    return { ingestible: false, bus_factor, license, ramp_up, responsiveness, correctness, dependency_score: 0, pull_req_score: 0 };
  }

  //console.log("bf: ", bus_factor, ", lic: ", license, ", ru: ", ramp_up, ", resp: ", responsiveness, ", cor: ", correctness);

  // Calculates the dependency metric
  const dep_result = execSync(`python3 metrics/metric_dependencies.py ${repo_url} ${token}`);
  let dependency_score = parseFloat(dep_result.toString()) || 0;

  // Calculates the pull request metric
  const pq_result = execSync(`python3 metrics/metric_pull_request.py ${repo_url} ${token}`);
  let pull_req_score = parseFloat(pq_result.toString()) || 0;
  
  // return all the seven metrics
  return { ingestible: true, bus_factor, license, ramp_up, responsiveness, correctness, dependency_score, pull_req_score };
}

const run_metrics = async (/** @type {string} */ url) => {
  const { ingestible, bus_factor, license, ramp_up, responsiveness, correctness, dependency_score, pull_req_score } = await childProcess(url);
  return { ingestible, bus_factor, license, ramp_up, responsiveness, correctness, dependency_score, pull_req_score };
}

const url = process.argv[2]; // run as: node run_metrics.mjs repoUrl, so the url is the second index
//console.log(url)

if (!url) {
  console.error("Please provide a URL as a command-line argument.");
  process.exit(1);
}

run_metrics(url);

export { run_metrics }; // enables the script to be run via other files

// package.json file used when testing
/* {
  "type": "module",
  "dependencies": {
    "axios": "^1.3.4",
    "buffer": "^6.0.3",
    "child_process": "^1.0.2",
    "python3": "^0.0.1",
    "typescript": "^4.9.5"
  },
  "devDependencies": {
    "@types/node": "^18.15.11"
  }
}
*/