module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ["prettier"],
  rules: {
    "no-param-reassign": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "no-shadow": 0,
    "no-case-declarations": 0,
    "no-plusplus": 0,
    "no-unused-expressions": 0,
  }
};
