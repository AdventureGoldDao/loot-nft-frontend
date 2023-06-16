import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { Select, Spin, Input } from "@mui/material";

import { getContract, useActiveWeb3React } from "../../web3"
import { useActiveTronWeb } from "hooks/activeTronWeb";
import { useNftList } from "services/nftData"
import NftCard from "components/NftCard";
import NoData from "components/NoData";
import styles from "./styles.module.scss";

const NftList = ({ nftType, nftChain, saleType, owner }) => {
  const [pageNo, setPageNo] = useState(1)
  const [force, setForce] = useState(0)
  const [others, setOthers] = useState({ nftType, nftChain, saleType, owner })
  const { t } = useTranslation();
  const history = useHistory();
  const { library, account, chainId, active } = useActiveWeb3React()
  const { tronAccount } = useActiveTronWeb()
  const [loading, setLoading] = useState(false)
  const { list, total } = useNftList(pageNo, 12, others,setLoading)

  const getList = () => {
    setPageNo(pageNo + 1)
  }

  useEffect(() => {
    setPageNo(1)
    setOthers({ nftType, nftChain, saleType, owner })
  }, [nftType, nftChain, saleType, owner])

  return (
    <div>
      {
        loading ? <Spin className={`wp100 mt40`} size="large" /> :
        <InfiniteScroll
          dataLength={list.length}
          next={getList}
          hasMore={list.length < total}
          loader={
            <div className={`wp100 tac mt20`}>
              <Spin size={`large`} />
            </div>
          }
          className={styles.list_box}
        >
          {
            list.length === 0 && <div className={`wp100 df_center mt60`}><NoData></NoData></div>
          }
          {
            list.map(item => (
              item && <NftCard key={item.contractAddress + item.id + item.chainType} tokenInfo={item} />
            ))
          }
        </InfiniteScroll>
      }
    </div>
    
  )
}

export default NftList;