import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem } from "@mui/material";

import styles from "./styles.module.scss";
import { ReactComponent as SvgMd } from "assets/img/sidebar/medium.svg"
import { ReactComponent as SvgIns } from "assets/img/sidebar/ins.svg"
import { ReactComponent as SvgTg } from "assets/img/sidebar/telegram.svg"
import { ReactComponent as SvgTw } from "assets/img/sidebar/twitter.svg"
import { ReactComponent as SvgDs } from "assets/img/sidebar/discord.svg"
import email from "assets/img/sidebar/email.png"
import americaFlag from "assets/img/sidebar/usaFlag.svg";
import koreaFlag from "assets/img/sidebar/koreaFlag.svg";
import chinaFlag from "assets/img/sidebar/chinaFlag.svg";
import japanFlag from "assets/img/sidebar/japanFlag.svg";


const Footer = () => {
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
    <div className={`${styles.footer_box} df_center`}>
      <SvgTg width={28} height={28} className={"cp mr14"} onClick={() => {
        window.open('https://t.me/DeFinePlatform', '_blank')
      }} />
      <SvgMd width={28} height={28} className={"cp mr14"} onClick={() => {
        window.open('https://medium.com/define-platform', '_blank')
      }} />
      <SvgTw width={28} height={28} className={"cp mr14"} onClick={() => {
        window.open('https://twitter.com/DeFinePlatform', '_blank')
      }} />
      <SvgIns width={28} height={28} className={"cp mr14"} onClick={() => {
        window.open('https://www.instagram.com/define_nft/', '_blank')
      }} />
      <SvgDs width={28} height={28} className={"cp mr14"} onClick={() => {
        window.open('https://discord.gg/UYahw74GdG', '_blank')
      }} />
      <div className={`${styles.column}`}></div>
      <a href="mailto:contact@de-fine.art" className={`${styles.email}`}><img className={`${styles.email_img}`} src={email} alt="" />contact@de-fine.art</a>
      <div className={`${styles.column}`}></div>
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
    </div>
  )
}

export default Footer;
