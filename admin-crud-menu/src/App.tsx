import React from 'react';
import { ToastContainer } from "react-toastify";
import AppRoutes from './router';

function App() {
  return (
    <div className="App">
      <AppRoutes/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </div>
  );
}

export default App;
