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
    const keyArray :any = [];
    const lengthArray :number[] =[];
    const funcMap = ()=>{
      Object.keys(toDos).map((el)=>{
        keyArray.push(el);
      })
    }
    const funcLength = ()=>{
      Object.keys(toDos).map((el)=>{
        lengthArray.push(toDos[el].length)
      })
    }
    funcLength();
    funcMap();
    const data = {
        labels: keyArray,
        datasets: [
          {
            label: "# of Votes",
            data:lengthArray,
            backgroundColor: [
              "#ea20276f",
              "#ffc41292",
              "#0094317b",
              "#0651dd7f",
              "#9880fa86",
              "#1b14647f",

            ],
            borderColor: [
              "#ff4757",
              "#ffa502",
              "#2ed573",
              "#1e90ff",
              "#5352ed",
              "#182C61",
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
