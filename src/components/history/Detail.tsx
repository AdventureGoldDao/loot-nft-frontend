import React, { Dispatch, SetStateAction} from 'react'
import {Button, Typography, styled, Box} from "@mui/material";
import FromLogo from 'assets/img/chain/com_eth.svg'
import ToLogo from 'assets/img/chain/com_loot.svg'
import arrow from 'assets/img/right-arrow.png'
import {
    MessageDirection,
    MessageStatus
} from "@constellation-labs/sdk";
import {findNFT, RichBridgeMessage, statusToString} from "./index";
import {useActiveWeb3React} from "../../web3";
import {useMessage} from "../../constants";
import moment from "moment/moment";
import {HistoryField} from "../../pages/Bridge";


const DetailHome = styled('div')({
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    marginTop: 27
})

const DetailBox = styled('div')({
    margin: '0 auto',
    borderRadius: '20px',
    background: '#242926',
    textAlign: 'center',
    fontWeight: 600,
})

const TopContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
})

const Left = styled('div')({
    width: 247,
    height: 131,
    borderRadius: '12px',
    backgroundColor: '#1A1E1B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
})

const Right = styled('div')({
    width: 247,
    height: 131,
    borderRadius: '12px',
    backgroundColor: '#1A1E1B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
})

const Title = styled('p')({
    width: '100%',
    marginLeft: 36,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#7A9283'
})

const ChainName = styled('div')({
    fontFamily: 'Inconsolata',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#EBEBEB'
})

const Id = styled('p')({
    fontSize: 14,
    '& span:first-child': {
        color: '#7A9283',
        fontWeight: 400
    },
    '& span:last-child': {
        fontWeight: 700,
        color: '#A5FFBE'
    }
})

const Time = styled('div')({
    textAlign: 'left',
    fontFamily: 'Inconsolata',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22px',
    color: '#7A9283',
    marginTop: 20,
    '& .content': {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: '17px',
        color: '#EBEBEB',
        marginTop: 12,
    }
})

const NftContent = styled('div')`
  height: 96px;
  background: #1A1E1B;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;

  img {
    width: 76px;
    height: 76px;
    border-radius: 7px;
  }

  .name {
    width: 236px;
    color: #EBEBEB;
    font-size: 16px;
    text-align: left;
    margin-left: 30px;
  }


  p:last-child {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
    font-family: Inconsolata;
    font-size: 24px;
    font-weight: 600;
    line-height: 25px;
  }

  button {
    width: 104px;
    height: 36px;
    border-radius: 8px;
    background-color: #A5FFBE;
    color: #000000;
    margin-left: 30px;
  }
`


export default function HistoryDetail({message}: { message: RichBridgeMessage | undefined; setAction: Dispatch<SetStateAction<HistoryField>> }) {

    const {library} = useActiveWeb3React()

    const messenger = useMessage()

    return (
        <>
            <DetailHome>
                <DetailBox>
                    <TopContent>
                        <Left>
                            <Title>From</Title>
                            {message.message.direction === MessageDirection.L1_TO_L2 ? (
                                <>
                                    <img width={48} src={FromLogo} alt=''/>
                                    <ChainName>Ethereum Goerli</ChainName>
                                    <Id>
                                        <span>TxID: </span>
                                        <a target="_blank" style={{textDecoration: 'none'}}
                                           href={`https://goerli.etherscan.io/tx/${message.message.transactionHash}`}><span>{message.message.transactionHash.slice(0, 6) + '...' + message.message.transactionHash.slice(-4)}</span></a>
                                    </Id>
                                </>
                            ) : (
                                <>
                                    <img width={48} src={ToLogo} alt=''/>
                                    <ChainName>Loot Chain Testnet</ChainName>
                                    <Id>
                                        <span>TxID: </span>
                                        <a target="_blank" style={{textDecoration: 'none'}}
                                           href={`https://testnet.explorer.lootchain.com/tx/${message.message.transactionHash}`}><span>{message.message.transactionHash.slice(0, 6) + '...' + message.message.transactionHash.slice(-4)}</span></a>
                                    </Id>
                                </>
                            )}
                        </Left>
                        <img width={50} style={{
                            position: 'absolute',
                            left: 'calc(50% - 25px)',
                            top: 'calc(50% - 25px)'
                        }} src={arrow} alt=''/>
                        <Right>
                            <Title>To</Title>
                            {message.message.direction === MessageDirection.L2_TO_L1 ? (
                                <>
                                    <img width={48} src={FromLogo} alt=''/>
                                    <ChainName>Ethereum Goerli</ChainName>
                                    <Id>
                                        <span>TxID: </span>
                                    </Id>
                                </>
                            ) : (
                                <>
                                    <img width={48} src={ToLogo} alt=''/>
                                    <ChainName>Loot Chain Testnet</ChainName>
                                    <Id>
                                        <span>TxID: </span>
                                    </Id>
                                </>
                            )}
                        </Right>
                    </TopContent>
                    <NftContent>
                        <img style={{width: 76, height: 76, borderRadius: 6, marginRight: 32}}
                             src='https://openseauserdata.com/files/58a6bd564656896770eb815815928760.svg' alt=''/>
                        <div className={'name'}>
                            <p style={{textAlign:"left", fontSize: 14}}>{findNFT(message.message)?.name}</p>
                            <p style={{fontSize: 28, marginTop:8, textAlign: 'left'}}> {findNFT(message.message)?.l1.name} #{message.message.tokenId.toString()}</p>
                        </div>
                        <Box sx={{marginLeft: 'auto'}}>
                            {message.status === MessageStatus.READY_FOR_RELAY ? (<Button onClick={(e) => {
                                e.stopPropagation()
                                messenger.finalizeMessage(message.message, {signer: library.getSigner()})
                            }
                            }>Claim</Button>) : statusToString(message.status)}
                        </Box>
                    </NftContent>
                    <Time>
                        <Typography className={'title'}>Time stamp</Typography>
                        <Typography
                            className={'content'}>{moment.unix(message?.block?.timestamp).format('YYYY-MM-DD HH:mm:ss').toString()}</Typography>
                    </Time>
                </DetailBox>
            </DetailHome>
        </>
    )
}
