const { compareFiles } = require('../gendiff');

test('Сравнение плоских файлов JSON - одинаковые файлы', () => {
  const file1Path = `${__dirname}/../file1.json`;
  const file2Path = `${__dirname}/../file1.json`; // Здесь используется один и тот же файл

  const result = compareFiles(file1Path, file2Path);
  const expected = 
  '  follow: false\n  host: hexlet.io\n  proxy: 123.234.53.22\n  timeout: 50'
  
  expect(result).toEqual(expected);
});

test('Сравнение плоских файлов JSON - разные значения', () => {
  const file1Path = `${__dirname}/../file1.json`;
  const file2Path = `${__dirname}/../file2.json`;

  const result = compareFiles(file1Path, file2Path);
  const expected = `- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`;
  expect(result).toBe(expected);
});
