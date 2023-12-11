export const BASE_API_URL = {
  LOCAL: `http://localhost:4000/api/v1`,
  DEV: "https://base-url.dev/api/v1",
  INT: "https://base-url.int/api/v1",
  PROD: "https://base-url.pro/api/v1",
};

export const PATHS_NAMES_REGEX = {
  artistaId: "<<artistaId>>",
  albumId: "<<albumId>>",
};

export const API_URL = {
  urSimple: `/artistas`,
  urlConPath: `/artistas/${PATHS_NAMES_REGEX.artistaId}`,
  urlConPaths: `/artistas/${PATHS_NAMES_REGEX.artistaId}/albums/${PATHS_NAMES_REGEX.albumId}`,
  urlConQuery: `/artistas/${PATHS_NAMES_REGEX.artistaId}/albums/list`,
};

export const formatApiUrlPathParam = (url, id, pathParam) => {
  return url.replace(id, pathParam);
};
