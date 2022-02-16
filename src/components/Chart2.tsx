import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart2() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const data = {
    labels: ["Important", "Default"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          toDos["TODO"].length,
          toDos["DOING"].length,
          toDos["DONE"].length,
        ],
        backgroundColor: ["rgb(5, 196, 107)", "rgb(128, 142, 155)"],
        borderColor: ["rgb(11, 232, 129)", "rgb(210, 218, 226)"],
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

export default Chart2;
