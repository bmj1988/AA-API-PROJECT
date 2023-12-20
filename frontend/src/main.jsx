import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';
import { restoreCSRF, csrfFetch } from './store/crsf';
import * as sessionActions from './store/session'
import { ModalProvider, Modal } from './context/Modal';
import { SearchProvider } from './context/Search';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <SearchProvider>
        <Provider store={store}>
          <App />
          <Modal />
        </Provider>
      </SearchProvider>
    </ModalProvider>
  </React.StrictMode>
);
