import React, { useEffect, useState } from 'react'
import { Select, MenuItem } from "@mui/material";
import { useHistory, Link } from 'react-router-dom';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, EffectCreative, EffectCube } from "swiper";
import { handleIsSignExpired, clearLocalStorage } from '../../utils/txSign'
import { useActiveWeb3React } from "../../web3"
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
import { ReactComponent as DisconnectIcon } from 'assets/img/disconnect.svg'
import { abbrTxHash } from "../../utils/format";

const typesArr = [
  { value: 'all', label: 'All NFTs' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'upcoming', label: 'Upcoming' },
]

export default function Collector() {
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const { list, total } = useBadgeProjectList(pageNo, 50, setLoading, '', '', '')
  const { collectionList } = useCollectionList(1, 6, '', '', '', '')
  const { collectionList: gameList } = useCollectionList(1, 6, '', 'game', '', '')
  const [gameShow, setGameShow] = useState(true)
  const [collectionShow, setCollectionShow] = useState(false)
  const [isPc, setIsPc] = useState(true)
  const loadingList = [1, 2, 3, 4]
  const history = useHistory()
  const [bannerList, setBannerList] = useState([])
  const [articlesList, setArticlesList] = useState([])
  const [nftType, setNftType] = useState('all')
  const { needSign } = useNeedSign();
  const { library, account, chainId, active } = useActiveWeb3React()

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
  const handleSwitchNftType = (event) => {
    setNftType(event.target.value)
  }

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
      <div className="space-between-center">
        <div className={styles.title}>Collector</div>
      </div>
      <div className={styles.dis_box}>
        <div className={styles.h5_hide}>{account}</div>
        <div className={styles.h5_show}>{abbrTxHash(account, 5, 4)}</div>
        <div onClick={logOut} className="df_align_center cp">
          <span className={styles.text}>Disconnect</span>
          <DisconnectIcon />
        </div>
      </div>

      <div className={styles.content}>
        {
          list.map(item => (
            <BadgeCard key={item.project} item={item} type="collector" />
          ))
        }
      </div>
    </div>
  )
}
