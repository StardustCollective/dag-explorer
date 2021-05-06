import React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PersonIcon from '@material-ui/icons/Person';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import DashboardIcon from '@material-ui/icons/Dashboard';

import {
  SidebarWrapper,
  SidebarBody,
  SidebarItem,
  SidebarItemLabel
} from './sidebar.styled';

export const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <SidebarBody>
        <Link component={RouterLink} to="/connect-wallet">
          <SidebarItem>
            <AccountBalanceWalletIcon />
            <SidebarItemLabel>Connect Wallet</SidebarItemLabel>
          </SidebarItem>
        </Link>
        <Link component={RouterLink} to="/buy-dag">
          <SidebarItem>
            <CreditCardIcon />
            <SidebarItemLabel>Buy DAG</SidebarItemLabel>
          </SidebarItem>
        </Link>
        <Link component={RouterLink} to="/portfolio">
          <SidebarItem>
            <PersonIcon />
            <SidebarItemLabel>Portfolio</SidebarItemLabel>
          </SidebarItem>
        </Link>
        <Link component={RouterLink} to="/swap">
          <SidebarItem>
            <SwapCallsIcon />
            <SidebarItemLabel>Swap</SidebarItemLabel>
          </SidebarItem>
        </Link>
        <Link component={RouterLink} to="/terminal">
          <SidebarItem>
            <DashboardIcon />
            <SidebarItemLabel>Terminal</SidebarItemLabel>
          </SidebarItem>
        </Link>
      </SidebarBody>
    </SidebarWrapper>
  );
};
