import React, { useState, useRef } from 'react'
import { Button, Modal, Box, TextField, Switch } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as IconEdit } from "assets/img/nftManage/icon_edit.svg";
import BadgeCard from 'components/BadgeCard';
import { useBadgeProjectList } from "../../../services/badge"
import bg from 'assets/img/explore_bg.svg'
import styled from 'styled-components/macro';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  boxShadow: 24,
  padding: '20px 24px'
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#A5FFBE',
    },
    error: {
      main: '#FF7D7D',
    },
  },
});
const CollectionManage = styled.div`
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});
`
const ManageHeader = styled.div`
  padding: 25px 50px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
`
const CollectionItem = styled.div`
  display: flex;
  justify-content: space-between;
`
const CollectionTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`
const CollectionFunc = styled.div`
  
`
const BtnMr = styled(Button)`
  margin-right: 10px !important;
  border-radius: 8px;
`
const CollectionDes = styled.div`
  margin-top: 20px;
  line-height: 24px;
  color: var(--font-white, #EBEBEB);
`
const ManageMain = styled.div`
  display: flex;
`
const CreateBox = styled.div`
  width: 20%;
  padding: 10px;
`
const CreateBoxMian = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  border-radius: 10px;
  border: 1px solid #4B5954;
  background: #111211;
  cursor: pointer;
`
const Card = styled.div`
  width: 100%;
  padding-bottom: 100%;
`
const CardMain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const CreateNftBaseBox = styled.div`
  display: flex;
`
const UploadBox = styled.div`
  flex: 1;
  margin-right: 20px;
  border-radius: 8px;
  background: var(--card-color, #242926);
`
const ColorGreenLight = styled.span`
  color: #7A9283;
`
const UploadInput = styled.input`
  /* width: 100%; */
  display: none;
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
const SwitchGroup = styled(FormGroup)`
  width: 100px;
  .MuiFormControlLabel-root {
    margin-left: 0px;
  }
  .MuiTypography-root {
    color: #7A9283;
  }
`
const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#A5FFBE',
    '&:hover': {
      // backgroundColor: rgba('#A5FFBE', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#dedede'
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#A5FFBE',
  },
}));

const ArrtItem = styled.div`
  display: flex;
`
const ItemKey = styled.div`
  flex: 1;
  margin-right: 10px;
`
const ItemVal = styled.div`
  flex: 2;
  display: flex;
  position: relative;
`
const ItemFunc = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #242926;
  position: absolute;
  top: 24px;
  right: 14px;
`
const ItemAdd = styled.div`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border: 1px solid #4B5954;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #7A9283;
  cursor: pointer;
`
const ItemRemove = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid #4B5954;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #7A9283;
  cursor: pointer;
`


export default function CollectionManageIndex() {
  const chooseImg = useRef(null)
  const [loading, setLoading] = useState(false)
  const { list, total } = useBadgeProjectList(1, 4, setLoading, '', '', '')
  const [visible, setVisible] = useState(false)
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [arrts, setAttrs] = useState([
    {
      key: 'Type',
      value: 'name'
    }
  ])

  const openModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const openFile = () => {
    chooseImg.current.click()
  }
  const addItem = () => {
    let obj = {
      key:'',
      value:''
    }
    setAttrs([ ...arrts,obj])
  }
  const removeItem = (index) => {
    let arr = [...arrts]
    arr.splice(index, 1)
    setAttrs(arr)
  }

  return (
    <>
      <CollectionManage>
        <ManageHeader>
          <CollectionItem>
            <CollectionTitle>Nick Collection (NC)</CollectionTitle>
            <CollectionFunc>
              <ThemeProvider theme={theme}>
                <BtnMr variant="outlined" color="error">Delete</BtnMr>
                <BtnMr variant="outlined" color="primary"><IconEdit /> &nbsp;Edit</BtnMr>
                <Button variant="contained" color="primary">Deploy & Push</Button>
              </ThemeProvider>
            </CollectionFunc>
          </CollectionItem>
          <CollectionDes>Embark on this thrilling journey with "Mighty Magic" as you explore the realm of NFTs and engage in epic battles where only the mightiest heroes prevail. Sharpen your strategy, unleash the magic within, and let your heroes claim victory and glory!</CollectionDes>
        </ManageHeader>
        <ManageMain>
          <CreateBox>
            <CreateBoxMian onClick={openModal}>
              <Card></Card>
              <CardMain>
                <IconCreate>+</IconCreate>
                <div className='c_green mt20 fs18'>Create a NFT</div>
              </CardMain>
            </CreateBoxMian>
          </CreateBox>
          {
            list.map(item => (
              <BadgeCard key={item.project} item={item} />
            ))
          }
        </ManageMain>
      </CollectionManage>
      <Modal
        open={visible}
        onClose={handleCancel}>
        <Box sx={{ ...style }}>
          <div className='mb20'>Create NFT</div>
          <CreateNftBaseBox>
            <UploadBox className='df_column_center cp' onClick={openFile}>
              <div className='df_column_center'>
                <IconCreate>+</IconCreate>
                <div className='c_green mt20'>Upload Item</div>
                <ColorGreenLight className='mt10'>Supported file types</ColorGreenLight>
                <ColorGreenLight className='mt8'>include JPEG, PNG, and GIF.</ColorGreenLight>
              </div>
              <UploadInput ref={chooseImg} type='file' accept='image/*'></UploadInput>
            </UploadBox>
            <div className='f1'>
              <TextInput fullWidth id="collection-name" label="NFT Name"
                placeholder={`e.g. "Loot Collection"`}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }} />
              <TextInput fullWidth id="standard-helperText"
                label="Description (Optional)"
                placeholder="Default Value"
                rows={4}
                multiline
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextInput fullWidth id="collection-name" label="Total Supply"
                placeholder={`e.g. "Loot Collection"`}
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }} />
            </div>
          </CreateNftBaseBox>
          <SwitchGroup>
            <FormControlLabel control={<GreenSwitch defaultChecked />} label="Properties" labelPlacement="start" />
          </SwitchGroup>
          {
            arrts.map((item,index) => (
              <ArrtItem>
                <ItemKey>
                  <TextInput fullWidth id="standard-helperText"
                    placeholder="Key"
                    multiline
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ItemKey>
                <ItemVal>
                  <TextInput fullWidth id="standard-helperText"
                    placeholder="Key"
                    multiline
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <ItemFunc>
                    {
                      index >0 &&
                      <ItemAdd onClick={()=>{removeItem(index)}}>-</ItemAdd>
                    }
                    <ItemAdd onClick={addItem}>+</ItemAdd>
                  </ItemFunc>
                </ItemVal>
              </ArrtItem>
            ))
          }
          <div className='mt20 mb20 tar'>
            <Button className='w200 btn_themeColor'>Save</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
