import styled from 'styled-components';

 const Slider = styled.input`
  appearance: none;
  width: 100%;
  height: 10px;
  background: #ddd;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 25px;
    height: 25px;
    background: ${({ disabled }) => (disabled ? '#aaa' : '#5e85ce')};
    cursor: pointer;
    border-radius: 50%;
  }
  
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: ${({ disabled }) => (disabled ? '#aaa' : '#5e85ce')};
    cursor: pointer;
    border-radius: 50%;
  }
`;

export default Slider;
