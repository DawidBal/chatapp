import styled from "styled-components"

export const ChatWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;

`

export const Messages = styled.ul`
display: flex;
flex-direction: column;
gap: 0.3rem;
list-style: none;
padding: 0 1rem;
  & > li:nth-child(even) {
    background-color: #ebebeb;
    padding: 0.3rem 0;
  }
`

export const Message = styled.li`

`



