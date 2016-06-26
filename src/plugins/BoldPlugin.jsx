import React from 'react';
import { ToolbarButton } from '../';

export const BoldPlugin = (props) => (
  <ToolbarButton
    command="bold"
    selectors={[{ tags: ['b', 'strong'] }]}
    icon="bold"
    {...props}
  />
);
