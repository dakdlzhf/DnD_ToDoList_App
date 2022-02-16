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
  margin: 50px auto;
  border: 1px solid black;
  padding: 50px;
  position: relative;
  canvas {
  }
`;
function Chart() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const data = {
        labels: ["TODO", "DOING", "DONE"],
        datasets: [
          {
            label: "# of Votes",
            data: [toDos["TODO"].length, toDos["DOING"].length,toDos["DONE"].length],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
            hoverOffset: 10,
          },
        ],
      };
  return (
    <>
      <Doughnut
        style={{ marginTop: "20px" }}
        data={data}
        options={{ responsive: false }}
        width={300}
        height={300}
      />
    </>
  );
}

export default Chart;
