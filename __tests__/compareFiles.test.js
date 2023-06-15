const { compareFiles } = require('../gendiff');

test('Compare flat JSON files - same files', () => {
  const file1 = require('../file1.json');
  const file2 = require('../file2.json');

  const result = compareFiles(JSON.stringify(file1), JSON.stringify(file2));
  expect(result).toBe('');
});

test('Compare flat JSON files - different values', () => {
  const file1 = require('../file1.json');
  const file2 = require('../file2.json');

  const result = compareFiles(JSON.stringify(file1), JSON.stringify(file2));
  expect(result).toBe(`- timeout: 50\n+ timeout: 20\n+ verbose: true`);
});



