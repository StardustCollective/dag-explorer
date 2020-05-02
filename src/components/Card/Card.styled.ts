import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  fontsize: ${({ theme }) => theme.typography.fontSize};
  border-radius: 5px;
  padding: 10px;
`;
