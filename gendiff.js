const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const readFile = (filepath) => {
  const resolvedPath = path.resolve(__dirname, filepath);
  return fs.readFileSync(resolvedPath, 'utf8');
};

const compareFiles = (file1, file2) => {
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

module.exports = {
  compareFiles,
};

