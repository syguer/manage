import assert from 'power-assert';

import { validateByJSONSchema } from '../../src/scripts/json-schemas/json-schema';
import { TODO_STORAGE_SCHEMA } from '../../src/scripts/json-schemas/todo-storage';
import { TODO_CATEGORY_STORAGE_SCHEMA } from '../../src/scripts/json-schemas/todo-category-storage';
import { TODO_STORE_SCHEMA } from '../../src/scripts/json-schemas/todo-store';
import { TODO_CATEGORY_STORE_SCHEMA } from '../../src/scripts/json-schemas/todo-category-store';


describe('validateByJSONSchema', () => {
  // Storage
  it('todoStorage', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
    }, TODO_STORAGE_SCHEMA);

    assert(result.errors.length === 0);
  });

  it('todoCategoryStorage', () => {
    const result = validateByJSONSchema({
      name: '',
      order: 1,
    }, TODO_CATEGORY_STORAGE_SCHEMA);

    assert(result.errors.length === 0);
  });

  // Store
  it('todoStore', () => {
    const result = validateByJSONSchema({
      text: '',
      completed: false,
      categoryId: 'category-id',
      order: 1,
      schedule: null,
      scheduleText: '',
      isEditing: false,
    }, TODO_STORE_SCHEMA);

    assert(result.errors.length === 0);
  });

  it('todoCategoryStore', () => {
    const result = validateByJSONSchema({
      name: '',
      order: 1,
      isEditing: false,
      numberOfTodos: 2,
    }, TODO_CATEGORY_STORE_SCHEMA);

    assert(result.errors.length === 0);
  });
});
