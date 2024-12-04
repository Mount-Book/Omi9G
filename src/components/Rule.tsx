import { Button, Card, Typography } from "@mui/material";

type RuleProps = {
  handleClose: () => void;
};

export const Rule: React.FC<RuleProps> = ({ handleClose }) => {
  return (
    <Card
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
      <Button onClick={handleClose}>引く</Button>
    </Card>
  );
};
