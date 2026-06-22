import { RouterProvider } from "react-router-dom";
import router from "./app/Routes/router";
import { useAppDispatch } from "./app/hooks/useAppDispatch";
import { useEffect } from "react";
import { quickLogin } from "./features/profile/userThunk";
import { useAppSelector } from "./app/hooks/useAppSelector";
import {
  repairAdmin,
  repairsUser,
} from "./features/profile/repairs/repairThunk";

function App() {
  const dispatch = useAppDispatch();
  const { user, initialized } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(quickLogin());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id && initialized) {
      if (user.role === "user") {
        dispatch(repairsUser(user.id));
      } else if (user.role === "admin") dispatch(repairAdmin());
    }
  }, [dispatch, user?.id, user?.role, initialized]);

  return <RouterProvider router={router} />;
}

export default App;
