import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.scss'
import { chainTypeImgObj } from '../../utils/networkConnect';
import arrowLeft from "assets/img/home/arrow_left.png"
import arrowright from "assets/img/home/arrow_right.png"
import {ReactComponent as IconAirdrop } from "assets/img/creatBadge/airdropIcon.svg"

export default function BadgeCard({ item }) {
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

  return (
    <div className={styles.card_box_c}>
      <div className={`${styles.border_default} ${item.status === 'active' ? styles.border_activity : ''}`} onClick={() => { goToBadgeDetail(item) }}>
        <div style={{ backgroundImage: `url(${item.image})` }} className={styles.badge_item}>
          <img className={styles.card_chain} src={chainTypeImgObj[item.chainType]} />
          {/* <IconAirdrop className={styles.card_type}></IconAirdrop> */}
          <div className={styles.item_footer}>
            <div className={styles.footer_content}>
              <img className={styles.badge_logo} src={item.logo} />
              <span className={styles.item_name}>{item.name}</span>
            </div>
          </div>
          {
            item.status === 'active' &&
            <div className={styles.item_activity}>
              <img className='pr6' src={arrowLeft}></img>
              <span className={styles.activity_pc}>ACTIVITY! JOIN NOW!</span>
              <span className={styles.activity_h5}>ACTIVITY!</span>
              <img className='pl6' src={arrowright}></img>
            </div>
          }
        </div>
      </div>
    </div>
  )
}