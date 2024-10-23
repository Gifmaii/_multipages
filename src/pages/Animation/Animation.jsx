import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Animation.css"; // สไตล์ของคุณ

const BallAnimation = () => {
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState("");
  const [deg, setDeg] = useState(0);
  const [speed] = useState(5); // กำหนดความเร็ว
  const [vx, setVx] = useState(5); // ความเร็วในแนวนอน
  const [vy, setVy] = useState(5); // ความเร็วในแนวตั้ง

  const ballDiameter = 70;
  const fieldWidth = 700;
  const fieldHeight = 500;

  const toggleRun = () => setRunning(!running);

  const changeImage = (url) => {
    setImageUrl(url);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        setPosition((prev) => {
          let newX = prev.x + vx;
          let newY = prev.y + vy;

          // ตรวจสอบชนขอบซ้ายขวา
          if (newX < 0 || newX + ballDiameter > fieldWidth) {
            setVx(-vx); // เปลี่ยนทิศทาง X
            newX = Math.max(0, Math.min(newX, fieldWidth - ballDiameter)); // คืนค่าที่ขอบ
          }

          // ตรวจสอบชนขอบบนล่าง
          if (newY < 0 || newY + ballDiameter > fieldHeight) {
            setVy(-vy); // เปลี่ยนทิศทาง Y
            newY = Math.max(0, Math.min(newY, fieldHeight - ballDiameter)); // คืนค่าที่ขอบ
          }

          return { x: newX, y: newY };
        });

        setDeg((prev) => prev + speed); // หมุนลูกบอล
      }
    }, 25);
    return () => clearInterval(interval);
  }, [running, vx, vy]);

  return (
    <div className="container">
      <div
        id="field"
        style={{
          width: fieldWidth,
          height: fieldHeight,
          position: "relative",
          border: "1px solid black",
        }}
      >
        <div
          id="ball"
          style={{
            width: ballDiameter,
            height: ballDiameter,
            position: "absolute",
            left: position.x,
            top: position.y,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            transform: `rotate(${deg}deg)`,
          }}
        />
      </div>
      <div id="control">
        <button
          className={`btn ${running ? "btn-danger" : "btn-success"}`}
          onClick={toggleRun}
        >
          {running ? "Stop" : "Run"}
        </button>
        {["./img/OIP.jpg", "./img/football.jpg", "./img/volleyball.jpg", "./img/gifmairee.jpg", "./img/isagi.jpg", "", "./img/Untitled.png"].map((url, index) => (
          <button
            key={index}
            className="btn btn-primary"
            onClick={() => changeImage(url)}
          >
            {url === "" ? "None" : url.split('/').pop().split('.')[0]} {/* แสดงชื่อภาพ */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BallAnimation;

