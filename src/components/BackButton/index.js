import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import back from "assets/img/back.svg";
import styles from "./styles.module.scss";

const BackButton = ({onClick, text}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      history.goBack()
    }
  }

  return (
    <div className={styles.back_box} onClick={handleClick}>
      <img className={styles.back_icon} src={back} alt="" />
      <span>{text ? text : t('back')}</span>
    </div>
  )
}

export default BackButton;