import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import styled from 'styled-components/macro';
import { Tooltip } from "@mui/material";

import { BREAKPOINTS } from 'theme';
import { mainContext } from "../../reducer";
import Header from '../Header'
import HeaderSpecial from '../HeaderSpecial'
import { WalletConnect } from '../WalletConnect'
import { gamesArr } from 'pages/GameDetail'
import {
  FailedTransactionModal, TransactionModal, WaitingWalletConfirmModal
} from '../Modals'

const GamesMain = styled.div`
  min-height: 100%;
`
const LeftNav = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  background-color: rgba(26, 30, 30, 0.50);
  border-right: 1px solid #4B5954;
  min-height: 100vh;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const NavLink = styled(Link) <{ active: boolean }>`
  border-radius: 50%;
  overflow: hidden;
  width: 55px;
  height: 55px;
  margin-bottom: 30px;
  border: 1px solid transparent;
  ${props => props.active ? `
      border: 1px solid #A5FFBE;
      box-shadow: 0px 1px 10px 0px rgba(165, 255, 190, 0.50);
    ` : ''
  }
  &:hover {
    border: 1px solid #A5FFBE;
    box-shadow: 0px 1px 10px 0px rgba(165, 255, 190, 0.50);
  }
`
const Main = styled.div`
  min-height: 100%;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding-top: 60px;
    padding-bottom: 70px;
  }
`

const Layout = ({ children, routeArr }) => {
  const [currentRoute, setCurrentRoute] = useState<any>({})
  const [currentId, setCurrentId] = useState('')
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
    setCurrentId(location.pathname.substring(7))
  }, [location.pathname])

  console.log(currentId)

  return (
    <>
      {
        currentRoute.special ?
          <GamesMain>
            <LeftNav>
              {
                gamesArr.map(item =>
                  <NavLink key={item.id} to={`/games/${item.id}`} active={currentId === item.id}>
                    <Tooltip title={item.name} placement="right" arrow>
                      <img width={'100%'} src={item.logo} />
                    </Tooltip>
                  </NavLink>
                )
              }
            </LeftNav>
            <HeaderSpecial />
            <Main>{children}</Main>
          </GamesMain> :
          <>
            <Header currentRoute={currentRoute} />
            <Main>{children}</Main>
          </>
      }
      <WaitingWalletConfirmModal visible={state.showWaitingWalletConfirmModal.show} />
      <FailedTransactionModal visible={state.showFailedTransactionModal} />
      <TransactionModal visible={state.showTransactionModal} />
      <WalletConnect visible={state.showConnectModal} />
    </>
  )
}
export default Layout;
