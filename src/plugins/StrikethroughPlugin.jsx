import React from 'react';
import { ToolbarButton } from '../';

export const StrikethroughPlugin = (props) => (
  <ToolbarButton
    inlineStyle="strikethrough"
    selector="strikethrough"
    icon="strikethrough"
    {...props}
  />
);
