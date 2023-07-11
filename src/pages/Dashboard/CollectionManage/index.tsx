import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Button, Modal, Box, TextField, Switch } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CollectionModal from '../CollectionModal';
import PushModal from '../PushModal';
import DeleteModal from '../DeleteModal';
import Snackbar from "components/SnackMessage"
import { useActiveWeb3React } from '../../../web3';
import { delCollection, queryCollectionDetail, saveNFT, useOwnerNFTTypesList,queryNFTTypeDetail } from "../../../services/createNFTManage"
import { dataURLtoBlob } from 'utils/dataURLtoBlob';
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
  .css-15pnunx-MuiButtonBase-root-MuiButton-root.Mui-disabled{
    background-color: #a5ffbefa;
  }
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
  position: relative;
  flex: 1;
  margin-right: 20px;
  border-radius: 8px;
  background: var(--card-color, #242926);
`
const ShowImg = styled.img`
  position: absolute;
  top: 0;
  max-width: 100%;
  max-height: 100%;
  /* object-fit: cover; */
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
    margin-top: 2px;
    padding: 14px 18px;
    border: none;
    border-radius: 8px;
    background: #242926;
    color: #fff;
  }
`
const SwitchGroup = styled(FormGroup)`
  width: 120px;
  margin-top: 20px;
  margin-bottom: -10px;
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
const ArrtList = styled.div`
  /* display: flex; */
  max-height: 160px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`
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
  top: 10px;
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
  &:hover {
    border: 1px solid #A5FFBE;
  }
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
  const history = useHistory()
  const { account } = useActiveWeb3React()
  const { collectionId } = useParams<any>()
  const [collectionInfo, setCollectionInfo] = useState<any>({})
  const chooseImg = useRef(null)
  const [loading, setLoading] = useState(false)
  const [refreshList, setRefreshList] = useState(1)
  const { list, total } = useOwnerNFTTypesList(collectionId, 1, 10, setLoading, refreshList)
  const [visible, setVisible] = useState(false)
  const [visibleNFT, setVisibleNFT] = useState(false)
  const [visiblePush, setVisiblePush] = useState(false)
  const [visibleDel, setVisibleDel] = useState(false)
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [nftForm, setNftForm] = useState<any>({})
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditNFT,setIsEditNFT] = useState(false);
  const [arrts, setAttrs] = useState([
    {
      name: '',
      value: ''
    }
  ])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('success')

  const openModal = () => {
    setVisibleNFT(true)
  }
  const handleCancel = () => {
    setVisible(false)
    queryInfo()
  }
  const handleCancel2 = () => {
    setVisiblePush(false)
  }
  const handleCancelNFT = () => {
    setVisibleNFT(false)
  }
  const handelDel = () => {
    setVisibleDel(false)
  }
  const openFile = () => {
    chooseImg.current.click()
  }
  const addItem = () => {
    let obj = {
      name: '',
      value: ''
    }
    setAttrs([...arrts, obj])
    console.log(arrts);
    
  }
  const removeItem = (index) => {
    let arr = [...arrts]
    arr.splice(index, 1)
    setAttrs(arr)
  }
  const deleteCollection = async () => {
    let res = await delCollection(collectionId)
    handelDel()
    initMsg("Success!", 'success')
    history.push('/dashboard')
    console.log(res);
  }
  const openDelModal = () => {
    setVisibleDel(true)
  }
  const openEdit = () => {
    setVisible(true)
  }
  const openDeploy = () => {
    setVisiblePush(true)
  }
  const queryInfo = async () => {
    let res = await queryCollectionDetail(collectionId)
    setCollectionInfo(res)
  }
  const changeFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  const handleChange = (event) => {
    console.log(event);
    
    const { name, value } = event.target;
    setNftForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handelSubmit = async () => {
    if (!selectedImage) {
      initMsg("Image is required", 'error')
      return false
    }
    if (!nftForm.name) {
      initMsg("Name is required", 'error')
      return false
    }
    if (!nftForm.description) {
      initMsg("Description is required", 'error')
      return false
    }
    if (!nftForm.count) {
      initMsg("Total Supply is required", 'error')
      return false
    }
    const formData = new FormData()
    let reg = /https:\/\//
    if (selectedImage && !reg.test(selectedImage)) {
      formData.append('image', dataURLtoBlob(selectedImage))
    }
    // formData.append('image', dataURLtoBlob(selectedImage))
    formData.append('name', nftForm.name)
    formData.append('description', nftForm.description)
    formData.append('count', nftForm.count)
    formData.append('typeId', nftForm.id)

    try {
      arrts.map(item => {
        if (!item.name || !item.value) {
          initMsg("Please add properties", 'error')
          throw Error();
        }
      })
    } catch (error) {
      return false
    }
    setLoading(true)
    let obj = Object.fromEntries(arrts.map(item => [item.name, item.value]));
    formData.append('attributes', JSON.stringify(obj))

    try {
      let res = await saveNFT(collectionId, formData)
      initMsg('Success!', 'success')
      handleCancelNFT()
      let a = refreshList + 1
      setRefreshList(a)
      setNftForm({})
      setLoading(false)
      queryInfo()
    } catch (error) {
      setLoading(false)
      initMsg(error, 'error')
    }
  }
  const initMsg = (msg, status) => {
    setMsg(msg)
    setSeverity(status)
    setIsSnackbarOpen(true)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }
  const handleChangeArrt = (event, idx, type) => {
    let arr = [...arrts]
    arr[idx][type] = event.target.value
    setAttrs(arr)
  }
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    if (!event.target.checked) {
      setAttrs([])
    } else {
      setAttrs([{
        name: '',
        value: ''
      }])
    }
  }
  const openNFTEdit = (item) => {
    setVisibleNFT(true)
    setIsEditNFT(true)
    console.log(item);
    
    queryTypeDetail(item.collectionId,item.id)
  }
  const queryTypeDetail = async (collectionId,typeId) => {
    let res = await queryNFTTypeDetail(collectionId,typeId)
    setNftForm(res)
    // @ts-ignore
    setSelectedImage(res.image)
     // @ts-ignore
    setAttrs(res.attributes)
  }

  useEffect(() => {
    queryInfo()
  }, [collectionId])

  return (
    <>
      <CollectionManage>
        <ManageHeader>
          <CollectionItem>
            <CollectionTitle>{collectionInfo.name ? collectionInfo.name : '--'}</CollectionTitle>
            <CollectionFunc>
              <ThemeProvider theme={theme}>
                <BtnMr variant="outlined" color="error" onClick={openDelModal}>Delete</BtnMr>
                <BtnMr variant="outlined" color="primary" onClick={openEdit}><IconEdit /> &nbsp;Edit</BtnMr>
                <Button disabled={collectionInfo.maxCount === 0} variant="contained" color="primary" onClick={openDeploy}>Deploy & Push</Button>
              </ThemeProvider>
            </CollectionFunc>
          </CollectionItem>
          <CollectionDes>{collectionInfo.description}</CollectionDes>
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
              <BadgeCard key={item.project} item={item} type='' clickEvent={openNFTEdit} />
            ))
          }
        </ManageMain>
      </CollectionManage>
      {
        visible &&
        <CollectionModal visible={visible} closeModal={handleCancel} collectionInfo={collectionInfo}></CollectionModal>
      }
      {
        visiblePush &&
        <PushModal visiblePush={visiblePush} closePushModal={handleCancel2} collectionId={collectionInfo.id}></PushModal>
      }
      {
        <DeleteModal visible={visibleDel} closeDel={handelDel} delFunc={deleteCollection}></DeleteModal>
      }

      <Modal
        open={visibleNFT}
        onClose={handleCancelNFT}>
        <Box sx={{ ...style }}>
          <div className='mb20'>Edit NFT</div>
          <CreateNftBaseBox>
            <UploadBox className='df_column_center cp' onClick={openFile}>
              <div className='df_column_center'>
                <IconCreate>+</IconCreate>
                <div className='c_green mt20'>Upload Item</div>
                <ColorGreenLight className='mt10'>Supported file types</ColorGreenLight>
                <ColorGreenLight className='mt8'>include JPEG, PNG, and GIF.</ColorGreenLight>
              </div>
              <ShowImg src={selectedImage}></ShowImg>
              {/* <img ></img> */}
              <UploadInput ref={chooseImg} type='file' accept='image/*' onChange={changeFile}></UploadInput>
            </UploadBox>
            <div className='f1'>
              <TextInput fullWidth id="nft-name" label="NFT Name" name={'name'}
                placeholder={`e.g. "NFT name"`}
                variant="standard"
                value={nftForm.name}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }} />
              <TextInput fullWidth id="standard-helperText" name={'description'}
                label="Description (Optional)"
                placeholder="Description"
                rows={4}
                multiline
                variant="standard"
                value={nftForm.description}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextInput fullWidth id="collection-name" label="Total Supply" name={'count'}
                placeholder={`e.g. "Total Supply"`}
                variant="standard"
                value={nftForm.count}
                onChange={handleChange}
                type='number'
                InputLabelProps={{
                  shrink: true,
                }} />
            </div>
          </CreateNftBaseBox>
          <SwitchGroup >
            <FormControlLabel control={<GreenSwitch defaultChecked onChange={handleSwitchChange} />} label="Properties" labelPlacement="start" />
          </SwitchGroup>
          <ArrtList>
            {
              arrts.map((item, index) => (
                <ArrtItem>
                  <ItemKey>
                    <TextInput fullWidth id="standard-helperText"
                      placeholder="Key"
                      multiline
                      variant="standard"
                      value={item.name}
                      onChange={(event) => { handleChangeArrt(event, index, 'name') }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                    />
                  </ItemKey>
                  <ItemVal>
                    <TextInput fullWidth id="standard-helperText"
                      placeholder="Value"
                      multiline
                      variant="standard"
                      value={item.value}
                      onChange={(event) => { handleChangeArrt(event, index, 'value') }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                    />
                    <ItemFunc>
                      {
                        <ItemAdd onClick={() => { removeItem(index) }}>-</ItemAdd>
                      }
                      {
                        index === (arrts.length - 1) &&
                        <ItemAdd onClick={addItem}>+</ItemAdd>
                      }
                    </ItemFunc>
                  </ItemVal>
                </ArrtItem>
              ))
            }
          </ArrtList>
          <div className='mt20 mb20 tar'>
            <LoadingButton loading={loading} className='w200 h36 mt20 mb20 btn_themeColor' onClick={handelSubmit}>{loading ? 'Loading' : 'Save'}</LoadingButton>
            {/* <Button className='w200 btn_themeColor' onClick={handelSubmit}>Save</Button> */}
          </div>
        </Box>
      </Modal>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
    </>
  )
}
