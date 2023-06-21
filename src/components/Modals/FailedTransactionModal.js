import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Box } from "@mui/material";

import { HANDLE_SHOW_FAILED_TRANSACTION_MODAL } from "../../const";
import { mainContext } from "../../reducer";
import { ReactComponent as FailedIcon } from '../../assets/img/failed_icon.svg'
import styles from "./styles.module.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 496,
  boxShadow: 24,
  border: '1px solid #5E4848 !important',
  padding: '50px 15px',
  textAlign: 'center'
};

export const FailedTransactionModal = ({ visible }) => {
  const { dispatch } = useContext(mainContext);
  const { t } = useTranslation()

  const handleCancel = () => {
    dispatch({
      type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
      showFailedTransactionModal: false
    });
  }

  return (
    <Modal
      open={visible}
      onClose={handleCancel}
    >
      <Box sx={{ ...style }}>
        <FailedIcon />
        <div className={styles.title} style={{ color: '#FF7D7D' }}>Failed</div>
        <div style={{ color: '#975D5D' }}>Transaction failed, please try again</div>
      </Box>
    </Modal>
  );
};
