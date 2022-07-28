import MainLayout from "./layouts/MainLayout";
import {App} from "./App";
import {RunManager} from "./components/RunManager";
import {useRoutes} from "react-router-dom";

export default function Router() {
  return useRoutes([
    {
      element: <MainLayout/>,
      children: [
        {path: "", element: <App/>},
        {path: "runs", element: <RunManager/>}
      ]
    }
  ]);
}
