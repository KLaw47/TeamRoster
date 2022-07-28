import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createTeam = (teamObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObject)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(() => {
          getTeams(uid).then(resolve);
        });
    }).catch((error) => reject(error));
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleTeam = (uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${uid}.json`)
    .then(() => {
      getTeams(uid).then(resolve);
    })
    .catch((error) => reject(error));
});

const updateTeam = (teamObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObject.firebaseKey}.json`, teamObject)
    .then(() => getTeams(teamObject.uid).then(resolve))
    .catch(reject);
});

const getTeamMembers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/members.json?orderBy="teamId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getTeams,
  createTeam,
  getSingleTeam,
  deleteSingleTeam,
  updateTeam,
  getTeamMembers,
};
