import React, { useEffect, useState } from 'react'
import { Button, Skeleton, Row, Col } from "@mui/material";
import { useHistory, Link } from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, EffectCreative, EffectCube } from "swiper";
import 'swiper/swiper.min.css';
import "swiper/swiper-bundle.min.css";

import { useBadgeProjectList } from "../../services/badge"
import { useCollectionList } from "../../services/collectionList"
import { useNeedSign } from "hooks/account"
import arrow from "assets/img/home/arrow.png"
import iconviewAll from "assets/img/home/icon_viewall.svg"
import { ReactComponent as Iconhot } from "assets/img/home/icon_hot.svg";
import { ReactComponent as IconGame } from "assets/img/home/icon_game.svg";
import { ReactComponent as IconCollection } from "assets/img/home/icon_nfts.svg";
import { ReactComponent as IconArtical } from "assets/img/home/icon_Articles.svg";
import iconhot from "assets/img/home/icon_hot.svg"
import icongame from "assets/img/home/icon_game.svg"
import iconcollection from "assets/img/home/icon_collection.svg"
import iconmedia from "assets/img/home/icon_media.svg"
import iconarticle from "assets/img/home/icon_article.svg"
import styles from "./styles.module.scss";
import { getBannerList, getMedium } from '../../services/home.js'
import BadgeCard from "components/BadgeCard";

export default function Explore() {
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const { list, total } = useBadgeProjectList(pageNo, 4, setLoading, '', '', '')
  const { collectionList } = useCollectionList(1, 6, '', '', '', '')
  const { collectionList: gameList } = useCollectionList(1, 6, '', 'game', '', '')
  const [gameShow, setGameShow] = useState(true)
  const [collectionShow, setCollectionShow] = useState(false)
  const [isPc, setIsPc] = useState(true)
  const loadingList = [1, 2, 3, 4]
  const history = useHistory()
  const [bannerList, setBannerList] = useState([])
  const [articlesList, setArticlesList] = useState([])
  const { needSign } = useNeedSign();

  const queryBanners = async () => {
    let list = await getBannerList()
    setBannerList(list)
  }
  const gotoCreateEvent = () => {
    needSign(() => {
      history.push('/badgeManage')
    })
  }
  const gotoEvents = () => {
    history.push('/events')
  }
  const gotoBades = () => {
    history.push('/badgeEntry')
  }
  const gotoCollections = () => {
    history.push('/collections')
  }
  const goToCollectionDetail = (item) => {
    history.push(`collection/${item.type}`)
  }
  const showGamingNft = () => {
    setGameShow(true)
    setCollectionShow(false)
  }
  const showCollectionNft = () => {
    setGameShow(false)
    setCollectionShow(true)
  }
  const queryMediums = async () => {
    let res = await getMedium()
    setArticlesList(res)
  }
  useEffect(() => {
    if (document.body.clientWidth < 800) {
      setIsPc(false)
    }
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 800) {
        setIsPc(false)
      } else {
        setIsPc(true)
      }
    })
    queryBanners()
    queryMediums()
  }, [])
  return (
    <div className={`${styles.home}`}>
      <div className={styles.home_header}>
        <div className={styles.header_left}>
          <div className={styles.header_title}>DeFine Badge Gallery</div>
          <div className={styles.header_content}>Collection of unique badges to build your digital identities.</div>
          <Button className={styles.header_allEvents} onClick={gotoCreateEvent}>Create Badge Event &nbsp; <img src={arrow}></img></Button>
          <Button className={styles.header_prupleBtn} onClick={gotoEvents}>View All Events</Button>
        </div>
        <div className={styles.header_right}>
          <Swiper className={styles.swiperList}
            modules={[Navigation, EffectCoverflow]}
            navigation={true}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 0,
              stretch: 100,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            speed={600}
            autoplay={true}
            grabCursor={true}
            slidesPerView={1}
            initialSlide={3}
            loopAdditionalSlides={2}
            loop={true}
          >
            {
              bannerList.map(item => (
                <SwiperSlide>
                  <div className={styles.swiper_banner}>
                    {
                      item.link && <Link key={item.link} to={item.link}><img src={item.image}></img></Link>
                    }
                    {
                      item.url && <a key={item.url} href={item.url} target="_blank"><img src={item.image}></img></a>
                    }
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <div className={styles.banner_h5}>
        <Swiper className={styles.swiperList}
          spaceBetween={20}
          speed={600}
          loop={true}
          initialSlide={1}
          autoplay={true}
        >
          {
            bannerList.map(item => (
              <SwiperSlide>
                <div className={styles.swiper_banner}>
                  {
                    item.link && <Link key={item.link} to={item.link}><img src={item.image}></img></Link>
                  }
                  {
                    item.url && <a key={item.url} href={item.url} target="_blank"><img src={item.image}></img></a>
                  }
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className={`mt20 ${styles.recent_badge}`}>
        <div className={`space-between-center ${styles.mb30_h5}`}>
          <div className='df'>
            <Iconhot className={styles.title_icon}></Iconhot>
            {/* <img className={styles.title_icon} src={iconhot}></img> */}
            <span className={`${styles.title} pl10`}>Recent Badges</span>
          </div>
          <div className='cp' onClick={gotoBades}>
            <span>View All <img src={iconviewAll}></img></span>
          </div>
        </div>
        <div className={styles.list_box}>
          {
            loading ?
              loadingList.map(v => (
                <div key={v} className={styles.loading_skeleton}>
                  <Skeleton />
                </div>
              )) :
              list.map(item => (
                <BadgeCard key={item.project} item={item} />
              ))
          }
        </div>
      </div>
      <div className={`${styles.gaming_nft}`}>
        <div className={`space-between-center ${styles.mb30_h5}`}>
          <div className='df_align_center'>
            <div className='df_align_center cp' onClick={showGamingNft}>
              <IconGame className={styles.title_icon} fill={`${gameShow ? '#7A2472' : '#876D9B'}`}></IconGame>
              <span className={`${styles.title} ${!gameShow ? styles.title_noSelected : null} pl10`}>Gaming NFT</span>
            </div>
            <div className={`df_align_center cp ${styles.collection_menu}`} onClick={showCollectionNft}>
              <IconCollection className={styles.title_icon} fill={`${collectionShow ? '#7A2472' : '#876D9B'}`}></IconCollection>
              {/* <span className={`${styles.title} pl10`}>Notable collections</span> */}
              <span className={`${styles.title} ${!collectionShow ? styles.title_noSelected : null} pl10`}>Collections</span>
            </div>
          </div>
          <div className={`cp ${styles.viewAll_pc}`} onClick={gotoCollections}>
            <span>View All <img src={iconviewAll}></img></span>
          </div>
        </div>
        {
          gameShow &&
          <>
            {
              gameList.length > 0 ?
                <div className={`${styles.game_list}`}>
                  {
                    gameList.map(item => (
                      <div className={styles.card_nft_box}>
                        <div style={{ backgroundImage: `url(${item.image})` }} className={styles.nft_item} onClick={() => { goToCollectionDetail(item) }}>
                          <div className={styles.item_info}>
                            <div className={styles.item_name}>{item.name}</div>
                            <div className={styles.item_count}>{item.count} items</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div> :
                <div className={styles.list_spaceBetween}>
                  {
                    [1, 2, 3, 4, 5, 6].map(v => (
                      <div key={v} className={styles.loading_skeleton_game}>
                        <Skeleton />
                      </div>
                    ))
                  }
                </div>
            }
          </>
        }
        {
          collectionShow &&
          <div className={`${styles.game_list}`}>
            {
              collectionList.length > 0 ? collectionList.map(item => (
                <div className={styles.card_nft_box}>
                  <div style={{ backgroundImage: `url(${item.image})` }} className={styles.nft_item} onClick={() => { goToCollectionDetail(item) }}>
                    <div className={styles.item_info}>
                      <div className={styles.item_name}>{item.name}</div>
                      <div className={styles.item_count}>{item.count} items</div>
                    </div>
                  </div>
                </div>
              )) :
                [1, 2, 3, 4, 5, 6].map(v => (
                  <div key={v} className={styles.loading_skeleton_game}>
                    <Skeleton.Image />
                  </div>
                ))
            }
          </div>
        }
        <div className={`cp ${styles.viewAll_h5}`} onClick={gotoCollections}>
          <span>View All <img src={iconviewAll}></img></span>
        </div>
      </div>
      <div className={`mt20 ${styles.articles}`}>
        <div className={`space-between ${styles.mb30_h5}`}>
          <div className='df'>
            <IconArtical className={styles.title_icon}></IconArtical>
            {/* <img className={styles.title_icon} src={iconarticle}></img> */}
            <span className={`${styles.title} pl10`}>Articles</span>
          </div>
        </div>
        <Swiper
          slidesPerView={isPc ? 3 : 1}
          spaceBetween={0}
          loop={false}
          navigation={true}
          modules={[Navigation]}
        >
          {
            articlesList.slice(0, 5).map(item => (
              <SwiperSlide >
                <div className={styles.article_item}>
                  <a key={item.link} target="_blank" href={item.link}>
                    <div className={styles.item_content}>
                      <img className={styles.item_img} src={item.img}></img>
                      <div className={styles.item_name}>
                        <div className='df_align_center text_hidden_1'>
                          <img className='mr6' width={25} src={iconmedia}></img>{item.title}
                        </div>
                      </div>
                    </div>
                    <div className={styles.item_intro}>{item.content}</div>
                  </a>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}
