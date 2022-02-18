import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { CgCloseR } from "react-icons/cg";
import { IToDos, IValue, toDoState } from "../atoms";
import { Droppable } from "react-beautiful-dnd";
import ChildrenElement from "./ChildrenElement";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import React, { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #05c46b;
  width: 100%;
  height: 100%;
  min-width:200px;
  min-height: 300px;
  margin: 20px auto;
  border-radius: 15px;
  padding: 13px;
`;
interface IDragDropProps {
  isover: boolean;
  isleaving: boolean;
}
const Board = styled.div<IDragDropProps>`
  flex-grow: 1;
  background-color: ${(props) => {
    if (props.isover) {
      return "#1e90ff";
    } else if (props.isleaving) {
      return "#ff4757";
    } else {
      return "#ced6e0";
    }
  }}; /* motion 이랑 snapshot 같이쓰니까 에러가난다. 주의하자  */
  margin: 5px auto;
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  transition: background-color 0.5s ease-in-out;
`;
const Title = styled.div`
  position: relative;
  text-align: center;
  font-size: 1.5rem;
  font-family: "Jua", sans-serif;
  color: white;
  padding: 5px;
`;
const RemoveIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  font-size: 1.8rem;
  border: none;
  text-align: center;
  cursor: pointer;
`;
const Form = styled.form`
  width: 100%;
  text-align: center;
`;
const SubmitBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  border-radius: 10px;
  font-size: 15px;
  padding: 10px;
  width:100%;
`;
const Today = styled.div`
  font-size:0.8rem;
  color:white;
  font-family: 'Gugi', cursive;

`;

interface IBoardProps {
  toDoKey: string;
  toDosP: IValue[];
}
interface IForm {
  text: string;
}
function ParentElemnet({ toDosP, toDoKey }: IBoardProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState<IToDos>(toDoState);
  const boardAnimation = useAnimation();
  const [smokeSwitch, setSmokeSwitch] = useState(false);
  const saveData = () => {
    window.localStorage.setItem("TODOLIST", JSON.stringify(toDos));
  };
  const onValid = ({ text }: IForm) => {
    
    setToDos((prev: any) => {
      const NewText = {
        id: Date.now(),
        date:new Date().toISOString().slice(0, 10),
        text: text,
        time:new Date().toLocaleTimeString(),
      };
      return {
        ...prev,
        [toDoKey]: [...prev[toDoKey], NewText],
      };
    });
    setValue("text", "");
    saveData()
  };
  const cunfirm = () => {
    const x = window.confirm("보드에 모든 내용이 사라집니다 .삭제하시겠습니까?");
    if (x) {
      onDelete();
    } else {
      swingEvent();
    }
  };
  const onDelete = () => {
    setToDos((prev) => {
      const copy = { ...prev };
      delete copy[toDoKey];
      return {
        ...copy,
      };
    });
  };
  const swingEvent = () => {
    boardAnimation.start({
      rotate: [-10, 10, -10, 10, 0],
      transition:{
        duration:0.5,
      }
    });
  };
  return (
    <Wrapper animate={boardAnimation}>
      <Title>
        {toDoKey}
        <RemoveIcon onClick={cunfirm}>
          <CgCloseR />
        </RemoveIcon>
      </Title>
      <SubmitBox>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("text",{ required: true, maxLength: 30 })}
            type="text"
            placeholder="Write here"
          />
        </Form>
      </SubmitBox>
      <Droppable droppableId={toDoKey}>
        {(provided, snapshot) => (
          <Board
            ref={provided.innerRef}
            isover={snapshot.isDraggingOver}
            isleaving={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
          >
            {toDosP?.map((it, index) => (
              <ChildrenElement
                key={it.id}
                toDoText={it.text}
                index={index}
                id={it.id}
                timer={it.time}
                date={it.date}
              />
            ))}
            {provided.placeholder}
            
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default React.memo(ParentElemnet);
