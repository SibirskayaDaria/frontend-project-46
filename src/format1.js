import _ from 'lodash';
import path from 'path';

const format = (filepath = 'json') => _.trim(path.extname(filepath), '.');

export default format;
