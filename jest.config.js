module.exports = {
  testMatch: ["**/?(*.)(spec|test).ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"], //  在环境设置之后运行的文件，用于配置测试环境
  rootDir: ".",
  transform: {
    ".(ts|tsx)": "@swc/jest",
  },
  moduleNameMapper: {
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  watchAll: false,
  collectCoverage: true,
  coverageDirectory: "./docs/jest-coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx", "node"],
  reporters: [
    "default",
    [
      "jest-stare",
      {
        coverageLink: "../jest-coverage/lcov-report/index.html",
        resultDir: "docs/jest-stare",
      },
    ],
  ],
};
