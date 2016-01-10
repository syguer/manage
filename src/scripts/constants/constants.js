export const keyCodes = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  K: 75,
};

export const pages = {
  TODOS: 'TODO_PAGE',
  TODO_CATEGORIES: 'TODO_CATEGORIES_PAGE',
  MENU: 'MENU_PAGE',
  SETTINGS: 'SETTINGS_PAGE',
};

export const EVENT_CHANGE = 'CHANGE_STORE';

export const actionTypes = {
  // FOR_APP
  BACK_PAGE: 'BACK_PAGE',
  CHANGE_PAGE: 'CHANGE_PAGE',
  GET_LAUNCHER_CONTENTS: 'GET_LAUNCHER_CONTENTS',
  SHOW_LAUNCHER: 'SHOW_LAUNCHER',
  HIDE_LAUNCHER: 'HIDE_LAUNCHER',
  // FOR_TODO
  GET_ALL_TODOS: 'GET_ALL_TODOS',
  CREATE_TODO: 'CREATE_TODO',
  COMPLETE_TODO: 'COMPLETE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  // FOR_TODO_CATEGORY
  GET_ALL_TODO_CATEGORIES: 'GET_ALL_TODO_CATEGORIES',
  CREATE_TODO_CATEGORY: 'CREATE_TODO_CATEGORY',
  EDIT_TODO_CATEGORY: 'EDIT_TODO_CATEGORY',
  UPDATE_TODO_CATEGORY: 'UPDATE_TODO_CATEGORY',
  DELETE_TODO_CATEGORY: 'DELETE_TODO_CATEGORY',
};

export const initialTodoCategoryNames = {
  TODAY: 'TODAY',
  LATER: 'LATER',
  SCHEDULE: 'SCHEDULE',
};

export const launcherContentTypes = {
  TODO: 'LAUNCHER_ITEM_TYPES_TODO',
  TODO_CATEGORY: 'LAUNCHER_ITEM_TYPES_TODO_CATEGORY',
  PAGE: 'LAUNCHER_ITEM_TYPES_PAGE',
};
