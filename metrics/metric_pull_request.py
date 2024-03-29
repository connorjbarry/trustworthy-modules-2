import requests, sys
from github import Github, PullRequest

# Authenticate with the GitHub API using an access token


def getReviewedFraction(link, token):
    access_token = token
    headers = {"Authorization": f"token {access_token}"}
    
    if "npmjs.com" in link:
        npm_reg_link = "https://registry." + link.split("www.")[1].replace("/package",'')
        response = requests.get(npm_reg_link)
        result = response.json()
        githubLink = result["repository"]["url"].split("github.com")[1].split("/")
    elif "github.com" in link:
        githubLink = link.split("github.com")[1].split("/")
    else:
        return 0

    owner = githubLink[1]
    repo = githubLink[2].replace(".git", "")

    url = f"https://api.github.com/repos/{owner}/{repo}/stats/code_frequency"
    response = requests.get(url, headers = headers)
    total_lines_of_code = 0
    total_additions = 0
    total_removals = 0
    
    for data in response.json():
        additions, deletions = abs(data[1]), abs(data[2])
        total_additions += additions
        total_removals += deletions
            
    total_lines_of_code = total_additions - total_removals
    #print(f"Estimated total lines of code: {total_lines_of_code}")

    g = Github(access_token)
    repo = g.get_repo(f"{owner}/{repo}")
    pull_requests = g.search_issues("repo:expressjs/express is:pull-request is:merged review:approved type:pr")

    reviewed_code = 0
    for pull_request in pull_requests:
        #pr = repo.get_pull(pull_request.number)
        pr = pull_request.as_pull_request()
        files = pr.get_files()
        for file in files:
            reviewed_code += file.additions
    #print("Total lines of code added:", reviewed_code)

    #print(f"fraction of project code from PR with review : {reviewed_code/total_lines_of_code}")
    return(reviewed_code/total_lines_of_code)


if __name__ == "__main__":
    rev = getReviewedFraction(str(sys.argv[1]), str(sys.argv[2]))
    print(round(rev, 2))