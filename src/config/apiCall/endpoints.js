/** Path base a usar en las llamadas a los servicios en función del entorno donde se despliegue la aplicación */
export const BASE_API_URL = {
  LOCAL: `http://localhost:4000/api/v1`,
  DEV: "https://base-url.dev/api/v1",
  INT: "https://base-url.int/api/v1",
  PROD: "https://base-url.pro/api/v1",
};

/** IDs de los endpoints */
export const END_POINTS_NAMES = {
  urSimple: 'urSimple',
  urlConPaths: 'urlConPaths',
  pokemonTest: 'pokemonTest'
}

/** Claves de los path params que se pone en las plantillas de los endpoint.
 * Luego serán sustiuidos por su valor correspondiente al formatear dicha plantilla
 */
const PATHS_NAMES_REGEX = {
  artistaId: "<<artistaId>>",
  albumId: "<<albumId>>",
};

/** Endpoints disponibles para su consumo.
 * Contiene las plantillas del endpoint y las claves de los path params
 */
const END_POINTS_CONFIG = {
  [END_POINTS_NAMES.urSimple]: {
    url: `/artistas`,
  },
  [END_POINTS_NAMES.urlConPaths]: {
    url: `/artistas/${PATHS_NAMES_REGEX.artistaId}/albums/${PATHS_NAMES_REGEX.albumId}`,
    pathNames: [PATHS_NAMES_REGEX.artistaId, PATHS_NAMES_REGEX.albumId],
  },
  [END_POINTS_NAMES.pokemonTest]:{
    url: '/pokemon/ditto'
  }
};

/**
 * Función que devuele la url formateada correspondiente al endpoint solicidado
 * @param {string} endpointName ID del endpoint a usar
 * @param {Array<string>} pathParamsValues Valores de los path params
 * @returns {string} endpoint formateado con los valores sustiuidos de los path params
 */
export const getEndpoint = (endpointName, pathParamsValues = null) => {
  const { url, pathNames } = END_POINTS_CONFIG[endpointName];
  return formattedEndpoint(url, pathNames, pathParamsValues);
};

/**
 * Sustituye en la plantilla del endpoint los valores de los path params
 * @param {string} url plantilla del endpoint a formatear
 * @param {Array<string>} pathsNames Claves de los path params a sustituir
 * @param {Array<string>} pathsValues Valores de los path params
 * @returns {string} el endpoint formateado o la plantilla del endpoint si no cumple las condiciones fijadasr
 */
const formattedEndpoint = (url, pathsNames, pathsValues) => {
  if (
    pathsValues &&
    pathsValues?.length > 0 &&
    pathsNames?.length > 0 &&
    pathsValues.length === pathsNames.length
  ) {
    return pathsNames.reduce((acc, curr, idx) => {
      return acc.replace(curr, pathsValues[idx]);
    }, JSON.parse(JSON.stringify(url)));
  }
  return url;
};
