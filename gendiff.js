#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { program } = require('commander');

const readFile = (filepath) => {
  const resolvedPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(resolvedPath, 'utf8');
};

const compareFiles = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `+ ${key}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return `- ${key}: ${obj1[key]}`;
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return `  ${key}: ${obj1[key]}`;
    }
    return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
  });

  return diff.join('\n');
};

const genDiff = (filepath1, filepath2) => compareFiles(filepath1, filepath2);

program
  .name('gendiff')
  .description('Сравнивает два файла конфигурации и показывает различия.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const resolvedPath1 = path.resolve(process.cwd(), filepath1);
    const resolvedPath2 = path.resolve(process.cwd(), filepath2);
    const diff = genDiff(resolvedPath1, resolvedPath2);
    console.log(diff); // Выводит различия в консоль
  });

program.parse(process.argv);
