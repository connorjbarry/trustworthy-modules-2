import requests
import re
import json
import sys
import os
from dotenv import load_dotenv
import valid_url as vu

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

def load_npm_package_json(npm_url):
    # Extract package name from npm URL
    package_name = npm_url.split('/')[-1]
    # Construct URL for package.json file
    package_json_url = f'https://registry.npmjs.com/{package_name}/latest'
    # Send request to get package.json file
    response = requests.get(package_json_url)
    if response.status_code == 200:
        # Return loaded package.json as dictionary
        return json.loads(response.text)
    else:
        raise ValueError(f'Failed to load package.json for {npm_url}')

def load_github_package_json(github_url, token):
    # Extract owner and repository name from GitHub URL
    url_parts = github_url.split('/')
    owner = url_parts[3]
    repository = url_parts[4]
    # Construct URL for raw package.json file
    package_json_url = f'https://raw.githubusercontent.com/{owner}/{repository}/master/package.json'
    # Send request to get package.json file
    response = requests.get(package_json_url, headers={'Authorization': f'token {token}'})
    if response.status_code == 200:
        # Return loaded package.json as dictionary
        return json.loads(response.text)
    else:
        raise ValueError(f'Failed to load package.json for {github_url}')


def calculate_pinned_dependency_fraction(repo_url, token):
    if "github.com" in repo_url:
        data = load_github_package_json(repo_url, token)
    elif "npmjs.com" in repo_url:
        data = load_npm_package_json(repo_url)
    else:
        raise ValueError("Invalid repo URL")
    
    pinned_count = 0
    total_count = 0
    print(data.get('dependencies', {}))
    for dependency in data.get('dependencies', {}):
        version_range = data['dependencies'][dependency]
        if re.match(r"^[~^]?[\d]+\.[\d]+(\.[\d]+)?(-[\w\d]+(\.[\w\d]+)?)?$", version_range):
            pinned_count += 1
        total_count += 1
    
    if total_count == 0:
        return 1.0
    
    return pinned_count / total_count

if __name__ == "__main__":
    # Example usage:
    repo_url = sys.argv[1]
    json_file = sys.argv[2]
    if (vu.valid_url(repo_url)):
        metric = calculate_pinned_dependency_fraction(repo_url, GITHUB_TOKEN)
        with open(json_file, "w") as f:
            json.dump(metric, f, indent=4)