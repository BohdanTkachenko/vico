import React from 'react';
import { ToolbarButton } from '../';

export const ItalicPlugin = (props) => (
  <ToolbarButton
    command="italic"
    icon="italic"
    selectors={[{ tags: ['i', 'em'] }]}
    {...props}
  />
);
