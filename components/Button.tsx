import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
   children: any;
   onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ children, onClick = e => {} }: Props) => {
   return (
      <StyledButton onClick={e => onClick(e)} className="styledButton">
         {children}
      </StyledButton>
   );
};

export default Button;

const StyledButton = styled.button`
   ${tw`
      border-2 border-black rounded-2xl
      p-3
   `}
`;
