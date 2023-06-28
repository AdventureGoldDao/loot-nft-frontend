import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'
import { Button, Popover, Select, MenuItem } from "@mui/material";
import copy from 'copy-to-clipboard';

import { useActiveWeb3React } from "../../web3";
import { getChainType } from "../../web3/address";
import { fetchDefaultAccount, recordWalletType } from "../../services/account";
import { queryNoticeStatus } from "../../services/message";
import { handleIsSignExpired, clearLocalStorage } from '../../utils/txSign'
import { chainArr, chainFun, symbolImgObj } from '../../utils/networkConnect';
import { useActiveTronWeb } from "hooks/activeTronWeb";
import { useBalance, useNeedSign } from "hooks/account";
import { getIsArtist } from "../../utils/handleContract";
import { abbrTxHash } from "../../utils/format";
import { getSymbol } from "../../utils/symbol";
import { isSelf, getQueryString } from "utils/index";
import { mainContext } from "../../reducer";
import { HANDLE_SHOW_CONNECT_MODAL, HANDLE_HIDE_EVENT_MODAL, HANDLE_NOTICE_NUM } from "../../const";
import styles from "./styles.module.scss";
import logoFull from "assets/img/logoFull.svg";
import more from "assets/img/header/more.svg";
import moreG from "assets/img/header/more_g.svg";


const Header = ({ currentRoute }) => {
  const [showBox, setShowBox] = useState('');
  const [chainName, setChainName] = useState('mainnet')
  const [bgOpacity, setBgOpacity] = useState(0)
  const { account, active, chainId } = useActiveWeb3React()
  const { tronLibrary, tronAccount, tronChainId, tronActive } = useActiveTronWeb();
  const { state, dispatch } = useContext(mainContext);

  const cancel = () => {
    setShowBox('')
  }

  const handleSwitchChain = (event) => {
    const chain = event.target.value;
    if (tronChainId && !chainId && chain !== 'TRX') {
      dispatch({
        type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
      });
    }

    if (chainFun[chain]) {
      chainFun[chain]()
    } else if (chain === 'TRX') {
      dispatch({
        type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
      });
    }
  }

  useEffect(() => {
    const changeBg = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 60) {
        setBgOpacity(1)
      } else if (scrollTop > 0 && scrollTop < 60) {
        setBgOpacity(scrollTop / 60)
      } else if (scrollTop === 0) {
        setBgOpacity(0)
      }
    }
    window.addEventListener('scroll', changeBg);
  }, [])

  useEffect(() => {
    if (active && chainId) {
      setChainName(getChainType(chainId));
    }
  }, [active])

  return (
    <>
      <div
        className={`${styles.main} ${currentRoute.headerTheme === 'dark' ? styles.dark : ''}`}
        style={{
          background: `rgba(19, 19, 19, ${bgOpacity})`
        }}
      >
        <div className={styles.box}>
          <div className="df aic">
            <Link to="/"><img className={styles.logo} src={logoFull} /></Link>
            <Link to="/" className={`${styles.nav} ml60 ${currentRoute.parent === 'home' ? styles.nav_active : ''}`}>Home</Link>
            <Link to="/explore" className={`${styles.nav} ml60 ${currentRoute.parent === 'explore' ? styles.nav_active : ''}`}>Explore</Link>
            <Link to="/bridge" className={`${styles.nav} ml60 ${currentRoute.parent === 'bridge' ? styles.nav_active : ''}`}>Bridge</Link>
            <Link to="/createManage" className={`${styles.nav} ml60 ${currentRoute.parent === 'createManage' ? styles.nav_active : ''}`}>Dashboard</Link>
          </div>

          <div className="df aic">
            {
              (active || tronActive) &&
              <Select
                onChange={handleSwitchChain}
                value={chainName}
                className={`${styles.select_box} mr16`}
              >
                {
                  chainArr.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      <img className={styles.option_img} src={item.icon} alt={item.name} />
                      <span className={styles.option_name}>{item.name}</span>
                    </MenuItem>
                  ))
                }
              </Select>
            }

            {
              !(active || tronActive)
                ? <Button
                  onClick={() => {
                    dispatch({
                      type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
                    });
                  }}
                  className="btn_multicolour h40 w200"
                >Connect Wallet</Button>
                : <Link className={styles.account_box} to="/collector">{abbrTxHash(account || tronAccount, 5, 4)}</Link>
            }
          </div>
        </div>

        <div className={styles.box_h5}>
          <Link onClick={cancel} to="/"><img className={styles.logo} src={logoFull} /></Link>
          <div className="df aic">
            <div className="df">
              <img onClick={() => { setShowBox(oldStr => oldStr === 'about' ? '' : 'about') }} className={styles.more} src={moreG} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.nav_footer}>
          <Link to="/" className={styles.nav_footer_item}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'home' ? homeB : home} />
            <span className={styles.nav_footer_text}>Home</span>
          </Link>
          <Link to="/explore" className={styles.nav_footer_item}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'explore' ? marketB : market} />
            <span className={styles.nav_footer_text}>Explore</span>
          </Link>
        </div> */}

      {
        showBox && <div className={styles.nav_h5_body}>
          <div className={styles.pop_my_box}>
            <div className={styles.pop_my_item}>
              <Link onClick={cancel} to="/" className={`${styles.nav} ${currentRoute.parent === 'home' ? styles.nav_active : ''}`}>Home</Link>
            </div>
            <div className={styles.pop_my_item}>
              <Link onClick={cancel} to="/explore" className={`${styles.nav} ${currentRoute.parent === 'explore' ? styles.nav_active : ''}`}>Explore</Link>
            </div>
            <div className={styles.pop_my_item}>
              <Link onClick={cancel} to="/bridge" className={`${styles.nav} ${currentRoute.parent === 'bridge' ? styles.nav_active : ''}`}>Bridge</Link>
            </div>
            <div className={styles.pop_my_item}>
              <Link onClick={cancel} to="/createManage" className={`${styles.nav} ${currentRoute.parent === 'createManage' ? styles.nav_active : ''}`}>Dashboard</Link>
            </div>
          </div>
          {
            (active || tronActive) &&
            <div className={styles.pop_my_box}>
              <Select
                onChange={handleSwitchChain}
                value={chainName}
                className={styles.select_box}
              >
                {
                  chainArr.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      <img className={styles.option_img} src={item.icon} alt={item.name} />
                      <span className={styles.option_name}>{item.name}</span>
                    </MenuItem>
                  ))
                }
              </Select>
            </div>
          }
          <div className={styles.pop_my_box}>
            {
              !(active || tronActive)
                ? <Button
                  onClick={() => {
                    dispatch({
                      type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
                    });
                  }}
                  className="btn_multicolour"
                >Connect Wallet</Button>
                : <Link onClick={cancel} className={styles.account_box} to="/collector">{abbrTxHash(account || tronAccount, 5, 4)}</Link>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Header;
