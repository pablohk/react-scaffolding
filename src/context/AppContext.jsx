import React, { createContext, useContext, useReducer } from "react";
import * as ACTIONS from "./actions";
import { initialState } from "./AppContextInitState";

/** Manejo centralizado de los contextos usados en la aplicación.
 * Sigue una filosofía parecida a gestores del estado de una aplicación, como puede ser Redux
 * Proporciona las herramienras necesarias para trabajar con los contextos en los componentes React:
 *   - Recuperar el contexto requerido almacenado en el state.
 *   - Modificar el valor de un contexto por medio de un dispatcher y su action
*/

const AppContext = createContext({ state: initialState, dispatch: () => null });

/** Acciones que se pueden dispatchear para modificar los contextos */
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
    case ACTIONS.SET_USER_AUTH:
      return {
        ...state,
        userAuth: action.data,
      };

    default:
      return state;
  }
};

/** HOC que habilita el manejo de los contextos */
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**Hook personalizado para el manejo de los contextos */
const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
