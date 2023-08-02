import _ from 'lodash';

const stringify = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const generatePath = (node, path) => (path !== '' ? `${path}.${node.key}` : String(node.key));

const exportNode = (array, path) => array.filter((node) => node.type !== 'unchanged').map((node) => {
  const { type } = node;
  const finalPath = generatePath(node, path);

  switch (type) {
    case 'parent':
      return `${exportNode(node.children, finalPath).join('\n')}`;
    case 'changed':
      return `Property '${finalPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    case 'added':
      return `Property '${finalPath}' was added with value: ${stringify(node.value)}`;
    case 'deleted':
      return `Property '${finalPath}' was removed`;
    default:
      throw new Error(`Unknown node type ${node.type}.`);
  }
});

function generateTreePlain(propertyPath) {
  return `${exportNode(propertyPath, '').join('\n')}`;
}

export default generateTreePlain;
