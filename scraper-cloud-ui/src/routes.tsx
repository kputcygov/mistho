import { useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { App } from "./App";
import { RunManager } from "./components/RunManager/RunManager";

export default function Router() {
  let element = useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: "", element: <App /> },
        { path: "runs", element: <RunManager /> }
      ]
    }
  ]);

  return element;
}
