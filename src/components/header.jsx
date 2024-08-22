import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Link } from 'react-router-dom';
import { getAllUser, registerUser } from '../services/gameShiftService';

export const Header = () => {
    const { publicKey, connected } = useWallet();
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
        <>
            <div className="container" >
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        </a>
                    </div>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to={''} className="nav-link px-2">Home</Link></li>
                        <li><Link to={'/your-nft'} className="nav-link px-2">YourNFT</Link></li>
                        <li><Link to={''} className="nav-link px-2">Marketplace</Link></li>
                        <li><Link to={'/nft/create'} className="nav-link px-2">Create NFT</Link></li>
                        <li> <div className="container d-flex justify-content-between align-items-center">
                            <div>
                                <WalletMultiButton className="btn btn-primary me-2" />
                            </div>
                        </div> </li>
                    </ul>
                </header>
            </div>

        </>

    );
};