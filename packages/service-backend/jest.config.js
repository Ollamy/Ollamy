/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['./src/tests/e2e/singleton.ts'],
  clearMocks: true,
};
