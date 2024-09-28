import "./Invite.css";
import React from "react";
import { Button } from "@mui/material";
import { Typography, Chip, Box } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Invite = () => {
  const link = `https://https://scrapcart.vercel.app/`;
  return (
    <div className="col-12">
      <h2 className="page-header">Invite Customers</h2>
      <div className="card">
        <div className="card__body">
          <Box display={"flex"} flexDirection="column" alignItems={"center"}>
            <Typography variant="h4" mb={"30px"} className="inviteHeading">
              Invite your customers to join Scrap Cart
            </Typography>
            <CopyToClipboard text={link}>
              <Chip
                label={link}
                variant="outlined"
                style={{
                  width: "560px",
                  fontSize: "16px",
                  padding: "20px",
                  borderRadius: "50px",
                }}
              />
            </CopyToClipboard>
            <CopyToClipboard text={link}>
              <Button
                className="btn-round"
                style={{
                  paddingTop: 5,
                  color: "white",
                  borderWidth: 0,
                  borderRadius: 5,
                  paddingLeft: 40,
                  paddingRight: 40,
                  fontSize: "20px",
                  fontWeight: "500",
                  paddingBottom: 10,
                  marginTop: "15px",
                  // backgroundColor: "#282828",
                  backgroundColor: "#1BABAA",
                }}
              >
                copy
              </Button>
            </CopyToClipboard>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Invite;
