import 'whatwg-fetch';

const baseURL =
  typeof window !== 'undefined' && window.config && window.config.apiUri
    ? window.config.apiUri : 'https://api-dev.floq.no';

const apiToken =
  typeof window !== 'undefined' && window.apiToken
    ? window.apiToken : 'dev-secret-shhh';

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation',
  Accept: 'application/json'
};

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchEmployees = () =>
  fetch(`${baseURL}/rpc/employees_roles`, {
    method: 'POST',
    headers
  })
    .then(response => response.json());

export const fetchOvertime = () =>
  fetch(`${baseURL}/paid_overtime?select=
    id,
    employee,
    paid_date,
    minutes,
    comment,
    registered_date
    &order=registered_date.desc`, {
      headers
    }).then(response => response.json());

export const addOvertime = body => fetch(`${baseURL}/paid_overtime`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(handleErrors)
  .then(response => response.json());

export const changePaidDate = (id, paid_date) =>
  fetch(`${baseURL}/paid_overtime?id=eq.${id}`, {
      method: 'PATCH',
      headers: dataHeaders,
      body: JSON.stringify({
        paid_date: paid_date
      })
    }).then(handleErrors)
    .then(response => response.json());
