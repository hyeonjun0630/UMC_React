import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Intro} from "./pages/Intro.jsx";
import {NowPlayingMovies, PopularMovies, TopRatedMovies, UpcomingMovies} from "./pages/Movies.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import {NotFoundPage} from "./pages/NotFound.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

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
      },
      {
        path: "/movie/:title",
        element: <DetailPage />
      },
      {
        path: "/signup",
        element: <SignUpPage/>
      },
      {
        path: "/login",
        element: <LoginPage/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
