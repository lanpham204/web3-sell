import { useState } from 'react'
import './App.css'
import { Wallet } from './components/wallet'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/header';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { YourNFT } from './components/yourNft';
import { NFTDetail } from './components/nftDetail';
import { Marketplace } from './components/marketplace';
import { CreateNFT } from './components/create-nft';
import { NFTDetailMarketplace } from './components/nftDetailMarketplace';
function App() {

  return (
    <>
      <Wallet>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path='your-nft' element={<YourNFT />}></Route>
            <Route path='' element={<Marketplace />}></Route>
            <Route path='nft/:id' element={<NFTDetail />}></Route>
            <Route path='marketplace/:id' element={<NFTDetailMarketplace />}></Route>
            <Route path='nft/create' element={<CreateNFT />}></Route>
          </Routes>
        </BrowserRouter>
      </Wallet >

    </>
  )
}

export default App
