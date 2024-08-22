import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Link, NavLink } from 'react-router-dom'

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { getAllUser, registerUser } from '../services/gameShiftService';

const HeaderFlagment = () => {
    const network = WalletAdapterNetwork.Devnet;
    const { publicKey, sendTransaction, connected } = useWallet();
    useEffect(() => {
        if (connected && publicKey) {
            createUser();
        } else {
            console.log('Wallet not connected or publicKey is null');
        }
    }, [connected, publicKey]);
    function createUser() {
        getAllUser().then((res) => {
            console.log(res);
            const checkExist = res.data.data.findIndex((user) => {
                return user.referenceId == publicKey.toString()
            });
            if (checkExist == -1) {
                registerUser(publicKey).then((res) => {
                    console.log(res);
                })
                    .catch((err) => {
                        console.warn(err);
                    });
            }
        })
            .catch((err) => {
                console.warn(err);
            });
    }
    return (
        <header className="header-area header-sticky">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            {/* ***** Logo Start ***** */}
                            {/* <Link to={""} className="logo">
                                <img src="assets/images/logo.png" alt />
                            </Link> */}
                            {/* ***** Logo End ***** */}
                            {/* ***** Search End ***** */}
                         
                            {/* ***** Search End ***** */}
                            {/* ***** Menu Start ***** */}
                            <ul className="nav">
                                <li><NavLink to="">Home</NavLink></li>
                                <li><NavLink to="">Market Place</NavLink></li>
                                <li><NavLink to="/your-nft">Your NFT</NavLink></li>
                                <li><NavLink to="/nft/create">Create NFT</NavLink></li>
                                <WalletMultiButton className="btn btn-primary me-2" />
                        
                            </ul>
                            <a className="menu-trigger">
                                <span>Menu</span>
                            </a>
                            {/* ***** Menu End ***** */}
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default HeaderFlagment