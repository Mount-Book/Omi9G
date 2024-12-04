import boximg from "/src/assets/Box_ganbatta.png";
import { Box, Container, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Rule } from "./components/Rule";

function App() {
  const threshold = 10; // よくわからん単位

  const [isOpen, setOpen] = useState(true);
  const [hasPermission, setPermission] = useState(false);

  const handleDevicemotion = (e) => {
    if (
      e.acceleration.x > threshold ||
      e.acceleration.y > threshold ||
      e.acceleration.z > threshold
    )
      alert("揺れを検知");
  };

  const handleClose = () => {
    DeviceOrientationEvent.requestPermission().then(function (response) {
      if (response === "granted") {
        setPermission(true);
        window.addEventListener("devicemotion", handleDevicemotion);
      }
    });
    setOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        margin: 0,
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "#FFA",
        textAlign: "center",
      }}
    >
      <Modal open={isOpen} onClose={handleClose}>
        <Rule handleClose={handleClose} />
      </Modal>
      <Box sx={{ height: "90vh" }}>
        <Typography variant="h1">振れ！</Typography>
        <Box component="img" src={boximg} sx={{ height: "80vh" }} />
      </Box>
    </Container>
  );
}

export default App;
