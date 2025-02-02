import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background: ${({ disabled }) => (disabled ? '#aaa' : '#5e85ce')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export default Button;
