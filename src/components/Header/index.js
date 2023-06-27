import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
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
import copyIcon from "assets/img/header/copy.svg";
import wallet from "assets/img/header/wallet.svg";
import stake from "assets/img/header/stakeNew.svg";
import nft from "assets/img/header/nft.svg";
import profile from "assets/img/header/profile.svg";
import activity from "assets/img/header/activity.svg";
import collection from "assets/img/header/collection.svg";
import more from "assets/img/header/more.svg";
import moreG from "assets/img/header/more_g.svg";
import logout from "assets/img/header/logout.svg";
import hot from "assets/img/header/hot.svg";


const Header = ({ currentRoute }) => {
  const [isArtist, setIsArtist] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [showBox, setShowBox] = useState('');
  const [symbol, setSymbol] = useState('ETH')
  const [chainName, setChainName] = useState('mainnet')
  const [userInfo, setUserInfo] = useState({})
  const [bgOpacity, setBgOpacity] = useState(0)
  const [isPc, setIsPc] = useState(true)
  const [isShare, setIsShare] = useState(false)
  const { library, account, active, chainId } = useActiveWeb3React()
  const { tronLibrary, tronAccount, tronChainId, tronActive } = useActiveTronWeb();
  const { balance } = useBalance()
  const { state, dispatch } = useContext(mainContext);
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [isRedTip, setIsRedTip] = useState(false)
  const { needSign } = useNeedSign();

  const clearStorage = () => {
    clearLocalStorage(window.localStorage.getItem('now_selected_chain'))
    window.localStorage.removeItem('now_selected_chain')
    window.localStorage.removeItem('wallet_type')
  }

  const logOut = () => {
    clearStorage()
    history.push('/')
    window.location.reload()
  }

  const handleCopy = () => {
    copy(account || tronAccount);
  }

  const cancel = () => {
    setShowBox('')
    setShowPop(false)
  }

  const goStake = () => {
    cancel()
    history.push('/farm')
  }
  const goClaim = () => {
    cancel()
    history.push('/claimDfa')
  }

  const handleGoCreate = () => {
    cancel()
    history.push('/collectionManage/createNFT')
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

  const goMine = () => {
    needSign(() => {
      history.push(`/profile/${account || tronAccount}`)
    })
  }

  const content = (
    <>
      <div className={styles.pop_body}>
        <div className={`${styles.h5_pop_row} p10`}>
          <div onClick={handleCopy} className={styles.pop_addr}>
            <div>
              <img src={wallet} />
              <span className="ml10">{abbrTxHash(account || tronAccount)}</span>
            </div>
            <img src={copyIcon} />
          </div>

          <div className={styles.pop_currency}>
            <img style={{ borderRadius: '50%' }} src={symbolImgObj[symbol]} />
            <span className="ml6">{balance} {symbol}</span>
          </div>
          {
            userInfo.staked &&
            <Button onClick={goStake} className={styles.pop_stake} type="primary"><img className={styles.stake_icon} width={16} src={stake} /> Farm</Button>
          }
          <Button onClick={goClaim} className={`mt10 btn_multicolour ${styles.pop_stake}`} type="primary"> Claim</Button>
        </div>


        <div className={styles.pop_my_box}>
          <div className={styles.pop_my_item}>
            <Link onClick={cancel} to={`/profile/${userInfo.handleName}`}><img className="mr8" width={28} src={profile} alt="" />{t('Profile')}</Link>
          </div>
          <div className={`${styles.pop_my_item} ${styles.h5_noShow}`}>
            <Link onClick={cancel} to={`/collectionManage`}><img className="mr8" width={28} src={collection} alt="" />My Collection</Link>
          </div>
          {
            <div className={`${styles.pop_my_item} ${styles.h5_noShow}`}>
              <a onClick={handleGoCreate}><img className="mr8" width={28} src={nft} />Create NFT</a>
            </div>
          }
          {/* <div className={styles.pop_my_item}>
            <Link onClick={cancel} to=""><img className="mr8" src={nft} />{t('my_nft')}</Link>
          </div>
          <div className={styles.pop_my_item}>
            <Link onClick={cancel} to=""><img className="mr8" src={activity} />{t('activity')}</Link>
          </div> */}
          <div className={`${styles.pop_my_item} ${styles.h5_noShow}`}>
            <Link onClick={cancel} to={`/badgeManage`}><img className="mr8" width={28} src={activity} alt="" />My Event</Link>
          </div>
        </div>
      </div>

      <div className={styles.pop_footer}>
        <div className={styles.pop_logout}>
          <img src={logout} className="mr8" width={28} />
          <span onClick={logOut} className="cp">{t('Log out')}</span>
        </div>
      </div>
    </>
  )

  const initNotice = async () => {
    let res = await queryNoticeStatus()
    dispatch({
      type: HANDLE_NOTICE_NUM,
      noticeNum: {
        nftactivitynum: res.sale,
        commentnum: res.activity,
        likemenum: res.like
      }
    });
    if (res.activity > 0 || res.like > 0 || res.sale > 0) {
      setIsRedTip(true)
    } else {
      setIsRedTip(false)

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
    if (document.body.clientWidth <= 768) {
      setIsPc(false)
    }
  }, [])

  useEffect(() => {

    if (active && account) {
      const obj = handleIsSignExpired('web3');
      if (obj && isSelf(obj.address, account)) {
        recordWalletType();
        fetchDefaultAccount(account).then(res => {
          setUserInfo(res)
        })
        initNotice()
      }
    } else if (tronActive && tronAccount) {
      const obj = handleIsSignExpired('trx');
      if (obj && isSelf(obj.address, tronAccount)) {
        recordWalletType();
        fetchDefaultAccount(tronAccount).then(res => {
          setUserInfo(res)
        })
        initNotice()
      }
    }

  }, [active, account, tronActive, tronAccount])

  useEffect(() => {
    if ((window.ethereum && active) || (window.tronWeb && tronActive)) {
      setIsArtist(getIsArtist(chainId || tronChainId, account || tronAccount, library || tronLibrary));
      setSymbol(getSymbol(chainId || tronChainId));
      setChainName(getChainType(chainId || tronChainId));
    }
  }, [active, tronActive])

  useEffect(() => {
    setIsShare(currentRoute.path === '/p/:handleName')
  }, [currentRoute])

  return (
    currentRoute.alonePage ? '' :
      <>
        <div
          className={`${styles.main} ${(currentRoute.headerTheme === 'dark' || (currentRoute.headerTheme === 'h5-dark' && !isPc)) ? styles.dark : ''}`}
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
