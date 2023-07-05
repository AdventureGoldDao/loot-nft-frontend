import React, { useEffect, useState } from 'react'
import { Select, MenuItem } from "@mui/material";
import styled from 'styled-components/macro';

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

const Main = styled.div`
  min-height: 100vh;
  padding: 120px 100px 70px 145px;
  background-repeat: no-repeat;
  background-position: center top;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 16px;
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
        collectionName: 'Hero',
        collectionCover: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        startTime: 1688376305,
        endTime: 1688376305 + 3600 * 24 * 3,
        collectionNetwork: 'loottest'
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
        collectionName: 'Hero',
        collectionCover: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        startTime: 1688376305,
        endTime: 1688376305 + 3600 * 24 * 3,
        collectionNetwork: 'loottest'
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
        collectionName: 'Hero',
        collectionCover: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        startTime: 1688376305,
        endTime: 1688376305 + 3600 * 24 * 3,
        collectionNetwork: 'loottest'
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
        collectionName: 'Hero',
        collectionCover: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        startTime: 1688376305,
        endTime: 1688376305 + 3600 * 24 * 3,
        collectionNetwork: 'loottest'
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
        collectionName: 'Hero',
        collectionCover: collection,
        collectionLink: 'https://mighty-magic-dao.vercel.app/mint',
        startTime: 1688376305,
        endTime: 1688376305 + 3600 * 24 * 3,
        collectionNetwork: 'loottest'
      }
    ]
  },
]

export default function GameDetail() {

  useEffect(() => {
  }, [])

  return (
    <Main>
    </Main>
  )
}
