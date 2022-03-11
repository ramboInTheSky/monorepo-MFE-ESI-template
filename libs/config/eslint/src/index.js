'use strict';

module.exports = tsconfig => ({
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: tsconfig || "./tsconfig.json",
        sourceType: "module",

        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
        "eslint:recommended",
        "eslint-config-prettier",
        "plugin:compat/recommended",
        "plugin:jest/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react",
    ],
    globals: {
        React: "writable",
    },
    plugins: ["react", "jest", "@typescript-eslint", "jsx-a11y"],
    ignorePatterns: ["temp.js", "node_modules/", "**/*.cy.ts"],
    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars-experimental": "error",
        "lines-between-class-members": ["error", "always", {exceptAfterSingleLine: true}],
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": 0,
        "consistent-return": 0,
        "import/prefer-default-export": 0,
        "compat/compat": 0,
        "react/destructuring-assignment": 0,
        "jest/no-commented-out-tests": 0,
        "jest/no-mocks-import": 0,
        "no-underscore-dangle": 0,
        "import/no-named-as-default": 0,
        "max-classes-per-file": 0,
        "import/extensions": [
            "error",
            "never",
            {
                ts: "never",
                tsx: "never",
                js: "never",
                jsx: "never",
            },
        ],
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".jsx", ".tsx"],
            },
        ],
        semi: ["error", "never"],
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": ["error", {devDependencies: ["**/*.test.tsx"]}],
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/no-var-requires": "off",
            },
        },
    ],
    settings: {
        react: {
            version: "detect",
            // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
});
