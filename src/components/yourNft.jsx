import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { cancelListingMarketplace, getNFTForUser, listingMarketplace } from '../services/gameShiftService';
import { Modal, Button, Form, Input, message } from "antd";
export const YourNFT = () => {
    const { publicKey, sendTransaction, connected } = useWallet();
    const [nfts, setNfts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCancelVisible, setIsModalCancelVisible] = useState(false);
    const [selectedNFTId, setSelectedNFTId] = useState(null);
    useEffect(() => {
        if (connected && publicKey) {
            readAllYourNFT();
        } else {
            console.log('Wallet not connected or publicKey is null');
        }
    }, [connected, publicKey]);
    function readAllYourNFT() {
        getNFTForUser(publicKey)
            .then((res) => {
                console.log(res);
                setNfts(res.data.data)
                console.log(nfts);
            })
            .catch((err) => {
                console.warn(err);
            });
    }
    function listtingNFTToMarketplace(itemId, amount) {
        listingMarketplace(itemId, amount)
            .then((response) => {
                console.log(response);
                message.success("NFT listed successfully!");
                window.open(response.data.consentUrl)
            })
            .catch((error) => {
                message.error("Failed to list NFT: Asset is already listed for sale");
                console.error(error);
            })
            .finally(() => {
                setIsModalVisible(false);
                readAllYourNFT()
            });
    }
    function cancellisttingNFTToMarketplace(itemId) {
        cancelListingMarketplace(itemId)
            .then((response) => {
                console.log(response);
                message.success("NFT canceled successfully!");
                window.open(response.data.consentUrl)
            })
            .catch((error) => {
                message.error("Failed to canceled NFT");
                console.error(error);
            })
            .finally(() => {
                setIsModalCancelVisible(false);
                readAllYourNFT()
            });
    }
    const showModal = (nftId) => {
        setSelectedNFTId(nftId);
        setIsModalVisible(true);
    };
    const showModalCancel = (nftId) => {
        setSelectedNFTId(nftId);
        setIsModalCancelVisible(true);
    };

    const handleOk = (values) => {

        listtingNFTToMarketplace(selectedNFTId, values.amount)
    };
    const handleCancelListing = (values) => {
        cancellisttingNFTToMarketplace(selectedNFTId)
    };
    const handleCancel = () => {
        setIsModalCancelVisible(false);
        setIsModalVisible(false);
    };
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    {
                        nfts.map((nft, i) => (
                            <div className="col-md-4">
                                <div className="card card-custom">
                                    <Link to={`/nft/${nft.item.id}`}><img src={nft.item.imageUrl} className="card-img-top card-img-top-custom" alt="" /></Link>
                                    <div className="card-body card-body-custom">
                                        <h5 className="card-title">{nft.item.name}</h5>
                                        <button className="btn btn-success" onClick={() => showModal(nft.item.id)}>List</button>
                                        {nft.item.priceCents != null && <button className="btn btn-warning" onClick={() => showModalCancel(nft.item.id)}>Un List</button>}
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>
            </div>
            <Modal
                title="List NFT to Marketplace"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form onFinish={handleOk}>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: "Please input the amount!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" >
                            List NFT
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Cancel Listing NFT to Marketplace"
                visible={isModalCancelVisible}
                onCancel={handleCancel}
                onOk={handleCancelListing}
            >
            </Modal>
        </>

    );
};