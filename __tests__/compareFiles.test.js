const { compareFiles } = require('../bin/gendiff.js');

test('Сравнение плоских файлов JSON - разные значения', () => {
  const file1Path = `${__dirname}/../file1.json`;
  const file2Path = `${__dirname}/../file2.json`;
  const result = compareFiles(file1Path, file2Path);
  const expected = '- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true';
  expect(result).toEqual(expected);
});
