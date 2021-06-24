import styled from "styled-components";

type Props = {
  rounded?: boolean
}

export const Button = styled.button<Props>`
  padding: 1rem 0.5rem;
  background-color: #0064d6;
  border: 1px solid #0064d6;
  color: white;
  border-radius: ${({ rounded }) => rounded ? '15px' : '0'};
  transition: border-radius 0.3s ease;
  font-size: 1rem;
  &:hover {
    border-radius: 0;
  }
`