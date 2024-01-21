import { Notification, toaster } from 'rsuite';

import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export function getRequest(route: string) {
  const url = backendURL + route;
  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      toaster.push(<Notification closable type='error' header={error.message}/>, {
        duration: 5000
      });
    });
}

export function postRequest(route: string, requestData: any) {
  const url = backendURL + route;
  return axios.post(url, requestData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      toaster.push(<Notification closable type='error' header={error.message}/>, {
        duration: 5000
      });
    });
}
