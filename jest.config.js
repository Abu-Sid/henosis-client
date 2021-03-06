module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
      '\\.(scss|sass|css)$': 'identity-obj-proxy',
      
      ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
    },
    // transform: {
    //     '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    //     '/^.+.(css|less|scss|sass)$/': 'identity-obj-proxy',
    //   },
  };
//   module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist'],
//     moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src', '<rootDir>/pages'],
//     moduleNameMapper: {
//       '@src/(.*)': '<rootDir>/src/$1',
//       '@pages/(.*)': '<rootDir>/pages/$1',
//       '@styles/(.*)': '<rootDir>/styles/$1',
//     },
//     coverageDirectory: 'coverage',
//     collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}'],
//     coverageThreshold: {
//       global: {
//         branches: 0,
//         functions: 0,
//         lines: 0,
//         statements: 0,
//       },
//     },
//   };