import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  // background: "rgb(255 252 248)",
  marginBottom: 36,
  marginLeft: 24,
  marginRight: 24,
  border: "1px solid #555",
});

const nutritionFacts = [
  {
    label: "Daily Return",
    value: "8-15",
  },
  {
    label: "APR",
    value: "2,920",
  },
  {
    label: "Dev Fee",
    value: 5,
  },
];

export default function NutritionFacts() {
  return (
    <CardWrapper>
      <CardContent className="fact-1">
        <Typography variant="h5" sx={{ color: "black", textAlign: "center" }} >
          Sats Data
        </Typography>

        <Box paddingTop={2}>
          {nutritionFacts.map((f) => (
            <Grid container key={f.label} justifyContent="space-between">
              <Typography variant="body1" gutterBottom sx={{ color: "black" }}>
                {f.label}
              </Typography>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
                <div style={{ width: "100%", height: "1px", borderTop: "1px dotted black" }}></div>
              </div>
              <Typography gutterBottom sx={{ color: "black" }}>{f.value}%</Typography >
            </Grid>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
