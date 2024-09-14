import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigAirbnb from 'eslint-config-airbnb';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    extends: [
      eslintConfigAirbnb,
      pluginJs.configs.recommended,
      pluginReact.configs.flat.recommended,
      'plugin:prettier/recommended',
      eslintConfigPrettier,
    ],
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
