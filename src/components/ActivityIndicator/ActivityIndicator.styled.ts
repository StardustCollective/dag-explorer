import styled, { css } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ProgressIndicator = styled(CircularProgress)``;

export const ActivityIndicator = styled.div<{
  pending?: boolean;
}>`
  display: flex;
  align-items: center;

  ${ProgressIndicator} {
    transition: all 0.225s cubic-bezier(0.47, 1.64, 0.41, 0.8);

    ${({ pending }) =>
      !pending &&
      css`
        width: 0 !important;
        height: 0 !important;
      `}

    svg {
      will-change: transform;
      transition: all 0.225s cubic-bezier(0.47, 1.64, 0.41, 0.8);
      transform: scale(0);
    }
  }

  ${({ pending }) =>
    pending &&
    css`
      ${ProgressIndicator} {
        svg {
          transform: scale(1);
        }
      }
    `}
`;
