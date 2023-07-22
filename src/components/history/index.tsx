import React, {useContext, useEffect, useMemo, useState} from 'react'
import {
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import FromLogo from 'assets/img/chain/com_eth.svg'
import ToLogo from 'assets/img/chain/com_loot.svg'
import HistoryDetail from './Detail';
import {MessageDirection, MessageStatus, NFTBridgeMessage} from "@constellation-labs/sdk";
import {ethers} from "ethers";
import {useActiveWeb3React} from "../../web3";
import {BrightField, ConfirmButton, HistoryField, nft} from "../../pages/Bridge";
import moment from "moment";
import {defaultL1Provider, defaultL2Provider, useMessage} from "../../constants";
import {ReactComponent as Loading} from '../../assets/img/loading_icon.svg'
import {chainFun} from "../../utils/networkConnect";
import {HANDLE_SHOW_TRANSACTION_MODAL, HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL} from "../../const";
import {mainContext} from "../../reducer";

const StyledTableCell = styled(TableCell)(({small}: { small?: boolean }) => ({
    color: '#7A9283 !important',
    fontFamily: 'Inconsolata',
    fontSize: 16,
    lineHeight: '22px',
    letterSpacing: 0,
    '& img': {
        width: 26,
        height: 26
    },
    '& button': {
        width: 80,
        height: 36,
        backgroundColor: '#A5FFBE',
        color: '#000000'
    },
    [`&.${tableCellClasses.head}`]: {
        padding: 0,
        paddingLeft: small ? 24 : 40,
        height: '31px',
        backgroundColor: '#1A1E1B',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        color: '#3F5170',
        border: 'none',
        borderBottom: '1px solid #3C5141',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    [`&.${tableCellClasses.head}.firstColumn`]: {
        borderLeft: 'none',
        fontWeight: 300,

    },
    [`&.${tableCellClasses.body}`]: {
        padding: small ? '0px 20px' : '0px 40px',
        height: 84,
        fontFamily: 'Inter',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#3F5170',
        fontWeight: 300,

    }
}))

const StyledTableRow = styled(TableRow)(() => ({
    cursor: 'pointer',
    '& td': {
        border: 'none',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#151815'
    }
}))

const HistoryHome = styled('div')({
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    marginTop: 27
})

const HistoryBox = styled('div')({
    margin: '27px auto 2px auto',
    borderRadius: '20px',
    background: '#242926',
    textAlign: 'center',
    fontWeight: 600,
})

const HistoryTitle = styled('div')({
    fontSize: 24,
    color: '#A5FFBE',
    margin: 27
})

const LoadingView = styled(Loading)`
  margin: auto;
`
const LoadingContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export type RichBridgeMessage = {
    message: NFTBridgeMessage;
    status: MessageStatus;
    block: ethers.providers.Block;
    claimed: boolean;
};

export const statusToString = (status: number) => {
    /*
      UNCONFIRMED_L1_TO_L2_MESSAGE = 0,
      FAILED_L1_TO_L2_MESSAGE = 1,
      STATE_ROOT_NOT_PUBLISHED = 2,
      IN_CHALLENGE_PERIOD = 3,
      READY_FOR_RELAY = 4,
      RELAYED = 5
      */
    const statuses: { [key: number]: string } = {
        0: 'Unconfirmed Deposit',
        1: 'Failed Deposit',
        2: 'Awaiting state root',
        3: 'In challenge period',
        4: 'Ready for relay',
        5: 'Finalized',
    };
    if (status in statuses) {
        return statuses[status]!;
    } else {
        return 'Unknown';
    }
};

export const findNFT = (message: NFTBridgeMessage) => {
    return nft.tokens.find((nft) => {
        return (nft.l1.address.toLowerCase() === message.l1Token.toLowerCase() && nft.l2.address.toLowerCase() === message.l2Token.toLowerCase()) ||
            (nft.l1.address.toLowerCase() === message.l2Token.toLowerCase() && nft.l2.address.toLowerCase() === message.l1Token.toLowerCase())
    })
}

export default function History({view, setView}: { view: HistoryField, setView: (view: HistoryField) => void }) {
    const {library, account, chainId} = useActiveWeb3React()
    const {dispatch} = useContext(mainContext);
    const [isHistoryDetailVisible, setIsHistoryDetailVisible] = useState(false)
    const [message, setMessage] = useState<RichBridgeMessage | undefined>()
    const [depositList, setDepositList] = useState<Array<RichBridgeMessage>>([])
    const [withdrawList, setWithdrawList] = useState<Array<RichBridgeMessage>>([])
    const [depositLoading, setDepositLoading] = useState(false)
    const [withdrawLoading, setWithdrawLoading] = useState(false)
    const [claimList, setClaimList] = useState<string[]>([])

    const messenger = useMessage()

    useEffect(() => {
        if (!account) return
        setDepositLoading(true)
        setWithdrawLoading(true)
        messenger.getDepositsByAddress(account).then(async (result) => {
            const deposits = await Promise.all(result.map(async (message) => {
                const status = await messenger.getMessageStatus(message)
                const block = message.direction === MessageDirection.L1_TO_L2
                    ? await defaultL1Provider.getBlock(message.blockNumber)
                    : await defaultL2Provider.getBlock(message.blockNumber)
                const claimed = !!window.localStorage.getItem(message.transactionHash)
                return {message: message as NFTBridgeMessage, status, block, claimed}
            }))
            setDepositLoading(false)
            setDepositList(deposits)
        })
        messenger.getWithdrawalsByAddress(account).then(async (result) => {
            const withdraws = await Promise.all(result.map(async (message) => {
                const status = await messenger.getMessageStatus(message)
                const block = message.direction === MessageDirection.L1_TO_L2
                    ? await defaultL1Provider.getBlock(message.blockNumber)
                    : await defaultL2Provider.getBlock(message.blockNumber)
                const claimed = !!window.localStorage.getItem(message.transactionHash)
                return {message: message as NFTBridgeMessage, status, block, claimed}
            }))
            setWithdrawLoading(false)
            setWithdrawList(withdraws)
        })
    }, [account, messenger])

    console.log('deposit', depositList)
    console.log('withdraw', withdrawList)

    const histories = useMemo(() => {
        return withdrawList.concat(depositList)
    }, [depositList, withdrawList])


    return (
        <>
            {isHistoryDetailVisible && view === HistoryField.DETAIL ?
                <HistoryDetail message={message} setAction={() => {
                    setView(HistoryField.LIST)
                }}/> :
                <HistoryHome>
                    <HistoryBox>
                        <TableContainer
                            sx={{borderRadius: '12px', width: '100%', backgroundColor: '#1A1E1B', height: 465}}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{height: 45}}>
                                        <StyledTableCell className="firstColumn">Items</StyledTableCell>
                                        <StyledTableCell small>From</StyledTableCell>
                                        <StyledTableCell small>To</StyledTableCell>
                                        <StyledTableCell style={{paddingLeft:18}}>Time</StyledTableCell>
                                        <StyledTableCell/>
                                    </TableRow>
                                </TableHead>
                                {(depositLoading || withdrawLoading) ? null : (
                                    <>{
                                          histories.length === 0 ? null : (
                                              <TableBody>
                                                  {histories.map((row, index) => {
                                                      return (
                                                          <StyledTableRow key={index} onClick={() => {
                                                              setView(HistoryField.DETAIL)
                                                              setMessage(row)
                                                              setIsHistoryDetailVisible(true)
                                                          }}>
                                                              <StyledTableCell
                                                                  style={{
                                                                      padding: '0 10px 0 40px',
                                                                      width: 120,
                                                                      maxWidth: 120,
                                                                      whiteSpace: 'nowrap',
                                                                      overflow: 'hidden',
                                                                      textOverflow: 'ellipsis'
                                                                  }}
                                                              >
                                                                  {findNFT(row.message)?.name}
                                                                  <Typography
                                                                      fontWeight={300}>#{row.message.tokenId.toString()}</Typography>
                                                              </StyledTableCell>
                                                              {row.message.direction === MessageDirection.L1_TO_L2 ? (
                                                                  <>
                                                                      <StyledTableCell small>
                                                                          <img
                                                                              src={FromLogo}
                                                                              alt=''
                                                                          />
                                                                      </StyledTableCell>
                                                                      <StyledTableCell small>
                                                                          <img
                                                                              src={ToLogo}
                                                                              alt=''
                                                                          />
                                                                      </StyledTableCell>
                                                                  </>
                                                              ) : (
                                                                  <>
                                                                      <StyledTableCell small>
                                                                          <img
                                                                              src={ToLogo}
                                                                              alt=''
                                                                          />
                                                                      </StyledTableCell>
                                                                      <StyledTableCell small>
                                                                          <img
                                                                              src={FromLogo}
                                                                              alt=''
                                                                          />
                                                                      </StyledTableCell>
                                                                  </>
                                                              )}

                                                              <StyledTableCell style={{width: 350, padding: '0 20px'}}>
                                                                  <p>
                                                                      {moment.unix(row?.block?.timestamp).format('YYYY/MM/DD').toString()}
                                                                  </p>
                                                                  <p>
                                                                      {moment.unix(row?.block?.timestamp).format('HH:mm:ss').toString()}
                                                                  </p>
                                                              </StyledTableCell>
                                                              <StyledTableCell>
                                                                  {row.status === MessageStatus.READY_FOR_RELAY ? (
                                                                      <ConfirmButton disabled={row.claimed || claimList.indexOf(row.message.transactionHash) !== -1} onClick={(e) => {
                                                                          e.stopPropagation()
                                                                          if ((row.message.direction === MessageDirection.L1_TO_L2 && chainId ===9088912) ||(row.message.direction === MessageDirection.L2_TO_L1 && chainId === 5)) {
                                                                              dispatch({
                                                                                  type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                                                                                  showWaitingWalletConfirmModal: {
                                                                                      show: true,
                                                                                      title: `CLAIM IN progress`
                                                                                  }
                                                                              });
                                                                              messenger.finalizeMessage(row.message, {signer: library.getSigner()}).then(()=>{
                                                                                  window.localStorage.setItem(row.message.transactionHash,  row.message.transactionHash)
                                                                                  setClaimList(claimList.concat(row.message.transactionHash))
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
                                                                              })
                                                                          }else {
                                                                              if(row.message.direction === MessageDirection.L1_TO_L2){
                                                                                  chainFun['loottest']()
                                                                              }
                                                                              if(row.message.direction === MessageDirection.L2_TO_L1){
                                                                                  chainFun['goerli']()
                                                                              }
                                                                          }
                                                                      }
                                                                      }>Claim</ConfirmButton>) : statusToString(row.status)}
                                                              </StyledTableCell>
                                                          </StyledTableRow>
                                                      )
                                                  })}
                                    </TableBody>
                                )
                                }</>

                                    )}
                            </Table>
                            {(depositLoading || withdrawLoading)? (
                            <LoadingContainer>
                                <LoadingView/>
                            </LoadingContainer>
                            ): histories.length === 0 ? (<LoadingContainer><Typography>NO
                            HISTORY</Typography></LoadingContainer>): null}
                        </TableContainer>
                    </HistoryBox>
                </HistoryHome>}
        </>
    )
}
