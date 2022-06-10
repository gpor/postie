module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:vue/base",
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
  },
  "plugins": [
    "vue",
    "@typescript-eslint",
  ],
  "rules": {
    "no-unused-vars": "off",
    "no-constant-condition": "off",
    "no-empty": "off",
    "no-case-declarations": "off",
    "vue/no-mutating-props": "off",
    "vue/html-self-closing": "off",
    "comma-dangle": ["error", {
      "objects": "always-multiline",
      "arrays": "always-multiline",
    }],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "object-curly-spacing": [
      "error",
      "always",
    ],
    "space-before-function-paren": [
      "error",
      "never",
    ],
    "space-before-blocks": [
      "error",
      "always",
    ],
    "vue/no-v-html": "off",
  },
}
