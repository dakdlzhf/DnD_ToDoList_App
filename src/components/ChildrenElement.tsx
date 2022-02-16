import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BsCheckLg } from "react-icons/bs";
import { toDoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
interface IChildrenProps {
  toDoText: string;
  index: number;
  id: number;
  toDoKey: string;
}
const Wrapper = styled.div``;
const Item = styled.div`
  border-radius: 5px;
  margin-top: 5px;
  padding: 10px;
  background-color: white;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: "Sunflower", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Check = styled.div<{ bgColor: string }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.bgColor};
`;
function ChildrenElement({ toDoText, index, id, toDoKey }: IChildrenProps) {
  /* const setToDos = useSetRecoilState(toDoState); */
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [check, setCheck] = useState(false);
  const [swit, setSwitch] = useState(false);
  const copyArray: string[] = [];
  const falseCount: number[] = [];
  const [falseCountValue, setFalseCountValue] = useState(0);
  const trueCount: number[] = [];
  const [trueCountValue, setTrueCountValue] = useState(0);

  /*  const keyRoof = () => {
    Object.keys(toDos).map((el) => {
      copyArray.push(el);
    });
  };
  keyRoof();
  const solve = () => {
    copyArray.map((el,index)=>{
      falseCount.push(toDos[copyArray[index]].filter((el: any) => el.checking === false).length);
      trueCount.push(toDos[copyArray[index]].filter((el: any) => el.checking === true).length);
    })
  };
  solve(); */
  const checkToggle = () => {
    setCheck((prev) => !prev);
  };

  //객체 배열 데이터 를 분해해서, 일부를 수정하고 다시 조립 (객체를 ->배열로 Object.assign)

  useEffect(() => {
    const newChange = async() => {
      if (check) {
        setToDos((prev: any) => {
          let copy = { ...prev };
          let findData = copy[toDoKey].filter((el: any) => el.id === id);
          let defferentValue = copy[toDoKey].filter(
            (el: any) => el.id !== id
          );
          console.log(defferentValue);
          let fit = Object.assign({}, ...findData, { checking: check });
          let che = [...defferentValue, fit];
          console.log(che);
          return {
            ...copy,
            [toDoKey]: che
          };
        });
      }
    };
    newChange();
  }, [check]);

  // 체크된 데이터 찾기
  useEffect(() => {
    const findTarget = () => {
      const targetValue = toDos[toDoKey].filter((el) => el.id === id);
     
        setSwitch(targetValue[0].checking);
      
    };
    findTarget();
  }, [check]);
  // check 값 분류 하기

  /* 
  useEffect(()=>{
    const result1 =()=>{
      falseCount.map((el)=>{
        setFalseCountValue((prev)=>prev+el);
      })
    }  
    const result2 = ()=>{
      trueCount.map((el)=>{
        setTrueCountValue((prev)=>prev+el);
      })
    } 
    result1();
    result2();
  },[])
  console.log(trueCountValue); 
  console.log(falseCountValue); */
  return (
    <Wrapper>
      <Draggable draggableId={id + ""} index={index}>
        {(provided) => (
          <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {toDoText}
            <Check onClick={checkToggle} bgColor={swit ? "green" : "grey"}>
              <BsCheckLg />
            </Check>
          </Item>
        )}
      </Draggable>
    </Wrapper>
  );
}
export default React.memo(ChildrenElement);
