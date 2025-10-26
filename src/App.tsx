import { RouterProvider } from "react-router-dom";
import router from "./app/Routes/router";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import { useEffect } from "react";
import { quickLogin } from "./features/profile/userThunk";
import Cookies from "js-cookie";
import { useAppSelector } from "./app/hooks/useAppSelector";
import {
  repairAdmin,
  repairsUser,
} from "./features/profile/repairs/repairThunk";

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
      if (user.role === "user") {
        dispatch(repairsUser(user.id));
      } else dispatch(repairAdmin());
    }
  }, [dispatch, user?.id, user?.role, initialized]);

  return <RouterProvider router={router} />;
}

export default App;
