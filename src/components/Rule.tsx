import { Button, Card, Typography } from "@mui/material";
import { forwardRef } from "react";

interface RuleProps {
  handleClose: () => void;
}

export const Rule = forwardRef<HTMLInputElement, RuleProps>((props, ref) => {
  return (
    <Card
      ref={ref}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%);",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">説明</Typography>
      <Typography>スマホ振っておみくじ引いてください</Typography>
      <Button onClick={props.handleClose}>引く</Button>
    </Card>
  );
});
