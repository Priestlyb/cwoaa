import { createContext, useEffect, useReducer, useRef } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const logoutTimerRef = useRef(null);

  const resetLogoutTimer = () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user"); // optional
    }, 86400000); // 1 day
  };

  useEffect(() => {
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    if (state.user) {
      // Attach listeners
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach(event =>
        window.addEventListener(event, resetLogoutTimer)
      );

      resetLogoutTimer(); // start the timer on login

      return () => {
        // Cleanup
        events.forEach(event =>
          window.removeEventListener(event, resetLogoutTimer)
        );
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      };
    }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
