import { Box, Card, Typography } from "@mui/material";
import { forwardRef } from "react";

interface ResultProps {
  handleClose: () => void;
}

export const Result = forwardRef<HTMLInputElement, ResultProps>(
  (props, ref) => {
    const borderStyle = "0.25rem solid #FF0000";
    return (
      <Card
        ref={ref}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%);",
          height: "50rem",
          width: "30rem",
          textAlign: "center",
          padding: "0.25rem",
          border: "0.5rem solid #FF0000",
          color: "#FF0000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            border: `${borderStyle}`,
          }}
        >
          <Box sx={{ padding: "0.5rem", borderBottom: `${borderStyle}` }}>
            <Typography variant="h2">大吉</Typography>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              height: "7rem",
              borderBottom: `${borderStyle}`,
            }}
          >
            <Typography>
              悪いことの後には良いことが必ず待っている。
              <br />
              いい結果を掴み取るまで逃げることなかれ。
              <br />
              とか言っておけばそれっぽいでしょ☆彡
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "1rem",
              borderBottom: `${borderStyle}`,
            }}
          >
            <Typography variant="h6">仕事運：★★★★☆</Typography>
            <Typography variant="h6">金運：★★★★★</Typography>
            <Typography variant="h6">恋愛運：★★★★☆</Typography>
            <Typography variant="h6">健康運：★★★★★</Typography>
            <Typography variant="h6">日本通運：★★★★★</Typography>
          </Box>
          <Box
            sx={{
              position: "fixed",
              width: "100%",
              padding: "0.5rem",
              bottom: "0.25rem",
              borderTop: `${borderStyle}`,
            }}
          >
            <Typography variant="h6">山本神社</Typography>
          </Box>
        </Box>
      </Card>
    );
  }
);
