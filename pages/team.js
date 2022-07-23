import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

export default function ViewTeam() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  // const getAllMembers = () => {
  //   getMembers(user.uid).then(setMembers);
  // };
  useEffect(() => {
    getMembers(user.uid).then(setMembers);
  }, [user]);

  return (
    <div className="text-center my-4">
      <h1>THE DREAM TEAM</h1>
      <div className="d-flex flex-wrap">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getMembers} />
        ))}
      </div>
    </div>
  );
}
