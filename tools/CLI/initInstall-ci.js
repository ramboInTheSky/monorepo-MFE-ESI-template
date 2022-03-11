const {Project} = require("@lerna/project")
const {getFilteredPackages} = require("@lerna/filter-options")
const {PackageGraph} = require("@lerna/package-graph")
const chalk = require("chalk")

// install everything


const run = async () => {
    const project = new Project()
    const packages = project.getPackagesSync()

    const packageGraph = new PackageGraph(packages)
    const filtered = await getFilteredPackages(packageGraph)

    const allPackagesNotPrivate = filtered.filter((pkg)=>!pkg.private && !pkg.name.startsWith("next-")).reduce((value, cached) => {
        return {...value, [cached.name]: cached}
    }, {})
    console.log(chalk.blue(`Bootstraping ${Object.values(allPackagesNotPrivate).length} Packages `))

    Object.values(allPackagesNotPrivate).map(async pkg => {
        console.log(chalk.hex("#ff63b1")(`   ${pkg.name}`))
        var child_process = require("child_process")
        child_process.execSync("npm install", {cwd: pkg.location, stdio: [0, 1, 2]})
    })
}

run()


