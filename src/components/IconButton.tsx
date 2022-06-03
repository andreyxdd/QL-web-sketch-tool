import React from 'react';
import tw from 'tailwind-styled-components';

interface ButtonProps{
  $active: boolean;
  $isFirst?: boolean;
}

const Button = tw.button<ButtonProps>`
  p-2
  ${(p) => (p?.$isFirst ? 'border-l' : '')}
  border-r
  border-y
  ${(p) => (p?.$active ? 'bg-slate-500' : '')}
  border-gray-700
  hover:bg-slate-400
`;

interface IIconButton {
  children: React.ReactNode;
  handleClick: () => void;
  active: boolean;
  isFirst?: boolean;
}

const IconButton: React.FC<IIconButton> = ({
  children,
  handleClick,
  active,
  isFirst,
}) => (
  <Button
    type='button'
    onClick={handleClick}
    $active={active}
    $isFirst={isFirst}
  >
    {children}
  </Button>
);

export default IconButton;
