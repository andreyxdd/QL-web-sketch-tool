import React from 'react';
import { Html } from '@react-three/drei';
import tw from 'tailwind-styled-components';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ILineMeter {
  lineId: number;
  value:number
}

const ButtonsContainer = tw.div`
  flex
  flex-row
  justify-center
  items-center
`;

const MeterInput: React.FC<ILineMeter> = ({ lineId, value }) => {
  const updateLineLength = useSketch((state: ISketchStore) => state.updateLineLength);
  const [showButtons, setShowButtons] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newInputValue = e.target.value;

    if (value.toString() !== newInputValue) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }

    setInputValue(newInputValue);
  };

  const handleSubmit = (): void => {
    if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      updateLineLength(lineId, Number(inputValue));
      setShowButtons(false);
    } else {
      console.log('incorrect input value');
    }
  };

  React.useEffect(() => {
    setInputValue(value.toFixed(2));
  }, [value]);

  return (
    <Html as='div' center style={{ background: 'white', minWidth: 24 }}>
      <input
        type='text'
        value={inputValue}
        style={{
          width: `${inputValue.length}ch`,
          display: 'block',
          margin: 'auto',
        }}
        onKeyPress={(event):void => {
          if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={handleChange}
      />
      {showButtons
      && (
        <ButtonsContainer>
          <button
            type='submit'
            style={{ padding: 2 }}
            onClick={handleSubmit}
          >
            <FcCheckmark style={{ height: 30, width: 30 }} />
          </button>
          <button
            type='button'
            style={{ padding: 2 }}
            onClick={() => {
              setInputValue(value.toFixed(2));
              setShowButtons(false);
            }}
          >
            <FcCancel style={{ height: 30, width: 30 }} />
          </button>
        </ButtonsContainer>
      )}
    </Html>
  );
};

export default MeterInput;
