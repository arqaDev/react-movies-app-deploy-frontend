import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import MoviesStore from './store/MoviesStore'


interface IContext {
  user: UserStore;
  movies: MoviesStore
}

export const Context = createContext<IContext>({} as IContext)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    movies: new MoviesStore()
  }}>
    <App />
  </Context.Provider>
);
