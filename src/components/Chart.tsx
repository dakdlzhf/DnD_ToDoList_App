import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

ChartJS.register(ArcElement, Tooltip, Legend);

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
const ChartBox = styled.div`
  text-align: center;
  h1 {
    margin-top: 20px;
    font-family: "Jua", sans-serif;
  }
  div {
    canvas {
      width: 100px;
      height: 100px;
    }
  }
`;

function Chart() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const keyArray: any = [];
  const lengthArray: number[] = [];
  const funcMap = () => {
    Object.keys(toDos)?.map((el) => {
      keyArray.push(el);
    });
  };
  const funcLength = () => {
    Object.keys(toDos)?.map((el) => {
      lengthArray.push(toDos[el].length);
    });
  };
  funcLength();
  funcMap();
  const data = {
    labels: keyArray,
    datasets: [
      {
        label: "# of Votes",
        data: lengthArray,
        backgroundColor: [
          "#eb2f06",
          "#1e3799",
          "#FFC312",
          "#009432",
          "#FDA7DF",
          "#7efff5",
        ],
        borderColor: [
          "#EA2027",
          "#0652DD",
          "#FFC312",
          "#78e08f",
          "#D980FA",
          "#7efff5",
        ],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };
  return (
    <>
      <ChartBox>
        <h1>ToDoList Chart</h1>
        <div style={{ width:"30vw", height: "30vh", margin: "5px auto" }}>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </ChartBox>
    </>
  );
}

export default Chart;
