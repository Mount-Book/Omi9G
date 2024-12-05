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
        maxWidth: "calc(552px - 0.25rem)",
        width: "90%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%);",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ padding: "0.5rem" }}>
        説明
      </Typography>
      <Typography sx={{ padding: "0.5rem", lineHeight: "2rem" }}>
        端末を左右前後上下に振る
        <br />
        もしくは
        <br />
        振れ！をタップすると
        <br />
        中身を混ぜることができます
      </Typography>
      <Typography sx={{ padding: "0.5rem", lineHeight: "2rem" }}>
        端末を斜め奥に傾けて振る <br />
        もしくは
        <br />
        御籤筒をタップすると
        <br />
        おみくじが引けます
      </Typography>
      <Button onClick={props.handleClose}>引く</Button>
    </Card>
  );
});
