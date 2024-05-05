import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Intro} from "./pages/Intro.jsx";
import {NotFoundPage, NowPlayingMovies, PopularMovies, TopRatedMovies, UpcomingMovies} from "./pages/Movies.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Intro/>
      },
      {
        path:"/*",
        element: <NotFoundPage/>
      },
      {
        path: "/popular",
        element: <PopularMovies/>
      },
      {
        path: "/nowplaying",
        element: <NowPlayingMovies/>
      },
      {
        path: "/toprated",
        element: <TopRatedMovies/>
      },
      {
        path: "/upcoming",
        element: <UpcomingMovies/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
