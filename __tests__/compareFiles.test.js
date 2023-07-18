import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src/index.js';

const filename1 = fileURLToPath(import.meta.url);
const dirname1 = dirname(filename1);

const getFixturePath = (filename) => path.join(dirname1, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];