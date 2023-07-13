import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Modal, Box, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Snackbar from "components/SnackMessage"
import { useNeedSign } from "hooks/account"
import { useActiveWeb3React } from "../../../web3";
import { publishCollection, queryCollectionDetail } from "../../../services/createNFTManage"
import { deployFreeMintNFT721 } from "utils/handleContract"
import { chainArr, chainFun } from 'utils/networkConnect';
import { getChainType } from 'web3/address';
import { mainContext } from "../../../reducer";
import styled from 'styled-components/macro';
import { HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL, HANDLE_SHOW_TRANSACTION_MODAL } from "const";
import moment from 'moment';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  boxShadow: 24,
  padding: '20px 24px'
};
const ColorGreenLight = styled.span`
  color: #7A9283;
`
const TextInput = styled(TextField)`
  margin-top: 10px !important;
  .MuiInputLabel-root {
    color: #7A9283 !important;
  }
  .MuiInput-input {
    margin-top: 8px;
    padding: 18px;
    border: none;
    border-radius: 8px;
    background: #242926;
    color: #7A9283;
  }
`
const BlackBox = styled.div<{ isDate: boolean }>`
  height: 86px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  padding: ${props => props.isDate ? '20px 10px 10px' : '10px 20px'};
  border-radius: 8px;
  background: #242926;
  .MuiTypography-root, .MuiInputLabel-root {
    color: #7A9283 !important;
    font-family: 'Inconsolata', 'Bai Jamjuree', sans-serif, Poppins;
  }
  .MuiInputBase-input {
    color: #A5FFBE;
    font-family: 'Inconsolata', 'Bai Jamjuree', sans-serif, Poppins;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiSvgIcon-root {
    fill: #4B5954;
  }
`
const BlackBoxChain = styled(BlackBox)<{activeChain: boolean}>`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: ${props => props.activeChain ? '1px solid #A5FFBE' : 'none'};
`
const ImgBox = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`
export default function CollectionModal({ visiblePush, closePushModal, collectionId }) {
  const { library, account, chainId } = useActiveWeb3React()
  const { dispatch } = useContext(mainContext);
  const history = useHistory()
  const { needSign } = useNeedSign();
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [selectChainType, setSelectChainType] = useState(chainArr[1].value)
  const [mintLimit, setMintLimit] = useState(null)
  const [publishForm, setPublishForm] = useState<any>({});
  const [severity,setSeverity] = useState('success')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')

  // const [errors, setErrors] = useState({
  //   name: false,
  //   description: false,
  //   mintLimit: false,
  // });

  const handleCancel = () => {
    closePushModal()
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    setMintLimit(event.target.value)
  };

  const beforeDeploy = () => {
    needSign()
    if (selectChainType !== getChainType(chainId)) {
      if (chainFun[selectChainType]) {
        chainFun[selectChainType]()
      }
      return false
    }
    return true
  }

  const handelSubmit = async () => {
    // @ts-ignore
    console.log(beforeDeploy());
    // @ts-ignore
    if (!beforeDeploy()) return false
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: true
    })
    
    let mintStartTime = startTime.valueOf()
    let mintEndTime =  endTime.valueOf()
    let userLimit = mintLimit
    let acceptCurrency = '0x0000000000000000000000000000000000000000'
    let mintPrice = 0
    
    let res = await deployFreeMintNFT721(library, account, publishForm.name, publishForm.tokenSymbol, selectChainType, publishForm.maxCount, mintStartTime / 1000, mintEndTime / 1000, userLimit, acceptCurrency, mintPrice)
    console.log(res);
    pushcollection(mintStartTime, mintEndTime, selectChainType, res)
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: false
    })
  }
  const pushcollection = async (mintStartTime, mintEndTime, chainType, contractInfo) => {
    let res = publishCollection(collectionId, mintStartTime, mintEndTime, chainType, contractInfo.address, contractInfo.transactionHash, contractInfo.blockNumber)
    console.log(res);
    initMsg("Success!")
    closePushModal()
    history.push(`/collectionDetail/${collectionId}`)
  }
  const initMsg = (msg) => {
    setMsg(msg)
    setSeverity('success')
    setIsSnackbarOpen(true)
  }
  const queryInfo = async (collectionId) => {
    let res = await queryCollectionDetail(collectionId)
    console.log(res);
    setPublishForm(res)
    console.log(publishForm);
  }
  const selectChain = (type) => {
    setSelectChainType(type)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }
  const changeTime = (e) => {
    console.log(e);
    
    console.log(moment(e));
    console.log(moment(e).format("YYYY-MM-DD HH:mm:ss"));
    console.log();
    
    console.log(new Date(e).getTime());
    
  }
  
  useEffect(() => {
    collectionId && queryInfo(collectionId)
  }, [collectionId])

  return (
    <>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
      <Modal
        open={visiblePush}
        onClose={handleCancel}
      >
        <Box sx={{ ...style }}>
          <div>Deploy & Push</div>
          <BlackBox isDate={false} >
            <ColorGreenLight className='lh28'>{publishForm.name}</ColorGreenLight>
            <div className='c_green fs20 lh24 mb10'>{publishForm.name}</div>
          </BlackBox>
          <div className='df mb14'>
            <BlackBox isDate={false} className='mr6 f1'>
              <ColorGreenLight className='lh28'>NFTs</ColorGreenLight>
              <div className='c_green fs20 lh24 mb10'>{publishForm.typeCount}</div>
            </BlackBox>
            <BlackBox isDate={false} className='f1'>
              <ColorGreenLight className='lh28'>Total supply</ColorGreenLight>
              <div className='c_green fs20 lh24 mb10'>{publishForm.maxCount}</div>
            </BlackBox>
          </div>
          <ColorGreenLight className='lh24'>Select a network to deploy your collection. </ColorGreenLight>
          <div className='df'>
            {
              chainArr.map((item, index) => (
                <BlackBoxChain isDate={false} className='mr6 f1 df cp' activeChain={selectChainType === item.value} onClick={() => { selectChain(item.value) }}>
                  <ImgBox src={item.icon}></ImgBox>
                  <div className='ml10 df_align_center'>
                    {/* <div className='mb6'>{item.name}</div> */}
                    {item.name}
                    {/* <ColorGreenLight className='fs12'>Balance: 300 AGLD</ColorGreenLight> */}
                  </div>
                </BlackBoxChain>
              ))
            }
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={'df'} >
              <BlackBox isDate={true} className='mr6 p10'>
                <DateTimePicker label={'Start Time'} ampm={false}
                  value={startTime}
                  format='MM/DD/YYYY HH:mm'
                  onChange={(newValue) => setStartTime(newValue)}
                />
              </BlackBox>
              <BlackBox isDate={true}>
                <DateTimePicker label={'End Time'} ampm={false}
                  value={endTime}
                  format='MM/DD/YYYY HH:mm'
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </BlackBox>
            </div>
          </LocalizationProvider>
          <BlackBox isDate={false}>
            <TextInput fullWidth id="collection-name-1" label="Per-wallet Mint Limit" name={'mintLimit'}
              placeholder={``}
              value={mintLimit}
              onChange={handleChange}
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </BlackBox>
          <div className='mt20 mb20'>
            <Button className='wp100 h36 mt20 mb20 btn_themeColor' onClick={handelSubmit}>Confirm</Button>
          </div>
        </Box>
      </Modal>

    </>
  )
}
