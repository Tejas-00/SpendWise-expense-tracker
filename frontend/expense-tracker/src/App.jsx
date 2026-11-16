import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import {Toaster} from "react-hot-toast"
import { backendWarmupPromise, retryBackendWarmup } from "./utils/axiosInstance.js"

const App = () => {
  const [backendStatus, setBackendStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    backendWarmupPromise.then((isReady) => {
      if (isMounted) {
        setBackendStatus(isReady ? "ready" : "error");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = async () => {
    setBackendStatus("loading");
    const isReady = await retryBackendWarmup();
    setBackendStatus(isReady ? "ready" : "error");
  };

  return (
    <UserProvider>
      {backendStatus === "loading" ? (
        <BackendLoadingScreen />
      ) : backendStatus === "error" ? (
        <BackendUnavailableScreen onRetry={handleRetry} />
      ) : (
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
      )}

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

const BackendLoadingScreen = () => (
  <main
    className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center"
    role="status"
    aria-live="polite"
  >
    <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
    <h1 className="text-xl font-semibold text-gray-900">Starting SpendWise</h1>
    <p className="mt-2 max-w-md text-sm text-gray-600">
      Waking up the server. Please wait 10-20 seconds while we connect.
    </p>
  </main>
)

const BackendUnavailableScreen = ({ onRetry }) => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
    <h1 className="text-xl font-semibold text-gray-900">Unable to connect</h1>
    <p className="mt-2 max-w-md text-sm text-gray-600">
      We couldn't reach the server. Please check your connection and try again.
    </p>
    <button className="btn-primary mt-5 max-w-xs" onClick={onRetry}>
      Retry
    </button>
  </main>
)

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