import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BackendApiEndpoint } from "./hooks/useBackendApi.js";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import { useContext, useMemo } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
function App() {
  const { user } = useContext(AuthContext);
  const isUseroggedIn = useMemo(
    () => (user && user?.token ? true : false),
    [user]
  );
  return (
    <BackendApiEndpoint.Provider value="http://localhost:4000">
      <div className="App">
        <div className="pages">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={isUseroggedIn ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!isUseroggedIn ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!isUseroggedIn ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </BackendApiEndpoint.Provider>
  );
}

export default App;
