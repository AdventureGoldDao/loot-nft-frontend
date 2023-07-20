import React, {useEffect, useState, useContext, useMemo} from 'react'
import {Box, Button, Stack, Typography} from "@mui/material";

import {useNeedSign} from "hooks/account"
import {useActiveWeb3React} from "../../web3";
import {chainFun, SUPPORTED_CHAINS} from '../../utils/networkConnect';
import {ReactComponent as DownIcon} from "assets/img/down.svg";
import {
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL
} from "../../const";
import {mainContext} from "../../reducer";
import {getChainType} from '../../web3/address';
import styled from "styled-components/macro";
import bg from '../../assets/img/explore_bg.svg'
import {NFTSelect} from "../../components/Select/NFTSelect";
import {NFTCard} from "../../components/NFT";
import NFTSelectView from "../../components/Modals/NFTSelectView";
import {approvedForAll, getIsApprovedForAll} from "../../utils/handleContract";
import {CrossChainMessenger, NFTBridgeAdapter} from "@constellation-labs/sdk";
import {getContractFactory, predeploys} from "@constellation-labs/contracts";
import {ethers} from "ethers";
import History from 'components/history'

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 120px 100px;
  background-repeat: no-repeat;
  background-position: center top;
  background-image: url(${bg});
`

const BridgerFrame = styled.div`
  margin: 0 auto;
  width: 590px;
  border-radius: 20px;
  border: 1px solid #FDFFAC;
  background: #242926;
  text-align: center;
  font-weight: 600;
  padding: 27px 38px 36px;
`

const SwitchButton = styled.div`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #A5FFBE;
  background: #151815;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
  cursor: pointer;
`

const SelectFrame = styled.div`
  height: 96px;
  border-radius: 12px;
  border: 1px solid #3C5141;
  background: #1A1E1B;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 23px 0 40px;
  color: #A5FFBE;
  font-size: 18px;
  cursor: pointer;
`

export interface BaseNFT {
    chainId: number
    address: string
    name: string
    symbol: string
    baseUrl: string
}

export interface MultiChainNFT {
    name: string
    l1: BaseNFT
    l2: BaseNFT
}

export const nft: { tokens: MultiChainNFT[] } = {
    tokens: [{
        name: 'Loot',
        l1: {
            chainId: 5,
            address: '0x7093b806Df66c4E4c535eA522EAE3CBa3EAD8337',
            name: 'Loot',
            symbol: 'LOOT',
            baseUrl: ''
        },
        l2: {
            chainId: 9088912,
            address: '0xA4016C81976E6db51DC756c664c630acE8b041CD',
            name: 'Loot',
            symbol: 'LOOT',
            baseUrl: ''
        }
    }]
}

export const BASE_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPiJHcmltIFNob3V0IiBHcmF2ZSBXYW5kIG9mIFNraWxsICsxPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI0MCIgY2xhc3M9ImJhc2UiPkhhcmQgTGVhdGhlciBBcm1vcjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGNsYXNzPSJiYXNlIj5EaXZpbmUgSG9vZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5IYXJkIExlYXRoZXIgQmVsdDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+IkRlYXRoIFJvb3QiIE9ybmF0ZSBHcmVhdmVzIG9mIFNraWxsPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxMjAiIGNsYXNzPSJiYXNlIj5TdHVkZGVkIExlYXRoZXIgR2xvdmVzPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNDAiIGNsYXNzPSJiYXNlIj5OZWNrbGFjZSBvZiBFbmxpZ2h0ZW5tZW50PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSIxNjAiIGNsYXNzPSJiYXNlIj5Hb2xkIFJpbmc8L3RleHQ+PC9zdmc+'


export enum BrightField {
    DEPOSIT,
    WITHDRAW
}

enum ViewField {
    BRIDGE,
    SELECT
}

export enum HistoryField {
    LIST,
    DETAIL
}

const ConfirmButton = styled(Button)`
  background: linear-gradient(90deg, #A5FFBE 0%, #55DD7B 100%);
  color: #213425!important;
  border-radius: 10px;
`

export default function Bridge() {
    const {library, account} = useActiveWeb3React()
    const [fromChainType, setFromChainType] = useState(SUPPORTED_CHAINS[5].value)
    const [toChainType, setToChainType] = useState(SUPPORTED_CHAINS[9088912].value)
    const [selectedNFT, setSelectNFT] = useState<MultiChainNFT | undefined>()
    const [selectTokenId, setSelectTokenId] = useState<string | undefined>()
    const [approved, setApproved] = useState(true)
    const [auction, setAuction] = useState(BrightField.DEPOSIT)
    const [view, setView] = useState(ViewField.BRIDGE)
    const [historyView, setHistoryView] = useState(HistoryField.LIST)
    const [showHistory, setShowHistory] = useState(false)

    const {dispatch} = useContext(mainContext);
    const {chainId} = useActiveWeb3React()
    const {needSign} = useNeedSign();

    useEffect(() => {
        if (!account || !selectedNFT) return
        getIsApprovedForAll(
            library,
            auction === BrightField.DEPOSIT ? selectedNFT.l1.address : selectedNFT.l2.address,
            account,
            auction === BrightField.DEPOSIT ? '0x7822B26Fb728D63e57b939c6a2124DB64EC4bB6F' : predeploys.L2ERC721Bridge)
            .then((value) => {
                setApproved(value)
            })
    }, [account, auction, library, selectedNFT])

    const messenger = useMemo(() => {
        if (!library || !account) return undefined
        return new CrossChainMessenger({
            l1SignerOrProvider: auction === BrightField.DEPOSIT ? library.getSigner() : new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/R-2IK-_U4uoJKpr3zO9VqUl3upMmZsPh'),
            l2SignerOrProvider: auction === BrightField.WITHDRAW ? library.getSigner() : new ethers.providers.JsonRpcProvider('https://testnet.rpc.lootchain.com/http'),
            l1ChainId: 5,
            l2ChainId: 9088912,
            contracts: {
                l1: {
                    AddressManager: '0xfDf9cbDF4d6049C9f42Be3C84AA61Ffe2BF915f6',
                    L1CrossDomainMessenger: '0xF2aE2fb831a5c081cc64BCf4D3294025A71612e5',
                    L1StandardBridge: '0x7834750f243570093B72cB04dE00557250cea385',
                    L1ERC721Bridge: '0x7822B26Fb728D63e57b939c6a2124DB64EC4bB6F',
                    StateCommitmentChain: '0x2a2FF5B0cCD4A1Eaf1B6eEA40EB827B0A7cf165d',
                    CanonicalTransactionChain: '0xAC97f6CCe8344C1d4953d7583Cb81eb909d7d5D3',
                    BondManager: '0x709cdeBA5441a1a1FD8506f7A2a59C4edE2E8A8c',
                }
            },
            bridges: {
                Standard: {
                    Adapter: NFTBridgeAdapter,
                    l1Bridge: '0x7822B26Fb728D63e57b939c6a2124DB64EC4bB6F',
                    l2Bridge: predeploys.L2ERC721Bridge,
                }
            },
            depositConfirmationBlocks: 0,
            getLogsProvider: undefined
        })
    }, [account, auction, library])

    useEffect(() => {

    }, [])

    const handleSwitchFrom = () => {
        switchChain()
    }

    const handleSwitchTo = () => {
        switchChain()
    }

    const switchChain = () => {
        const f = fromChainType;
        const t = toChainType;
        setFromChainType(t)
        setToChainType(f)
        setAuction(auction === BrightField.DEPOSIT ? BrightField.WITHDRAW : BrightField.DEPOSIT)
    }

    const showSuccessModal = () => {
        dispatch({
            type: HANDLE_SHOW_TRANSACTION_MODAL,
            showTransactionModal: {
                show: true,
                title: 'TRANSACTION SUBMITTED',
                content: 'The wallet balance may take a few minutes to update.'
            }
        });
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: {
                show: false
            }
        });
    }

    const showFailedModal = () => {
        dispatch({
            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
            showWaitingWalletConfirmModal: {
                show: false
            }
        });
        dispatch({
            type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
            showFailedTransactionModal: {
                show: true
            }
        });
    }

    const deployMintableContract = async () => {
        const l2Factory = getContractFactory('OptimismMintableERC721', library.getSigner())
        const l2Address = await l2Factory.deploy(
            predeploys.L2ERC721Bridge,
            '0x7093b806Df66c4E4c535eA522EAE3CBa3EAD8337',
            'Loot',
            'LOOT'
        )
        console.log('l2Address', l2Address)
    }

    const confirmBridge = () => {
        needSign(async () => {
            if (fromChainType !== getChainType(chainId)) {
                if (chainFun[fromChainType]) {
                    chainFun[fromChainType]()
                }
            } else {
                if (!approved) {
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: {
                            show: true,
                            title: 'APPROVING IN progress',
                            content: ''
                        }
                    });
                    approvedForAll(
                        library,
                        auction === BrightField.DEPOSIT ? selectedNFT.l1.address : selectedNFT.l2.address,
                        account,
                        auction === BrightField.DEPOSIT ? '0x7822B26Fb728D63e57b939c6a2124DB64EC4bB6F' : predeploys.L2ERC721Bridge)
                        .then((transaction) => {
                            dispatch({
                                type: HANDLE_SHOW_TRANSACTION_MODAL,
                                showTransactionModal: {
                                    show: true,
                                    title: 'APPROVE SUCCESS',
                                    content: 'you can bridge your NFT now.'
                                }
                            });
                            dispatch({
                                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                                showWaitingWalletConfirmModal: {
                                    show: false
                                }
                            });
                            setApproved(true)
                        })
                        .catch((error) => {
                            showFailedModal()
                        })
                } else {
                    dispatch({
                        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                        showWaitingWalletConfirmModal: {
                            show: true,
                            title: `${auction === BrightField.DEPOSIT ? 'DEPOSITING' : 'WITHDRAWING'} IN progress`,
                            content: ''
                        }
                    });
                    if (auction === BrightField.DEPOSIT) {
                        messenger.depositERC721(selectedNFT.l1.address, selectedNFT.l2.address, selectTokenId)
                            .then((result) => {
                                setSelectNFT(undefined)
                                setSelectTokenId(undefined)
                                showSuccessModal()
                            }).catch((error) => {
                            showFailedModal()
                        })
                    } else {
                        messenger.withdrawERC721(selectedNFT.l1.address, selectedNFT.l2.address, selectTokenId)
                            .then((result) => {
                                setSelectNFT(undefined)
                                setSelectTokenId(undefined)
                                showSuccessModal()
                            }).catch((error) => {
                            showFailedModal()
                        })
                    }

                }
            }
        })
    }

    const openNFTModal = () => {
        setView(ViewField.SELECT)
    }
    const onSelectNFT = (tokenId: string) => {
        setSelectTokenId(tokenId)
        setView(ViewField.BRIDGE)
    }

    const RightNav = styled(Typography)`
      font-size: 12px;
      cursor: pointer;
      color: #7A9283;
      position: absolute;
      right: 4px;
      ::after {
        display: inline-block;
        content: " ";
        height: 6px;
        width: 6px;
        border-width: 1px 1px 0 0;
        border-color: #7A9283;
        border-style: solid;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 5px;
        left: 56px;
      }
    `

    const LeftNav = styled(Typography)`
      font-size: 12px;
      cursor: pointer;
      color: #7A9283;
      position: absolute;
      left: 14px;

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
        right: 37px;
      }
    `

    return (
        <>
            <PageWrapper>
                <BridgerFrame>
                    {view === ViewField.BRIDGE ? (
                        <>
                            <Stack direction="column" justifyContent="center" position="relative">
                                {showHistory && <LeftNav onClick={() => {
                                    historyView === HistoryField.LIST? setShowHistory(false) : setHistoryView(HistoryField.LIST)
                                }} fontSize={12}>BACK</LeftNav>}
                                <Typography fontSize={24}
                                            color={'#A5FFBE'}>{showHistory ? 'History' : 'NFT Bright'}</Typography>
                                {!showHistory && <RightNav onClick={() => {
                                    setShowHistory(true)
                                }} fontWeight={300} fontSize={12} margin={'12px'}>HISTORY</RightNav>}
                            </Stack>
                            {showHistory ? <History view={historyView} setView={() => {
                                setHistoryView(HistoryField.DETAIL)
                            }}></History> : <>
                                <Box mt={'27px'}>
                                    <NFTSelect
                                        onChange={handleSwitchFrom}
                                        value={fromChainType}
                                    />
                                    <SwitchButton onClick={switchChain}><DownIcon/></SwitchButton>
                                    <NFTSelect
                                        onChange={handleSwitchTo}
                                        value={toChainType}
                                    />
                                    {
                                        selectTokenId ?
                                            <NFTCard nft={selectedNFT} tokenId={selectTokenId} onClick={openNFTModal}/> :
                                            <SelectFrame onClick={openNFTModal}>+ Select NFT</SelectFrame>
                                    }
                                    <ConfirmButton sx={{
                                        width: '100%',
                                        height: 50,
                                        borderRadius: '8px',
                                        fontSize: '20px'
                                    }} onClick={confirmBridge}>
                                        {fromChainType !== getChainType(chainId) ? `Connect to ${fromChainType}` : approved ? 'Bright' : 'Approve'}
                                    </ConfirmButton>
                                    {/*<Button onClick={deployMintableContract}>deploy</Button>*/}
                                </Box>
                            </>}
                        </>
                    ) : (
                        <NFTSelectView
                            onSetView={() => {
                                setView(ViewField.BRIDGE)
                            }}
                            onMultiNFTSelect={setSelectNFT}
                            auction={auction}
                            onSelectTokenId={onSelectNFT}
                            list={nft.tokens}
                            selectedTokenId={selectTokenId}/>
                    )}
                </BridgerFrame>
            </PageWrapper>
        </>
    )
}
