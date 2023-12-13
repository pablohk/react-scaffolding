export const BASE_API_URL = {
  LOCAL: `http://localhost:4000/api/v1`,
  DEV: "https://base-url.dev/api/v1",
  INT: "https://base-url.int/api/v1",
  PROD: "https://base-url.pro/api/v1",
};

export const END_POINTS_NAMES = {
  urSimple: 'urSimple',
  urlConPaths: 'urlConPaths',
  pokemonTest: 'pokemonTest'
}

const PATHS_NAMES_REGEX = {
  artistaId: "<<artistaId>>",
  albumId: "<<albumId>>",
};

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

export const getEndpoint = (endpointName, pathParamsValues = null) => {
  const { url, pathNames } = END_POINTS_CONFIG[endpointName];
  return formattedEndpoint(url, pathNames, pathParamsValues);
};

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
