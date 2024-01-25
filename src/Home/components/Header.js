import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
import "../../index.css";

import {
  WalletDialogProvider as MaterialUIWalletDialogProvider,
  WalletMultiButton as MaterialUIWalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-material-ui';
import Grid from "@mui/material/Grid";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 21,
      margin: 0,
    },
  },
}));

const WalletButton = styled("div")(() => ({
  display: 'flex',
  flexDirection: 'row-reverse'
}))

// const helpLink = styled("div")(() => ({
//   display: 'flex',
//   flexDirection: 'row',
// }))

export default function Header() {
  return (
    <Wrapper>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start", flexGrow: 1, marginLeft: "100px", marginRight: "50px" }}>
        <a href="" style={{ color: "white", fontSize: "20px" }}>Gitbook</a>
        <Grid container justifyContent="center" spacing={8}>
          <Grid item>
            <a href="https://t.me/orangefarmer" target="__blank">
              <img src={tgIcon} alt="" width={34} height={30} />
            </a>
          </Grid>
          <Grid item>
            <a href="/" target="__blank">
              <img src={twIcon} alt="" width={28} height={28} />
            </a>
          </Grid>
        </Grid>
        <WalletButton>
          <MaterialUIWalletMultiButton variant="text" style={{
            border: "2px solid #FCB117",
            fontWeight: 700,
            background: "transparent",
            borderRadius: '43px',
            color: 'white',
            minWidth: "170px",
            fontSize: '16px'
          }} />
        </WalletButton>
      </div>
      <img src={logo} className="logo" alt="" style={{ marginTop: "30px", height: "188px", width: "85%" }} />
      <hr />
      <Typography marginTop={1} style={{ color: "#FEB100", fontSize: "18px" }}>
        <b>Earn a daily income of up to 15% + 10% referral bonus.</b>
        {/* <strong>(<a href="" target="_blank" style={{ color: "black" }}>Documentation</a>)</strong> */}
      </Typography>

      <Typography marginTop={2} textAlign={'center'} style={{ paddingLeft: "5px", paddingRight: "5px", color: "white", fontSize: "16px" }}>
        <br />
        <span style={{ display: 'block', paddingLeft: "10px", paddingRight: "10px" }}>
          <span style={{ color: "#FEB100" }}><b>Step 1:</b></span> Start by using your SOL to buy Sats.<br /><br />
        </span>
        <span style={{ display: 'block', paddingLeft: "10px", paddingRight: "10px" }}>
          <span style={{ color: "#FEB100" }}><b>Step 2: </b></span>
          To maximize your earnings, click on the <b>"COMPOUND"</b> button<br /><br />
        </span>
        <span style={{ display: 'block', paddingLeft: "10px", paddingRight: "10px" }}>
          <span style={{ color: "#FEB100" }}><b>Step 2:</b></span>
          <b> CLAIM REWARDS: </b>
          This will transfer your accumulated SOL rewards directly into your wallet.<br />
        </span>
      </Typography>
    </Wrapper>
  );
}
