import _ from 'lodash';

function makeTree(cont1, cont2) {
  const clonedCont1 = _.cloneDeep(cont1);
  const clonedCont2 = _.cloneDeep(cont2);

  const arrowKeysFile1 = Object.keys(clonedCont1);
  const arrowKeysFile2 = Object.keys(clonedCont2);
  const sumArrowKeys = _.sortBy(_.union(arrowKeysFile1, arrowKeysFile2));

  const result = sumArrowKeys.map((key) => {
    const value1 = clonedCont1[key];
    const value2 = clonedCont2[key];

    if (!Object.prototype.hasOwnProperty.call(clonedCont1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }

    if (!Object.prototype.hasOwnProperty.call(clonedCont2, key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'parent',
        key,
        children: makeTree(value1, value2),
      };
    }

    if (_.isEqual(value1, value2)) {
      return {
        type: 'unchanged',
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

export default makeTree;
