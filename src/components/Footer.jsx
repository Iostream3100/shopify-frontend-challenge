import { GiArtificialHive } from "react-icons/gi";
import { Box, Divider, Link } from "@mui/material";

const Footer = () => (
  <>
    <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
      <Divider />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 15,
          color: "#6e6e73",
        }}
      >
        <GiArtificialHive size={35} style={{ marginBottom: 10 }} />
        <div>© 2022 Yun Feng. All rights reserved</div>

        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
        >
          <Link
            href={"https://github.com/Iostream3100/shopify-frontend-challenge"}
            underline="hover"
            color="#6e6e73"
            style={{ fontSize: 14, margin: "0px 7px" }}
          >
            GitHub Repo
          </Link>
          <Link
            href={"https://www.google.com"}
            underline="hover"
            color="#6e6e73"
            style={{ fontSize: 14, margin: "0px 7px" }}
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </Box>
  </>
);

export default Footer;
