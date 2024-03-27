import { createContext, useContext, useReducer } from "react";
import { getUserSession } from "../api/User";

const AuthContext = createContext();
const AuthDispatchContext = createContext();

let inituser = getUserSession();

function AuthReducer(user, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...user, isAuthenticated: true };
    case "LOGOUT":
      return { ...user, isAuthenticated: false };
    default:
      return user;
  }
}

function useAuthState() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(AuthReducer, {
    user: inituser,
    isAuthenticated: false,
  });

  return (
    <AuthContext.Provider value={{ user }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export {
  AuthProvider,
  AuthContext,
  AuthReducer,
  useAuthState,
  useAuthDispatch,
};
