import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamMembers } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <p className="card-text bold">{teamObj.private && <span>private<br /></span> }</p>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    private: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
