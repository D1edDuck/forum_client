import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import Modal from "./UI/Modal/Modal.tsx";
import ErrorBoundary from "./UI/ErrorBoundary/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <Modal />
      </ErrorBoundary>
    </Provider>
  </>,
);
