module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": "off",
    "camelcase": ["error", { ignoreDestructuring: true, properties: "never" }],
    "comma-dangle": ["error", "always-multiline"],
    "default-case": "off",
    "flowtype/require-valid-file-annotation": 0,
    "jsx-quotes": ["error", "prefer-double"],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": "off",
    "quote-props": "off",
    "quotes": ["error", "double"],
    "react-hooks/exhaustive-deps": 0,
    "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
  },
};
