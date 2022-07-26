import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';

export default function MemberCard({ memberObj, onUpdate, teamName }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '29rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.imageUrl} alt={memberObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <p>{memberObj.position}</p>
        <p>{teamName}</p>
        <Link href={`/member/${memberObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  teamName: PropTypes.string,
};

MemberCard.defaultProps = {
  teamName: '',
};
