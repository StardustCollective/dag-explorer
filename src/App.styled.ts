import styled from 'styled-components';
import MuiListItem from '@material-ui/core/ListItem';
import { shapeSrc } from '~assets';

export const Sidebar = styled.div`
  flex: 0 0 260px;
  max-width: 0;
`;

export const Main = styled.div`
  flex: 1 1 auto;
`;

export const Content = styled.div`
  padding: 24px 0;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: 24px;
  }
`;

export const Shape = styled.img.attrs(() => ({
  src: shapeSrc
}))`
  display: block;
  margin: auto;
  object-fit: contain;
`;

export const ListItem = styled(MuiListItem)`
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 16px 20px 16px 0;
    border-color: transparent ${({ theme }) => theme.palette.background.default}
      transparent transparent;
    transition: all 0.25s ease-out;
    transform: translateX(100%);
  }

  &.Mui-selected {
    &:after {
      transform: translateX(0);
    }
  }
` as typeof MuiListItem;

export const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;

  > * {
    padding: 0.25rem;
  }

  ${Shape} {
    width: 175px;
    height: 175px;
  }
`;

export const App = styled.div`
  display: flex;
`;
