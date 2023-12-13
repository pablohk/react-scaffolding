import axios from "axios";
import { BASE_API_URL} from './endpoints';

const ENVIRONMENT = process.env.REACT_APP_ENV;

const publicInstance = axios.create({
  baseURL: BASE_API_URL[ENVIRONMENT],
});

const privateInstance = axios.create({
  baseURL: BASE_API_URL[ENVIRONMENT],
  withCredentials: true,
});

const privateCustomInstance = axios.create({
   // HABILITARLO CUANDO SE USE CON LA API DE PIH
   // DESABILIATDO para pruebas con la pokeapi
  // withCredentials: true,
});

publicInstance.interceptors.response.use(
  (response)=> {
    return response;
  },
  (error) => {
    console.log(error);
    // Logica para manejar el error
    return Promise.reject(error);

  }
);

privateInstance.interceptors.request.use(
  async (config) => {
    // AÑADIR en el HEADER los datos necesarios, authorization, etc...
    const token = "await getToken() para recoger el token de donde proceda";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        return refreshToken(originalConfig);
      }
      if (error.response.status === "ANOTHER_STATUS_CODE") {
        // Do something
        return handleOtherErrors(error);
      }
    }
    return Promise.reject(error);
  }
);

privateCustomInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        return refreshToken(originalConfig);
      }
      if (error.response.status === "ANOTHER_STATUS_CODE") {
        // Do something
        return handleOtherErrors(error);
      }
    }
    return Promise.reject(error);
  }
);
const handleOtherErrors = (error) => {
  // Logica negocio para manejar el resto de errores: 400, 500, etc..
  // Setear en el store / contexto para levantar un modal de error, etc...
  return Promise.reject(error.response.data);
};
const refreshToken = async (originalConfig) => {
  originalConfig._retry = true;
  try {
    const rs = await privateInstance.post("/auth/refreshtoken", {
      refreshToken: "TokenService.getLocalRefreshToken()", // ->> refr
    });

    const { accessToken } = rs.data;
    //   TokenService.updateLocalAccessToken(accessToken);  ->> Actualizar el token

    return privateInstance(originalConfig);
  } catch (_error) {
    return Promise.reject(_error);
  }
};

export { publicInstance, privateInstance, privateCustomInstance };
