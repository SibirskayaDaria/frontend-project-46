import path from 'path';
import _ from 'lodash';

const form = (filepath = 'json') => _.trim(path.extname(filepath), '.');

export default form;
