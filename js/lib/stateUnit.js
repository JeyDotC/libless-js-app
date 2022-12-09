export function localStorageScope(localStorageKey) {
  return ([getValue, setValue, onValue]) => {
    
    const storedValue = localStorage.getItem(localStorageKey);

    if(storedValue !== null){
      const retrievedValue = JSON.parse(storedValue);
      setValue(retrievedValue);
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(getValue()))
    }

    onValue(
      newValue => localStorage.setItem(localStorageKey, JSON.stringify(newValue)),
      { priority: 'low' }
    );
  };
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
    if(!allowRefresh && value === newValue){
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
    if(handlers === undefined){
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

  if(scope !== undefined) {
    scope(unit);
  }

  return unit;
}