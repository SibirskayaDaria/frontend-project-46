const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const compareFiles = (file1Path, file2Path) => {
  const resolvedPath1 = path.resolve(__dirname, file1Path);
  const resolvedPath2 = path.resolve(__dirname, file2Path);

  const file1 = fs.readFileSync(resolvedPath1, 'utf8');
  const file2 = fs.readFileSync(resolvedPath2, 'utf8');

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