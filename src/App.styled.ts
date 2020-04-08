import styled from 'styled-components';

export const Sidebar = styled.div`
  flex: 0 0 260px;
  max-width: 0;
`;

export const Main = styled.div`
  flex: 1 1 auto;
`;

export const Content = styled.div`
  padding: 24px;
`;

export const App = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    ${Sidebar} {
      max-width: none;
    }
  }
`;
