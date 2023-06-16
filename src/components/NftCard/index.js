import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { Skeleton } from "@mui/material"

import CountDown from "components/CountDown";
import { formatAmountWithDecimal } from "utils/format";
import styles from "./styles.module.scss";
import defaultImg from "assets/img/defaultImg.jpg";
import { chainTypeComImgObj } from '../../utils/networkConnect';


const NftCard = ({ tokenInfo, className, nftType }) => {
  const [showCountDown, setShowCountDown] = useState(false)
  const [time, setTime] = useState(0)
  const [timeType, setTimeType] = useState('start')
  const [symbol, setSymbol] = useState('ETH')
  const [balance, setBalance] = useState(0)
  const [priceType, setPriceType] = useState('')
  const { t } = useTranslation();
  const history = useHistory();
  const reg = /.gif/
  const [bgSrc, setBgSrc ] = useState(true)
  const defaultBg = useRef()
  const nftSrc = useRef()

  const handleClick = () => {
    if (nftType === 'badge') {
      history.push(`/badge/${tokenInfo.project}/${tokenInfo.type}`)
    } else {
      history.push(`/marketplace/${tokenInfo.contractAddress}/${tokenInfo.chainType}/${tokenInfo.id}`)
    }
  }

  const dealTime = () => {
    const now = Date.now() / 1000;
    const info = tokenInfo.saleInfoList && tokenInfo.saleInfoList[0];
    if (info) {
      let date;
      if (info.type === 'auction') {
        if (info.startAt - now > 0) {
          date = info.startAt;
        } else {
          date = info.closeAt;
          setTimeType('end')
        }
      } else {
        date = info.startAt;
      }

      if (date - now > 0) {
        setTime(date)
        setShowCountDown(true)
      } else {
        setTime(0)
        setShowCountDown(false)
      }
    }
  }

  const dealPrice = () => {
    const info = tokenInfo.saleInfoList && tokenInfo.saleInfoList[0];
    if (info) {
      if (info.type === 'auction') {
        if (info.bidHistories && info.bidHistories.length > 0) {
          setBalance(formatAmountWithDecimal(
            info.bidHistories[info.bidHistories.length - 1].amount1,
            info.token1?.decimals
          ))
        } else {
          setBalance(formatAmountWithDecimal(
            info.amountMin1,
            info.token1?.decimals
          ))
        }
        setPriceType('auction')

      } else {
        setBalance(formatAmountWithDecimal(info.amountTotal1, info.token1?.decimals))
        setPriceType('fixedSwap')
      }
      setSymbol(info.token1?.symbol)

    } else if (tokenInfo.lastPrice) {
      setBalance(formatAmountWithDecimal(
        tokenInfo.lastPrice.price,
        tokenInfo.lastPrice.priceToken?.decimals
      ))
      setSymbol(tokenInfo.lastPrice.priceToken?.symbol)
      setPriceType('last')
    }
  }

  const dealImg = () => {
    defaultBg.current.style.display="none"
    nftSrc.current.style.display="flex"
  }

  useEffect(() => {
    dealTime()
    dealPrice()
  }, [tokenInfo])

  return (
    <div className={`${styles.card} ${showCountDown ? styles.is_auction : ''} ${className || ''}`}>
      <div className={`${styles.card_box}`} onClick={handleClick}>
        <img className={styles.chain_type} src={chainTypeComImgObj[tokenInfo.chainType]} alt="" />

        <div  className={styles.nft_img}>
          <img ref={defaultBg} style={{display:'block'}}  className={styles.nft_img_box} src={defaultImg}></img>
          <div ref={nftSrc} style={{display:'none'}} className={styles.nft_img_box}>
            <img onLoad={dealImg} className={styles.imgSrc} src={tokenInfo.preview?reg.test(tokenInfo.preview)?tokenInfo.image:tokenInfo.preview:tokenInfo.image}></img>
          </div>
          {
            showCountDown && (
              <div className={styles.timer_box}>
                {timeType !== 'end' && <span>Start in </span>}
                <CountDown onEnd={dealTime} time={time} type="word" />
                {timeType === 'end' && <span> Left</span>}
              </div>
            )
          }
        </div>
       
        <div className={`${styles.nft_name} ell`}>{tokenInfo.name}</div>
        {
          priceType === 'auction' && <div className={styles.price_box}>
            <span className={styles.price_bid}>Bid {balance} {symbol}</span>
          </div>
        }
        {
          priceType === 'fixedSwap' && <div className={styles.price_box}>
            <span className={styles.price_bid}>{balance} {symbol}</span>
          </div>
        }
        {
          priceType === 'last' && <div className={styles.price_box}>
            <span className={styles.price_last}>Last : </span><span className={styles.price_last}>{balance} {symbol}</span>
          </div>
        }
      </div>
    </div>
  )
}

export default NftCard;