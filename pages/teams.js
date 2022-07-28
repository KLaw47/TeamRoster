import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';

export default function ViewTeams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };
  useEffect(() => {
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/team/new" passHref>
        <Button>Add A Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </div>
  );
}
