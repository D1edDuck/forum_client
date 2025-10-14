import { RouterProvider } from "react-router-dom";
import router from "./app/router";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import { useEffect } from "react";
import { quickLogin } from "./features/profile/userThunk";
import Cookies from "js-cookie";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      dispatch(quickLogin());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
