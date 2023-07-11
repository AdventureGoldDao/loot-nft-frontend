import React, { useEffect, useState } from 'react'
import { Button, Grid, Backdrop, CircularProgress } from "@mui/material";
import { useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import 'swiper/swiper.min.css';
import "swiper/swiper-bundle.min.css";
import moment from 'moment';
import { BREAKPOINTS } from 'theme';

import { useCollectionList } from "../../services/createNFTManage"
import BadgeCard from 'components/BadgeCard';
import { chainTxtObj, chainFun } from '../../utils/networkConnect';

import test2 from 'assets/img/test/test2.png'
import test3 from 'assets/img/test/test3.png'
import test4 from 'assets/img/test/test4.png'
import upcoming from 'assets/img/home/icon_upcoming.png'
import recent from 'assets/img/home/icon_recent.png'
import footBg from 'assets/img/home/foot_bg.png'
import footShow from 'assets/img/home/foot_show.png'
import footShowH5 from 'assets/img/home/foot_show_h5.png'

import styled from 'styled-components';

const PageHome = styled.div`
  width: 100%;
  font-family: 'Inconsolata'; 
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: -70px;
  }
`
const HomeSwiper = styled.div`
  position: relative;
  padding: 60px 100px;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
    padding: 0;
  }

  .swiper-slide {
      padding: 20px 0px;
    }
    .swiper:hover {
      .swiper-button-next, .swiper-button-prev {
        display: flex;
      }
    }
    .swiper-button-next, .swiper-button-prev {
      display: none;
      width: 46px;
      height: 46px;
      border: 2px solid #EBEBEB;;
      border-radius: 50%;
      color: #fff;
      font-weight: 700;
      background: #131313;
    }
    
    .swiper-button-next:after, .swiper-button-prev:after {
      font-size: 18px;
    }
`
const SwiperBg = styled.div`
  z-index: 1;
  position: absolute;
  inset: 0px 0px -1px;
  background-size: cover;
  transition: background 0.3s linear 0s;
  &::after {
    backdrop-filter: blur(60px);
    background: linear-gradient(180deg, rgba(19, 19, 19, 0) 0%, #131313 100%);
    pointer-events: none;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }
`
const SwiperCover = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  border: 1px solid #FDFFAC;
  box-shadow: 0px 4px 24px 1px rgba(253, 255, 172, 0.45);
  border-radius: 20px;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
  }
`
const MintBtn = styled.div`
  position: absolute;
  bottom: 20px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    position: static;
    margin-top: 20px;
  }
`
const NftName = styled.div`
  font-size: 40px;
  font-weight: 600;
`
const NftDes = styled.div`
  padding-right: 100px;
  font-size: 16px;
  line-height: 24px;
`
const HomeSwiperH5 = styled.div`
  position: relative;
  padding: 60px 100px;
  display: none;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: block;
    padding: 24px;
  }
`
const SwiperInfo = styled.div`
  margin-top: 20px;
`
const PageContent = styled.div`
  padding: 20px 100px;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 24px;
  }
`
const PageContentTitle = styled.div`
  padding-left: 10px;
  font-size: 30px;
  font-weight: 600;
`
const ViewAll = styled.div`
  display: block;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
`
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px -10px;
`
const ViewAllH5 = styled.div`
  display: none;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    display: block;
    text-align: center;

  }
`
const PageFoot = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 100px;
  padding: 0px 100px;
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-top: 260px;
    padding: 0;
    height: 400px;
  }
`
const FootContent = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, #131313 26.04%, rgba(19, 19, 19, 0) 100%);
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-top: -200px;
    padding: 0 24px;
  }
`
const FootTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
`
const FootShowImg = styled.img`
  width: 90%;
`


export default function Home() {
  const history = useHistory()
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [recentList, setRecentList] = useState(5)
  const [loading, setLoading] = useState(false)
  const { list, total } = useCollectionList(pageNo, recentList, setLoading, '')
  const { list: swiperList, total: swiperTotal } = useCollectionList(pageNo, 4, setLoading, 'active')
  const slideChange = (event) => {
    console.log(event);
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
  const handleCloseLoading = () => {
    setLoading(false)
  }
  const goToMint = (collectionId) => {
    history.push(`/collectionDetail/${collectionId}`)
  }
  useEffect(() => {
    if (window.innerWidth < 800) {
      setRecentList(4)
    }
  }, [])
  return (
    <>
      <PageHome>
        <HomeSwiper >
          <SwiperBg style={{ backgroundImage: `url(${swiperList[swiperIndex]?.image})` }}></SwiperBg>
          <Swiper modules={[Navigation, Autoplay]}
            onSlideChange={slideChange}
            navigation={true}
            speed={4000}
            autoplay={true}
            loop={true}
          >
            {
              list.map(item => (
                <SwiperSlide key={item.name}>
                  <Grid container className={`pl30 pt20 pr30`}>
                    <Grid item xs={12} sm={12} md={4} lg={4} >
                      <SwiperCover>
                        <img src={item.image}></img>
                      </SwiperCover>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} className={`pl40`}>
                      <NftName className={`c_green mt10 text_hidden_1`}>{item.name}</NftName>
                      <NftDes className={`text_hidden_3`}>{item.description}</NftDes>
                      <div className='df_h5 mt30'>
                        <div className='f3 mt10'>
                          <div>{item?.status === 'soon' ? 'Start at' : 'Close at'}</div>
                          <div className='c_green fw600 mt10 fs24'>{item?.statusTxt}</div>
                        </div>
                        <div className='f2 mt10'>
                          <div>Minted</div>
                          <div className='c_green fw600 mt10 fs24'>{item.mintedCount} / {item.maxCount}</div>
                        </div>
                        <div className='f2 mt10'>
                          <div>Network</div>
                          <div className='c_green fw600 mt10 fs24'>{chainTxtObj[item.chainType]}</div>
                        </div>
                      </div>
                      <MintBtn>
                        <Button className={`w200 h40 btn_multicolour`} onClick={() => { goToMint(item.id) }}>Free Mint</Button>
                      </MintBtn>
                    </Grid>
                  </Grid>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </HomeSwiper>
        <HomeSwiperH5>
          <SwiperCover>
            <img src={swiperList[0]?.image}></img>
          </SwiperCover>
          <SwiperInfo>
            <NftName className={`c_green mt10 ell`}>{list[0]?.name}</NftName>
            <NftDes className={`text_hidden_3`}>{list[0]?.description}</NftDes>
            <div className='df_h5 mt30'>
              <div className='f3 mt10'>
                <div>{list[0]?.status === 'soon' ? 'Start at' : 'Close at'}</div>
                <div className='c_green fw600 mt10 fs24'>{list[0]?.statusTxt}</div>
              </div>
              <div className='f2 mt10'>
                <div>Minted</div>
                <div className='c_green fw600 mt10 fs24'>{list[0]?.mintedCount} / {list[0]?.maxCount}</div>
              </div>
              <div className='f1 mt10'>
                <div>Network</div>
                <div className='c_green fw600 mt10 fs24'>{chainTxtObj[list[0]?.chainType]}</div>
              </div>
            </div>
            <MintBtn>
              <Button className={`w200 h40 btn_multicolour`} onClick={() => { goToMint(list[0]?.id) }}>Free Mint</Button>
            </MintBtn>
          </SwiperInfo>
        </HomeSwiperH5>
        <PageContent>
          <div className='space-between-center'>
            <div className='df_align_center'>
              <img width={44} src={recent}></img>
              <PageContentTitle>Recent Claims</PageContentTitle>
            </div>
            <ViewAll className={`c_green fw600`}>
              view all &gt;
            </ViewAll>
          </div>
          <Content>
            {
              list.map(item => (
                <BadgeCard key={item.project} item={item} type="explore" />
              ))
            }
          </Content>
          <ViewAllH5 className={`c_green fw600`}>
            view all &gt;
          </ViewAllH5>
        </PageContent>
        <PageFoot style={{ backgroundImage: `url(${footBg})` }}>
          <FootContent>
            <FootTitle>Shaping the <span className='c_green'>future</span> of the on-chain art industry</FootTitle>
            <div className='c_green tac mt10 lh28'>Join this revolution with over 300 other pioneering artists</div>
            <div className='tac mt30'>
              <Button variant="contained" color='primary'>Learn More</Button>
            </div>
          </FootContent>
          <ViewAll className='pt40 tac'>
            <FootShowImg src={footShow}></FootShowImg>
            {/* <img className={styles.footShow} src={footShow}></img> */}
          </ViewAll>
          <ViewAllH5 className={`tac pt10`}>
            <FootShowImg src={footShowH5}></FootShowImg>
            {/* <img className={styles.footShow} src={footShowH5}></img> */}
          </ViewAllH5>
        </PageFoot>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={handleCloseLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </PageHome>
    </>

  )
}
