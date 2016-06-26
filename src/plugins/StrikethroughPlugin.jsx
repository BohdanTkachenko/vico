import React from 'react';
import { ToolbarButton } from '../';

export const StrikethroughPlugin = (props) => (
  <ToolbarButton
    command="strikethrough"
    icon="strikethrough"
    selectors={['s']}
    {...props}
  />
);
