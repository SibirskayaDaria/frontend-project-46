import { readFileSync } from 'node:fs';
import parse from './parse.js';
import makeFormat from './makeFormat.js';
import tree from './tree.js';
import functionFormat from './formatters/index.js';

const getFileContent = (path) => readFileSync(path, 'utf-8');

function gendiff(filePath1, filePath2, format = 'stylish') {
  const dataParse1 = parse(getFileContent(filePath1), makeFormat(filePath1));
  const dataParse2 = parse(getFileContent(filePath2), makeFormat(filePath2));
  const difference = tree(dataParse1, dataParse2);
  return functionFormat(difference, format);
}

export default gendiff;
