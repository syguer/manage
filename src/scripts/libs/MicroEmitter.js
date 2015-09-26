export default class MicroEmitter {
  constructor() {
    this._listeners = {};
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @param {Boolean} isOnce
   */
  _addListener(type, listener, isOnce) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push({ listener: listener, isOnce: isOnce });
    return this;
  }

  /**
   * Adds a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  addListener(type, listener) {
    return this._addListener(type, listener, false);
  }

  /* Alias of addListener */
  on(type, listener) {
    return this.addListener(type, listener);
  }

  addOnceListener(type, listener) {
    return this._addListener(type, listener, true);
  }

  /* Alias of addOnceListener */
  once(type, listener) {
    return this.addOnceListener(type, listener);
  }

  /**
   * Removes a listener function to the specified event.
   * @param {String} type
   * @param {Function} listener
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  removeListener(type, listener) { // alias
    if (!this._listeners[type].length) return this;
    for (let i = 0; i < this._listeners[type].length; i++) {
      if (this._listeners[type][i].listener === listener) this._listeners[type].splice(i, 1);
    }
    return this;
  }

  /* Alias of removeListener */
  off(type, listener) {
    return this.removeListener(type, listener);
  }

  /**
   * Emits an specified event.
   * @param {String} type
   * @param {Object} payload
   * @return {Object} Current instance of MicroEmitter for chaining.
   */
  emit(type, payload) {
    if (!this._listeners[type]) return this;
    for (let i = 0; i < this._listeners[type].length; i++) {
      this._listeners[type][i].listener.apply(this, [payload]);
      if (this._listeners[type][i].isOnce) this._listeners[type].splice(i, 1);
    }
    return this;
  }

  /* Alias of emit */
  dispatch(type, payload) {
    return this.emit(type, payload);
  }

  /* Alias of emit */
  trigger(type, payload) {
    return this.emit(type, payload);
  }
}