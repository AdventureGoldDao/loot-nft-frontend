import React from "react";
import styled from "styled-components";
import {Typography} from "@mui/material";
import {BASE_IMG, MultiChainNFT} from "../../pages/Bridge";


const CardFrame = styled.div`
  border-radius: 12px;
  border: 1px solid #3C5141;
  background: #1A1E1B;
  padding: 10px;
  margin: 23px 0 40px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  .name {
    
  }
`

const Cover = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 7px;
  margin-right: 40px;
`

export const NFTCard = ({nft, tokenId, onClick}: {nft:MultiChainNFT|undefined; tokenId: string|undefined ,onClick: () => void }) => {
    return (
        <CardFrame onClick={onClick}>
            <Cover
                src={BASE_IMG}/>
            <div>
                <Typography color={'#EBEBEB'} fontSize={18} fontWeight={600}>{nft?.name} {tokenId}</Typography>
            </div>
        </CardFrame>
    )
}
