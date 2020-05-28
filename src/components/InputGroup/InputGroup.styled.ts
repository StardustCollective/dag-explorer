import styled, { css } from 'styled-components';

export const Prepend = styled.div`
  > *,
  .MuiButtonBase-root {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    min-width: 0;
  }
`;

export const Append = styled.div`
  > *,
  .MuiButtonBase-root {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    min-width: 0;
  }
`;

export const InputGroup = styled.div<{
  hasPrepend?: boolean;
  hasAppend?: boolean;
  fullWidth?: boolean;
}>`
  display: flex;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${Prepend},
  ${Append} {
    display: flex;

    > div:not([class]) {
      display: flex;
    }
  }

  > * + *,
  input,
  *[class*='Input-root'],
  *[class*='InputBase-root'] {
    ${({ hasPrepend }) =>
      hasPrepend &&
      css`
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `}

    ${({ hasAppend }) =>
      hasAppend &&
      css`
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `}
  }
`;
