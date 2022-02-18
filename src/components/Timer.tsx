import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CurDate = styled.div`
  font-size: 2rem;
  font-family: "Jua", sans-serif;
`;
const Time = styled.div`
  font-size: 1.8rem;
  color: grey;
  font-family: "Jua", sans-serif;
`;
function Timer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const curDate =new Date().toLocaleDateString();
  const week = new Array(
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  );
  const today = new Date().getDay();
  
  /* useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    });  
  }, [time]); */
  return (
    <Box>
      <CurDate>{curDate}{week[today]}</CurDate>
      <Time>{time}</Time>
    </Box>
  );
}
export default Timer;
