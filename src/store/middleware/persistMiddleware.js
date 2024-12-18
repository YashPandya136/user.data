export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save auth state to localStorage whenever it changes
  const state = store.getState();
  if (state.auth) {
    localStorage.setItem('authState', JSON.stringify(state.auth));
  }
  
  return result;
};
