import React from 'react';
import { ToolbarButton } from '../';

export const UnorderedListPlugin = (props) => (
  <ToolbarButton
    blockType="unordered-list-item"
    icon="list-ul"
    selector="unordered-list-item"
    {...props}
  />
);
