import React, {useContext,useState, useEffect} from 'react'
import { Button } from "@mui/material";

import { getNftDetail } from 'services/nftDetail'
import { mainContext } from "../../reducer";
import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../web3";
// import { chainFun } from "../../utils/networkConnect"
import test2 from 'assets/img/test/test2.png'
import styles from './styles.module.scss'
import { abbrTxHash } from "../../utils/format";
import { chainTxtObj, chainFun } from '../../utils/networkConnect';
import { getChainType } from "../../web3/address";

import {
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  HANDLE_SHOW_CONNECT_MODAL,
  waitingForConfirm,
} from "../../const";

export default function NFTDetail() {
  const { state, dispatch } = useContext(mainContext);
  const { library, account, active, chainId } = useActiveWeb3React()
  const { needSign } = useNeedSign();
  const [detailInfo, setDetailInfo] = useState()

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
    await getNftDetail().then(res => {
      setDetailInfo(res)
    })
  }
  useEffect(() => {
    
  })
  return (
    <div className={styles.page_nftDetail}>
      <div className={styles.nftDetail}>
        <div className={`f1 `}>
          <div className={`${styles.nft_cover}`}>
            <img src={test2}></img>
          </div>
          <div className={styles.nft_types}>
            <img className={styles.type_cover} src={test2}></img>
            <img className={styles.type_cover} src={test2}></img>
            <img className={styles.type_cover} src={test2}></img>
            <img className={styles.type_cover} src={test2}></img>
          </div>
        </div>
        <div className={`f1`}>
          <div className={styles.nft_info}>
          <div>Create by <span className='c_green fw600'>Amber Lee</span> </div>
          <div className={`c_green mt10 text_hidden_1 ${styles.nft_name}`}>NFT Named on 15 June</div>
          <div className={`${styles.nft_des}`}>Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.</div>
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
          <div className={styles.mint_btn}>
            <Button className={`w200_h5 h40 btn_multicolour`} onClick={freeMint}>Free Mint</Button>
          </div>
          </div>
          <div className={styles.nft_info}>
            <div>Contract Details</div>
            <div className={styles.info_item}>
              <span className='lh28'>Release Date</span>
              <span className='c_green'>June 15, 2023</span>
            </div>
            <div className={styles.info_item}>
              <span className='lh28'>Blockchain</span>
              <span className='c_green'>Polygon</span>
            </div>
            <div className={styles.info_item}>
              <span className='lh28'>Contract Address</span>
              <span className='c_green'>{abbrTxHash('0xf18A52746a82a7aa41957A250E6B0f66Ce5b680C')}</span>
            </div>
            <div className={styles.info_item}>
              <span className='lh28'>Token Standard</span>
              <span className='c_green'>ERC-721</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
