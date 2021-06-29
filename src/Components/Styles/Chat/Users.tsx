import styled from "styled-components";

export const UserList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  list-style: none;
`

export const User = styled.li`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  line-height: 1;
  &::before {
    content: '';
    height: 8px;
    width: 8px;
    background-color: #05ad05;
    border-radius: 50%;
  }
`

export const UserCounter = styled.p`
  text-align: center;
  margin-top: 0;
  &::first-letter {
    color: #0064d6;
    font-weight: bold;
  }
`

export const UserContainer = styled.aside`
  min-width: 190px;
  padding: 1rem;
  border-right: 1px solid #afafaf;
`

