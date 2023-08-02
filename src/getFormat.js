import path from 'path';
import _ from 'lodash';

const format = (filepath = 'json') => _.trim(path.extname(filepath), '.');

export default format;
