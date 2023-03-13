import axios from 'axios';
import { Buffer } from 'buffer';

declare class Promise<T> {
    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    finally(onfinally?: (() => void) | null | undefined): Promise<T>;
}

interface Dependency {
    name: string;
    version: string;
}

async function getDependencies(repoUrl: string, GH_token: string): Promise<number> {
    const headers = {
        Authorization: `token ${GH_token}`
    };
    const url = new URL(repoUrl);
    const [repo_owner, repo_name] = url.pathname.split('/').filter(Boolean);

    const response = await axios.get(`https://api.github.com/repos/${repo_owner}/${repo_name}/contents/package.json`, { headers });
    const packageJson = JSON.parse(Buffer.from(response.data.content, 'base64').toString());
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    const currentVersion = packageJson.version;

    if (Object.keys(dependencies).length === 0) {
        return 1.0;
    }

    const fetchVersion = async (name: string) => {
        const response = await axios.get(`https://registry.npmjs.org/${name}/latest`);
        return response.data.version;
    };

    const promises = Object.entries(dependencies).map(async ([name, version]) => {
        const depVersion = await fetchVersion(name);
        return {
            name,
            version: depVersion
        }
    });

    const dependenciesWithVersions = await Promise.allSettled(promises);

    const matchingDependencies = dependenciesWithVersions.filter((dep) => dep.status === 'fulfilled')
        .map((dep) => dep.value)
        .filter((dep) => isPinnedToVersion(dep, currentVersion));

    return matchingDependencies.length / dependenciesWithVersions.length;
}

function isPinnedToVersion(dependency: Dependency, currentVersion: string): boolean {
    const [major, minor] = currentVersion.split('.');
    const [depMajor, depMinor] = dependency.version.split('.');
    return depMajor === major && depMinor === minor;
}

const repoUrl = 'https://github.com/nullivex/nodist';
const GH_token = 'TOKEN';
getDependencies(repoUrl, GH_token).then((percentage) => {
    const decimalScore = percentage.toFixed(2);
    console.log(`Decimal of dependencies pinned to current version: ${decimalScore}`);
}).catch((err) => {
    console.error(err);
});
