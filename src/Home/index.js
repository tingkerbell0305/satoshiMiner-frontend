import { flexbox, styled } from "@mui/system";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import { useWallet } from "@solana/wallet-adapter-react";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "../index.css";

const Wrapper = styled("div")(({ theme }) => ({
  position: 'relative',
  maxWidth: 500,
  margin: "0 auto",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const wallet = useWallet();

  return (
    <div>
      <Wrapper>
        <Header />
        <BakeCard />
        <NutritionFacts />
        <ReferralLink address={wallet.publicKey && wallet.publicKey.toBase58()} />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    </div>
  );
}
