module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        arrowParens: "always",
        bracketSpacing: true,
        proseWrap: "always",
        trailingComma: "none",
        organizeImportsSkipDestructiveCodeActions: true
      }
    ]
  }
};
