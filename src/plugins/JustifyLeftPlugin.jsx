import React from 'react';
import { ToolbarButton } from '../';

export const JustifyLeftPlugin = (props) => (
  <ToolbarButton
    command="justifyLeft"
    icon="align-left"
    selectors={[{ style: { textAlign: 'left' } }]}
    {...props}
  />
);
