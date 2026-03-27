export default {
  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  testMatch: [
    "**/__tests__/**/*.test.js",
    "**/?(*.)+(spec|test).js"
  ],

  transform: {},

  moduleNameMapper: {
    "^#configs/(.*)$": "<rootDir>/src/main/shared/configs/$1",
    "^#shared/(.*)$": "<rootDir>/src/main/shared/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
  ],

  testTimeout: 10000,
  silent: false,
};