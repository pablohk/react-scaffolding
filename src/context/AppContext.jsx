import React, { createContext, useContext, useReducer } from "react";
import * as ACTIONS from "./actions";
import { initialState } from "./AppContextInitState";

const AppContext = createContext({ state: initialState, dispatch: () => null });

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_INACTIVE:
      return {
        ...state,
        inactive: action.data,
      };
    case ACTIONS.SET_SHOW_ERROR_MODAL:
      return {
        ...state,
        showError: action.data,
      };
    case ACTIONS.SET_USER_PROFILING:
      return {
        ...state,
        userProfiling: action.data,
      };

    default:
      return state;
  }
};
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
