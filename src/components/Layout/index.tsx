import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory, useParams } from "react-router-dom";
import pathToRegexp from "path-to-regexp";

import { mainContext } from "../../reducer";
import styles from "./styles.module.scss";
import Header from '../Header'
import { WalletConnect } from '../WalletConnect'
import {
  FailedTransactionModal, TransactionModal, WaitingWalletConfirmModal
} from '../Modals'

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
  },[location.pathname])

  useEffect(() => {
    // if (currentRoute.bgImg) {
    //   document.body.style.backgroundColor = `#F5EFFF`;
    // } else {
    //   document.body.style.backgroundColor = '';
    // }
  }, [currentRoute])

  // useEffect(() => {
  //   needSign()
  // }, [])

  return (
    <>
      <Header currentRoute={currentRoute} />
      <div className={`${styles.main} ${currentRoute.navList ? styles.addMaxWidth : ''} ${currentRoute.alonePage ? styles.alonePage : ''}`}>
        <div className={`${styles.content} ${currentRoute.navList ? styles.addMargin : ''}`}>{children}</div>
      </div>
      <WaitingWalletConfirmModal visible={state.showWaitingWalletConfirmModal.show} />
      <FailedTransactionModal visible={state.showFailedTransactionModal} />
      <TransactionModal visible={state.showTransactionModal} />
      <WalletConnect visible={state.showConnectModal} />
    </>
  )
}
export default Layout;
