import { readFileSync } from 'node:fs';
import parse from './parse.js';
import getFormat from './getFormat.js';
import format from './formaters/index.js';
import makeTree from './makeTree.js';

const getFileContent = (path) => readFileSync(path, 'utf-8');

function gendiff(filePath1, filePath2, form = 'stylish') {
  const dataParse1 = parse(getFileContent(filePath1), getFormat(filePath1));
  const dataParse2 = parse(getFileContent(filePath2), getFormat(filePath2));
  const difference = makeTree(dataParse1, dataParse2);
  return form(difference, format);
}

export default gendiff;
