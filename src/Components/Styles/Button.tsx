import styled from "styled-components";

export const Button = styled.button`
  padding: 1rem 0.5rem;
  background-color: #0064d6;
  border: 1px solid #0064d6;
  color: white;
  border-radius: 15px;
  transition: border-radius 0.3s ease;
  font-size: 1rem;
  &:hover {
    border-radius: 0;
  }
`