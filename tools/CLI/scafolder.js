const path = require("path")
const inquirer = require("inquirer")
const {lstatSync, readdirSync, writeFileSync, statSync, readFileSync, mkdirSync, existsSync} = require("fs")
const template = require("mustache")
const chalk = require("chalk")
const templateFolder = path.join(__dirname, "../templates")
const root = path.join(__dirname, "../../")

const getDirectories = source =>
    readdirSync(source).filter(x => {
        return lstatSync(path.join(source, x)).isDirectory()
    })

const run = async () => {
    console.log(chalk.hex("#ff63b1").bold(`AMIDO Mono Repo Scafolding`))
    const templatesTypes = getDirectories(templateFolder)
    const rootAppType = await inquirer.prompt([
        {
            name: "type",
            type: "list",
            message: "What project type would you like to create?",
            choices: templatesTypes,
        },
    ])
    let templatePath = path.join(templateFolder, rootAppType.type)
    const templates = getDirectories(path.join(templateFolder, rootAppType.type))
    const templateType = await inquirer.prompt([
        {
            name: "type",
            type: "list",
            message: "What template do you wanna use?",
            choices: templates,
        },
    ])
    const templateName = await inquirer.prompt([
        {
            name: "projectName",
            type: "input",
            message: "Project Name?",
            choices: templates,
        },
    ])

    const templateSource = path.join(templatePath, templateType.type)
    const destinationFolder = path.join(root, rootAppType.type, templateType.type, templateName.projectName)

    createProjectDir(destinationFolder)
    copyTemplate(templateSource, templateName.projectName, destinationFolder)
}

run()

function createProjectDir(projectPath) {
    if (existsSync(projectPath)) {
        console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`))
        return false
    }
    mkdirSync(projectPath)
    console.log(chalk.green(`Created ${projectPath}.`))

    return true
}

const SKIP_FILES = ["node_modules"] // we
function copyTemplate(templatePath, projectName, destination) {
    const filesToCreate = readdirSync(templatePath)
    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file)

        const stats = statSync(origFilePath)

        if (SKIP_FILES.indexOf(file) > -1) return

        if (stats.isFile()) {
            let contents = readFileSync(origFilePath, "utf8")
            contents = template.render(contents, {
                projectName: projectName.toLowerCase(),
                projectDescription: "Your Description here",
            })
            const writePath = path.join(destination, file)
            writeFileSync(writePath, contents, "utf8")
        } else if (stats.isDirectory()) {
            mkdirSync(path.join(destination, file))
            copyTemplate(path.join(templatePath, file), path.join(projectName, file), destination)
        }
    })
}
