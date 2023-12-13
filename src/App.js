import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { SET_SHOW_ERROR_MODAL } from "./context/actions";
import { useAppContext } from "./context/AppContext";

const ModalError = () => {
  const { dispatch } = useAppContext();
  const closeModal = () => {
    dispatch({
      type: SET_SHOW_ERROR_MODAL,
      data: false,
    });
  };
  return (
    <div style={{
      position: "absolute", 
      backgroundColor: '#80808052', 
      width: '90%', 
      height: '90%',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'}}>
      <p>ESTO ES UN MODAL DE ERROR</p>
      <button onClick={closeModal}>Cerrar Modal</button>
    </div>
  );
};

const App = () => {
  const { state } = useAppContext();
  const { showError } = state;
  const [showModal, setShowModal] = useState(showError);

  useEffect(() => {
    setShowModal(showError);
  }, [showError]);

  return (
    <>
      {showModal && <ModalError />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
