import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useUser } from "@hooks/useUser";
import { ChatProvider } from "@providers/ChatProvider";

import Register from "@pages/auth/Regitster";
import Login from "@pages/auth/Login";
import Dashboard from "@pages/Dashboard";

function App() {
  const { token } = useUser();

  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to="/register" />
            }
          />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
