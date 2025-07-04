import ReactGA from 'react-ga4';

// Inicializa Google Analytics cuando el cliente carga la página
export const onInitialClientRender = () => {
  ReactGA.initialize('G-M2XYYRBSLJ'); // Reemplaza con tu ID de seguimiento de GA
};

// Envía un "pageview" cuando se actualiza la ruta
export const onRouteUpdate = ({ location }) => {
  ReactGA.send({ hitType: 'pageview', page: location.pathname });
};
