import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { buyNFT, getMarketplace } from '../services/gameShiftService';
import { message } from 'antd';
import { Link } from 'react-router-dom';
export const Marketplace = () => {
    const [nfts, setNfts] = useState([]);
    const { publicKey, connected } = useWallet();
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
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="page-content">
                        {/* ***** Banner Start ***** */}
                        <div className="main-banner">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="header-text">
                                        <h6>Welcome To Cyborg</h6>
                                        <h4><em>Browse</em> Our Popular Games Here</h4>
                                        <div className="main-button">
                                            <a href="browse.html">Browse Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ***** Banner End ***** */}
                        {/* ***** Most Popular Start ***** */}
                        <div className="most-popular">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="heading-section">
                                        <h4><em>Most Popular</em> Right Now</h4>
                                    </div>
                                    <div className="row">
                                        {nfts.map((nft, index) => (

                                            <div key={index} className="col-lg-3 col-sm-6">
                                                <div className="item">
                                                    <Link to={`marketplace/${nft.item.id}`}>
                                                        <img src={nft.item.imageUrl} width={"100%"} height={"175px"} alt />
                                                    </Link>
                                                    <h4>{nft.item.name}<br /><span>{nft.item.priceCents / 100} USDC</span></h4>
                                                    <ul>
                                                        <button className="text-warning btn" onClick={() => buyNftById(nft.item.id)}>Buy</button>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ***** Most Popular End ***** */}
                        {/* ***** Gaming Library Start ***** */}
                        {/* <div className="gaming-library">
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
                                        <li><h4>Hours Played</h4><span>740 H 52 Mins</span></li>
                                        <li><h4>Currently</h4><span>Downloaded</span></li>
                                        <li><div className="main-border-button"><a href="#">Donwload</a></div></li>
                                    </ul>
                                </div>
                                <div className="item last-item">
                                    <ul>
                                        <li><img src="assets/images/game-03.jpg" alt className="templatemo-item" /></li>
                                        <li><h4>CS-GO</h4><span>Sandbox</span></li>
                                        <li><h4>Date Added</h4><span>21/04/2036</span></li>
                                        <li><h4>Hours Played</h4><span>892 H 14 Mins</span></li>
                                        <li><h4>Currently</h4><span>Downloaded</span></li>
                                        <li><div className="main-border-button border-no-active"><a href="#">Donwloaded</a></div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="main-button">
                                    <a href="profile.html">View Your Library</a>
                                </div>
                            </div>
                        </div> */}
                        {/* ***** Gaming Library End ***** */}
                    </div>
                </div>
            </div>
        </div>
    );
};