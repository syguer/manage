import appDispatcher from '../dispatchers/app-dispatcher';
import todoStorage from '../storages/todo-storage';
import { actionTypes as types } from '../constants/constants';

export function createTodo(text, categoryId) {
  const entity = todoStorage.create({
    text,
    categoryId,
  });

  appDispatcher.emit(types.CREATE_TODO, entity);
}

export function completeTodo(id) {
  const todo = todoStorage.get(id);
  const entity = todoStorage.update(todo.id, {
    completed: !todo.completed,
  });

  appDispatcher.emit(types.COMPLETE_TODO, entity);
}

export function editTodo(id, text) {
  const todo = todoStorage.get(id);
  const entity = todoStorage.update(todo.id, { text });

  appDispatcher.emit(types.EDIT_TODO, entity);
}

export function deleteTodo(id) {
  todoStorage.destroy(id);
  appDispatcher.emit(types.DELETE_TODO, { id });
}
