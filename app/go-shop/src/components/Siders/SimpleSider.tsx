import React from 'react';
import './SimpleSider.css';

interface SimpleSiderProps {
  params?: string;
}

const SimpleSider: React.FC<SimpleSiderProps> = ({ params }) => {
  return (
    <div id="simpleSider">
      <h1>{params}</h1>
    </div>
  );
};

export default SimpleSider;