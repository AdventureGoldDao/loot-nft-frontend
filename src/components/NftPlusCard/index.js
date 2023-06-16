import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";
import icon from "../../assets/img/nft+/icon_num.png"
import defaultImg from "assets/img/defaultImg2.jpg";


const NftPlusCard = ({onClick, item }) => {
    const [showSoldOut, setShowSoldOut] = useState(false);
    const history = useHistory();
    const bg = useRef()
    const initData = () => {
        if(Date.now()>item.sellEndTime) {
            setShowSoldOut(false)
        }else {
            if(item.count-item.soldCount === 0){
                setShowSoldOut(true)
            }
        }
    }
    const dealImg = () => {
        bg.current.style.display="none"
    }
    useEffect(() => {
        initData()
    }, [])

    return (
        <div className={styles.card_main} onClick={()=>{onClick(item)}}>
            <div className={styles.card_box}>
                <div className={styles.card_img_bg}>
                    <img ref={bg} className={styles.card_img} src={defaultImg} />
                    <img onLoad={dealImg} className={styles.card_img} src={item.image} />
                </div>
                <div className={`${styles.card_title} text_hidden_1`}>{item.displayName}</div>
                {
                    showSoldOut && <div className={styles.card_detail}>SOLD OUT</div>
                }
            </div>
            <div className={`df_center mt20`}>
                <img width={24} src={icon}></img>
                <span className={`pl5`}>{item.count}</span>
            </div>
        </div>
    )
}

export default NftPlusCard;