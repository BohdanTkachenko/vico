export const hasParentNode = (el, parentEl) => {
  let current = el;
  while (current) {
    if (current === parentEl) {
      return true;
    }

    current = current.parentNode;
  }

  return false;
};

export const getSelectedNodes = (selection, rootEl) => {
  const nodes = [];
  if (selection) {
    let current = selection.startContainer;
    while (current && current !== rootEl) {
      nodes.push(current);
      current = current.parentNode;
    }
  }

  return nodes;
};

export const setSelection = (selection) => {
  if (window.getSelection) {
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(selection);
  } else if (document.selection && selection.select) {
    selection.select();
  }
};

export const getSelection = (rootEl) => {
  let selection = null;

  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      selection = sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    selection = document.selection.createRange();
  }

  if ((!selection || !hasParentNode(selection.startContainer, rootEl)) && rootEl.firstChild) {
    selection = document.createRange();
    selection.setStartBefore(rootEl.firstChild);
    selection.setEndAfter(rootEl.firstChild);
    setSelection(selection);
  }

  const nodes = getSelectedNodes(selection, rootEl);

  return { selection, nodes };
};
