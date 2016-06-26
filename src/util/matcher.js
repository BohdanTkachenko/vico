const matchTagName = (tags, node) => {
  if (!tags) {
    return true;
  }

  if (typeof tags === 'string') {
    tags = [tags];
  }

  if (!Array.isArray(tags)) {
    return false;
  }

  if (!tags.length) {
    return true;
  }

  if (!node || !node.tagName) {
    return false;
  }

  const tagName = node.tagName.toUpperCase();

  return !!tags.find(tag => tag.toUpperCase() === tagName);
};

const matchStyles = (style, node) => {
  if (!style) {
    return true;
  }

  if (typeof style !== 'object' || !node.style) {
    return false;
  }

  for (const key of Object.keys(style)) {
    if (node.style[key] !== style[key]) {
      return false;
    }
  }

  return true;
};

export const compare = (selector, node) => {
  if (typeof selector === 'string') {
    selector = { tags: [selector] };
  }

  return matchTagName(selector.tags, node)
    && matchStyles(selector.style, node);
};

export const match = (selectors, nodes) => {
  if (!selectors || !Array.isArray(selectors) || !selectors.length) {
    return false;
  }

  if (!nodes || !Array.isArray(nodes) || !nodes.length) {
    return false;
  }

  for (const selector of selectors) {
    for (const node of nodes) {
      if (compare(selector, node)) {
        return true;
      }
    }
  }

  return false;
};

export const find = (selectors, nodes) => {
  for (const node of nodes) {
    if (match(selectors, [node])) {
      return node;
    }
  }

  return null;
};
