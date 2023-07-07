import React, { useEffect, useState } from 'react'
import { Button, Grid } from "@mui/material";
import { useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import 'swiper/swiper.min.css';
import "swiper/swiper-bundle.min.css";


import { useBadgeProjectList } from "../../services/badge"
import BadgeCard from 'components/BadgeCard';

import test2 from 'assets/img/test/test2.png'
import test3 from 'assets/img/test/test3.png'
import test4 from 'assets/img/test/test4.png'
import upcoming from 'assets/img/home/icon_upcoming.png'
import recent from 'assets/img/home/icon_recent.png'
import footBg from 'assets/img/home/foot_bg.png'
import footShow from 'assets/img/home/foot_show.png'
import footShowH5 from 'assets/img/home/foot_show_h5.png'

import styles from './styles.module.scss'

export default function Home() {
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { list, total } = useBadgeProjectList(pageNo, 10, setLoading, '', '', '')

  const swiperList = [
    {
      src: test2,
      name: 'NFT Named on 15 June',
      des: 'Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.',
      start: 1680512144000,
      end: 1693472148000,
      chainType: 'mumbai',
      amount: 1000,
      claimed: 400,
      creator: 'Amber Lee'
    },
    {
      src: test3,
      name: 'NFT Named on 15 June',
      des: 'Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.',
      start: 1680512144000,
      end: 1693472148000,
      chainType: 'mumbai',
      amount: 1000,
      claimed: 400,
      creator: 'Amber Lee'

    },
    {
      src: test4,
      name: 'NFT Named on 15 June',
      des: 'Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.',
      start: 1680512144000,
      end: 1693472148000,
      chainType: 'mumbai',
      amount: 1000,
      claimed: 400,
      creator: 'Amber Lee'
    }
  ]
  const slideChange = (event) => {
    let a = countIndex(swiperList.length, event.activeIndex)
    setSwiperIndex(a - 1)
  }
  const countIndex = (a, b) => {
    if (a >= b) {
      return b;
    } else {
      let c = b - a;
      while (c > a) {
        c -= a;
      }
      return c;
    }
  }

  useEffect(() => {
  }, [])
  return (
    <div className={styles.page_home}>
      <div className={styles.home_swiper} >
        <div className={styles.swiper_bg} style={{ backgroundImage: `url(${swiperList[swiperIndex].src})` }}></div>
        <Swiper modules={[Navigation, Autoplay]}
          onSlideChange={slideChange}
          navigation={true}
          speed={3000}
          autoplay={true}
          loop={true}
        >
          {
            swiperList.map(item => (
              <SwiperSlide key={item.name}>
                <Grid container className={`pl30 pt20 pr30`}>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <div className={styles.swiper_cover}>
                      <img src={item.src}></img>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={8} className={`pl40`}>
                    <div>Create by <span className='c_green fw600'>Amber Lee</span> </div>
                    <div className={`c_green mt10 text_hidden_1 ${styles.nft_name}`}>NFT Named on 15 June</div>
                    <div className={`text_hidden_3 ${styles.nft_des}`}>Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.</div>
                    <div className='df mt30'>
                      <div className='f3'>
                        <div>Status</div>
                        <div className='c_green fw600 mt10 fs24'>Ended at 21 hours</div>
                      </div>
                      <div className='f2'>
                        <div>Status</div>
                        <div className='c_green fw600 mt10 fs24'>400/1,000</div>
                      </div>
                      <div className='f1'>
                        <div>Network</div>
                        <div className='c_green fw600 mt10 fs24'>Ethereum</div>
                      </div>
                    </div>
                    <div className={styles.mint_btn}>
                      <Button className={`w200 h40 btn_multicolour`} disableRipple>Free Mint</Button>
                    </div>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className={styles.home_swiper_h5}>
        <div className={styles.swiper_cover}>
          <img src={swiperList[0].src}></img>
        </div>
        <div className={styles.swiper_info}>
          <div>Create by <span className='c_green fw600'>Amber Lee</span> </div>
          <div className={`c_green mt10 ell ${styles.nft_name}`}>NFT Named on 15 June</div>
          <div className={`text_hidden_3 ${styles.nft_des}`}>Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.</div>
          <div className='df_h5 mt30'>
            <div className='f1'>
              <div>Status</div>
              <div className='c_green fw600 mt10 fs24'>Ended at 21 hours</div>
            </div>
            <div className='f1'>
              <div>Status</div>
              <div className='c_green fw600 mt10 fs24'>400/1,000</div>
            </div>
            <div className='f1'>
              <div>Network</div>
              <div className='c_green fw600 mt10 fs24'>Ethereum</div>
            </div>
          </div>
          <div className={styles.mint_btn}>
            <Button className={`w200 h40 btn_multicolour`} disableRipple>Free Mint</Button>
          </div>
        </div>
      </div>
      <div className={styles.page_content}>
        <div className={styles.game_magic}>
          <div className={styles.title}>Mighty Magic HEROES</div>
          <div className='df'>
            <div className={styles.btn_border}>AVG</div>
            <div className={styles.btn_border}>Free Mint</div>
          </div>
          <div className={`mb30 lh24`}>Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!</div>
          <Button className='w200 h40 btn_themeColor'>Learn More</Button>
        </div>
      </div>
      <div className={styles.page_content}>
        <div className='space-between-center'>
          <div className='df_align_center'>
            <img width={44} src={recent}></img>
            <span className={styles.page_content_title}>Recent Claims</span>
          </div>
          <div className={`c_green fw600 ${styles.viewAll}`}>
            view all &gt;
          </div>
        </div>
        <div className={styles.content}>
          {
            list.map(item => (
              <BadgeCard key={item.project} item={item} type="explore" />
            ))
          }
        </div>
        <div className={`c_green fw600 ${styles.viewAll_h5}`}>
          view all &gt;
        </div>
      </div>
      <div className={styles.page_foot} style={{ backgroundImage: `url(${footBg})` }}>
        <div className={styles.foot_content}>
          <div className={styles.foot_title}>Shaping the <span className='c_green'>future</span> of the on-chain art industry</div>
          <div className='c_green tac mt10'>Join this revolution with over 300 other pioneering artists</div>
          <div className='tac mt30'>
            <Button className={styles.learnMore_btn}>Learn More</Button>
          </div>
        </div>
        <div className={`tac mt10 ${styles.foot_show_box}`}>
          <img className={styles.footShow} src={footShow}></img>
        </div>
        <div className={`tac pt10 ${styles.foot_show_box_h5}`}>
          <img className={styles.footShow} src={footShowH5}></img>
        </div>
      </div>
    </div>
  )
}
