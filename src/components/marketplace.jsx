import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { buyNFT, getMarketplace } from '../services/gameShiftService';
import { message } from 'antd';
export const Marketplace = () => {
    const [nfts, setNfts] = useState([]);
    const { publicKey, sendTransaction, connected } = useWallet();
    useEffect(() => {
        getAllMarketplace();
    }, []);
    function getAllMarketplace() {
        getMarketplace()
            .then((res) => {
                console.log(res);
                setNfts(res.data.data)
            })
            .catch((err) => {
                console.warn(err);
            });
    }
    function buyNftById(id) {
        if (connected && publicKey) {
            buyNFT(id, publicKey)
                .then((res) => {
                    message.success("Buy NFT successfully!");
                    window.open(res.data.consentUrl)
                })
                .catch((err) => {
                    console.warn(err);
                    message.console.error("Buy NFT error because your wallet isn't connected");
                });
        }
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    {
                        nfts.map((nft, i) => (
                            <div className="col-md-4">
                                <div className="card card-custom">
                                    <Link to={`/marketplace/${nft.item.id}`}><img src={nft.item.imageUrl} className="card-img-top card-img-top-custom" alt="" /></Link>
                                    <div className="card-body card-body-custom">
                                        <h5 className="card-title">{nft.item.name}</h5>
                                        <h5 className="card-title">{nft.item.priceCents / 100} USDC</h5>
                                        <button className="btn btn-list" onClick={() => buyNftById(nft.item.id)}>Buy</button>
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>
            </div>
        </>

    );
};