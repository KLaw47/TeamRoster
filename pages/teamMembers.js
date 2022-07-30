import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';
import Search from '../components/Search';

export default function ViewTeam() {
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const getAllMembers = () => {
    getMembers(user.uid).then((memArr) => {
      setMembers(memArr);
      setFilteredMembers(memArr);
    });
  };
  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <Head>
        <title>TeamRostr-teamMembers</title>
        <meta name="description" content="allTeamMembers" />
      </Head>
      <Search members={members} setFilteredMembers={setFilteredMembers} />
      <h1>Alpha Quadrant Baseball League</h1>
      <Link href="/member/new" passHref>
        <Button>New Player</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {filteredMembers.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </div>
  );
}
