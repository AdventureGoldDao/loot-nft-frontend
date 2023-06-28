import React, { useEffect, useState } from 'react'
import { Select, MenuItem } from "@mui/material";

import iconarticle from "assets/img/home/icon_article.svg"
import styles from "./styles.module.scss";

export default function Magic() {
  const [pageNo, setPageNo] = useState(1)


  useEffect(() => {
  }, [])
  return (
    <div className={`${styles.home}`}>
    </div>
  )
}
