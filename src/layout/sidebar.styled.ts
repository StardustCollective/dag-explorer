import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  width: 180px;
  height: calc(100vh - 50px);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 30px 0 20px 24px;
  font-family: 'Inter';
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 60px;
  background: #fff;
`;

export const SidebarBody = styled.div`
  flex-grow: 1;
  a {
    text-decoration: none !important;
  }
`;

export const SidebarItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  user-select: none;
  cursor: pointer;
  color: #00152f;
  svg {
    height: 16px;
  }
`;

export const SidebarItemLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: $black-100;
  margin-left: 8px;
  text-decoration: none;
`;
