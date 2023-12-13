import { useState, useEffect } from "react";
import {
  SET_USER_PROFILING,
  SET_INACTIVE,
  SET_SHOW_ERROR_MODAL,
} from "../../context/actions";
import { useAppContext } from "../../context/AppContext";
import { END_POINTS_NAMES } from "../../config/apiCall/endpoints";
import { useAxiosREST } from "../../Hooks/useAxiosREST";

const Home = () => {
  const { state, dispatch } = useAppContext();
  const [data, setData] = useState();

  // const {
  //   fetchResponse: homeData,
  //   fetchError: homeError,
  //   fetchLoading: homeLoading,
  // } = useAxiosREST({
  //   isPublicInstance: true,
  //   method: "post",
  //   endpoint: { name: END_POINTS_NAMES.urlConPaths, pathValues: [1, 2] },
  //   headers: {bb:7777},
  //   body:{ggg:666},
  //   params: {a:2000, b:'sdsd'},
  // });

  const {
    fetchResponse: homeData,
    fetchError: homeError,
    fetchLoading: homeLoading,
  } = useAxiosREST({
    isCustomInstance: true,
    method: "get",
    endpoint: { name: 'https://pokeapi.co/api/v2/pokemon/ditto'},
  });

  useEffect(() => {
    if (homeData !== null) {
      setData(homeData);
    }
  }, [homeData]);

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

  const handleClick = () => {
    dispatch({
      type: SET_SHOW_ERROR_MODAL,
      data: true,
    });
  };

  console.log("---Home state: ", state);

  return (
    <>
      <p>Helllo World!!!</p>
      <button onClick={handleClick}>Mostrar Error</button>
      <p>Loading: {homeLoading + ''}</p>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error:{JSON.stringify(homeError)}</p>
    </>
  );
};

export default Home;
