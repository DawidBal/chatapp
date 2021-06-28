import styled from "styled-components"

type Props = {
  right?: boolean
}

export const ChatWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;

`

export const Messages = styled.ul`
padding: 0 1rem;
display: flex;
flex-direction: column;
gap: 0.3rem;
list-style: none;
`

export const Message = styled.li<Props>`
  text-align: ${({ right }) => right ? 'right' : 'left'};
`

export const TwoCols = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`



