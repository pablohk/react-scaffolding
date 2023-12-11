import { useEffect } from "react";
import { SET_USER_PROFILING, SET_INACTIVE, SET_SHOW_ERROR_MODAL } from "../../context/actions";
import { useAppContext } from "../../context/AppContext";
import { privateInstance } from "../../config/apiCall";
import {
  API_URL,
  PATHS_NAMES_REGEX,
  formatApiUrlPathParam,
} from "../../config/apiCall/endpoints";

const Home = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const url = formatApiUrlPathParam(
      API_URL.urlConPath,
      PATHS_NAMES_REGEX.artistaId,
      111111
    );

    privateInstance
      .get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, []);

  useEffect(() => {
    dispatch({
      type: SET_INACTIVE,
      data: true,
    });
  }, [dispatch]);

  useEffect(() => {
    const newData = {
      radicalList: [333, 555],
      radicalCli: "aaaaaaaa",
      radicalId: "",
      radicalInvestment: "sdfasdf",
      jurisdiction: "",
      nombre: "",
      apellido: "",
      descriptionName: "",
      tipges: "",
    };
    dispatch({
      type: SET_USER_PROFILING,
      data: newData,
    });
  }, [dispatch]);

  console.log("---Home state: ", state);
  const handleClick = () => {
    dispatch({
      type: SET_SHOW_ERROR_MODAL,
      data: true,
    });
  }
  return (
    <>
      <p>Helllo World!!!</p>
      <button onClick={handleClick}>Mostrar Error</button>
    </>
  );
};

export default Home;
