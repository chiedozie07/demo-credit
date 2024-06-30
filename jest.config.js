module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    rootDir: 'tests',
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/../src/$1',
    },
  };  