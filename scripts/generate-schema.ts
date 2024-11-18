import { existsSync, writeFileSync } from 'node:fs';
import process from 'node:process';

import { generateSchema, getProgramFromFiles } from 'typescript-json-schema';

import type { PartialArgs } from 'typescript-json-schema';

const TS_CONFIG_PATH = 'tsconfig.json';
const TYPE_FILE_PATH = 'src/types/index.ts';
const TYPE_NAME = 'CommitJazzerPrompterOptions';
const OUTPUT_PATH = 'public/schema.json';

// Settings for generating a schema.
const settings: PartialArgs = {
	required: true,
	ref: false,
	skipLibCheck: true,
};

// Checking for tsconfig.json.
if (!existsSync(TS_CONFIG_PATH)) {
	console.error(`Error: tsconfig.json not found at path ${TS_CONFIG_PATH}`);

	process.exit(1);
}

// Checking for a type file.
if (!existsSync(TYPE_FILE_PATH)) {
	console.error(`Error: Type file not found at path ${TYPE_FILE_PATH}`);

	process.exit(1);
}

try {
	// Getting an AST program.
	const program = getProgramFromFiles([TYPE_FILE_PATH], {}, TS_CONFIG_PATH);

	// Compiling a schema for a given type.
	const schema = generateSchema(program, TYPE_NAME, settings);

	if (schema) {
		writeFileSync(OUTPUT_PATH, JSON.stringify(schema, null, 2), 'utf-8');

		console.warn('JSON schema successfully generated at:', OUTPUT_PATH);
	} else {
		console.error('Schema generation failed: Schema object is null.');
	}
} catch (error) {
	console.error('An error occurred during schema generation:', error);
}
