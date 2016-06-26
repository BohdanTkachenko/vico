import React from 'react';
import { ToolbarButton } from '../';

export const UnorderedListPlugin = (props) => (
  <ToolbarButton
    command="insertUnorderedList"
    icon="list-ul"
    selectors={['ul']}
    {...props}
  />
);
