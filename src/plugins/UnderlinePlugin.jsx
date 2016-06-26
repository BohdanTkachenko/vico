import React from 'react';
import { ToolbarButton } from '../';

export const UnderlinePlugin = (props) => (
  <ToolbarButton
    command="underline"
    icon="underline"
    selectors={['u']}
    {...props}
  />
);
