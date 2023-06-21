import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import styles from './styles.module.scss'
import { chainTypeImgObj } from '../../utils/networkConnect';
import arrowLeft from "assets/img/home/arrow_left.png"
import arrowright from "assets/img/home/arrow_right.png"
import { ReactComponent as IconAirdrop } from "assets/img/creatBadge/airdropIcon.svg"
import CountDown from "components/CountDown";

export default function BadgeCard({ item, type }) {
  const [showCountDown, setShowCountDown] = useState(false)
  const [time, setTime] = useState(0)
  const [timeType, setTimeType] = useState('start')
  const history = useHistory()

  const goToBadgeDetail = (item) => {
    if (item.claimType === 'blindbox') {
      history.push(`/blindbadge/${item.project}`)
    } else if (item.claimType === 'nftPlus') {
      history.push(`/${item.project}`)
    } else {
      if (item.types.length > 1) {
        history.push(`/badge/${item.project}`)
      } else {
        history.push(`/badge/${item.project}/${item.types[0]}`)
      }
    }
  }

  const dealTime = () => {
    const now = Date.now();
    const info = item;
    if (info) {
      let date;
      if (info.eventStartTime - now > 0) {
        date = info.eventStartTime;
        setTime(date)
      } else {
        date = info.eventEndTime;
        setTimeType('end')
        if (date - now > 0) {
          setTime(date)
          setShowCountDown(true)
        } else {
          setTime(0)
          setShowCountDown(false)
        }
      }
    }
  }

  useEffect(() => {
    dealTime()
  }, [item])

  return (
    <div className={styles.card_box_c}>
      <div className={`${styles.border_default} ${(item.status === 'active' && type !== 'collector') ? styles.border_activity : ''}`} onClick={() => { goToBadgeDetail(item) }}>
        <div style={{ backgroundImage: `url(${item.image})` }} className={styles.badge_item}>
          {
            type === 'collector' && <img className={styles.card_chain} src={chainTypeImgObj[item.chainType]} />
          }
          <div className={styles.item_footer}>
            <div className={`${styles.footer_name} ell`}>{item.name}</div>
            <div className={styles.footer_content}>
              <img className={styles.badge_logo} src={item.logo} />
              <span className={styles.item_name}>dasdd dasd</span>
            </div>
          </div>


          {
            type !== 'collector' && (
              showCountDown ? (
                <div className={styles.item_activity}>
                  {timeType === 'end' && <span>Close at </span>}
                  <CountDown onEnd={dealTime} time={time / 1000} type="word" />
                </div>
              ) : (
                !!time && (
                  <div className={styles.item_foreshow}>
                    <span>Start at </span>
                    {new Date(time).toLocaleString()}
                  </div>
                )
              )
            )
          }
        </div>
      </div>
    </div>
  )
}