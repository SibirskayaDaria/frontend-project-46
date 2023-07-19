import _ from 'lodash';

function tree(const1, const2) {
  const arrowKeysFile1 = Object.keys(const1);
  const arrowKeysFile2 = Object.keys(const2);
  const sumArrowKeys = _.sortBy(_.union(arrowKeysFile1, arrowKeysFile2));

  const result = sumArrowKeys.map((key) => {
    const value1 = const1[key];
    const value2 = const2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'parent',
        key,
        children: tree(value1, value2),
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        type: 'unchanged',
        key,
        value: value1,
      };
    }
    if (!Object.hasOwn(const1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }
    if (!Object.hasOwn(const2, key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }
    return {
      type: 'changed',
      key,
      value1,
      value2,
    };
  });

  return result;
}

export default tree;
