import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../src/pages/auth/Login";
import SignUp from "../src/pages/auth/SignUp";
import Home from "../src/pages/Dashboard/Home";
import Income from "../src/pages/Dashboard/Income";
import Expense from "../src/pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <UserProvider>
      <div className='text-xl font-medium text-black'>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOption={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

const Root = () => {
  // check if token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to dashboard if login otherwise to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}

export default App


// Router (or BrowserRouter)
// Wraps your entire app.
// Enables client-side routing (changing pages without refreshing).
// Tracks the URL in the address bar and shows the correct page/component.

// Routes
// A container for all your Routes.
// Think of it as a switchboard: it reads the current URL and matches it to a Route.

// Route
// Defines a URL path and which component should render when that path is visited.