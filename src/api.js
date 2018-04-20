
const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    // fjarlægjum gæsalappir úr token með Regex
    options.headers['Authorization'] = `Bearer ${token.replace(/['"]+/g, '')}`;
  }
  
  const response = await fetch(url, options);

  const result = await response.json();

  if (response.status === 401) {
    return window.location = '/login?tokenExpired';
  }
  
  return {result, status: response.status };
}

async function post(endpoint, data) {
  const url = `${baseurl}${endpoint}`;
  const token = localStorage.getItem('token');
  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      'Authorization': `bearer ${token}`
    },
    method: 'POST',
  };

  const response = await fetch(url, options);

  const result = await response.json();

  if (response.status === 401) {
    return window.location = '/login?tokenExpired';
  }

  return { result, status: response.status };
}

async function patch(endpoint, data) {
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');
  
  const options = {

    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Host': 'vef2-2018-h1-synilausn-fgg.herokuapp.com',
    }
  };
  
  if (token) {
    options.headers['Authorization'] = `Bearer ${token.replace(/['"]+/g, '')}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  if (response.status === 401) {
    return window.location = '/login?tokenExpired';
  }

  return { result, status: response.status };
}

async function call(endpoint, options) {
  const url = `${baseurl}${endpoint}`;

  const token = window.localStorage.getItem('token');
    
  if (token) {
    options.headers['Authorization'] = `Bearer ${token.replace(/['"]+/g, '')}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  if (response.status === 401) {
    return window.location = '/login?tokenExpired';
  }

  return { result, status: response.status };
}

async function del(endpoint) {
  const url = `${baseurl}${endpoint}`;
  const token = window.localStorage.getItem('token');
  
  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`,
      'Host': `${baseurl}`,
    },
  };

  const response = await fetch(url, options);

  if (response.status === 401) {
    return window.location = '/login?tokenExpired';
  }
}

export default {
  get,
  post,
  patch,
  del,
  call
};
