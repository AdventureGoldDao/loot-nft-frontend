import React, { useEffect, useState } from 'react'
import { Select, MenuItem } from "@mui/material";
import styled from 'styled-components/macro';

import { useBadgeProjectList } from "../../services/badge"
import BadgeCard from "components/BadgeCard";
import bg from 'assets/img/explore_bg.svg'
import { BREAKPOINTS } from 'theme';

const Main = styled.div`
  min-height: 100vh;
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    padding: 16px;
  }
`
const Title = styled.div`
  font-size: 48px;
  font-weight: 600;
`
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px -10px;
`

export default function Explore() {
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)
  const { list, total } = useBadgeProjectList(pageNo, 50, setLoading, '', '', '')
  const [nftType, setNftType] = useState('all')

  const handleSwitchNftType = (event) => {
    setNftType(event.target.value)
  }

  useEffect(() => {
  }, [])

  return (
    <Main>
      <div className="space-between-center">
        <Title>Explore</Title>
      </div>

      <Content>
        {
          list.map(item => (
            <BadgeCard key={item.project} item={item} />
          ))
        }
      </Content>
    </Main>
  )
}
