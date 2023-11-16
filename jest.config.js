/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

module.exports = {
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/fileMock.js',
	},
};
