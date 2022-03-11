This project was bootstrapped with [Create React App SSR](https://create-react-ssr-app.dev/).# About

Replatform header, making it responsive

# Tech requirements

Node: 10 above

- Using NPM, not using yarn as Next machines are mostly using Windows

Used libraries:

- React with TypeScript
- [Material UI](https://material-ui.com/)
- CSS in JS
- Styled Components
- Redux

## Overall Summary

Uses the [Atomic Design Principle](https://bradfrost.com/blog/post/atomic-web-design/) to break down components into
manageable and modular code. Split out into 4 regions - social links, quick links, main links, and copyright, which is
driven from the API.

## Setup (REQUIRED)

- You need to set up .npmrc on your machine, click latest version and click connect to
  [feed](https://dev.azure.com/Amido-Ecommerce/Amido.Ecommerce.TeamModernisation/_packaging?_a=package&feed=Amido-Ecommerce&package=settings-sdk&version=1.0.2983&protocolType=Npm&view=versions),
  this will allow you to install settings-sdk package from azure.

Any new packages must be approved by the architects, email to ben_robinson@monorepo.co.uk or speak to architects how to
approve them If not approved then it will throw 403 when doing npm install

### Environment variables

- To add environment variables, Go to:
  - [Sandbox ENV -library](https://dev.azure.com/Amido-Ecommerce/Amido.Ecommerce.TeamModernisation/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=37&path=Sandbox.eCommerce.Header.Frontend).
  - [CI ENV -library](https://dev.azure.com/Amido-Ecommerce/Amido.Ecommerce.TeamModernisation/_library?itemType=VariableGroups&view=VariableGroupView&variableGroupId=38&path=CI.eCommerce.Header.Frontend).

* for Deployment part, go to charts/templates/deployment.yaml. This will help the app to replace the values when you add
  e.g. process.env.apiBaseUrl, apiBaseUrl is customisable.

* Azure-pipelines - For each environment, you will need to configure the parameters/overrides to be like
  application.apiBaseUrl=\$(apiBaseUrl), to match the values.yaml

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br> Open [http://localhost:3004](http://localhost:3004) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in the console.

### `npm run tsc`

Launches the internal typescript compiler to check for errors and ensuring that the codebase compiles correctly

### `npm run lint`

Launches the linter (internally making use of ESLint)

### `npm test`

Launches the test runner<br> See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test "MY_TEST_FILE_NAME" -- --watch`

Launches the test runner in the interactive watch mode filtered to the test file you are writing. Best used when doing
TDD.

### `npm test -- --coverage`

Generates a test coverage report located in the 'coverage' directory - double click index.html to open in your browser
to see this.

### `npm test -- -u -t="ColorPicker"`

Updates the test snapshots for the tests with the file name matching 'ColorPicker'.

### `npm run build`

Builds the app for production to the `build` folder.<br> It correctly bundles React in production mode and optimizes the
build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm start`

After running `npm run build`, this will run the application `http://localhost:3004` linking the /build directory

### `npm run start:headless:container:local`

This will run the application with local MegaNav ESI.<br>
[http://localhost:3333/headercontainer](http://localhost:3333/headercontainer) to view it in the browser.

Requires the separate meganav project running (e.g. 'npm dev')

### `docker`

To run docker:

- `docker build -t header .`
- `docker run --env-file env.list -p 3004:3004 header`

Change the environments values in env.list for api or cdn url

## Contribution Notes

In order to be more proficient in contributions as well as to make the review process leaner and more consistent (other
than quicker) we have introduced Husky to provide for some pre-commit hooks. The current setup is to run the following
in sequence every time a `commit` is made:

- `npm run tsc`
- `npm run lint`
- `npm run test`

in addition to this, when a `push` is performed against the remote repository, the following will be performed:

- `npm version patch`
- a new package.json is staged for commit

## Testing Notes

- For testing purposes we are using markup attribute: `data-testid` as it is the default used by react-test-library

## Learn More

- [Material-UI](https://material-ui.com/getting-started/installation/)
- [Jest](https://jestjs.io/docs/en/getting-started.html)
- [Redux](https://redux.js.org/introduction/getting-started/)
