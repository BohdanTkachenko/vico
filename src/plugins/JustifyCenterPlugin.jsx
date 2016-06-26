import React from 'react';
import { ToolbarButton } from '../';

export const JustifyCenterPlugin = (props) => (
  <ToolbarButton
    command="justifyCenter"
    icon="align-center"
    selectors={[{ style: { textAlign: 'center' } }]}
    {...props}
  />
);
