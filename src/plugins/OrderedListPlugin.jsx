import React from 'react';
import { ToolbarButton } from '../';

export const OrderedListPlugin = (props) => (
  <ToolbarButton
    blockType="ordered-list-item"
    icon="list-ol"
    selector="ordered-list-item"
    {...props}
  />
);
