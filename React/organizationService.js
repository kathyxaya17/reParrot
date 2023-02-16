import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/organizations`; 

const createOrganization = (payload) => {
      _logger("orgService", payload);
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(serviceHelpers.onGlobalSuccess).catch(serviceHelpers.onGlobalError);;
};

const getOrganization = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/?pageIndex=${pageIndex}&&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const getAllOrganizationNoPag = () => {
  const config = {
    method: "GET",
    url: `${endpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const deleteOrganization = (orgId) => {
    const config = {
    method: "DELETE",
    url: `${endpoint}/${orgId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const editOrganization = (payload) => {
    const config = {
    method: "PUT",
    url: `${endpoint}/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const searchOrganizations = (pageIndex, pageSize, query) => {

    const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`, 
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

    return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
}

const getByIdOrganization = (orgId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${orgId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess) 
    .catch(serviceHelpers.onGlobalError);
};

const organizationService = {
  createOrganization,
  getOrganization,
  getAllOrganizationNoPag,
  deleteOrganization,
  editOrganization,
  searchOrganizations,
  getByIdOrganization
}

export default organizationService;
