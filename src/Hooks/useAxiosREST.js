import { useState, useEffect } from "react";
import {
  publicInstance,
  privateInstance,
  privateCustomInstance
} from "../config/apiCall/interceptors";
import { getEndpoint } from "../config/apiCall/endpoints";

/**
 * Hook para manejar las llamadas API a los servicios disponibles de la capa back / middle
 * @param {*} param0 Parámetros de configuración para la llamada a la API
 *  - isPublicInstance: Para realizar llamadas que no necesiten autenticación
 *  - isCustomInstance: Si queremos hacer una llamada donde la url es absoluta (http://dominio.com/....) y no es relativa (/...).
 *    Normalmente las url absolutas son usadas cuando las APIS devuelven JSON en formato HATEOAS
 *  - method: métodos REST: get, post, put, delet
 *  - endpoint: datos del endpoint a llamar:
 *     - name: El Id del endpoint a usar o bien la url absoluta si no hace falta construir la url porque ya nos viene completa.
 *     - pathValues: Si el endpoint posee pathparams.
 *   - headers: Cabeceras que necesita la llamada al servicio. Normalmente cabeceras particulares a servicios concretos.
 *      El resto de cabeceras comunes se inyectarán en los interceptores.
 *   - body: Datos para el body.
 *   - params: Si hay query params.
 * @returns Los parámetros usados para gestionar el estado de la petición:
 *  - fetchResponse: Si la llamada ha sido satistactoria guarda el payload de la respuesta
 *  - fetchError: Si ha habido algún error, guarda dicho error.
 *  - fetchLoading: El estado de la llamada, si ha terminado o no.
 */
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
