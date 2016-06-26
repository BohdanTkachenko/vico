import React from 'react';
import { ToolbarButton } from '../';

export const JustifyRightPlugin = (props) => (
  <ToolbarButton
    command="justifyRight"
    icon="align-right"
    selectors={[{ style: { textAlign: 'right' } }]}
    {...props}
  />
);
