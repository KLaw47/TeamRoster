import { getTeamMembers, getSingleTeam, deleteSingleTeam } from './teamData';
import { getSingleMember, deleteMember } from './memberData';

const viewMemberDetail = (memFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memFirebaseKey)
    .then((memberObj) => {
      getSingleTeam(memberObj.teamId)
        .then((teamObj) => {
          resolve({ teamObj, ...memberObj });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetail = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)])
    .then(([teamObj, teamMembersArray]) => {
      resolve({ ...teamObj, members: teamMembersArray });
    }).catch((error) => reject(error));
});

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((membersArray) => {
    console.warn(membersArray, 'Team Members');
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deleteMemberPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewMemberDetail, viewTeamDetail, deleteTeamMembers };
