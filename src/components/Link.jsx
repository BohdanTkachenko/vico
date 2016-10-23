import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';

export class Link extends React.Component {
  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { entityKey, children } = this.props;
    const { url } = Entity.get(entityKey).getData();

    return (
      <a href={url} className="drafjs-bhe_link">
        {children}
      </a>
    );
  }
}
