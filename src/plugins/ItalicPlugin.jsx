import React from 'react';
import { ToolbarButton } from '../';

export const ItalicPlugin = (props) => (
  <ToolbarButton
    inlineStyle="italic"
    selector="italic"
    icon="italic"
    {...props}
  />
);
