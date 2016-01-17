import React, { Component } from 'react';
import classNames from 'classnames';


const propTypes = {
  content: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  callAction: React.PropTypes.func.isRequired,
};

export default class LauncherListItem extends Component {
  constructor(props) {
    super(props);

    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem() {
    this.props.callAction(this.props.content);
  }

  render() {
    return (
      <li
        className={ classNames('launcher-list-item', { 'is-selected': this.props.isSelected }) }
        onClick={ this.onClickItem }
      >
        { this.props.content.text }
      </li>
    );
  }
}

LauncherListItem.propTypes = propTypes;
