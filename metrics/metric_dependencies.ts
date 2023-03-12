import axios from 'axios';
import * as npm from 'npm';

interface Dependency {
    name: string;
    version: string;
}

async function getDependencies(repo_owner: string, GH_token: string): Promise<number> {
    const headers = {
        Authorization: `token ${GH_token}`
    };
    const response = await axios.get(`https://api.github.com/repos/${repo_owner}/contents/package.json`, { headers });
    const packageJson = JSON.parse(Buffer.from(response.data.content, 'base64').toString());
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    const currentVersion = packageJson.version;

    if (Object.keys(dependencies).length === 0) {
        return 1.0;
    }
    // loads the npm registry metadata and prepares npm for usage within the Node.js environment
    await new Promise((resolve, reject) => {
        npm.load({}, (err) => {
            if (err) reject(err);
            resolve();
        });
    });

    const fetchVersion = (name: string) => new Promise<string>((resolve, reject) => {
        npm.commands.view([name, 'version'], true, (err, data) => {
            if (err) reject(err);
            const versions = Object.keys(data);
            const latestVersion = versions[versions.length - 1];
            resolve(latestVersion);
        });
    });

    const dependenciesWithVersions = await Promise.all(
        Object.entries(dependencies).map(async ([name, version]) => ({
            name,
            version: await fetchVersion(name),
        }))
    );

    const matchingDependencies = dependenciesWithVersions.filter((dep) => isPinnedToVersion(dep, currentVersion));
    return matchingDependencies.length / dependenciesWithVersions.length;
}

function isPinnedToVersion(dependency: Dependency, currentVersion: string): boolean {
    const [major, minor] = currentVersion.split('.');
    const [depMajor, depMinor] = dependency.version.split('.');
    return depMajor === major && depMinor === minor;
}
const repo_owner = 'repo_owner';
const GH_token = 'TOKEN';
getDependencies(repo_owner, GH_token).then((percentage) => {
    const decimalScore = percentage.toFixed(2);
    console.log(`Percentage of dependencies pinned to current version: ${decimalScore}`);
}).catch((err) => {
    console.error(err);
});
