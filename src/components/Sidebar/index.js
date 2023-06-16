import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { message, Select, MenuItem } from "@mui/material";

import { mainContext } from "../../reducer";
import styles from "./styles.module.scss";
import americaFlag from "assets/img/sidebar/usaFlag.svg";
import koreaFlag from "assets/img/sidebar/koreaFlag.svg";
import chinaFlag from "assets/img/sidebar/chinaFlag.svg";
import japanFlag from "assets/img/sidebar/japanFlag.svg";
import { ReactComponent as SvgMd } from "assets/img/sidebar/medium.svg"
import { ReactComponent as SvgIns } from "assets/img/sidebar/ins.svg"
import { ReactComponent as SvgTg } from "assets/img/sidebar/telegram.svg"
import { ReactComponent as SvgTw } from "assets/img/sidebar/twitter.svg"
import { ReactComponent as SvgDs } from "assets/img/sidebar/discord.svg"
import { useList } from "../../../src/services/topic"
 
export const LanguageBox = () => {
  const { i18n } = useTranslation();

  const changeLocale = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    window.localStorage.setItem('define_lang', selectedLanguage)
  }

  useEffect(() => {
    const i18nextLng = window.localStorage.getItem('i18nextLng')
    if (!window.localStorage.getItem('define_lang') && i18nextLng) {
      window.localStorage.setItem('define_lang', i18nextLng.substr(0, 2))
    }
  }, [])

  return (
    <Select className={`${styles.selectWrap}`} value={i18n.language?.substr(0, 2) || "Language"} onChange={changeLocale}>
      <MenuItem key="en" value='en'>
        <img className={`mr10 dib`} src={americaFlag} width='16px' />EN
      </MenuItem>
      <MenuItem key="ko" value='ko'>
        <img className={`mr10 dib`} src={koreaFlag} width='16px' />한국어
      </MenuItem>
      <MenuItem key="zh" value='zh'>
        <img className={`mr10 dib`} src={chinaFlag} width='16px' />中文
      </MenuItem>
      <MenuItem key="ja" value='ja'>
        <img className={`mr10 dib`} src={japanFlag} width='16px' />日本語
      </MenuItem>
    </Select>
  )
}

export const AboutBox = ({ styleType }) => {
  const { t } = useTranslation();

  const lang = window.localStorage.getItem('define_lang');
  const config = [
    {
      text: "about",
      href: "https://about.define.one/",
    },
    {
      text: "wiki",
      href: "https://docs.define.one/define-a/community-guidelines",
    }
  ]

  return (
    <>
      {
        config.map(item => (
          <div className={`${styleType ? styles.h5_about_item : ''}`} key={item.text}>
            <a className={styles.infoLink} href={item.href} target="_blank">{t(item.text)}</a>
          </div>
        ))
      }
      <div className="df aic jcsb mt14">
        <SvgTg width={28} height={28} className={"cp"} onClick={() => {
          window.open('https://t.me/DeFinePlatform', '_blank')
        }} />
        <SvgMd width={28} height={28} className={"cp"} onClick={() => {
          window.open('https://medium.com/define-platform', '_blank')
        }} />
        <SvgTw width={28} height={28} className={"cp"} onClick={() => {
          window.open('https://twitter.com/DeFinePlatform', '_blank')
        }} />
        <SvgIns width={28} height={28} className={"cp"} onClick={() => {
          window.open('https://www.instagram.com/define_nft/', '_blank')
        }} />
        <SvgDs width={28} height={28} className={"cp"} onClick={() => {
          window.open('https://discord.gg/UYahw74GdG', '_blank')
        }} />
      </div>
    </>
  )
}

const NavItem = ({ item }) => {
  const { t, i18n } = useTranslation();
  const [hover, setHover] = useState(false)
  const { dispatch, state } = useContext(mainContext);

  const handleEnter = () => {
    setHover(true)
  }

  const handleLeave = () => {
    setHover(false)
  }

  return (
    item.link
      ?
      <Link onMouseEnter={handleEnter} onMouseLeave={handleLeave} className={`fs16 ${styles.navItem}`} to={item.link}>
        <div className={`space-between wp100`}>
          <div>
            <img style={{ width: 36, marginRight: 10 }} src={hover ? item.hoverIcon : item.icon} />
            {item.title}
          </div>
          {
            item.title === 'Notifications' && (state.noticeNum.likemenum>0 || state.noticeNum.commentnum> 0 || state.noticeNum.nftactivitynum>0)&&
            <div className="pr30">
              <span className={styles.red_dot}></span>
            </div>
          }
        </div>
      </Link>
      :
      <div className={`${item.haveTitle?'fs24 c_000 fw700':'fs20'} ${styles.navItemGray}`}>
        <img style={{ width: item.haveTitle?0:40, marginRight: 10 }} src={item.icon} />
        {item.title}
      </div>
  )
}

const Sidebar = ({ currentRoute }) => {
  const { t, i18n } = useTranslation();
  const { list, total } = useList(1, document.body.clientHeight>800?5:3)
  const history = useHistory()

  const changeTopic = (content) => {
    history.push(`/topic/${encodeURIComponent(content)}`)
  }

  return (
    currentRoute.navList ?
      <div className={styles.nav}>
        <ul className={styles.box}>
          {
            currentRoute.navList.map(item => (
              <li key={item.title}>
                <NavItem item={item} />
              </li>
            ))
          }
        </ul>
        {
          list.length> 0 && currentRoute.hasTopic &&
          <div className={styles.nav_topic}>
            <div className={styles.topic_box}>
              {
                list.map((item, index) => (
                  <div className={`text_hidden_1 ${styles.topic_item}`} onClick={()=>{changeTopic(item.topic)}}>
                    <span className={`pl8 ${index>2?'fw500':'fw700'} `}>{item.topic}</span>
                  </div>
                ))
              }
            </div>
          </div>
        }
        <div className={styles.navFooterBox}>
          <div>
            <LanguageBox />
          </div>
          <AboutBox />
        </div>
      </div> : ''
  )
}

export default Sidebar;
