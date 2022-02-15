import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { CgCloseR } from "react-icons/cg";
import { IValue, toDoState } from "../atoms";
import { Droppable } from "react-beautiful-dnd";
import ChildrenElement from "./ChildrenElement";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import React from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #1e272e;
  width: 100%;
  height: 100%;
  min-height: 300px;
  margin: 20px auto;
  border-radius: 15px;
  padding: 10px;
`;
interface IDragDropProps {
  isover: boolean;
  isleaving: boolean;
}
const Board = styled.div<IDragDropProps>`
  flex-grow: 1;
  background-color: ${(props) => {
    if (props.isover) {
      return "blue";
    } else if (props.isleaving) {
      return "red";
    } else {
      return "pink";
    }
  }};/* motion 이랑 snapshot 같이쓰니까 에러가난다. 주의하자  */
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
const Input = styled.input``;
interface IBoardProps {
  toDoKey: string;
  toDos: IValue[];
}

interface IForm {
  text: string;
}

function ParentElemnet({ toDos, toDoKey }: IBoardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const boardAnimation = useAnimation();
  const onValid = ({ text }: IForm) => {
    setToDos((prev: any) => {
      const NewText = {
        id: Date.now(),
        text: text,
      };
      return {
        ...prev,
        [toDoKey]: [...prev[toDoKey], NewText],
      };
    });
    setValue("text", "");
  };
  const cunfirm = () => {
    const x = window.confirm("정말삭제하시게요?");
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

      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("text")} type="text" />
      </Form>
      <Droppable droppableId={toDoKey}>
        {(provided, snapshot) => (
          <Board
            ref={provided.innerRef}
            isover={snapshot.isDraggingOver}
            isleaving={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
          >
            {toDos?.map((it, index) => (
              <ChildrenElement
                key={it.id}
                toDoText={it.text}
                index={index}
                id={it.id}
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
