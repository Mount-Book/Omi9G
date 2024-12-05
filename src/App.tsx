import boximg from "/src/assets/Box_ganbatta1.png";
import { Box, Container, Modal, Typography } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Rule } from "./components/Rule";
import { Result } from "./components/Result";

const RuleWithRef = forwardRef<HTMLInputElement, { handleClose: () => void }>(
  (props, ref) => {
    return <Rule {...props} ref={ref} />;
  }
);
const ResultWithRef = forwardRef<HTMLInputElement, { handleClose: () => void }>(
  (props, ref) => {
    return <Result {...props} ref={ref} />;
  }
);

function App() {
  const shakeThreshold = 12.5; //振りの閾値
  const obliqueThreshold = -15; //傾きの閾値

  const [isRuleOpen, setRuleOpen] = useState(true);
  const [isResultOpen, setResultOpen] = useState(false);
  const resultRef = useRef(false);
  resultRef.current = isResultOpen;
  const [hasPermission, setPermission] = useState(false);
  const [isOblique, setOblique] = useState(false);
  const obliqueRef = useRef(false);
  obliqueRef.current = isOblique;
  const inputRef = useRef<HTMLInputElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const handleRuleClose = () => {
    if (!hasPermission) RequestPermission();
    setRuleOpen(false);
  };
  const handleResultClose = () => {
    setResultOpen(false);
  };

  useEffect(() => {
    //PCや加速度センサーを使えない端末だとモーダルを閉じれないので対策
    if (window.DeviceOrientationEvent) {
      if (
        DeviceOrientationEvent.requestPermission &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        setPermission(false);
      } else {
        setPermission(true);
        window.addEventListener("devicemotion", handleDevicemotion);
        window.addEventListener("deviceorientation", handleDiviceorientation);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("devicemotion", handleDevicemotion);
    window.addEventListener("deviceorientation", handleDiviceorientation);
  }, []);

  const Draw = () => {
    setResultOpen(true);
  };

  const handleDevicemotion = (e) => {
    //xは左右, yは前後, zは上下
    //上下左右は混ぜる（音だけ？）、前後で引く
    if (
      (e.acceleration.x > shakeThreshold ||
        e.acceleration.y > shakeThreshold ||
        e.acceleration.z > shakeThreshold) &&
      obliqueRef.current
    )
      Draw();
  };
  const handleDiviceorientation = (e) => {
    if (e.beta < obliqueThreshold) {
      setOblique(true);
    } else {
      setOblique(false);
    }
    setX(Math.round(e.alpha));
    setY(Math.round(e.beta));
    setZ(Math.round(e.gamma));
  };

  const RequestPermission = () => {
    DeviceOrientationEvent.requestPermission()
      .then(function (response) {
        if (response === "granted") {
          window.addEventListener("devicemotion", handleDevicemotion);
          window.addEventListener("deviceorientation", handleDiviceorientation);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        margin: "auto",
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "#FFA",
        textAlign: "center",
      }}
    >
      <Modal open={isRuleOpen} onClose={handleRuleClose}>
        <RuleWithRef ref={inputRef} handleClose={handleRuleClose} />
      </Modal>
      <Modal open={isResultOpen} onClose={handleResultClose}>
        <ResultWithRef ref={inputRef} handleClose={handleResultClose} />
      </Modal>
      <Box sx={{ height: "90vh" }}>
        <Typography variant="h1" sx={{ padding: "1rem" }}>
          振れ！
        </Typography>
        <Typography>x: {x}</Typography>
        <Typography>y: {y}</Typography>
        <Typography>z: {z}</Typography>
        <Typography>傾きチェッカー: {isOblique ? "true" : "false"}</Typography>
        <Box
          component="img"
          src={boximg}
          onClick={Draw}
          sx={{
            height: "80vh",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -10vh);",
          }}
        />
      </Box>
    </Container>
  );
}

export default App;
