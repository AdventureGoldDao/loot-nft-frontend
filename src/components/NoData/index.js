import React from "react";
import {ReactComponent as EmptyIcon} from 'assets/img/empty.svg';
import styles from "./styles.module.scss";

const NoData = ({text}) => {
  return (
    <div className={styles.noData}>
        <EmptyIcon/>
        <p className={`fw600 mt14 c_9a fs16`}>{text?text:'No Data'}</p>  
    </div>
  )
}

export default NoData;