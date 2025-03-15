import { createContext, useEffect, useReducer } from "react";
export const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
  }
}
export function AuthContextProvider({ children }) {
  const [auth, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log("🚀 ~ AuthContextProvider ~ auth:", auth);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth"));
    if (user) {
      dispatch({ type: "login", payload: user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
