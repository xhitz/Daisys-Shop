import React from 'react'
import './nfts.css'
import {Link} from 'react-router-dom';
import {GridLoader } from "react-spinners";

const Nfts = ({title, address, nfts, loading, relist}) => {

    return (
        <div className='bids section__padding'>
            <div className="bids-container">
                <div className="bids-container-text">
                    {!loading && <h1>{nfts.length < 1 ? "No NFTs Available" : title}</h1>}
                </div>
                <div className="bids-container-card">
                    {loading && 
                        <>
                            <GridLoader  color={"pink"} size={50} />
                            {!address && 
                                <p className='pih'>Please Connect Wallet</p>
                            }
                        </> 
                    }
                    {nfts.map((nft) => (<Link key={nft.tokenId} to={!relist ? `/nft/${nft.tokenId}` : `/nft/${nft.tokenId}/relist`}>
                        <div className="card-column cursor-pointer">
                            <div className="bids-card">
                                <div className="bids-card-top">
                                    <div className="bids-card-topz" >
                                        <img src={nft.image} alt=""/>
                                    </div>
                                    <p className="bids-title">{nft.name}</p>
                                </div>
                                <div className="bids-card-bottom">
                                    <p>{nft.price} <span>CELO</span></p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Nfts
