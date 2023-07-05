import React, { useEffect, useState } from 'react'
import { Button, Modal, Box, TextField } from "@mui/material";

import { useActiveWeb3React } from "../../../web3";
import { saveCollection } from "../../../services/createNFTManage"
import Snackbar from "components/SnackMessage"

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
export default function CollectionModal({ visible, closeModal }) {
  const { account } = useActiveWeb3React()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [severity,setSeverity] = useState('success')
  const [collectionForm, setcollectionForm] = useState({
    name: '',
    description: '',
    tokenSymbol: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    tokenSymbol: false,
  });

  const handleCancel = () => {
    closeModal()
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setcollectionForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handelSubmit = async () => {
    console.log(collectionForm);
    const formErrors = {
      name: collectionForm.name === '',
      description: collectionForm.description === '',
      tokenSymbol: collectionForm.tokenSymbol === '',
    };
    setErrors(formErrors);
    if (Object.values(formErrors).some((error) => error)) {
      return;
    }
    let formData = new FormData();
    formData.append('name', collectionForm.name)
    formData.append('description', collectionForm.description)
    formData.append('tokenSymbol', collectionForm.tokenSymbol)
    formData.append('artistName', account)
    formData.append('category', 'gaming')

    let res = saveCollection(formData)
    console.log(res);
    initMsg('Success')
    closeModal()
  }
  const initMsg = (msg) => {
    setMsg(msg)
    setSeverity('success!')
    setIsSnackbarOpen(true)
  }
  const closeSnackbar = () => {
    setIsSnackbarOpen(false)
  }

  return (
    <>
      <Snackbar isSnackbarOpen={isSnackbarOpen} msg={msg} closeSnackbar={closeSnackbar} severity={severity}></Snackbar>
      <Modal
        open={visible}
        onClose={handleCancel}
      >
        <Box sx={{ ...style }}>
          <div>Create Collection</div>
          <TextInput fullWidth id="collection-name" label="Collection Name" name={'name'}
            placeholder={`e.g. "Loot Collection"`}
            value={collectionForm.name}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            error={errors.name}
            helperText={errors.name ? 'Collection name is required' : ''}
          />
          <TextInput fullWidth id="standard-helperText" label="Description (Optional)" name={'description'}
            placeholder=""
            defaultValue={collectionForm.description}
            value={collectionForm.description}
            onChange={handleChange}
            rows={4}
            multiline
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            error={errors.description}
            helperText={errors.description ? 'Description is required' : ''}
          />
          <TextInput fullWidth id="collection-name-1" label="TokenSymbol" name={'tokenSymbol'}
            placeholder={`e.g. "TokenSymbol"`}
            value={collectionForm.tokenSymbol}
            onChange={handleChange}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            error={errors.tokenSymbol}
            helperText={errors.tokenSymbol ? 'TokenSymbol is required' : ''}
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
    </>
  )
}
