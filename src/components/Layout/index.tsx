import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import styled from 'styled-components/macro';

import { BREAKPOINTS } from 'theme';
import { mainContext } from "../../reducer";
import Header from '../Header'
import { WalletConnect } from '../WalletConnect'
import {
  FailedTransactionModal, TransactionModal, WaitingWalletConfirmModal
} from '../Modals'

const Main = styled.div`
  min-height: 100%;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding-top: 60px;
    padding-bottom: 70px;
  }
`

const Layout = ({ children, routeArr }) => {
  const [currentRoute, setCurrentRoute] = useState<any>({})
  const { state, dispatch } = useContext(mainContext);
  const location = useLocation();

  useEffect(() => {
    // find current route
    routeArr.find(cell => {
      if (pathToRegexp(cell.path).test(location.pathname)) {
        setCurrentRoute(cell)
        return true
      }
    })
  }, [location.pathname])

  return (
    <>
      <Header currentRoute={currentRoute} />
      <Main>{children}</Main>
      <WaitingWalletConfirmModal visible={state.showWaitingWalletConfirmModal.show} />
      <FailedTransactionModal visible={state.showFailedTransactionModal} />
      <TransactionModal visible={state.showTransactionModal} />
      <WalletConnect visible={state.showConnectModal} />
    </>
  )
}
export default Layout;
