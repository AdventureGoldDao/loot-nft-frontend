import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory, useParams } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import { clearCache } from 'react-router-cache-route';
import { Modal } from "@mui/material";

import { mainContext } from "../../reducer";
import styles from "./styles.module.scss";
import Header from '../Header'
import Footer from '../Footer'
import Siderbar from '../Sidebar'
import { WalletConnect } from '../WalletConnect'
import EasterEgg from 'components/EasterEgg';
import { useActiveTronWeb } from "hooks/activeTronWeb";
import { HANDLE_SHOW_EASTER_MODAL } from "../../const";
import eggLink from "assets/img/easter/egg_link.png";
import bg from "assets/img/home/home-bg.png"

const Layout = ({ children, routeArr }) => {
  const [currentRoute, setCurrentRoute] = useState({})
  const { state, dispatch } = useContext(mainContext);
  const location = useLocation();
  const { tokenId, chainType, contractAddress } = useParams();
  const { tronLibrary, tronAccount, tronChainId, tronActive } = useActiveTronWeb();

  useEffect(() => {
    if (currentRoute.path === '/') {
      if (!pathToRegexp('/activity/:activityId').test(location.pathname)) {
        clearCache()
      }
    }
    if (currentRoute.path === '/vote') {
      if (!pathToRegexp('/vote/:chainType/:contractAddress/:id').test(location.pathname)) {
        clearCache()
      }
    }
    if (currentRoute.path === '/collections') {
      if (!pathToRegexp('/collection/:type').test(location.pathname)) {
        clearCache()
      }
    }

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
        <Siderbar currentRoute={currentRoute} />
        <div className={`${styles.content} ${currentRoute.navList ? styles.addMargin : ''}`}>{children}</div>
      </div>
      {/* {
        !currentRoute.alonePage && <Footer />
      } */}
      <WalletConnect visible={state.showConnectModal} />
    </>
  )
}
export default Layout;
