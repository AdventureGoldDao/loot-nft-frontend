import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Box } from "@mui/material";
import styled from 'styled-components/macro';

import { HANDLE_SHOW_TRANSACTION_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import { ReactComponent as SuccessIcon } from '../../assets/img/success_icon.svg'

const Title = styled.div`
  margin: 20px 0 10px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 496,
  boxShadow: 24,
  padding: '50px 15px',
  textAlign: 'center'
};

export const TransactionModal = ({ visible }) => {
  const { dispatch, state } = useContext(mainContext);
  const { t } = useTranslation()

  const handleCancel = () => {
    dispatch({
      type: HANDLE_SHOW_TRANSACTION_MODAL,
      showTransactionModal: false
    });
  }

  return (
    <Modal
      open={visible}
      onClose={handleCancel}
    >
      <Box sx={{ ...style }}>
        <SuccessIcon />
        <Title style={{ color: '#A5FFBE' }}>SUCCESS</Title>
        <div style={{ color: '#76AB8B' }}>You have successfully claim NFT</div>
      </Box>
    </Modal>
  );
};
