import React from 'react';
import { ToolbarButton } from '../';

export const SubscriptPlugin = (props) => (
  <ToolbarButton
    command="subscript"
    selectors={[{ tags: ['subscript'] }]}
    icon="subscript"
    {...props}
  />
);
