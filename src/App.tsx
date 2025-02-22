import boximg from "/src/assets/Box_ganbatta1.png";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Rule } from "./components/Rule";
import { Result } from "./components/Result";
import lotdata from "./assets/Lot.json";
import useSound from "use-sound";
import ShakeSE from "./assets/shake.mp3";
import DarwSE from "./assets/draw.mp3";

const RuleWithRef = forwardRef<HTMLInputElement, { handleClose: () => void }>(
  (props, ref) => {
    return <Rule {...props} ref={ref} />;
  }
);
const ResultWithRef = forwardRef<
  HTMLInputElement,
  { lotNum: number; handleClose: () => void }
>((props, ref) => {
  return <Result {...props} ref={ref} />;
});
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

function App() {
  const shakeThreshold = 12.5; //振りの閾値
  const obliqueThreshold = -5; //傾きの閾値
  const lotCount = lotdata.Lot.length; //おみくじの結果の数
  const [lotNum, setLotNum] = useState(getRandomInt(lotCount));

  const [isRuleOpen, setRuleOpen] = useState(true);
  const [isResultOpen, setResultOpen] = useState(false);
  const resultRef = useRef(false);
  resultRef.current = isResultOpen;
  const [hasPermission, setPermission] = useState(false);
  const [isOblique, setOblique] = useState(false);
  const obliqueRef = useRef(false);
  obliqueRef.current = isOblique;
  const inputRef = useRef<HTMLInputElement>(null);

  const [shakePlay, { stop }] = useSound(ShakeSE);
  const [darwPlay] = useSound(DarwSE);

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
    stop();
    darwPlay();
    setResultOpen(true);
  };

  const Shake = () => {
    stop();
    shakePlay();
    setLotNum(getRandomInt(lotCount));
  };

  const handleDevicemotion = (e) => {
    //xは左右, yは前後, zは上下
    //上下左右は混ぜる（音だけ？）、前後で引く
    if (
      (e.acceleration.x > shakeThreshold ||
        e.acceleration.y > shakeThreshold ||
        e.acceleration.z > shakeThreshold) &&
      obliqueRef.current &&
      !resultRef.current
    ) {
      Draw();
    } else if (
      (e.acceleration.x > shakeThreshold ||
        e.acceleration.y > shakeThreshold ||
        e.acceleration.z > shakeThreshold) &&
      !resultRef.current
    ) {
      Shake();
    }
  };
  const handleDiviceorientation = (e) => {
    if (e.beta < obliqueThreshold) {
      setOblique(true);
    } else {
      setOblique(false);
    }
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
        <ResultWithRef
          ref={inputRef}
          handleClose={handleResultClose}
          lotNum={lotNum}
        />
      </Modal>
      <Box sx={{ height: "90vh" }}>
        <Button onClick={() => Shake()}>
          <Typography variant="h1" sx={{ padding: "1rem", color: "#000000" }}>
            振れ！
          </Typography>
        </Button>
        <Box
          component="img"
          src={boximg}
          onClick={Draw}
          sx={{
            height: "80vh",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -15vh);",
          }}
        />
      </Box>
    </Container>
  );
}

export default App;
