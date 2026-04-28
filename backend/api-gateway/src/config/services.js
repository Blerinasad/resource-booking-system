import env from "./env.js";

const services = {
  auth: env.services.auth,
  resource: env.services.resource,
  booking: env.services.booking,
};

export default services;