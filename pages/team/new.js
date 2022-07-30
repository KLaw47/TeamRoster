import React from 'react';
import Head from 'next/head';
import TeamForm from '../../components/forms/TeamForm';

export default function AddTeam() {
  return (
    <>
      <Head>
        <title>TeamRostr-addTeam</title>
        <meta name="description" content="addTeam" />
      </Head>
      <TeamForm />
    </>
  );
}
