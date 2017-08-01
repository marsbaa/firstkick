import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const BadgeStatus = props => {
  const now = props.earned / props.toComplete * 100;
  return (
    <div style={{ float: 'left', margin: '15px' }}>
      <p
        style={{
          width: '80px',
          height: '20px',
          textAlign: 'center',
          fontSize: '10px'
        }}
      >
        {props.title}
      </p>
      <img src={props.badge} style={{ width: '80px' }} />
      <ProgressBar now={now} style={{ marginBottom: '10px' }} />
      <p style={{ textAlign: 'center', marginTop: '0' }}>
        {props.earned} /{props.toComplete}
      </p>
    </div>
  );
};

export default BadgeStatus;
