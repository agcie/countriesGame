import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Root from "./routes/root";
import App from "./routes/add/App";
import GameConfig from "./routes/game/GameConfig";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "add",
    element: <App />,
  },
  {
    path: "gameconf",
    element: <GameConfig />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

