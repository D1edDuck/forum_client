import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import Modal from "./UI/Modal/Modal.tsx";
import Loader from "./UI/Loader/Loader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Modal />
      <Loader />
    </Provider>
  </StrictMode>
);
