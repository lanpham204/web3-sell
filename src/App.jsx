import { Wallet } from './components/wallet'
import { Header } from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { YourNFT } from './components/yourNft';
import { NFTDetail } from './components/nftDetail';
import { Marketplace } from './components/marketplace';
import { CreateNFT } from './components/create-nft';
import { NFTDetailMarketplace } from './components/nftDetailMarketplace';
import HeaderFlagment from './components/HeaderFlagment';
import Footer from './components/footer';
function App() {

  return (
    <Wallet>
      <BrowserRouter>
        <HeaderFlagment />
        {/* <Header></Header> */}
        <Routes>
          <Route path='your-nft' element={<YourNFT />}></Route>
          <Route path='' element={<Marketplace />}></Route>
          <Route path='nft/:id' element={<NFTDetail />}></Route>
          <Route path='marketplace/:id' element={<NFTDetailMarketplace />}></Route>
          <Route path='nft/create' element={<CreateNFT />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Wallet >
  )
}

export default App
