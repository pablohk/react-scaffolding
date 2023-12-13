import axios from "axios";
import { BASE_API_URL} from './endpoints';

const ENVIRONMENT = process.env.REACT_APP_ENV;

/** Para llamadas a APIs públicas, que no necesitan autenticación */
const publicInstance = axios.create({
  baseURL: BASE_API_URL[ENVIRONMENT],
});

/** Para llamadas a APIs privadas, que requieren autenticación */
const privateInstance = axios.create({
  baseURL: BASE_API_URL[ENVIRONMENT],
  withCredentials: true,
});

/** Para llamadas a APIs privadas. En este caso se usará cuando tengamos las urls de JSON HATEOAS */
const privateCustomInstance = axios.create({
   // HABILITARLO CUANDO SE USE CON LA API DE PIH
   // DESABILIATDO para pruebas con la pokeapi
  // withCredentials: true,
});

/** Interceptor para las respuestas de llamadas a APIs públicas */
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

/** Interceptor para las peticiones de llamadas a APIs privadas
 * Se gestionará la inyección del token y demás parámetros de las cabeceras
 */

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

/** Interceptor para las respuestas de llamadas a APIs privadas
 * Se gestionará los refrescos del token y la gestión de errores
 */
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

/** Interceptor para las respuestas de llamadas a APIs privadas cuando tengamos las urls absolutas.
 * Urls obtenidas de JSON HATEOAS 
 * Se gestionará los refrescos del token y la gestión de errores
 */
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

/**
 * Función para la gestión de errores
 * @param {*} error Objeto error devuelto por el servicio llamado
 * @returns EL error formateado según lógica de negocio
 */
const handleOtherErrors = (error) => {
  // Logica negocio para manejar el resto de errores: 400, 500, etc..
  // Setear en el store / contexto para levantar un modal de error, etc...
  return Promise.reject(error.response.data);
};

/**
 * Función para el proceso de refrescar el token
 * @param {*} originalConfig Parámetros de la llamada original que falló por token exirado
 * @returns O la respuesta al servicio una vez refrescado el token o un error, si lo ha habido
 */
const refreshToken = async (originalConfig) => {
  originalConfig._retry = true;
  try {
    const rs = await privateInstance.post("/auth/refreshtoken", {
      refreshToken: "TokenService.getLocalRefreshToken()", // ->> refresh
    });

    const { accessToken } = rs.data;
    //   TokenService.updateLocalAccessToken(accessToken);  ->> Actualizar el token

    return privateInstance(originalConfig);
  } catch (_error) {
    return Promise.reject(_error);
  }
};

export { publicInstance, privateInstance, privateCustomInstance };
