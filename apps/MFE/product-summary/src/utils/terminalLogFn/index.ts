/* istanbul ignore file */
/* 
    Eslint disables and ts-ignores present because linting kept failing when adding the file in tsconfig's ignore exclude list with the following error:
     0:0  error  Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
        The file does not match your project config: src\utils\terminalLogFn\index.ts.
        The file must be included in at least one of the projects provided 
*/
function terminalLogFn(violations) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    cy.task(
        "log",
        `${violations.length} accessibility violation${violations.length === 1 ? "" : "s"} ${
            violations.length === 1 ? "was" : "were"
        } detected.`,
        )
        // pluck specific keys to keep the table readable
        const violationData = violations.map(({id, impact, description, nodes}) => ({
            id,
            impact,
            description,
            nodes: nodes.length,
        }))
        
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    cy.task("table", violationData)
}

export default terminalLogFn
