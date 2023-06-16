import React, { useContext } from 'react';

import { mainContext } from "../../reducer";
import { HANDLE_SHOW_EASTER_MODAL } from "../../const";
import styles from './style.module.scss';
import eggImg from "assets/img/easter/egg_img.png";

export default function EasterEgg() {
  const { dispatch } = useContext(mainContext);
  return (
    <img
      className={styles.easter_img}
      src={eggImg}
      onClick={() => {
        dispatch({
          type: HANDLE_SHOW_EASTER_MODAL,
          showEasterModal: true
        });
      }}
    />
  )
}
