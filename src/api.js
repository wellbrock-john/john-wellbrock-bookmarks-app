const BASE_URL = 'https://thinkful-list-api.herokuapp.com'

const username = 'wellbrock-john';
const endpoint = `${BASE_URL}/${username}/bookmarks`;

const fetchApi = function (...args) {
  let error = null;
  return fetch(...args)
    .then (res => {
      if (!res.ok) {
        error = { code: res.status };
      }

      return res.json();
    }).then (data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
};

const createDataRecord = function (record) {
  return fetchApi(
    `${endpoint}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(record)
    }
  );
};

const readDataRecords = function () {
  return fetchApi(`${endpoint}`);
};

const updateDataRecord = function (id, updateData) {
  return fetchApi(
    `${endpoint}/${id}`,
    {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateData)
    }
  );
};

const deleteDataRecord = function (id) {
  return fetchApi(
    `${endpoint}/${id}`,
    {
      method: 'DELETE'
    }
  );
};

export default {
  createDataRecord,
  readDataRecords,
  updateDataRecord,
  deleteDataRecord
};