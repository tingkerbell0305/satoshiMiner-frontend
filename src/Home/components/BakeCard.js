/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";

import { useLocation } from "react-router-dom";
import { useContractContext } from "../../providers/ContractProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import PriceInput from "../../components/PriceInput";
import { useEffect, useState, useMemo } from "react";
import { config } from "../../config";
import { buyOranges, sellOranges, hatchOranges, initialize, web3_startMine, web3_setConfig } from "../../contracts/bean";

import {
  getWalletSolBalance,
  getVaultSolBalance,
  getUserData,
  getGlobalStateData
} from "../../contracts/bean"

const CardWrapper = styled(Card)({
  // background: "transparent",
  // backgroundColor: "white",
  marginBottom: 2,
  // border: "1px solid #555",
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

const UnderlinedGrid = styled(Grid)(() => ({
  borderBottom: '1px solid #d3d3d3'
}))

export default function BakeCard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  /*const { address, chainId } = useAuthContext();*/
  const { publicKey: address } = useWallet();
  const [bakeSOL, setBakeSOL] = useState(0);
  const [configSOL, setConfigSOL] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const wallet = useWallet();

  const [minersCount, setMinersCount] = useState("0");
  const [beanRewards, setBeanRewards] = useState("0");
  const [walletSolBalance, setWalletSolBalance] = useState("0");
  const [contractSolBalance, setContractSolBalance] = useState("0");
  const [dataUpdate, setDataUpdate] = useState(false);
  const [adminKey, setAdminKey] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [solPrice, setSolPrice] = useState(101);


  const isAdminConnected = () => {
    if (wallet && wallet.publicKey && adminKey) {
      console.log("adminKey.toString() =", adminKey.toString());
      return wallet.publicKey.toString() == adminKey.toString()
    }
    return false;
  }

  const canShowSettings = useMemo(() => {
    return isInitialized && isAdminConnected()
  }, [isInitialized, adminKey, wallet]);

  const canShowAdminZone = useMemo(() => {
    if (!isInitialized) return true;
    return isAdminConnected();
  }, [isInitialized, adminKey, wallet]);


  const canShowStartMine = useMemo(() => {
    return !isStarted && isAdminConnected()
  }, [isStarted, isInitialized, wallet])


  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd").then(async (res) => {
      let data = await res.json();
      console.log("solana price =", data);
      setSolPrice(Number(data?.solana.usd ?? 0));
    })
  }, [dataUpdate])

  useEffect(() => {
    getWalletSolBalance(wallet).then(bal => {
      setWalletSolBalance(bal);
    });
    getUserData(wallet).then(data => {
      if (data !== null) {
        setBeanRewards(data.beanRewards);
        setMinersCount(data.miners);
      } else {
        setBeanRewards("0");
        setMinersCount("0");
      }
    });
    getGlobalStateData(wallet).then(data => {
      if (data != null) {
        setAdminKey(data.authority);
        setIsInitialized(data.isInitialized);
        setIsStarted(data.isStarted);
      }
    })
  }, [wallet, dataUpdate]);

  useEffect(() => {
    getVaultSolBalance(wallet).then(bal => {
      setContractSolBalance(bal);
    });
  }, [wallet, dataUpdate]);

  useEffect(() => {
    setTimeout(() => {
      toggleDataUpdate();
    }, 5000);
  }, [dataUpdate]);

  const toggleDataUpdate = () => {
    console.log("update data");
    setDataUpdate(!dataUpdate);
  }

  const onUpdateBakeSOL = (value) => {
    setBakeSOL(value);
  };
  const getRef = () => {
    const ref = query.get("ref");
    return ref;
  };

  const initializeProgram = async () => {

    setLoading(true);
    try {
      await initialize(wallet);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  const setConfig = async () => {

    setLoading(true);
    try {
      await web3_setConfig(wallet, configSOL);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  const startMine = async () => {

    setLoading(true);
    try {
      await web3_startMine(wallet);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  const bake = async () => {
    setLoading(true);

    let ref = getRef();
    console.log("bake: ref=", ref);
    if (ref === null) ref = wallet.publicKey.toString();
    try {
      await buyOranges(wallet, ref, bakeSOL);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  const reBake = async () => {
    setLoading(true);

    let ref = getRef();

    if (ref === null) ref = wallet.publicKey.toString();
    try {
      await hatchOranges(wallet, ref);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();

  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await sellOranges(wallet);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    toggleDataUpdate();
  };

  return (
    <CardWrapper>
      {loading && <LinearProgress color="secondary" />}
      <CardContent className="fact">
        <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1" sx={{ color: "white" }} fontWeight="bolder">TVL</Typography>
          <Typography variant="h5" sx={{ color: "white" }} >$ {Number(solPrice * Number(contractSolBalance)).toFixed(3)}</Typography>
        </UnderlinedGrid>
        <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1" sx={{ color: "white" }} fontWeight="bolder">Contract</Typography>
          <Typography variant="h5" sx={{ color: "white" }} >{Number(contractSolBalance).toFixed(4)} SOL</Typography>
        </UnderlinedGrid>
        {/* <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1" fontWeight="bolder" sx={{ color: "white" }} >Wallet</Typography>
          <Typography variant="h5" sx={{ color: "white" }} >{walletSolBalance} SOL</Typography>
        </UnderlinedGrid> */}
        <UnderlinedGrid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1" fontWeight="bolder" sx={{ color: "white" }} >Your Sats</Typography>
          <Typography variant="h5" sx={{ color: "white" }} >{minersCount} Sats</Typography>
        </UnderlinedGrid>
        <Box paddingTop={3} paddingBottom={3}>
          {/** admin zone begin */}
          <Box style={{ padding: '20px', background: 'gray', marginBottom: '10px' }} hidden={!canShowAdminZone}>
            <Box marginTop={3} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={initializeProgram}
                hidden={isInitialized}
                className="custom-button"
              >
                Initialize
              </Button>
            </Box>
            <Box marginTop={3} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={startMine}
                hidden={!canShowStartMine}
                className="custom-button"
              >
                Start Mine
              </Button>
            </Box>
            <Box marginTop={3} marginBottom={3} hidden={!canShowSettings}>
              <PriceInput
                max={100000000000}
                value={configSOL}
                onChange={(value) => setConfigSOL(value)}

              />
            </Box>
            <Box marginTop={3} marginBottom={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={setConfig}
                hidden={!canShowSettings}
                className="custom-button"
              >
                Settings
              </Button>
            </Box>
          </Box>
          {/* end admin zone */}

          <Typography variant="body1" fontWeight="bolder" sx={{ color: "white", paddingBottom: "10px" }} >Stake $SOL</Typography>
          <Box>
            <PriceInput
              max={+walletSolBalance}
              value={bakeSOL}
              onChange={(value) => onUpdateBakeSOL(value)}
            />
          </Box>

          <Box marginTop={3} marginBottom={3} marginLeft={8} marginRight={8}>
            <Button
              variant="contained"
              fullWidth
              disabled={!address || +bakeSOL === 0 || loading}
              onClick={bake}
              className="buy-button"
            >
              BUY SATS
            </Button>
          </Box>

          {/* <Divider sx={{ color: "white" }} /> */}
          <UnderlinedGrid />
          {/* <UnderlinedGrid> */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1" sx={{ color: "white" }} fontWeight="bolder" >Your Rewards</Typography>
            <Typography variant="h5" sx={{ color: "white" }} fontWeight="bolder">{beanRewards} SOL</Typography>
          </Grid>
          {/* </UnderlinedGrid> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: {xs: "column", md: "row", lg: "row"},
              justifyContent: 'space-between',
              alignItems: "center",
              marginTop: "20px",
              gap: "8px"
            }}
          >
            <Button
              // className="bg-[#FFC68D] text-lg text-[#DC6E00] rounded-[12px] w-[30%] h-[auto]"
              // className="custom-button"
              variant="contained"
              sx={{ 
                textTransform: "none !important", 
                fontFamily: "'Metropolis', sans-serif !important",
                padding: "10px",
                fontSize: "18px !important",
                backgroundColor: "#FFC68D !important",
                color: "#DC6E00 !important",
                borderRadius: "12px !important",
                width: "100%",
                height: "64px",
              }}
              disabled={!address || loading}
              onClick={reBake}
            >
              Compound
            </Button>
            <Button
              // className="custom-button"
              variant="contained"
              sx={{ 
                textTransform: "none !important", 
                fontFamily: "'Metropolis', sans-serif !important",
                padding: "10px",
                fontSize: "18px !important",
                backgroundColor: "#FFC68D !important",
                color: "#DC6E00 !important",
                borderRadius: "12px !important",
                width: "100%",
                height: "64px",
              }}
              disabled={!address || loading}
              onClick={eatBeans}
            >
              Claim Rewards
            </Button>
            <Button
              // className="custom-button"
              variant="contained"
              sx={{ 
                textTransform: "none !important", 
                fontFamily: "'Metropolis', sans-serif !important",
                padding: "10px",
                fontSize: "18px !important",
                backgroundColor: "#FFC68D !important",
                color: "#DC6E00 !important",
                borderRadius: "12px !important",
                width: "100%",
                height: "64px",
                lineHeight: "19px !important"
              }}
              disabled={!address || loading}
              // onClick={reBake}
            >
              Satoshi Casino +Token
            </Button>
          </Box>
          
          {/* <ButtonContainer container>
            <Grid item flexGrow={1} marginRight={1} marginTop={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={!address || loading}
                onClick={reBake}
                className="custom-button"
              >
                Compound
              </Button>
            </Grid>
            <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={!address || loading}
                onClick={eatBeans}
                className="custom-button"
              >
                Claim Rewards
              </Button>
            </Grid>
            <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={!address || loading}
                // onClick={eatBeans}
                className="custom-button"
              >
                Satoshi Casino + Token
              </Button>
            </Grid>
          </ButtonContainer> */}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
