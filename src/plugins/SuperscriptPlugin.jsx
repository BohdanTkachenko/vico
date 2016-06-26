import React from 'react';
import { ToolbarButton } from '../';

export const SuperscriptPlugin = (props) => (
  <ToolbarButton
    command="superscript"
    selectors={[{ tags: ['superscript'] }]}
    icon="superscript"
    {...props}
  />
);
