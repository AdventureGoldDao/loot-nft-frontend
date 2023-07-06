import React, { useEffect, useState } from 'react'
import { Select, MenuItem, Button } from "@mui/material";
import styled from 'styled-components/macro';
import { Link, NavLink, useLocation, useHistory, useParams } from "react-router-dom";

import { BREAKPOINTS } from 'theme';
import { chainTypeImgObj, chainFun, symbolImgObj } from '../../utils/networkConnect';
import logo1 from 'assets/img/games/logo1.jpg'
import logo2 from 'assets/img/games/logo2.jpg'
import logo3 from 'assets/img/games/logo3.jpg'
import logo4 from 'assets/img/games/logo4.jpg'
import logo5 from 'assets/img/games/logo5.jpg'
import banner1 from 'assets/img/games/banner1.jpg'
import banner2 from 'assets/img/games/banner2.jpg'
import banner3 from 'assets/img/games/banner3.jpg'
import banner4 from 'assets/img/games/banner4.jpg'
import banner5 from 'assets/img/games/banner5.jpg'
import collection from 'assets/img/games/collection.jpg'
import screen1 from 'assets/img/games/screen1.jpg'
import screen2 from 'assets/img/games/screen2.jpg'
import { ReactComponent as ShareIcon } from 'assets/img/games/share.svg'
import { ReactComponent as WebsiteIcon } from 'assets/img/games/website.svg'
import { ReactComponent as TwitterIcon } from 'assets/img/games/twitter.svg'
import { Tag } from 'pages/Games'
import BadgeCard from "components/BadgeCard";

const Main = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 102px 100px 70px 145px;

  @media screen and (min-width: ${BREAKPOINTS.xxl}px) {
    padding-right: 150px;
  }
  @media screen and (min-width: ${BREAKPOINTS.xxxl}px) {
    padding-right: 300px;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 16px;
  }
`
const BgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 50%;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  &::before {
    background: linear-gradient(rgba(19, 19, 19, 0.1), rgba(19, 19, 19, 1));
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding-bottom: 100%;
  }
`
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const HeaderImg = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 85px;
  margin-right: 30px;
  overflow: hidden;
`
const NameBox = styled.div`
  color: #FFF;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 12px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin: 12px 0;
    font-size: 26px;
  }
`
const ChainBox = styled.div`
  padding-right: 17px;
  margin-right: 17px;
  border-right: 1px solid rgba(75, 89, 84, 0.4);
  font-size: 14px;
  font-weight: 400;
  color: #EBEBEB;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    border-right: none;
    padding: 0;
    margin: 0 0 12px;
  }
`
const ChainImg = styled.img`
  width: 32px;
  border-radius: 32px;
  margin-left: 17px;
`
const LinkBox = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  background: #0E100F;
  margin-right: 20px;
  overflow: hidden;
  height: 40px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    border-right: none;
    padding: 0;
    margin: 12px 0;
  }
`
const LinkA = styled.a`
  display: block;
  padding: 10px 24px;
  svg {
    display: block;
  }
`
const BoxHr = styled.div`
  height: 30px;
  width: 1px;
  background: rgba(75, 89, 84, 0.4);
`
const ContentBox = styled.div`
  margin-top: 37px;
  padding: 25px 50px;
  border-radius: 20px;
  background: #0E100F;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 10px;
  }
`
const TabBox = styled.div`
  margin-bottom: 32px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 20px;
  }
`
const TabItem = styled.div<{ active: boolean }>`
  color: ${props => props.active ? '#A5FFBE' : '#7A9283'};
  margin-right: 27px;
  padding-right: 27px;
  border-right: 1px solid rgba(75, 89, 84, 0.4);
  span {
    cursor: pointer;
    font-weight: 600;
  }
  &:last-child {
    margin-right: 0;
    padding-right: 0;
    border-right: none;
  }
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-right: 10px;
    padding-right: 10px;
  }
`
const ScreenBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -8px -8px 32px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin-bottom: 8px;
  }
`
const ScreenImg = styled.img`
  width: calc(50% - 16px);
  margin: 8px;
  border-radius: 10px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: calc(100% - 16px);
  }
`
const CollectionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px -10px 30px;
  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    margin: -5px -5px 20px;
  }
`

export const gamesArr = [
  {
    id: '1',
    name: 'Mighty Magic HEROES',
    description: 'Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!',
    logo: logo1,
    banner: banner1,
    tags: ['AVG', 'Free Mint'],
    supportChains: ['loottest', 'zksynceratest'],
    playLink: 'https://mighty-magic-dao.vercel.app/mint',
    website: 'https://mighty-magic-dao.vercel.app/',
    twitter: 'https://twitter.com/home',
    screenshots: [screen1, screen2],
    leaderboardLink: 'https://mighty-magic-dao.vercel.app/leaderboard',
    collections: [
      {
        name: 'Hero 1',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 1,
        chainType: 'goerli'
      },
      {
        name: 'Hero 2',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 6,
        chainType: 'loottest'
      },
      {
        name: 'Hero 3',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000 + 3600000 * 24 * 20,
        eventEndTime: 1688376305000 + 3600000 * 24 * 30,
        chainType: 'loottest'
      },
      {
        name: 'Hero 4',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 5,
        chainType: 'goerli'
      },
      {
        name: 'Hero 5',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 3,
        chainType: 'loottest'
      },
      {
        name: 'Hero 6',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 4,
        chainType: 'loottest'
      }
    ]
  },
  {
    id: '2',
    name: 'Game Name 2',
    description: 'Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!',
    logo: logo2,
    banner: banner2,
    tags: ['AVG', 'Free Mint'],
    supportChains: ['loottest', 'zksynceratest'],
    playLink: 'https://mighty-magic-dao.vercel.app/mint',
    website: 'https://mighty-magic-dao.vercel.app/',
    twitter: 'https://twitter.com/home',
    screenshots: [screen1, screen2],
    leaderboardLink: 'https://mighty-magic-dao.vercel.app/leaderboard',
    collections: [
      {
        name: 'Hero',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000 + 3600000 * 24 * 2,
        eventEndTime: 1688376305000 + 3600000 * 24 * 3,
        chainType: 'loottest'
      }
    ]
  },
  {
    id: '3',
    name: 'Game Name 3',
    description: 'Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!',
    logo: logo3,
    banner: banner3,
    tags: ['AVG', 'Free Mint'],
    supportChains: ['loottest', 'zksynceratest'],
    playLink: 'https://mighty-magic-dao.vercel.app/mint',
    website: 'https://mighty-magic-dao.vercel.app/',
    twitter: 'https://twitter.com/home',
    screenshots: [screen1, screen2],
    leaderboardLink: 'https://mighty-magic-dao.vercel.app/leaderboard',
    collections: [
      {
        name: 'Hero',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 3,
        chainType: 'loottest'
      }
    ]
  },
  {
    id: '4',
    name: 'Game Name 4',
    description: 'Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!',
    logo: logo4,
    banner: banner4,
    tags: ['AVG', 'Free Mint'],
    supportChains: ['loottest', 'zksynceratest'],
    playLink: 'https://mighty-magic-dao.vercel.app/mint',
    website: 'https://mighty-magic-dao.vercel.app/',
    twitter: 'https://twitter.com/home',
    screenshots: [screen1, screen2],
    leaderboardLink: 'https://mighty-magic-dao.vercel.app/leaderboard',
    collections: [
      {
        name: 'Hero',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1688376305000,
        eventEndTime: 1688376305000 + 3600000 * 24 * 3,
        chainType: 'loottest'
      }
    ]
  },
  {
    id: '5',
    name: 'Game Name 5',
    description: 'Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!',
    logo: logo5,
    banner: banner5,
    tags: ['AVG', 'Free Mint'],
    supportChains: ['loottest', 'zksynceratest'],
    playLink: 'https://mighty-magic-dao.vercel.app/mint',
    website: 'https://mighty-magic-dao.vercel.app/',
    twitter: 'https://twitter.com/home',
    screenshots: [screen1, screen2],
    leaderboardLink: 'https://mighty-magic-dao.vercel.app/leaderboard',
    collections: [
      {
        name: 'Hero',
        image: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        eventStartTime: 1701142200000,
        eventEndTime: 1701142200000 + 3600000 * 24 * 3,
        chainType: 'loottest'
      }
    ]
  },
]

const tabArr = ['Overview', 'Collections', 'Leaderboard', 'Play']

export default function GameDetail() {
  // @ts-ignore
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState(gamesArr[0]);
  const [currentTab, setCurrentTab] = useState(tabArr[0]);

  const goPlay = () => {
    window.open(gameInfo.website)
  }

  useEffect(() => {
    if (id) {
      setGameInfo(gamesArr.find(item => item.id === id))
    }
  }, [id])

  return (
    <Main>
      <BgBox style={{ backgroundImage: `url(${gameInfo.banner})` }} />
      <PageHeader>
        <div className="df_align_center_h5">
          <HeaderImg src={gameInfo.logo} />
          <div>
            <NameBox>{gameInfo.name}</NameBox>
            <div className="df_align_center_h5">
              <ChainBox className="df_align_center">
                <span>Support Chain</span>
                {
                  gameInfo.supportChains.map(item => (
                    <ChainImg src={chainTypeImgObj[item]} />
                  ))
                }
              </ChainBox>
              <div className="df_align_center">
                <span className="mr17">Genres</span>
                {
                  gameInfo.tags.map(item => <Tag>{item}</Tag>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="df_align_center_h5">
          <LinkBox>
            <LinkA href={gameInfo.website} target='_blank'><WebsiteIcon /></LinkA>
            <BoxHr />
            <LinkA href={gameInfo.twitter} target='_blank'><TwitterIcon /></LinkA>
          </LinkBox>
          <Button onClick={goPlay} style={{ paddingLeft: 55, paddingRight: 55, height: 40 }} className="btn_multicolour">Paly Now<ShareIcon width={9} height={9} style={{ marginLeft: 8 }} /></Button>
        </div>
      </PageHeader>

      <ContentBox>
        <TabBox className="df_align_center">
          {
            tabArr.map(item => <TabItem key={item} active={item === currentTab}><span onClick={() => { setCurrentTab(item) }}>{item}</span></TabItem>)
          }
        </TabBox>
        {
          currentTab === tabArr[0] && <div>
            <ScreenBox>
              {
                gameInfo.screenshots.map(item => <ScreenImg src={item} />)
              }
            </ScreenBox>
            <div style={{ color: '#ebebeb', fontWeight: 400, lineHeight: 1.8 }}>{gameInfo.description}</div>
          </div>
        }
        {
          currentTab === tabArr[1] && <CollectionBox>
            {
              gameInfo.collections.map(item => (
                <BadgeCard key={item.name} item={item} type='game' />
              ))
            }
          </CollectionBox>
        }
        {
          currentTab === tabArr[2] &&
          <iframe width="100%" height="1000px" src={gameInfo.leaderboardLink} frameBorder="0"></iframe>
        }
        {
          currentTab === tabArr[3] &&
          <iframe width="100%" height="1000px" src={gameInfo.website} frameBorder="0"></iframe>
        }
      </ContentBox>
    </Main>
  )
}
