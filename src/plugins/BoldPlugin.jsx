import React from 'react';
import { ToolbarButton } from '../';

export const BoldPlugin = (props) => (
  <ToolbarButton
    inlineStyle="bold"
    selector="bold"
    icon="bold"
    {...props}
  />
);
