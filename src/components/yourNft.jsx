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
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-content">
                            {/* ***** Banner Start ***** */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="main-profile ">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <img src="assets/images/profile.jpg" alt style={{ borderRadius: 23 }} />
                                            </div>
                                            <div className="col-lg-4 align-self-center">
                                                <div className="main-info header-text">
                                                    <span>Offline</span>
                                                    <h4>Alan Smithee</h4>
                                                    <p>You Haven't Gone Live yet. Go Live By Touching The Button Below.</p>
                                                    <div className="main-border-button">
                                                        <a href="#">Start Live Stream</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 align-self-center">
                                                <ul>
                                                    <li>Games Downloaded <span>3</span></li>
                                                    <li>Friends Online <span>16</span></li>
                                                    <li>Live Streams <span>None</span></li>
                                                    <li>Clips <span>29</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="clips">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="heading-section">
                                                                <h4><em>Your </em> NFT</h4>
                                                            </div>
                                                        </div>
                                                        {nfts.map((nft, i) => (
                                                            <div key={i} className="col-lg-3 col-sm-6">
                                                                <div className="item">
                                                                    <div className="">
                                                                        <img src={nft.item.imageUrl} alt height={"200px"} style={{ borderRadius: 23 }} />
                                                                        <a href="https://www.youtube.com/watch?v=r1b03uKWk_M" target="_blank"></a>
                                                                    </div>
                                                                <div className="down-content mt-2">
                                                                    <h4>{nft.item.name}</h4>
                                                                    <span onClick={()=>showModal(nft.item.id)} className='btn text-danger'>
                                                                        Sell
                                                                    </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ***** Banner End ***** */}
                            {/* ***** Gaming Library Start ***** */}
                            {/* <div className="gaming-library profile-library">
                                <div className="col-lg-12">
                                    <div className="heading-section">
                                        <h4><em>Your Gaming</em> Library</h4>
                                    </div>
                                    <div className="item">
                                        <ul>
                                            <li><img src="assets/images/game-01.jpg" alt className="templatemo-item" /></li>
                                            <li><h4>Dota 2</h4><span>Sandbox</span></li>
                                            <li><h4>Date Added</h4><span>24/08/2036</span></li>
                                            <li><h4>Hours Played</h4><span>634 H 22 Mins</span></li>
                                            <li><h4>Currently</h4><span>Downloaded</span></li>
                                            <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                                        </ul>
                                    </div>
                                    <div className="item">
                                        <ul>
                                            <li><img src="assets/images/game-02.jpg" alt className="templatemo-item" /></li>
                                            <li><h4>Fortnite</h4><span>Sandbox</span></li>
                                            <li><h4>Date Added</h4><span>22/06/2036</span></li>
                                            <li><h4>Hours Played</h4><span>745 H 22 Mins</span></li>
                                            <li><h4>Currently</h4><span>Downloaded</span></li>
                                            <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                                        </ul>
                                    </div>
                                    <div className="item last-item">
                                        <ul>
                                            <li><img src="assets/images/game-03.jpg" alt className="templatemo-item" /></li>
                                            <li><h4>CS-GO</h4><span>Sandbox</span></li>
                                            <li><h4>Date Added</h4><span>21/04/2022</span></li>
                                            <li><h4>Hours Played</h4><span>632 H 46 Mins</span></li>
                                            <li><h4>Currently</h4><span>Downloaded</span></li>
                                            <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            {/* ***** Gaming Library End ***** */}
                        </div>
                    </div>
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