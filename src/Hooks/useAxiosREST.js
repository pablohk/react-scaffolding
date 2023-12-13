import { useState, useEffect } from "react";
import {
  publicInstance,
  privateInstance,
  privateCustomInstance
} from "../config/apiCall/interceptors";
import { getEndpoint } from "../config/apiCall/endpoints";
export const useAxiosREST = ({
  isPublicInstance = false,
  isCustomInstance = false,
  method,
  endpoint,
  headers = null,
  body = null,
  params = null,
}) => {
  const [fetchResponse, setFetchResponse] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchData = () => {
    const privateInst = isCustomInstance ? privateCustomInstance : privateInstance;
    const axiosInstance = isPublicInstance ? publicInstance : privateInst;

    const { name, pathValues } = endpoint;
    const url = isCustomInstance ? name : getEndpoint(name, pathValues);

    axiosInstance({
      method,
      url,
      headers,
      data: body,
      params,
    })
      .then((res) => {
        setFetchResponse(res.data);
      })
      .catch((err) => {
        setFetchError(err);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    isPublicInstance,
    method,
    JSON.stringify(endpoint),
    JSON.stringify(headers),
    JSON.stringify(body),
    JSON.stringify(params),
  ]);

  return { fetchResponse, fetchError, fetchLoading };
};
