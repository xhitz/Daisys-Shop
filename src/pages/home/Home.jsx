import React, {useEffect, useState} from 'react';
import {Nfts} from '../../components'
import {useContractKit} from "@celo-tools/use-contractkit";
import {useMarketContract} from "../../hooks/useMarketContract";
import axios from "axios";
import {ethers} from "ethers";

const Home = () => {

    const {address} = useContractKit()
    const marketplace = useMarketContract()

    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (marketplace)
            loadNFTs()
    }, [marketplace])

    const loadNFTs = async ()  =>{
        try {
            console.log("Loading NFTs")
            const data = await marketplace.methods.fetchMarketItems().call()
            const items = await Promise.all(data.map(async i => {
                const tokenUri = await marketplace.methods.tokenURI(i.tokenId).call()
                const meta = await axios.get(tokenUri)
                let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
                return {
                    price,
                    tokenId: Number(i.tokenId),
                    seller: i.seller,
                    owner: i.owner,
                    image: meta.data.image,
                    name: meta.data.name
                }
            }))

            setNfts(items)
            setLoading(false)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>   
            <Nfts nfts={nfts} address={address} title="For Sale" loading={loading}  />
        </div>
    );
};

export default Home;