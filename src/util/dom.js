import { match } from './matcher';

export const replaceNodes = (selectors, nodes, newNode = null) => {
  for (let i = 0; i < nodes.length - 1; i++) {
    const node = nodes[i];
    if (match(selectors, [node])) {
      const parent = node.parentNode;

      if (!newNode) {
        newNode = parent;
      } else {
        parent.appendChild(newNode);
      }

      for (const childNode of node.childNodes) {
        parent.insertBefore(childNode, node);
      }

      parent.removeChild(node);

      if (newNode !== parent) {
        newNode = null;
      }

      return;
    }
  }
};

export const deleteNodes = (selectors, nodes) => {
  replaceNodes(selectors, nodes);
};
