const {Project} = require("@lerna/project")
const {getFilteredPackages} = require("@lerna/filter-options")
const {PackageGraph} = require("@lerna/package-graph")
const {publishPackage, addPackages} = require("yalc")
const chalk = require("chalk")

const run = async () => {
    var hrstart = process.hrtime()
    const project = new Project()
    const packages = project.getPackagesSync()

    const packageGraph = new PackageGraph(packages)
    const filtered = await getFilteredPackages(packageGraph)

    const linkablePackages = filtered
        .filter(pkg => pkg.name.includes("next"))
        .reduce((value, cached) => {
            return {...value, [cached.name]: cached}
        }, {})

    const isLocalDependency = ([dependency]) => {
        return !!linkablePackages[dependency]
    }
    console.log(chalk.blue(`Published Packages`))
    let countLinks = 0
    let countLinkedAgainstPackages = 0
    for (let pkg of Object.values(linkablePackages)) {
        if (pkg.private) continue
        const consol = console.log
        console.log = () => {}
        await publishPackage({workingDir: pkg.location})
        console.log = consol
        console.log(chalk.blue(`   ${pkg.name}@${pkg.version}`))
    }
    for (let pkg of Object.values(linkablePackages)) {
        console.log(chalk.blue(`${pkg.name}`))
        const linkLocalDependency = async ([name, dependencyVersion], depType) => {
            const packageVersion = linkablePackages[name].version.replace("^","") 
            const depVersionLessCaret = dependencyVersion.replace("^","")
            if (packageVersion === depVersionLessCaret) {
                const consol = console.log
                console.log = () => {}
                await addPackages([name], {workingDir: pkg.location, link: true})
                console.log = consol
                console.log(chalk.hex("#ff63b1").bold(`   Linked ${name}@${packageVersion} as ${depType}`))
            } else {
                console.log(
                    chalk.hex("#808080")(
                        `   Skip ${name} since version do not fall in range ${dependencyVersion} - ${packageVersion}`,
                    ),
                )
            }
        }

        const dependencies = Object.entries(pkg.dependencies || {})
        const devDependencies = Object.entries(pkg.devDependencies || {})
        const peerDependencies = Object.entries(pkg.peerDependencies || {})
        let doneWork = false
        for (let dependency of dependencies.filter(isLocalDependency)) {
            doneWork = true
            await linkLocalDependency(dependency, "dependency")
            countLinks++
        }
        for (let dependency of devDependencies.filter(isLocalDependency)) {
            doneWork = true
            await linkLocalDependency(dependency, "devDependency")
            countLinks++
        }
        for (let dependency of peerDependencies.filter(isLocalDependency)) {
            doneWork = true
            await linkLocalDependency(dependency, "peerDependency")
            countLinks++
        }
        if (!doneWork) {
            console.log(chalk.hex("#808080")(`   No local dependencies found.`))
        } else {
            countLinkedAgainstPackages++
        }
    }
    const hrend = process.hrtime(hrstart)
    console.log()
    console.log(
        chalk.green(
            `Linked ${countLinks} dependencies across ${countLinkedAgainstPackages} packages. Execution time: ${
                hrend[0]
            }.${(Math.round(hrend[1] / 100) * 100).toString().substring(0, 2)}s`,
        ),
    )
}

run()
