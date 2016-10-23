import React from 'react';
import { ToolbarButton } from '../';

export const UnderlinePlugin = (props) => (
  <ToolbarButton
    inlineStyle="underline"
    selector="underline"
    icon="underline"
    {...props}
  />
);
