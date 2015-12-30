import React, { Component } from 'react';

import {
  editTodo,
  updateTodo,
  deleteTodo,
} from '../actions/todo-action-creators';
import { keyCodes } from '../constants/constants';


export default class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo.text,
    };
  }

  onClickDeleteButton() {
    deleteTodo(this.props.todo.id);
  }

  onChangeInput(event) {
    this.setState({
      value: event.target.value,
    });
  }

  onKeyDownInput(event) {
    const keyCode = event.keyCode;

    if (keyCode === keyCodes.ENTER) {
      this.save();
    }
  }

  onClickLabel() {
    editTodo(this.props.todo.id);
  }

  save() {
    const todo = this.props.todo;

    updateTodo(todo.id, this.state.value);
  }

  render() {
    const todo = this.props.todo;
    let itemContent;

    if (todo.isEditing) {
      itemContent = (
        <input
          autoFocus
          value={ this.state.value }
          onChange={ this.onChangeInput.bind(this) }
          onKeyDown={ this.onKeyDownInput.bind(this) }
          onBlur={ this.save.bind(this) }
        />
      );
    } else {
      if (todo.schedule) {
        const schedule = todo.schedule;

        itemContent = (
          <label
            onClick={ this.onClickLabel.bind(this) }
          >
            <span>{schedule.year}/{schedule.month}/{schedule.date}({schedule.shortDayName}.)</span>
            { todo.scheduleText }
          </label>
        );
      } else {
        itemContent = (
          <label
            draggable
            onClick={ this.onClickLabel.bind(this) }
            onDrag={ this.props._onDragStart }
            onDragEnter={ this.props._onDragEnter }
            onDragEnd={ this.props._onDragEnd }
          >
            { todo.text }
          </label>
        );
      }
    }

    return (
      <li key={todo.id} >
        { itemContent }
        <span className="done-button">[DONE]</span>
        <span onClick={ this.onClickDeleteButton.bind(this) }>[DELETE]</span>
      </li>
    );
  }
}

TodoListItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  _onDragStart: React.PropTypes.func,
  _onDragEnter: React.PropTypes.func,
  _onDragEnd: React.PropTypes.func,
};
