# IMPORTANT -Initial Project Setup!

In the root of the project please run 
- `node bin/dependency_trim.js` -> one time use
- Configure the optional dependencies
- Assure everything still works fine and commit your options in a single commit 

# This project was bootstrapped with Pitech [template](https://gitlab.pitechplus.com/cristian.boza/cra-template-pi).

## Available Scripts

In the project directory, you can run:

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` - launches the test runner in the interactive watch mode.

- `yarn test:e2e` - launches app on port `3099` and starts the E2E environment.

- `yarn test:mutation` - launches the test runner and applies mutations on written code.

- `yarn lint` - lints project files according to eslint rules

- `yarn lint:fix` - same as `yarn lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all configuration is done by adding config files where possible. Also no `devDependencies` for now, sorry.

## Utils & Helpers

A [wrapper](./src/utils/storage.ts) over `localstorage` is provided out of the box, contains functionalities for `get`, `set` and `remove`  
This wrapper comes with Typescript support based on local configuration.

## Recoil EXPERIMENTAL

Basic Global state management configuration with Recoil.js. Read more [here](https://recoiljs.org/) 

## Redux configuration

The template provides basic Redux configuration using [Redux Toolkit](https://redux-toolkit.js.org/)

## IMPORTANT: Form Solutions

### Final Form [project](https://final-form.org/react)
Basic implementation contains a [FormWrapper](/src/form/final-form/FormWrapper.tsx) that should be used to declare a form  
A TextField, CheckboxField and ConditionField is provided by default
A set of validators is also provided within the final-form directory

### React Hook Form [project](https://react-hook-form.com/)
Implementation details can be found [here](src/pages/ReactHookForm.tsx). 
 
## Testing

### E2E
[Cypress](https://docs.cypress.io/api/api/table-of-contents.html)
is the default library for e2e testing, contains a minimal setup.  
For running the integration setup tests locally:
 - start application on port 3000(see [cypress.json](./cypress.json))
 - run any of:  
   - `npm run cy:open` (user interface)
   - `npm run test:e2e` (command line)

#### Updating cypress version

To update cypress version first you must change the version in the `package.json`, make sure to leave
it fixed to prevent upgrading by mistake. You will also have to change the docker image on which the CI
is running as it is fixed. The default one is hardcoded version taken from the cra-template-pi repo
registry. To build a new image do the following:

1. Build image for the new version, make sure to use your own repo for the tag and set the $VERSION:
  ```bash
  docker build -t "registry.pitechplus.com/$YOUR_PROJECT_PATH/cypress:$VERSION" docker/ -f docker/Dockerfile-cypress --build-arg VERSION=$VERSION
  ```
2. Push the tag and update the `image: ` in the `E2E` job in `.gitlab-ci.yml`
  ```bash
  docker push registry.pitechplus.com/$YOUR_PROJECT_PATH/cypress:$VERSION
  ```

### Unit and integration testing
[React Testing library](https://testing-library.com/docs/react-testing-library/api) is used in this case.
Use `npm run test` or `npm run test:coverage` for running tests.  
There is already a [test](/src/__tests__) and [mock](/src/__mocks__) folder set with
 basic tests for the [Counter](/src/components/counter/Counter.tsx) component. In 
the mock folder you will also find a [wrappers](/src/__mocks__/wrappers.tsx) file
that contains some helper function to wrap your components with Redux and Intl 
providers.

### Mutation testing
Mutation tester provider is [Stryker](https://stryker-mutator.io/)
Stryker provides a real coverage report of the current tests and offers an insight on where bugs might appear

In order to see this report locally, run `npm run test:mutation` (For the current project setup, it requires at least node12)
This report can pe visualised on each branch pipeline by triggering a manual job and then downloading the artifact with the report on a html format 
In order to add/remove tests or files from mutation scope, please edit [stryker.conf.js](./stryker.conf.js)

Stryker can be removed by adding `mutation` as an argument to the `./bin/clean_project.sh`

### Security audit
**Disabled by default** (can be enabled by removing `exit $ERROR #ignore audit` from `bin/code_quality`)
The CI will automatically check audit and break the pipelines if there is a security issue above `moderate` level.
This is done with the `better-npm-audit` package, see `npm run audit`. If you'd like to ignore some audit warnings
in case fixing them is too difficult or unnecessary (ex: non prod code has issues), then you can add `-i ${AUDIT_ID}`
to the command in `package.json:scripts:audit`. For more details see [better-npm-audit](https://www.npmjs.com/package/better-npm-audit).

## Internationalization

Translations is provided using React Intl.  
Also a [DynamicFormattedMessage](src/components/common/DynamicFormattedMessage.tsx) 
component is provided to wrap the intl import and provide conditional rendering of the text

## [Prettier](https://prettier.io/)

`Prettier` is added to force consistent formatting. Don't like trailing semicolons? Feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside `.prettierrc` file to match your code style.

## Eslint configurations

The template extends CRA ESLint rules with a custom set, tailored for the reasonable and clean development process.

Eslint rules are commented for your convenience feel free to tweak or remove them inside `.eslintrc`  
Import order not configured, a plugin can be found [here](https://www.npmjs.com/package/eslint-plugin-ordered-imports) 

## Open API Tools generator [project](https://github.com/OpenAPITools/openapi-generator)
The provided template uses fetch, if you wish to modify it, please consult the project, axios/superagent are also suported
 
By providing a valid endpoint for `swagger.json` retrieval in the `.env` file the script found at `bin/install_api.sh`
will generate models and APIs defined in that particular `swagger.json`

### Machine requirements
- `chmod +x ./bin/install.sh` -> to be able to run it  
- `docker` -> required in order to abstract the java dependency of the generator

## Styling [docs](https://tailwindcss.com/)

## Set git hooks

```shell
cp githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
cp githooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-push
```
