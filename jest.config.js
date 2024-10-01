/* global process */
import dotenv from 'dotenv'
import fs from 'fs'

if (fs.existsSync('./.env')) {
  dotenv.config()
}

const { JEST_MEMORY } = process.env

const config = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[jt]s?(x)'],
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
    jsdom: {
      url: 'http://localhost',
    },
    // https://stackoverflow.com/a/77415620/1734789
    customExportConditions: [''],
  },
  roots: ['src'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/tests/fileMock.js',
    '^.+\\.(css|scss|less)$': '<rootDir>/tests/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    NODE_ENV: 'test',
  },
  /**
   * > We recommend placing the extensions most commonly used in your project
   * > on the left, so if you are using TypeScript, you may want to consider
   * > moving "ts" and/or "tsx" to the beginning of the array.
   *
   * ref: https://jestjs.io/docs/configuration#modulefileextensions-arraystring
   *
   * I checked the number of files in src, using `find src -name "*.js" | wc -l`
   *  and found that this is the order of most common file extensions:
   */
  moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx', 'json'],
  //  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['src/fixtures', 'src/icons/untitled-ui'],
  coverageReporters: ['text', 'clover', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/icons/untitled-ui/**/*',
    '!src/test-utils/**/*',
    '!src/fixtures/**/*',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  // this timeout does not cover RTLs waitFor and find methods. See setupTests for that.
  testTimeout: 15 * 1000, // m
  workerIdleMemoryLimit: JEST_MEMORY || '1500M',

  transform: {
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      'jest-preview/transforms/file',
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
}

export default config
