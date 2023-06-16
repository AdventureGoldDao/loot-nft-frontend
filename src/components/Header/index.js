import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import Web3 from "web3";
import { Button, Popover, Select, MenuItem } from "@mui/material";
import copy from 'copy-to-clipboard';

import { useActiveWeb3React } from "../../web3";
import { getChainType } from "../../web3/address";
import { fetchDefaultAccount, recordWalletType } from "../../services/account";
import { queryNoticeStatus } from "../../services/message";
import { handleIsSignExpired, clearLocalStorage } from '../../utils/txSign'
import { chainTxtObj, chainArr, chainFun, symbolImgObj } from '../../utils/networkConnect';
import { LanguageBox, AboutBox } from "../Sidebar";
import BackButton from "../BackButton";
import { useActiveTronWeb } from "hooks/activeTronWeb";
import { useBalance, useNeedSign } from "hooks/account";
import { getIsArtist } from "../../utils/handleContract";
import { abbrTxHash } from "../../utils/format";
import { getSymbol } from "../../utils/symbol";
import { isSelf, getQueryString } from "utils/index";
import { mainContext } from "../../reducer";
import { HANDLE_SHOW_CONNECT_MODAL, HANDLE_HIDE_EVENT_MODAL, HANDLE_NOTICE_NUM } from "../../const";
import styles from "./styles.module.scss";
import logo from "assets/img/logo.png";
import logoFull from "assets/img/logoFull.png";
import copyIcon from "assets/img/header/copy.svg";
import wallet from "assets/img/header/wallet.svg";
// import stake from "assets/img/header/stake.svg";
import stake from "assets/img/header/stakeNew.svg";
import nft from "assets/img/header/nft.svg";
import profile from "assets/img/header/profile.svg";
import create from "assets/img/header/create.svg";
import activity from "assets/img/header/activity.svg";
import collection from "assets/img/header/collection.svg";
import more from "assets/img/header/more.svg";
import moreG from "assets/img/header/more_g.svg";
import wow from "assets/img/header/wow.svg";
import market from "assets/img/header/market.svg";
import nftPlus from "assets/img/header/nftPlus.svg";
import badge from "assets/img/header/badge.svg";
import vote from "assets/img/header/vote.svg";
import wowB from "assets/img/header/wow_2.svg";
import marketB from "assets/img/header/market_2.svg";
import nftPlusB from "assets/img/header/nftPlus_2.svg";
import badgeB from "assets/img/header/badge_2.svg";
import voteB from "assets/img/header/vote_2.svg";
import dao from "assets/img/header/dao.png";
import daoB from "assets/img/header/dao_2.png";
import home from "assets/img/header/home.svg";
import homeB from "assets/img/header/home_2.svg";
import feed from "assets/img/header/feed.svg";
import feedB from "assets/img/header/feed_2.svg";
import logout from "assets/img/header/logout.svg";
import events from "assets/img/header/events.svg";
import hot from "assets/img/header/hot.svg";
import switchSvg from "assets/img/header/switch.svg";
import notifications from "assets/img/message/notifcations.svg";
import Avatar from "components/Avatar";
import { rgba } from "@react-spring/shared";


const Header = ({ currentRoute }) => {
  const [isArtist, setIsArtist] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [showBox, setShowBox] = useState('');
  const [symbol, setSymbol] = useState('ETH')
  const [chainName, setChainName] = useState('Ethereum')
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

  const handleVisibleChange = () => {
    setShowPop(false)
  }

  const handleGoCreate = () => {
    cancel()
    history.push('/collectionManage/createNFT')
  }

  const handleEventShow = () => {
    dispatch({
      type: HANDLE_HIDE_EVENT_MODAL,
      hideEventModal: false
    });
  }

  const handleSwitchChain = (chain) => {
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
  const goToMessage = () => {
    setIsRedTip(false)
    history.push('/message/likeme')
  }

  const goWow = () => {
    setIsRedTip(false)
    history.push('/wow')
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
      setChainName(chainTxtObj[getChainType(chainId || tronChainId)]);
    }
  }, [active, tronActive])

  useEffect(() => {
    setIsShare(currentRoute.path === '/p/:handleName')
  }, [currentRoute])

  return (
    currentRoute.alonePage ? '' : isShare ?
      <div className={styles.header_share}>
        <div className="df_align_center">
          <Link to="/" style={{ marginRight: 8 }}><img width={20} style={{ display: 'block' }} src={logo} /></Link>
          <span className={styles.h5_hidden}>Powered by DeFine</span>
        </div>
        <div onClick={goMine} className={styles.create_btn}><img className="mr6" src={hot} />Create my ONE-PAGE</div>
      </div> :
      <>
        <div
          className={`${styles.main} ${(currentRoute.headerTheme === 'dark' || (currentRoute.headerTheme === 'h5-dark' && !isPc)) ? styles.dark : ''}`}
          style={{
            background: (currentRoute.headerTheme === 'dark' || (currentRoute.headerTheme === 'h5-dark' && !isPc)) ? `rgba(0, 0, 0, ${bgOpacity})` : `rgba(255, 255, 255, ${bgOpacity})`
          }}
        >
          <div className={styles.box}>
            <div className="df aic">
              <Link to="/"><img className={styles.logo} src={logoFull} /></Link>
              <a href="https://definekr.io/" style={{ width: 54 }} className={styles.nav}>Feed</a>
              <Link to="/badgeEntry" style={{ width: 54 }} className={styles.nav}>Badge</Link>
              <Link to="/marketplace" style={{ width: 56 }} className={styles.nav}>Market</Link>
              {/* <Link to="/nftplus" style={{ width: 41 }} className={styles.nav}>NFT+</Link> */}
              <Link to="/vote" style={{ width: 100 }} className={styles.nav}>Governance</Link>
            </div>

            <div className="df aic">
              <div className={styles.notice} onClick={goWow}>
                <img width={24} src={wow}></img>
                {
                  (state.noticeNum.nftactivitynum > 0 || state.noticeNum.commentnum > 0 || state.noticeNum.likemenum > 0) &&
                  <span className={styles.notice_num}>{state.noticeNum.nftactivitynum + state.noticeNum.commentnum + state.noticeNum.likemenum}</span>
                }
              </div>
              {
                (active || tronActive) &&
                <Select
                  onChange={handleSwitchChain}
                  value={chainName}
                  className={styles.select_box}
                  getPopupContainer={triggerNode => triggerNode.parentElement}
                  dropdownClassName={styles.select_option}
                >
                  {
                    chainArr.map(item => (
                      <MenuItem key={item.name} value={item.name}>
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
                    size="large"
                    className="btn_multicolour"
                    style={{ border: 'none' }}
                  >{t('connect_wallet')}</Button>
                  : <Popover
                    open={showPop}
                    onClose={handleVisibleChange}
                    overlayClassName={styles.pop}
                    placement="bottomRight"
                    content={content}
                    trigger="click"
                  >
                    <div>

                      <Avatar isOwnedNft={userInfo.avatarFromOwnedNft} url={userInfo.avatar} size={36} tagSize={34} leftP={1}></Avatar>
                    </div>
                    {/* <img className={styles.avatar} src={userInfo.avatar} /> */}
                  </Popover>
              }
            </div>
          </div>

          <div className={styles.box_h5}>
            <Link onClick={cancel} to="/"><img className={styles.logo} src={logo} /></Link>
            <div className="df aic">
              {
                (active || tronActive) &&
                <Select
                  onChange={handleSwitchChain}
                  value={chainName}
                  className={styles.select_box}
                >
                  {
                    chainArr.map(item => (
                      <MenuItem key={item.name} value={item.name}>
                        <img className={styles.option_img} src={item.icon} alt={item.name} />
                        <span className={styles.option_name}>{item.name}</span>
                      </MenuItem>
                    ))
                  }
                </Select>
              }
              {/* <div className={styles.notice} onClick={goToMessage}>
              <img width={14} src={notifications}></img>
              {
                isRedTip && 
                <span className={styles.notice_tip}></span>
              }
            </div> */}
              {
                !(active || tronActive)
                  ? <Button
                    onClick={() => {
                      dispatch({
                        type: HANDLE_SHOW_CONNECT_MODAL, showConnectModal: true
                      });
                    }}
                    className="btn_multicolour"
                    style={{ border: 'none' }}
                  >{t('connect_wallet')}</Button>
                  : <div className="df">
                    <Avatar onClick={() => { setShowBox(oldStr => oldStr === 'mine' ? '' : 'mine') }} isOwnedNft={userInfo.avatarFromOwnedNft} url={userInfo.avatar} size={36} tagSize={34} leftP={1}></Avatar>
                    {/* <img onClick={() => { setShowBox(oldStr => oldStr === 'mine' ? '' : 'mine') }} className={styles.avatar} src={userInfo.avatar} /> */}
                    <img onClick={() => { setShowBox(oldStr => oldStr === 'about' ? '' : 'about') }} className={styles.more} src={(currentRoute.headerTheme === 'dark' || (currentRoute.headerTheme === 'h5-dark' && !isPc)) ? moreG : more} />
                  </div>
              }
            </div>
          </div>
        </div>

        <div className={styles.nav_footer}>
          <Link to="/" className={styles.nav_footer_item}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'home' ? homeB : home} />
            <span className={styles.nav_footer_text}>Home</span>
          </Link>
          {/* {
          currentRoute.parent === 'home' ?
            <span onClick={handleEventShow} className={styles.nav_footer_item}>
              <img className={styles.nav_footer_img} src={events} />
              <span className={styles.nav_footer_text}>Event</span>
            </span> :
            <Link to="/" className={styles.nav_footer_item}>
              <img className={styles.nav_footer_img} src={currentRoute.parent === 'home' ? wowB : wow} />
              <span className={styles.nav_footer_text}>Home</span>
            </Link>
        } */}
          <a href="https://definekr.io/" className={styles.nav_footer_item}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'feed' ? feedB : feed} />
            <span className={styles.nav_footer_text}>Feed</span>
          </a>
          <Link to="/badgeEntry" className={styles.nav_footer_item}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'badge' ? badgeB : badge} />
            <span className={styles.nav_footer_text}>Badge</span>
          </Link>
          <Link to="/marketplace" className={styles.nav_footer_item}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'market' ? marketB : market} />
            <span className={styles.nav_footer_text}>Market</span>
          </Link>
          {/* <Link to="/nftplus" className={styles.nav_footer_item}>
          <img className={styles.nav_footer_img} src={currentRoute.parent === 'nftPlus' ? nftPlusB : nftPlus} />
          <span className={styles.nav_footer_text}>NFT+</span>
        </Link> */}
          <Link to="/vote" className={`${styles.nav_footer_item} wp24`}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'dao' ? daoB : dao} />
            <span className={styles.nav_footer_text}>DAO</span>
          </Link>
          {/* <Link to="/wow" className={`${styles.nav_footer_item} wp24`}>
            <img className={styles.nav_footer_img} src={currentRoute.parent === 'message' ? wowB : wow} />
            <span className={styles.nav_footer_text}>Message</span>
          </Link> */}
        </div>

        {
          showBox && <div className={styles.nav_h5_body}>
            <div style={{ margin: "16px 24px" }}>
              <BackButton onClick={cancel} />
            </div>
            <div>
              {
                showBox === 'mine'
                  ? <div className={styles.nav_h5_my}>{content}</div>
                  : <div>
                    <div className={styles.nav_h5_about}>
                      <AboutBox styleType="h5" />
                    </div>
                    <div className={styles.nav_h5_language}>
                      <LanguageBox />
                    </div>
                  </div>
              }
            </div>
          </div>
        }
      </>
  )
}

export default Header;
