import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths({ projects: ['tsconfig.spec.json'] })],
	test: {
		environment: 'node',
		include: ['tests/**/*.spec.ts'],
		maxConcurrency: 5,
		clearMocks: true,
		mockReset: true,
		coverage: {
			provider: 'v8',
			include: ['./src/**/*'],
			thresholds: { 100: true },
			skipFull: true,
		},
		silent: false,
		logHeapUsage: true,
		reporters: ['default', 'html'],
	},
});
