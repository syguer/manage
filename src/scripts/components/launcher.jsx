import React, { Component } from 'react';
import classNames from 'classnames';

import {
  pages,
  keyCodes,
  launcherContentTypes,
} from '../constants/constants';
import { hideLauncher } from '../actions/app-action-creators';
import { changePage } from '../actions/app-action-creators';
import { createTodo } from '../actions/todo-action-creators';
import { createTodoCategory } from '../actions/todo-category-action-creators';


const LauncherPropTypes = {
  contents: React.PropTypes.array.isRequired,
};

export default class Launcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      contentIndex: 0,
      filteredContents: this.props.contents,
    };

    this.onKeyDownInput = this.onKeyDownInput.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.callAction = this.callAction.bind(this);
  }

  onKeyDownInput(event) {
    const keyCode = event.keyCode;
    const shift = event.shiftKey;
    const ctrl = event.ctrlKey || event.metaKey;
    let contentIndex;
    let content = [];

    switch (true) {
      case (keyCode === keyCodes.ENTER && !shift && !ctrl):
        content = this.state.filteredContents[this.state.contentIndex];

        this.callAction(content);
        break;
      case (keyCode === keyCodes.UP && !shift && !ctrl):
        event.preventDefault();
        contentIndex = this.state.contentIndex - 1;
        if (contentIndex < 0) {
          contentIndex = this.state.filteredContents.length - 1;
        }
        this.setState({ contentIndex });
        break;
      case (keyCode === keyCodes.DOWN && !shift && !ctrl):
        event.preventDefault();
        contentIndex = this.state.contentIndex + 1;
        if (contentIndex > this.state.filteredContents.length - 1) {
          contentIndex = 0;
        }
        this.setState({ contentIndex });
        break;
      case (keyCode === keyCodes.ESC && !shift && !ctrl):
        hideLauncher();
        break;
      default:
        break;
    }
  }

  onChangeInput(event) {
    const value = event.target.value;
    const filteredContents = Launcher._filterContents(this.props.contents, value);

    this.setState({ value, filteredContents });
  }

  callAction(content) {
    if (this.state.filteredContents.length === 0) {
      return;
    }

    switch (content.type) {
      case (launcherContentTypes.TODO):
        this._createTodo(content.id);
        break;
      case (launcherContentTypes.TODO_CATEGORY):
        this._createTodoCategory();
        break;
      case (launcherContentTypes.PAGE):
        this._movePage(content.href);
        break;
      default:
        break;
    }
  }

  _stopPropagation(event) {
    event.stopPropagation();
  }

  _createTodo(categoryId) {
    hideLauncher();
    changePage(pages.TODOS);
    createTodo('', categoryId);
  }

  _createTodoCategory() {
    hideLauncher();
    changePage(pages.TODO_CATEGORIES);
    createTodoCategory('');
  }

  _movePage(page) {
    hideLauncher();
    changePage(page);
  }

  _createContentItemElement(content, index) {
    const isSelected = (this.state.contentIndex === index);

    return (
      <LauncherListItem
        key={ `content-${index}` }
        content={ content }
        isSelected={ isSelected }
        callAction={ this.callAction }
      />
    );
  }

  _createNoResultItem() {
    return [(
      <li
        key="launcher-list-item-no-results"
        className="list-item"
      >
        <div className="list-item-text">No results</div>
      </li>
    ),];
  }

  static _filterContents(contents, searchText) {
    const filteredContents = contents.concat();
    const searchWords = searchText.split(' ');

    searchWords.forEach(searchWord => {
      filteredContents.forEach((content, index) => {
        if (content && content.text.toUpperCase().indexOf(searchWord.toUpperCase()) === -1) {
          filteredContents.splice(index, 1, false);
        }
      });
    });

    return filteredContents.filter(el => Boolean(el));
  }

  render() {
    let contentElements;

    if (this.state.filteredContents.length !== 0) {
      contentElements = this.state.filteredContents.map(
        (content, index) => this._createContentItemElement(content, index)
      );
    } else {
      contentElements = this._createNoResultItem();
    }

    return (
      <div
        className="launcher-background"
        onClick={ hideLauncher }
      >
        <div className="launcher-list-container">
          <section className="list">
            <header>
              <input
                autoFocus
                placeholder="Search shortcut"
                type="text"
                onClick={ this._stopPropagation }
                onKeyDown={ this.onKeyDownInput }
                onChange={ this.onChangeInput }
                value={ this.state.value }
              />
            </header>
            <ul>{ contentElements }</ul>
          </section>
        </div>
      </div>
    );
  }
}

Launcher.propTypes = LauncherPropTypes;


const LauncherListItemPropTypes = {
  content: React.PropTypes.object.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  callAction: React.PropTypes.func.isRequired,
};
class LauncherListItem extends Component {
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
        className={ classNames('list-item', { 'list-item__selected': this.props.isSelected }) }
        onClick={ this.onClickItem }
      >
        <div className="list-item-text">
          { this.props.content.text }
        </div>
      </li>
    );
  }
}

LauncherListItem.propTypes = LauncherListItemPropTypes;
