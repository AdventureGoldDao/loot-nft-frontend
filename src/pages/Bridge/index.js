import React, { useEffect, useState, useContext } from 'react'
import { Button, MenuItem, Select } from "@mui/material";
import { useHistory, Link } from 'react-router-dom';

import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../web3";
import { chainTxtObj, chainArr, chainFun, symbolImgObj } from '../../utils/networkConnect';
import styles from "./styles.module.scss";
import { ReactComponent as DownIcon } from "assets/img/down.svg";
import { HANDLE_SHOW_TRANSACTION_MODAL, HANDLE_HIDE_EVENT_MODAL, HANDLE_NOTICE_NUM } from "../../const";
import { mainContext } from "../../reducer";
import { getChainType } from '../../web3/address';


export default function Bridge() {
  const history = useHistory()
  const [fromChainType, setFromChainType] = useState(chainArr[0].value)
  const [toChainType, setToChainType] = useState(chainArr[1].value)
  const { state, dispatch } = useContext(mainContext);
  const { library, account, active, chainId } = useActiveWeb3React()
  const { needSign } = useNeedSign();

  const handleSwitchFrom = () => {
    switchChain()
  }

  const handleSwitchTo = () => {
    switchChain()
  }

  const switchChain = () => {
    const f = fromChainType;
    const t = toChainType;
    setFromChainType(t)
    setToChainType(f)
  }

  const confirmBridge = () => {
    needSign(() => {
      if (fromChainType !== getChainType(chainId)) {
        if (chainFun[fromChainType]) {
          chainFun[fromChainType]()
        }
      } else {
        dispatch({
          type: HANDLE_SHOW_TRANSACTION_MODAL,
          showTransactionModal: true
        });
      }
    })
  }

  useEffect(() => {
  }, [])

  return (
    <div className={`${styles.home}`}>
      <div className={styles.box}>
        <div className={styles.title}>NFT Bridge</div>
        <Select
          onChange={handleSwitchFrom}
          value={fromChainType}
          className={styles.select_box}
        >
          {
            chainArr.map(item => (
              <MenuItem key={item.value} value={item.value}>
                <img className={styles.option_img} src={item.icon} alt={item.name} />
                <span className={styles.option_name}>{item.name}</span>
              </MenuItem>
            ))
          }
        </Select>
        <div onClick={switchChain} className={styles.switch_btn}><DownIcon /></div>
        <Select
          onChange={handleSwitchTo}
          value={toChainType}
          className={styles.select_box}
        >
          {
            chainArr.map(item => (
              <MenuItem key={item.value} value={item.value}>
                <img className={styles.option_img} src={item.icon} alt={item.name} />
                <span className={styles.option_name}>{item.name}</span>
              </MenuItem>
            ))
          }
        </Select>
        <div className={styles.select_nft}>+ Select NFT</div>
        <Button onClick={confirmBridge} className={`${styles.confirm_btn} btn_multicolour`}>Bridge</Button>
      </div>
    </div>
  )
}
