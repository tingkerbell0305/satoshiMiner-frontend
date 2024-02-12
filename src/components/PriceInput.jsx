import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const SolInput = styled("input")({
  fontSize: 24,
  fontWeight: 700,
  color: "white",
  padding: "12px 90px 12px 16px",
  textAlign: "right",
  borderRadius: 8,
  border: "2px solid #FFF",
  background: "none",
  width: "100%",
  outline: "none",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
    MozAppearance: "textfield",
  },
});

export default function PriceInput({ value, max, onChange = () => {} }) {
  return (
    <Box position="relative">
      <SolInput
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Typography
        fontSize={24}
        position="absolute"
        top={12}
        right={18}
        fontWeight={500}
        color="white"
      >
        SOL
      </Typography>
    </Box>
  );
}
