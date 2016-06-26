import React from 'react';
import { ToolbarButton } from '../';

export const OrderedListPlugin = (props) => (
  <ToolbarButton
    command="insertOrderedList"
    icon="list-ol"
    selectors={['ol']}
    {...props}
  />
);
