module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "brace-style": [
            "error",
            "stroustrup"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-var": [
            "off"
        ],
        "one-var": [
            "off"
        ],
        "allowSingleLine": true
    },
    "overrides": [
        {
            "files": ["api/*.js"]
        }
    ]
};