import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Root from "./routes/root";
import App from "./routes/add/App";
import Game from "./routes/game/Game";


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
    path: "game",
    element: <Game />,
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

