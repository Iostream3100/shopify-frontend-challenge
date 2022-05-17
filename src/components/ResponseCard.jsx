import { Box, Typography } from "@mui/material";

const TextRow = ({ title, content }) => (
  <Box sx={{ display: "flex", flexDirection: "row" }}>
    <Typography
      sx={{
        fontWeight: "bold",
        width: "18%",
        textAlign: "left",
        fontSize: 18,
      }}
    >
      {title}:
    </Typography>
    <Typography
      sx={{
        fontSize: 18,
        textAlign: "left",
        width: "82%",
      }}
    >
      {content}
    </Typography>
  </Box>
);

const ResponseCard = ({ prompt, response }) => (
  <Box
    sx={{
      py: "12px",
      px: "18px",
      mt: "10px",
      backgroundColor: "#eeeeee",
    }}
  >
    <TextRow title="Prompt" content={prompt} />
    <TextRow title="Response" content={response} />
  </Box>
);

export default ResponseCard;
