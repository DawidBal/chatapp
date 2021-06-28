import styled from "styled-components"

type StyledProps = {
  right?: boolean
}

export const MessageContent = styled.div`

`

export const MessageText = styled.p`
  margin: 0;
  padding: 0.4rem 0.6rem;
  background-color: #0064d6;;
  color: #fff;
  border-radius: 25px;
  font-size: 1rem;
  display: inline;
`

export const MessagePerson = styled.span<StyledProps>`
  ${({ right }) => right ? 'padding-right: 0.6rem' : 'padding-left: 0.6rem;'};
  font-size: 0.8rem;
  color: #0000008f;
  display: block;
  margin: 0.5rem 0;
`

export const MessageTime = styled(MessagePerson)`
  padding: 0;
`