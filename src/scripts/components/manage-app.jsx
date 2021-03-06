import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import config from '../../config';
import {
  pages,
  keyCodes,
} from '../constants/constants';
import Header from './header';
import Launcher from './launcher';
import TodosPage from './todos-page';
import MenuPage from './menu-page';
import TodoCategoriesPage from './todo-categories-page';
import { getLauncherContents } from '../utils/get-launcher-contents';
import SettingsPage from './settings-page';


const propTypes = {
  appStore: React.PropTypes.object.isRequired,
};

export default class ManageApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appStore: this.props.appStore,
    };

    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    this.props.appStore.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    this.props.appStore.removeChangeListener(this.updateState);
  }

  _updateState() {
    this.setState({
      appStore: this.props.appStore,
    });
  }

  _changeTitle(title) {
    document.title = `${title} | ${config.name}`;
  }

  _createPageElement() {
    const page = this.state.appStore.getPage();
    const title = this.state.appStore.getTitle();

    let todos = [];
    let todoCategories = [];

    this._changeTitle(title);

    switch (page) {
      case (pages.TODOS):
        todos = this.state.appStore.todoStore.getTodos();

        return (
          <section key={ page } className="page-container">
            <Header page={ page } />
            <TodosPage page={ page } todos={todos} />
          </section>
        );
      case (pages.MENU):
        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <MenuPage page={page} />
          </section>
        );
      case (pages.TODO_CATEGORIES):
        todoCategories = this.props.appStore.todoCategoryStore.getTodoCategories();

        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <TodoCategoriesPage page={page} todoCategories={todoCategories} />
          </section>
        );
      case (pages.SETTINGS):
        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <SettingsPage page={page} />
          </section>
        );
      default:
        return (
          <section key={ page } className="page-container">
            <Header page={ page } position="bottom" />
            <div>404</div>
          </section>
        );
    }
  }

  render() {
    const page = this.state.appStore.getPage();
    const pageElement = this._createPageElement();

    // Ref _transition.sass
    const transitionOptions = {
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300,
    };

    const transitionVariations = {
      fadeInOut: {
        enter: 'fade-in',
        leave: 'fade-out',
      },
      slideInOut: {
        enter: 'slide-in',
        leave: 'slide-out',
      },
      slideUpDown: {
        enter: 'slide-up',
        leave: 'slide-down',
      },
    };

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={ transitionVariations.fadeInOut }
          { ...transitionOptions }
        >
          { (
            page === pages.MENU
          ) ? pageElement : null }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={ transitionVariations.slideInOut }
          { ...transitionOptions }
        >
          { (
            page === pages.TODO_CATEGORIES ||
            page === pages.SETTINGS
          ) ? pageElement : null }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={ transitionVariations.slideUpDown }
          { ...transitionOptions }
        >
          { (
            page === pages.TODOS
          ) ? pageElement : null }
        </ReactCSSTransitionGroup>

        <Launcher
          contents={ getLauncherContents() }
        />
      </div>
    );
  }
}

ManageApp.propTypes = propTypes;
