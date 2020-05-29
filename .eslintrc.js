module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "standard-preact"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["off", "prefer-double", { "avoidEscape": true }],
    "indent": ["warn", 2, {"SwitchCase":1}],
    "jsx-quotes": ["warn", "prefer-double"],
    "react/jsx-indent":["warn", 2],
    "react/jsx-indent-props": ["warn", 2]
  }
};
