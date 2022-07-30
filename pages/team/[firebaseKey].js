import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { viewTeamDetail } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeamDetail() {
  const [teamDetail, setTeamDetail] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetail(firebaseKey).then(setTeamDetail);
  }, [firebaseKey, teamDetail]);

  return (
    <>
      <Head>
        <title>TeamRostr-viewTeam</title>
        <meta name="description" content="EditTeamMember" />
      </Head>
      <h1>{teamDetail.name}</h1>
      <div>
        {teamDetail.members?.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} teamName={teamDetail.name} onUpdate={() => (null)} />
        ))}
      </div>
    </>
  );
}
