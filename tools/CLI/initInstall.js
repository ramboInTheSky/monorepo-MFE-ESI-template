const {Project} = require("@lerna/project")
const {getFilteredPackages} = require("@lerna/filter-options")
const {PackageGraph} = require("@lerna/package-graph")
const {publishPackage, addPackages} = require("yalc")
const {satisfies, coerce} = require("semver")
const chalk = require("chalk")

// install everything
// build everything (libs)


const run = async () => {
    const project = new Project()
    const packages = project.getPackagesSync()

    const packageGraph = new PackageGraph(packages)
    const filtered = await getFilteredPackages(packageGraph)

   
    const allPackages = filtered.reduce((value, cached) => {
        return {...value, [cached.name]: cached}
    }, {})
    const allPackagesNotPrivate = filtered.filter((pkg)=>!pkg.private).reduce((value, cached) => {
        return {...value, [cached.name]: cached}
    }, {})
    console.log(chalk.blue(`Bootstraping ${Object.values(allPackages).length} Packages `))

    Object.values(allPackages).map(async pkg => {
        console.log(chalk.hex("#ff63b1")(`   ${pkg.name}`))
        var child_process = require("child_process")
        child_process.execSync("npm install", {cwd: pkg.location, stdio: [0, 1, 2]})
    }),
    Object.values(allPackagesNotPrivate).map(async pkg => {
        console.log(chalk.hex("#ff63b1")(`   ${pkg.name}`))
        var child_process = require("child_process")
        child_process.execSync("npm run build", {cwd: pkg.location, stdio: [0, 1, 2]})
    })
}

run()
