/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../api/memberData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <Head>
        <title>TeamRostr-viewTeamMember</title>
        <meta name="description" content="ViewTeamMember" />
      </Head>
      <div className="d-flex flex-column">
        <img src={memberDetails.imageUrl} alt={memberDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-black ms-5 details">
        <h1>
          {memberDetails.name}
        </h1>
        <h2>Position:</h2>
        <h3>{memberDetails.position}</h3>
        <hr />
      </div>
    </div>
  );
}
