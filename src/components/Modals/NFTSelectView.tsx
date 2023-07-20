import {Box, MenuItem, Modal, Select, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BASE_IMG, BaseNFT, BrightField, MultiChainNFT} from "../../pages/Bridge";
import {ReactComponent as SearchIcon} from '../../assets/svg/nft-search.svg'
import {useActiveWeb3React} from "../../web3";
import http from "../../utils/http";

const Search = styled(SearchIcon)`
  margin: auto;
`

const ModalContent = styled.div`
  border-radius: 10px;
  background: #1A1E1B;
  padding: 16px;
  max-height: 60vh;
  overflow: auto;
  margin-top: 20px;
`

const Item = styled.div<{ selected: boolean }>`
  margin: 20px;
  border-radius: 10px;
  background: #282D29;
  padding: 10px;
  cursor: pointer;
  display: ${({selected}) => (selected ? 'flex' : 'block')};
`

const Cover = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin-right: 25px;
`

export interface NFT {
    id: string
}

const CollectionSelect = styled(Select)(() => ({
    '& fieldset': {
        border: "none"
    },
    '&.MuiInputBase-root': {
        background: "transparent",
        width: '100%'
    },
    '& .MuiMenu-list ': {
        background: '#fff'
    }
}))

const SelectContent = styled(Box)`
  height: 468px;
  background-color: #1A1E1B !important;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`

const Selected = styled.div`
  color: #7A9283;
  font-size: 14px;
  font-weight: 600;
  margin-right: 20px;
`

const LeftNav = styled(Typography)`
      font-size: 12px!important;
      cursor: pointer;
      color: #7A9283;
      text-align: left;
      padding-left: 10px;

      ::after {
        display: inline-block;
        content: " ";
        height: 6px;
        width: 6px;
        border-width: 1px 1px 0 0;
        border-color: #7A9283;
        border-style: solid;
        transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
        position: absolute;
        top: 5px;
        left: 0;
      }
    `


interface NFTSelectProps {
    auction: BrightField
    onMultiNFTSelect: (nft: MultiChainNFT) => void
    list: MultiChainNFT[]
    selectedTokenId: string
    onSelectTokenId: (tokenId: string) => void,
    onSetView: () => void
}

export default function NFTSelectView({
                                          auction,
                                          list,
                                          onSetView,
                                          onMultiNFTSelect,
                                          selectedTokenId,
                                          onSelectTokenId
                                      }: NFTSelectProps) {

    const {account} = useActiveWeb3React()

    const [tokenIdList, setTokenIdList] = useState<string[]>()
    const [selectedNFT, setSelectedNFT] = useState<BaseNFT | undefined>()

    useEffect(() => {
        if (!selectedNFT) return
        http.get(`https://test.adventuregold.org/api/nfts?chainType=${selectedNFT.chainId}&owner=${account}&contractAddress=${selectedNFT.address}&pageNo=1&pageSize=100`)
            .then((result) => {
                // @ts-ignore
                console.log('result', result.list)
                // @ts-ignore
                setTokenIdList(result.list.map((item) => item.id))
            })
    }, [selectedNFT, account])

    // useEffect(() => {
    //     if (!library || !account || !selectedNFT) return
    //     console.log('query tokenid', selectedNFT.address)
    //     getUserTokenIds(library, selectedNFT.address, account).then((tokenIds) => {
    //         console.log('tokenIds', tokenIds)
    //         setTokenIdList(tokenIds)
    //     })
    // }, [account, library, selectedNFT])

    const nftList = list.map(({l1, l2}) => auction === BrightField.DEPOSIT ? l1 : l2)
    return (
        <Box sx={{position: 'relative'}}>
            <LeftNav onClick={onSetView}>{`SELECT COLLECTION & NFT`}</LeftNav>
            <ModalContent>
                <CollectionSelect onChange={(e) => {
                    setSelectedNFT(nftList[e.target.value as number])
                    onMultiNFTSelect(list[e.target.value as number])
                }} displayEmpty={true}
                                  renderValue={value => (value || value === 0 || selectedNFT) ? nftList[value as number]?.name ?? selectedNFT.name :
                                      <Typography color={'#7A9283'}>Select a Collect</Typography>}>
                    {nftList.map((value, index) => {
                        return (
                            <MenuItem key={index} value={index}>
                                <Typography>{value.name}</Typography>
                            </MenuItem>
                        )
                    })}
                </CollectionSelect>
            </ModalContent>
            <SelectContent style={{display: tokenIdList ? 'block' : 'flex'}}>
                {tokenIdList ?
                    tokenIdList.map((item: any) => (
                        <Item onClick={() => {
                            onSetView()
                            onSelectTokenId(item)
                        }} key={item}
                              selected={selectedTokenId === item.id}>
                            <Box style={{border: "none", background: "transparent"}} display={"flex"}
                                 alignItems={"center"}>
                                <Cover
                                    src={item.icon || BASE_IMG}
                                    alt={item.name}/>
                                <Typography color={'#EBEBEB'} fontSize={18}
                                            fontWeight={600}>{`${selectedNFT.name} #${item}`}</Typography>
                            </Box>
                            {
                                item === selectedTokenId &&
                                <Selected>current selection</Selected>
                            }
                        </Item>
                    )) : <Search/>
                }
            </SelectContent>
        </Box>
    )
}
