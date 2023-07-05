import React, { useContext, useState, useEffect } from 'react'
import { Button } from "@mui/material";

import { queryCollectionDetail } from 'services/createNFTManage'
import { mainContext } from "../../reducer";
import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../web3";
// import { chainFun } from "../../utils/networkConnect"
import test2 from 'assets/img/test/test2.png'
import styles from './styles.module.scss'
import { abbrTxHash } from "../../utils/format";
import { chainTxtObj, chainFun } from '../../utils/networkConnect';
import { getChainType } from "../../web3/address";

import styled from 'styled-components/macro';
import bg from 'assets/img/explore_bg.svg';

import {
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  HANDLE_SHOW_CONNECT_MODAL,
  waitingForConfirm,
} from "../../const";

const CollectionInfo = styled.div`
  padding: 120px 80px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});
`
const InfoMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const InfoCover = styled.div`
  margin-right: 26px;
  padding: 24px;
  background: #191D20;
  border: 1px solid #4B5954;
  border-radius: 20px;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 20px;
  } 
`
const TypesBox = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 26px;
  padding: 24px 19px;
  border-radius: 20px;
  border: 1px solid var(--line-color-2, #4B5954);
  background: #191D20; 
`
const TypesCover = styled.img`
  width: 25%;
  padding: 0 5px;
  border-radius: 10px;
` 
const BaseInfo = styled.div`
  padding: 25px 30px;
  margin-bottom: 30px;
  background: #191D20;
  border: 1px solid #4B5954;
  border-radius: 20px;
`
const CollectionName = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 42px;
`
const CollectionDes = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 24px;
`
const MintBox = styled.div`
  margin-top: 40px;
  text-align: right;
  button {
    border: none;
  }
`
const ContractionInfo = styled.div`
  padding: 25px 30px;
  margin-bottom: 30px;
  background: #191D20;
  border: 1px solid #4B5954;
  border-radius: 20px;
`
const ContractItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 10px 24px;
  background: #111315;
  border-radius: 8px;
`


export default function NFTDetail() {
  const { state, dispatch } = useContext(mainContext);
  const { library, account, active, chainId } = useActiveWeb3React()
  const { needSign } = useNeedSign();
  const [detailInfo, setDetailInfo] = useState({})

  const beforeMint = () => {
    let chainType = getChainType(chainId)
    // if (eventInfo.chainType !== chainType) {
    //   message.error(`please switch to ${chainTxtObj[eventInfo.chainType]}`)
    //   chainFun[chainTxtObj[eventInfo.chainType]] && chainFun[chainTxtObj[eventInfo.chainType]]()
    //   return false
    // }
    return true
  }
  const freeMint = () => {
    if (!beforeMint()) return false
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: waitingForConfirm
    });
  }
  const queryDetailInfo = async () => {
    await queryCollectionDetail().then(res => {
      setDetailInfo(res)
    })
  }
  useEffect(() => {

  })
  return (
    <CollectionInfo>
      <InfoMain>
        <div className={`f1 `}>
          <InfoCover >
            <img src={test2}></img>
          </InfoCover>
          <TypesBox>
            <TypesCover src={test2}></TypesCover>
            <TypesCover src={test2}></TypesCover>
            <TypesCover src={test2}></TypesCover>
            <TypesCover src={test2}></TypesCover>
          </TypesBox>
        </div>
        <div className={`f1`}>
          <BaseInfo>
            <CollectionName className={`c_green mt10 text_hidden_1`}>NFT Named on 15 June</CollectionName>
            <CollectionDes>Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.</CollectionDes>
            <div className='df_h5 mt30'>
              <div className='f3 mt10'>
                <div>Status</div>
                <div className='c_green fw600 mt10 fs24'>Ended at 21 hours</div>
              </div>
              <div className='f2 mt10'>
                <div>Status</div>
                <div className='c_green fw600 mt10 fs24'>400/1,000</div>
              </div>
              <div className='f1 mt10'>
                <div>Network</div>
                <div className='c_green fw600 mt10 fs24'>Ethereum</div>
              </div>
            </div>
            <MintBox>
              <Button className={`w200_h5 h40 btn_multicolour`} onClick={freeMint}>Free Mint</Button>
            </MintBox>
          </BaseInfo>
          <ContractionInfo>
            <div>Contract Details</div>
            <ContractItem>
              <span className='lh28'>Release Date</span>
              <span className='c_green'>June 15, 2023</span>
            </ContractItem>
            <ContractItem>
              <span className='lh28'>Blockchain</span>
              <span className='c_green'>Polygon</span>
            </ContractItem>
            <ContractItem>
              <span className='lh28'>Contract Address</span>
              <span className='c_green'>{abbrTxHash('0xf18A52746a82a7aa41957A250E6B0f66Ce5b680C')}</span>
            </ContractItem>
            <ContractItem>
              <span className='lh28'>Token Standard</span>
              <span className='c_green'>ERC-721</span>
            </ContractItem>
          </ContractionInfo>
        </div>
      </InfoMain>
    </CollectionInfo>
  )
}
