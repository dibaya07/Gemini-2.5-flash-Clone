import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AuthForm from "./components/authForm";
import Home from "./components/Home";


function App() {

  const router = createBrowserRouter([
        { path: "/", element: <Home /> },
        // { path: "/authForm", element: <AuthForm/>},
      ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  );
}

export default App;

