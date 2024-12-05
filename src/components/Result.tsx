import { Box, Button, Card, Typography } from "@mui/material";
import { forwardRef } from "react";
import lotdata from "../assets/Lot.json";

interface ResultProps {
  lotNum: number;
  handleClose: () => void;
}

export const Result = forwardRef<HTMLInputElement, ResultProps>(
  (props, ref) => {
    const borderStyle = "0.25rem solid #FF0000";
    const lot = lotdata.Lot[props.lotNum];
    console.log(props.lotNum);
    console.log(lot);
    const LuckList = lot.LuckList?.map((luckdata, key) => {
      const luckMsg = `${luckdata.LuckName}：${luckdata.LuckRank}`;
      return (
        <Typography variant="h6" key={key}>
          {luckMsg}
        </Typography>
      );
    });
    return (
      <Card
        sx={{
          position: "fixed",
          margin: "auto",
          height: "90%",
          maxWidth: "calc(552px - 0.25rem)",
          width: "90%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%);",
          textAlign: "center",
          padding: "0.25rem",
          border: "0.5rem solid #FF0000",
          color: "#FF0000",
          whiteSpace: "pre-wrap",
        }}
      >
        <Box
          ref={ref}
          sx={{
            width: "100%",
            height: "100%",
            border: `${borderStyle}`,
          }}
        >
          <Box sx={{ padding: "0.5rem", borderBottom: `${borderStyle}` }}>
            <Typography variant="h3">{lot.Fortune}</Typography>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              borderBottom: `${borderStyle}`,
            }}
          >
            <Typography variant="h5">山本神社</Typography>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              borderBottom: `${borderStyle}`,
            }}
          >
            {LuckList}
          </Box>
          <Box
            sx={{
              padding: "1rem",
            }}
          >
            <Typography variant="body2">{lot.Msg}</Typography>
          </Box>
          <Box
            sx={{
              position: "fixed",
              width: "calc(100% - 1rem)",
              padding: "0.5rem",
              bottom: "0.25rem",
              borderTop: `${borderStyle}`,
            }}
          >
            <Button onClick={props.handleClose} sx={{ color: "#FF0000" }}>
              閉じる
            </Button>
          </Box>
        </Box>
      </Card>
    );
  }
);
