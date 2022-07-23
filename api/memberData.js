import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getMembers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createMember = (memberObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/members.json`, memberObject)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/members/${response.data.name}.json`, payload)
        .then(() => {
          getMembers(uid).then(resolve);
        });
    }).catch((error) => reject(error));
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/member/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleMember = (uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/members/${uid}.json`)
    .then(() => {
      getMembers(uid).then(resolve);
    })
    .catch((error) => reject(error));
});

const updateMember = (memberObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/members/${memberObject.firebaseKey}.json`, memberObject)
    .then(() => getMembers(memberObject.uid).then(resolve))
    .catch(reject);
});

export {
  getMembers,
  getSingleMember,
  createMember,
  deleteSingleMember,
  updateMember,
};
