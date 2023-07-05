import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components/macro';

import { BREAKPOINTS } from 'theme';
import { chainTypeImgObj, chainTxtObj } from '../../utils/networkConnect';
import CountDown from "components/CountDown";

const CardBox = styled.div`
  width: 20%;
  padding: 10px;

  @media screen and (max-width: ${BREAKPOINTS.md}px) {
    width: 50%;
    padding: 5px;
  }
`
const DefaultBorder = styled.div<{ active: boolean }>`
  width: 100%;
  padding: 1px;
  padding-bottom: 50px;
  border-radius: 10px;
  background: ${props => props.active ? 'linear-gradient(148.86deg, #FFF266 0%, #A5FFBE 98.64%)' : '#4B5954'};
  cursor: pointer;
  position: relative;
`
const BadgeItem = styled.div`
  width: 100%;
  padding-bottom: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const ChainImg = styled.img`
  position: absolute;
  top: 12px;
  left: 12px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
`
const ItemFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 18px;
  position: absolute;
  left: 1px;
  bottom: 1px;
  right: 1px;
  top: 1px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 1.04%, rgba(0, 0, 0, 0) 38.54%, #000000 81.77%);
`
const NftName = styled.div<{ collector: boolean }>`
  display: ${props => props.collector ? 'block' : 'none'};
  color: #A5FFBE;
`
const CollectionName = styled.div`
  color: #ebebeb;
`
const ChainName = styled.div`
  display: flex;
  align-items: center;
  color: #7A9283;
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
  img {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    overflow: hidden;
    margin-right: 7px;
  }
`
const ItemActivity = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
  color: #FFF161;
  font-size: 12px;
  font-weight: 600;
  border-radius: 30px;
  padding: 0 14px;
  height: 20px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.7);
`
const ItemForeshow = styled.div`
  position: absolute;
  right: 10px;
  left: 10px;
  top: 8px;
  text-align: center;
  color: #695010;
  font-size: 12px;
  font-weight: 600;
  border-radius: 30px;
  padding: 0 5px;
  height: 20px;
  line-height: 20px;
  background: linear-gradient(89.89deg, #C19700 3.69%, #FFEE53 15.21%, #FDFFAC 57.81%, #FFEE53 83.86%, #C19700 99.9%);
`

export default function BadgeCard({ item, type = '' }) {
  const [showCountDown, setShowCountDown] = useState(false)
  const [time, setTime] = useState(0)
  const [timeType, setTimeType] = useState('start')
  const history = useHistory()

  const goToBadgeDetail = (item) => {
    history.push(`/collectionDetail/${item.id}`)
  }

  const dealTime = () => {
    const now = Date.now();
    const info = item;
    if (info && info.eventStartTime && info.eventEndTime) {
      let date;
      if (info.eventStartTime - now > 0) {
        date = info.eventStartTime;
        setTime(date)
        setShowCountDown(false)
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
    console.log(item.eventStartTime)
  }, [item])

  return (
    <CardBox>
      <DefaultBorder active={showCountDown && type !== 'collector'} onClick={() => { goToBadgeDetail(item) }}>
        <BadgeItem style={{ backgroundImage: `url(${item.image})` }}>
          {
            type === 'collector' && <ChainImg src={chainTypeImgObj[item.chainType]} />
          }
          <ItemFooter>
            <NftName className={`ell`} collector={type === 'collector'}>{item.name}</NftName>
            <CollectionName>CollectionName</CollectionName>
            {
              type === 'game' && <ChainName>
                <img src={chainTypeImgObj[item.chainType]} />
                <span>{chainTxtObj[item.chainType]}</span>
              </ChainName>
            }
          </ItemFooter>


          {
            type !== 'collector' && (
              showCountDown ? (
                <ItemActivity>
                  {timeType === 'end' && <span>Close at </span>}
                  <CountDown onEnd={dealTime} time={time / 1000} type="word" />
                </ItemActivity>
              ) : (
                !!time && (
                  <ItemForeshow title={`Start at ${new Date(time).toLocaleString()}`} className="ell">
                    <span>Start at </span>
                    {new Date(time).toLocaleString()}
                  </ItemForeshow>
                )
              )
            )
          }
        </BadgeItem>
      </DefaultBorder>
    </CardBox>
  )
}