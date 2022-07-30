import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/memberData';
import MemberForm from '../../../components/forms/MemberForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>TeamRostr-editmember</title>
        <meta name="description" content="EditTeamMember" />
      </Head>
      <MemberForm obj={editItem} />
    </>
  );
}
