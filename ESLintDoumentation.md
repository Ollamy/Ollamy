# ESLint Configuration Documentation
This document details the ESLint configuration used in the project, explaining each setting and the reasons for their inclusion.

## Environment (env)
This project is set up to support environments such as the browser, Node.js, ES6, Jest, and CommonJS modules.

```
"env": {
  "browser": true,
  "commonjs": true,
  "es6": true,
  "jest": true,
  "node": true
}
```
## Parser
This project uses the TypeScript ESLint parser for linting TypeScript files.

```
"parser": "@typescript-eslint/parser",
"parserOptions": {
  "project": "./tsconfig.json"
}
```
## Extends
The configuration extends several popular rulesets including Airbnb's style guide, TypeScript specific rules, and Prettier for code formatting.

```
"extends": [
  "airbnb",
  "airbnb-typescript",
  "plugin:@typescript-eslint/recommended",
  "prettier"
]
```
## Plugins
The project makes use of several plugins that add additional rules for React, TypeScript, React Hooks, and import sorting.

```
"plugins": ["react", "prettier", "@typescript-eslint", "react-hooks", "simple-import-sort"]
```
## Rules
The rules section is where we tailor our linting experience. Here's what each rule does:

`"react/react-in-jsx-scope": "off"`: This rule is off because we're likely using a version of React that doesn't require importing React in JSX files.

`"prettier/prettier": "error"`: This rule enforces Prettier formatting and throws an error when code isn't formatted correctly.

`"no-unused-vars": "off"`: and `"@typescript-eslint/no-unused-vars": "error"`: These rules turn off JavaScript's native no-unused-vars rule and replace it with TypeScript's equivalent.

`"no-use-before-define": "off"`: and `"@typescript-eslint/no-use-before-define"`: "error": These rules turn off the native no-use-before-define rule and enable TypeScript's equivalent.

`"@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }]`: This rule requires explicit return types on functions and methods.

`"@typescript-eslint/explicit-module-boundary-types"`: "error": This rule enforces that exported functions and classes explicitly define their return and argument types.

`"@typescript-eslint/consistent-type-imports": "error"`: This rule enforces the use of import type {} for TypeScript type imports.

`"import/prefer-default-export": "off"`: This rule is turned off, allowing the use of named exports.

`"react/prop-types": "off"`: As TypeScript is being used for prop types, we disable ESLint's prop-types rule.

`"no-param-reassign":"off"`: This rule allows the reassignment of function parameters, often used in reducers.

`"react/require-default-props": "off"`: This rule is off, making it optional to provide default props for React components.

`"react-hooks/rules-of-hooks": "error"`: and `"react-hooks/exhaustive-deps": "warn"`: These rules enforce the Rules of Hooks - the first errors when the rules are broken, the second warns about incorrect dependency arrays.

`"react/jsx-props-no-spreading": [...]`: This rule disallows JSX props spreading but makes exceptions for some components.

`"no-console": ["error", { "allow": ["error"] }]`: This rule disallows console statements except for console.error.

`"simple-import-sort/imports": [...]`: This rule groups and sorts imports in a specific order to make it easier to read and maintain.

For more specific information about any of these rules, refer to the documentation provided by the respective plugins or ESLint's core rules documentation.
