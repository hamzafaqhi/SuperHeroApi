export default {
  testEnvironment: "node", // Use Node.js environment for Jest
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Use babel-jest to transform JS/TS files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!supertest|other-esm-module)/", // Allow transformation of supertest and other ESM modules
  ],
};
