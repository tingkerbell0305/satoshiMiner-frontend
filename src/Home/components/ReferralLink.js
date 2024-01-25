import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { showToast } from "../../contracts/utils";
import Box from "@mui/material/Box";

const CardWrapper = styled(Card)({
  background: "transparent",
  border: "1px solid #555",
  marginLeft: 24,
  marginRight: 24,
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 0,
  border: "1px solid #555",
  background: "white",
  width: "100%",
  outline: "none",
  color: theme.palette.primary.main,
}));

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;
  const copyToClipBoard = () => {
    if (!address) return;
    navigator.clipboard.writeText(link)
    showToast("Referral Link copied to Clipboard", 2000);
    console.log("copied");
  }
  return (
    <CardWrapper>
      <CardContent className="fact-1">
        <Typography gutterBottom variant="h5" textAlign="center" sx={{ color: "black" }}>
          Referral Link
        </Typography>
        <Input value={address ? link : ""} readOnly sx={{ color: "black", height: "50px" }} />
        <Box marginTop={3}
          sx={{
            marginLeft: {xs: "50px !important", md: "120px !important", lg: "150px !important"},
            marginRight: {xs: "50px !important", md: "120px !important", lg: "150px !important"},
          }}
          marginLeft={16}
          marginRight={16}
        >
          <Button
            variant="contained"
            // color="secondary"
            fullWidth
            onClick={copyToClipBoard}
            // className="copy-button"
            // sx={{ textTransform: "none !important", padding: "10px" }}
            sx={{ 
              textTransform: "none !important", 
              fontFamily: "'Metropolis', sans-serif !important",
              padding: "10px",
              fontSize: {xs: "16px !important", md: "18px !important", lg: "18px !important"},
              backgroundColor: "#000000 !important",
              color: "#FFFFFF !important",
              borderRadius: "12px !important",
              width: "70%",
              height: {xs: "50px !important", md: "56px !important", lg: "64px !important"},
              lineHeight: "19px !important"
            }}
          >
            Copy To Clipboard
          </Button>
        </Box>
        <Typography
          textAlign="center"
          variant="body2"
          paddingX={6}
          paddingY={2}
          sx={{ color: "black", justifyContent: "center", fontSize: "16px" }}
        >
          Earn 10% of the SOL used to compound from anyone who uses your referral link
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
