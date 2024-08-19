import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNFT } from '../services/gameShiftService';
export const NFTDetail = () => {
    const { id } = useParams()
    const { publicKey, sendTransaction, connected } = useWallet();
    const [nftDetails, setNft] = useState(null);
    useEffect(() => {
        if (connected && publicKey) {
            readNFTByNFTAddress();
        } else {
            console.log('Wallet not connected or publicKey is null');
        }
    }, [connected, publicKey]);
    function readNFTByNFTAddress() {
        getNFT(id).then((res) => {
            console.log(res);
            setNft(res.data)
        })
            .catch((err) => {
                console.warn(err);
            });
    }

    return (
        <>
            {
                nftDetails != null ? (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={nftDetails.item.imageUrl} className="img-fluid rounded" alt={nftDetails.name} />
                                <p className="text-center mt-2"><a href={nftDetails.item.imageUrl}>View Original</a></p>
                            </div>
                            <div className="col-md-6">
                                <h1 className="nft-title">{nftDetails.item.name}</h1>
                                <p><strong>Network:</strong> Devnet</p>
                                <p><strong>Description:</strong> {nftDetails.item.description || 'N/A'}</p>
                                <h3>Details</h3>
                                <p><strong>Mint Address:</strong> <a href={`https://explorer.solana.com/address/${nftDetails.item.mintAddress}`} target="_blank" rel="noopener noreferrer">{nftDetails.item.mintAddress}</a></p>
                                <p><strong>Owner Address:</strong> <a href={`https://explorer.solana.com/address/${nftDetails.item.owner.address}`} target="_blank" rel="noopener noreferrer">{nftDetails.item.owner.address}</a></p>
                                <h3>Attributes</h3>
                                <p>No Attributes Found</p>
                                {/* <div className="d-flex mt-4">
                            <button className="btn btn-primary me-2">Update NFT</button>
                            <button className="btn btn-danger">Burn NFT</button>
                        </div> */}
                            </div>
                        </div>
                    </div>
                ) : <div></div>

            }
        </>

    );
};