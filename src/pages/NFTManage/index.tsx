import React, { useState } from 'react'
import { Button, Modal, Box, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import eth from "assets/img/chain/com_eth.svg"
import bg from 'assets/img/explore_bg.svg'
import styled from 'styled-components/macro';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  boxShadow: 24,
  padding: '20px 24px'
};
const NftManage = styled.div`
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});
`
const ManageHeader = styled.div`
  display: flex;
  align-items: flex-end;
`
const Title = styled.div`
  font-size: 48px;
  font-weight: 600;
`
const Status = styled.div`
  display: flex;
  justify-content: space-around;
  line-height: 28px;
  color: #7A9283;
`
const StatusItem = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-around;
  line-height: 28px;
  color: ${props => props.active ? '#A5FFBE' : '#7A9283'};;
`
const ManageMain = styled.div`
  display: flex;
    margin-top: 40px;
`
const CardCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 24%;
  min-width: 300px;
  height: 256px;
  margin-right: 1%;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
  cursor: pointer;
`
const IconCreate = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #A5FFBE;
  border-radius: 50%;
  color: #111211;
  font-size: 36px;
`
const CardItem = styled.div`
  width: 24%;
  min-width: 300px;
  height: 256px;
  margin-right: 1%;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid var(--line-color-2, #4B5954);
  background: var(--card-color, #242926);
`
const ItemDes = styled.div`
  height: 60px;
`
const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.40);
`
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
const BlackBox = styled.div`
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 8px;
  background: #242926;
  .MuiTypography-root {
    color: #7A9283;
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
const ImgBox = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`

export default function NFTManage() {
  const [activeStatus, setActiveStatus] = useState('draft')
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    description:'',
    tokenSymbol:''
  });

  const changeStatus = (type) => {
    setActiveStatus(type)
  }
  const openModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleCancel2 = () => {
    setVisible2(false)
  }
  const push = () => {
    setVisible2(true)
  }
  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handelSubmit = () => {
    console.log(formData);
    
  }
  return (
    <>
      <NftManage>
        <ManageHeader>
          <Title className='f1'>Dashboard</Title>
          <Status className='f2'>
            <StatusItem active={activeStatus === 'draft'} onClick={() => { changeStatus('draft') }}>Draft</StatusItem>
            <StatusItem active={activeStatus === 'scheduled'} onClick={() => { changeStatus('scheduled') }}>Scheduled</StatusItem>
            <StatusItem active={activeStatus === 'ongoing'} onClick={() => { changeStatus('ongoing') }}>Ongoing</StatusItem>
            <StatusItem active={activeStatus === 'completed'} onClick={() => { changeStatus('completed') }}>Completed</StatusItem>
          </Status>
          <div className='f2'>&nbsp;</div>
        </ManageHeader>
        <ManageMain>
          <CardCreate onClick={openModal}>
            <IconCreate>+</IconCreate>
            <div className='c_green mt20 fs18'>Create a Collection</div>
          </CardCreate>
          <CardItem>
            <div className='c_green'>Nick Collection (NC)</div>
            <ItemDes className='lh20 mt10 text_hidden_3'>Loot is randomized adventurer gear generated and stored on chain. Stats, images, and ...</ItemDes>
            <ItemInfo>
              <div><span className='c_green'>3</span><ColorGreenLight className={`pl4`}>NFTs</ColorGreenLight></div>
              <div><ColorGreenLight>Total supply</ColorGreenLight><span className='pl4 c_green'>30,000</span></div>
            </ItemInfo>
            <Button className='wp100 h40 btn_themeColor' onClick={push}>Push</Button>
          </CardItem>
        </ManageMain>
      </NftManage>
      <Modal
        open={visible}
        onClose={handleCancel}
      >
        <Box sx={{ ...style }}>
          <div>Create Collection</div>
          <TextInput fullWidth id="collection-name" label="Collection Name" name={'name'}
            placeholder={`e.g. "Loot Collection"`}
            value={formData.name}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }} />
          <TextInput fullWidth id="standard-helperText" label="Description (Optional)" name={'description'}
            placeholder=""
            defaultValue={formData.description}
            value={formData.description}
            onChange={handleChange}
            rows={4}
            multiline
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextInput fullWidth id="collection-name-1" label="Collection Name" name={'tokenSymbol'}
            placeholder={`e.g. "Loot Collection"`}
            value={formData.tokenSymbol}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className='space-between mt20'>
            <ColorGreenLight className={`fs14`}>Token Standard</ColorGreenLight>
            <span>ERC-721</span>
          </div>
          <div className='mt20 mb20'>
            <Button className='wp100 h36 mt20 mb20 btn_themeColor' onClick={handelSubmit}>Confirm</Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={visible2}
        onClose={handleCancel2}
      >
        <Box sx={{ ...style }}>
          <div>Deploy & Push</div>
          <BlackBox>
            <ColorGreenLight className='lh28'>Collection name</ColorGreenLight>
            <div className='c_green fs20 lh24 mb10'>Nick Collection (NC)</div>
          </BlackBox>
          <div className='df'>
            <BlackBox className='mr6 f1'>
              <ColorGreenLight className='lh28'>NFTs</ColorGreenLight>
              <div className='c_green fs20 lh24 mb10'>3</div>
            </BlackBox>
            <BlackBox className='f1'>
              <ColorGreenLight className='lh28'>Total supply</ColorGreenLight>
              <div className='c_green fs20 lh24 mb10'>30000</div>
            </BlackBox>
          </div>
          <ColorGreenLight>Select a network to deploy your collection. </ColorGreenLight>
          <div className='df'>
            <BlackBox className='mr6 f1 df'>
              <ImgBox src={eth}></ImgBox>
              <div className='ml20'>
                <div className='mb6'>Loot</div>
                <ColorGreenLight className='fs12'>Balance: 300 AGLD</ColorGreenLight>
              </div>
            </BlackBox>
            <BlackBox className='mr6 f1 df'>
              <ImgBox src={eth}></ImgBox>
              <div className='ml20'>
                <div className='mb6'>Ethereum</div>
                <ColorGreenLight className='fs12'>Balance: 300 AGLD</ColorGreenLight>
              </div>
            </BlackBox>
          </div>
          <BlackBox>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']} >
                <DemoItem label={'Claiming Time'} >
                  <DateTimePicker />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </BlackBox>
          <div className='mt20 mb20'>
            <Button className='wp100 h36 mt20 mb20 btn_themeColor'>Confirm</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
