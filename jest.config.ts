import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: 'tests',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/../src/$1',
  },
};

export default config;

