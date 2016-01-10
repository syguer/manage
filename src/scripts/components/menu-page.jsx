import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage } from '../actions/app-action-creators';
import Header from './header';
import PageBackButton from './page-back-button';


export default class MenuPage extends Component {
  render() {
    const page = this.props.page;

    return (
      <section className="page menu-page">
        <section className="page-content">
          <PageBackButton />
          <ul className="menu-list">
            <li className="menu-list-item" onClick={ changePage.bind(this, pages.TODO_CATEGORIES) }>Show todo categories</li>
            <li className="menu-list-item" onClick={ changePage.bind(this, pages.SETTINGS) }>Settings</li>
          </ul>
        </section>
        <Header page={ page } position="bottom" />
      </section>
    );
  }
}

MenuPage.propTypes = {
  page: React.PropTypes.string.isRequired,
};
