import { RouterProvider } from "react-router-dom";
import router from "./app/Routes/router";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import { useEffect } from "react";
import { quickLogin, repairsUser } from "./features/profile/userThunk";
import Cookies from "js-cookie";
import { useAppSelector } from "./app/hooks/useAppSelector";

function App() {
  const dispatch = useAppDispatch();
  const { user, initialized } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      dispatch(quickLogin());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.id && initialized) {
      dispatch(repairsUser(user.id));
    }
  }, [dispatch, user?.id, initialized]);

  return <RouterProvider router={router} />;
}

export default App;
