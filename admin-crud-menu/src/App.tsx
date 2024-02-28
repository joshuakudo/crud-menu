import React from 'react';
import { ToastContainer } from "react-toastify";
import AppRoutes from './router';

function App() {
  return (
    <div>
      <AppRoutes/>
      <ToastContainer
          toastClassName="rounded-lg bg-black bottom-[6rem]"
          position="bottom-center"
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
