import React from 'react';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import tw from 'tailwind-styled-components';

interface ISketchHelper {}

const Liner = tw.div`
  flex
  flex-row
  w-full
`;

const SketchHelper: React.FC<ISketchHelper> = () => {
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
        Sketch Mouse Controls
      </h4>
      <p>Middle Click - Dolly</p>
      <p>Middle Scroll - Zoom</p>
      <p>Left Click - Pan</p>

      <h4 style={{
        textAlign: 'center', fontWeight: 'bold', fontSize: 18, paddingBottom: 2, paddingTop: 2,
      }}
      >
        Notations
      </h4>
      <Liner>
        <RiCheckboxBlankFill style={{ height: 20, width: 20, color: '#0096FF' }} />
        <p> for the horizontal lines </p>
      </Liner>
      <Liner>
        <RiCheckboxBlankFill style={{ height: 20, width: 20, color: '#FF5733' }} />
        {' '}
        <p> for the vertical lines</p>
      </Liner>
    </div>
  );
};

export default SketchHelper;
