const BASE_PATH = `/${process.env.REACT_APP_BASE_PATH}`;

const ROUTES_PATH = {
  verInforme: {
    fullPath: `${BASE_PATH}/ver-informe`,
    relativePath: "ver-informe",
    protected: true,
  },
  registroCuenta: {
    fullPath: `${BASE_PATH}/registro-cuenta`,
    protected: true,
  },
  inicio: {
    fullPath: `${BASE_PATH}/`,
    protected: false,
  },
  login: {
    fullPath: `${BASE_PATH}/login`,
    protected: false,
  },
  errorPage: {
    fullPath: `${BASE_PATH}/errorPage`,
    protected: false,
  },
  politicaDeCookies: {
    fullPath: `${BASE_PATH}/politica-de-cookies`,
    protected: false,
  },
  politicaDePrivacidad: {
    fullPath: `${BASE_PATH}/politica-de-privacidad`,
    protected: false,
  },
};

export default ROUTES_PATH;
