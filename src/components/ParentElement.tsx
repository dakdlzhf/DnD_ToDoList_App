import styled from "styled-components";
import { IValue, toDoState } from "../atoms";
import { Droppable } from "react-beautiful-dnd";
import ChildrenElement from "./ChildrenElement";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0fbcf9;
  width: 100%;
  height: 100%;
  min-height: 300px;
  margin: 20px auto;
  border-radius: 15px;
  padding:10px;
`;
const BoardWrapper = styled.div``;
interface IDragDropProps {
  isOver: boolean;
  isLeaving: boolean;
}
const Board = styled.div<IDragDropProps>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isOver ? "blue" : props.isLeaving ? "red" : "pink"};
  margin: 5px auto;
  width: 100%;
  padding: 10px;
  border-radius:15px;
  transition:background-color 0.5s ease-in-out;
`;
const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: black;
  padding: 5px;
`;
const Form = styled.form`
  width: 100%;
  text-align: center;
`;
const Input = styled.input``;

interface IInput {
  text: string;
}
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
  const onValid = ({ text }: IForm) => {
    setToDos((prev) => {
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
  return (
    <Wrapper>
      <Title>{toDoKey}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("text")} type="text" />
      </Form>
      <Droppable droppableId={toDoKey}>
        {(provided, snapshot) => (
          <Board
            ref={provided.innerRef}
            isOver={snapshot.isDraggingOver}
            isLeaving={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
          >
            {toDos.map((it, index) => (
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
