import { APIRequestOption } from './types';

export async function handleResponse(response: any) {
  const jsonData = response.json();
  if (response.ok) return jsonData;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message,
    // so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

export async function handleTokenResponse(response: any) {
  if (response.ok) return response.text();
  throw new Error('Token response was not ok.');
}

// In a real app, would likely call an error logging service.
export function handleError(error: Error) {
  // eslint-disable-next-line no-console
  console.error(`API call failed. ${error}`);
  throw error;
}

export function getHeaderInfo() {
  const headerInfo = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.api+json'
  };
  return headerInfo;
}

async function parseJSON(response: any) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  throw error;
}

export function fetchAPI(url: string, method = 'GET', payload = null) {
  const options: APIRequestOption = { method };
  const headers = getHeaderInfo();
  if (payload) {
    options.body = JSON.stringify(payload);
  }
  return fetch(url, {
    ...options,
    headers
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      throw err;
    });
}

export default fetchAPI;
