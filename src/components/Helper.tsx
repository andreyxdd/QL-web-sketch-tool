import React from 'react';

interface IHelper {}

const Helper: React.FC<IHelper> = () => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => { setHovered(false); }}
      style={{
        backgroundColor: '#F0F0F0',
        color: 'black',
        opacity: hovered ? 0.8 : 0.15,
        position: 'fixed',
        bottom: 10,
        right: 10,
        padding: 20,
      }}
    >
      <h4 style={{
        textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingBottom: 2,
      }}
      >
        Mouse Events
      </h4>
      <p>Right Click - Orbit</p>
      <p>Middle Click - Dolly</p>
      <p>Middle Scroll - Zoom</p>
      <p>Left Click - Pan</p>
    </div>
  );
};

export default Helper;
