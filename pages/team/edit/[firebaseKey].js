import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>TeamRostr-editTeam</title>
        <meta name="description" content="EditTeam" />
      </Head>
      <TeamForm obj={editItem} />
    </>
  );
}
