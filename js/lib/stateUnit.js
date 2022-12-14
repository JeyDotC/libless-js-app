/**
 * 
 * @param {Storage} storage 
 * @param {string} key 
 * @returns {Function}
 */
function storeAt(storage, key) {
  return ([getValue, setValue, onValue]) => {

    const storedValue = storage.getItem(key);

    if (storedValue !== null) {
      const retrievedValue = JSON.parse(storedValue);
      setValue(retrievedValue);
    } else {
      storage.setItem(key, JSON.stringify(getValue()))
    }

    onValue(
      newValue => storage.setItem(key, JSON.stringify(newValue)),
      { priority: 'low' }
    );
  };
}

export function localStorageScope(localStorageKey) {
  return storeAt(localStorage, localStorageKey);
}

export function sessionStorageScope(sessionStorageKey) {
  return storeAt(sessionStorage, sessionStorageKey);
}

/**
 * @param {string} key
 * @param {{ causesNavigation: boolean }} [options={ causesNavigation: false }] 
 */
export function searchParamsScope(key, { causesNavigation } = { causesNavigation: false }) {
  return ([getValue, setValue, onValue]) => {
    const currentUri = new URL(location);
    const storedValue = currentUri.searchParams.get(key);

    if (storedValue !== null) {
      setValue(storedValue);
    } else {
      currentUri.searchParams.set(key, getValue());
      if (causesNavigation) {
        location.href = currentUri.toString();
      } else {
        history.pushState('', '', currentUri);
      }
    }

    window.addEventListener('popstate', () => setValue(new URL(location).searchParams.get(key) || '/'))

    onValue(
      newValue => {
        const uri = new URL(location);
        uri.searchParams.set(key, newValue);
        if (causesNavigation) {
          location.href = uri.toString();
        } else {
          history.pushState('', '', uri);
        }
      },
      { priority: 'low' }
    );
  }
}

/**
 * @template T
 * @callback Get
 * @returns {T}
 * 
 * @callback Set
 * @param {T} newValue
 * 
 * @callback HandleOnChange
 * @param {T} newValue
 * @param {T} oldValue
 * 
 * @callback OnChange
 * @param {HandleOnChange<T>} changeHandler
 * @param {{ priority: 'high'|'medium'|'low'}} [options]
 */

/**
 * @template T
 * 
 * @param {T} initialValue 
 * @param {{ scope: Function, allowRefresh: boolean }} [options={}] 
 * @returns {[Get<T>, Set<T>, OnChange<T>]}
 */
export function stateUnit(initialValue, { scope, allowRefresh = false } = {}) {
  let value = initialValue;

  const valueChangedHandlers = {
    high: [],
    medium: [],
    low: [],
  };

  const getValue = () => value;

  const setValue = (newValue) => {
    if (!allowRefresh && value === newValue) {
      return;
    }
    const oldValue = value;
    value = newValue;
    const executeHandler = h => h(newValue, oldValue);
    valueChangedHandlers.high.forEach(executeHandler);
    valueChangedHandlers.medium.forEach(executeHandler);
    valueChangedHandlers.low.forEach(executeHandler);
  };

  const onValue = (valueChangedHandler, { priority = 'medium' } = {}) => (valueChangedHandlers[priority] || valueChangedHandlers.medium).push(valueChangedHandler);
  const removeOnValueHandler = (valueChangedHandler, { priority = 'medium' } = {}) => {
    const p = priority || 'medium';
    /**
     * @type {Function[]|undefined}
     */
    const handlers = valueChangedHandlers[p];
    if (handlers === undefined) {
      return;
    }

    valueChangedHandlers[p] = handlers.filter(h => h !== valueChangedHandler);
  };

  const unit = [
    getValue,
    setValue,
    onValue,
    removeOnValueHandler,
    valueChangedHandlers,
  ];

  if (scope !== undefined) {
    scope(unit);
  }

  return unit;
}