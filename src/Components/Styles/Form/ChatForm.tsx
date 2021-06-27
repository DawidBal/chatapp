import styled from "styled-components";

export const Form = styled.form`
  display: grid;
    grid-template-columns: 1fr auto;
`

export const StickyForm = styled(Form)`
  max-height: 55px;
  position: sticky;
  bottom: 0;
`

export const Input = styled.input`
  padding: 0 0.5rem;
`