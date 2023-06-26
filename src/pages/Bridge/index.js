import React, { useEffect, useState, useContext } from 'react'
import { Button, MenuItem, Select, Modal, Box } from "@mui/material";

import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../web3";
import { chainArr, chainFun } from '../../utils/networkConnect';
import styles from "./styles.module.scss";
import { ReactComponent as DownIcon } from "assets/img/down.svg";
import { HANDLE_SHOW_TRANSACTION_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import { getChainType } from '../../web3/address';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  boxShadow: 24,
  padding: '20px 16px'
};

export default function Bridge() {
  const [fromChainType, setFromChainType] = useState(chainArr[0].value)
  const [toChainType, setToChainType] = useState(chainArr[1].value)
  const [visible, setVisible] = useState(false)
  const [list, setList] = useState([{ name: 'NFT Name #001' }, { name: 'NFT Name #002' }, { name: 'NFT Name #003' }, { name: 'NFT Name #004' }, { name: 'NFT Name #005' }, { name: 'NFT Name #006' }, { name: 'NFT Name #007' }, { name: 'NFT Name #008' }, { name: 'NFT Name #009' }, { name: 'NFT Name #0010' }])
  const [currentNFT, setCurrentNFT] = useState({})
  const { dispatch } = useContext(mainContext);
  const { chainId } = useActiveWeb3React()
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
    setCurrentNFT({})
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

  const handleCancel = () => {
    setVisible(false)
  }
  const openNFTModal = () => {
    setVisible(true)
  }
  const onSelectNFT = (item) => {
    setCurrentNFT(item)
    setVisible(false)
  }

  useEffect(() => {
  }, [])

  return (
    <>
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
          {
            currentNFT.name ?
              <div onClick={openNFTModal} className={styles.select_nft2}>
                <div className={styles.current_nft_box}>
                  <img className={styles.current_nft_img} src={currentNFT.icon || 'https://define-art-static-prod.s3-ap-northeast-1.amazonaws.com/test/token/image/mumbai/0x34e91Bbcd9591D0Fe275f9B7a737D4b42617fa4c/5.png'} alt={currentNFT.name} />
                  <div>
                    <div className={styles.current_nft_name}>{currentNFT.name}</div>
                    <div className={styles.current_nft_fee}>
                      <span className={styles.fee_title}>Fees:</span>
                      <span className={styles.fee_num}>0.001 ETH</span>
                    </div>
                    <div>
                      <span className={styles.fee_title}>Balance:</span>
                      <span className={styles.fee_num}>0.01 ETH</span>
                    </div>
                  </div>
                </div>
              </div> :
              <div onClick={openNFTModal} className={styles.select_nft}>+ Select NFT</div>
          }
          <Button onClick={confirmBridge} className={`${styles.confirm_btn} btn_multicolour`}>Bridge</Button>
        </div>
      </div>

      <Modal
        open={visible}
        onClose={handleCancel}
      >
        <Box sx={{ ...style }}>
          <div className={styles.modal_title}>Select a NFT</div>
          <div className={styles.modal_content}>
            {
              list.map(item => (
                <div onClick={() => { onSelectNFT(item) }} key={item} className={`${styles.modal_item} ${item === currentNFT ? styles.nft_active : ''}`}>
                  <div className='df_align_center'>
                    <img className={styles.nft_img} src={item.icon || 'https://define-art-static-prod.s3-ap-northeast-1.amazonaws.com/test/token/image/mumbai/0x34e91Bbcd9591D0Fe275f9B7a737D4b42617fa4c/5.png'} alt={item.name} />
                    <span className={styles.nft_name}>{item.name}</span>
                  </div>
                  {
                    item === currentNFT && <div className={styles.nft_selection}>current selection</div>
                  }
                </div>
              ))
            }
          </div>
        </Box>
      </Modal>
    </>
  )
}
