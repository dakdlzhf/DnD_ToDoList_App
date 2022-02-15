import styled from "styled-components";
import { IValue, toDoState } from "../atoms";
import { Droppable } from "react-beautiful-dnd";
import ChildrenElement from "./ChildrenElement";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0fbcf9;
  width: 100%;
  height: 300px;
  min-height: 300px;
  margin: 40px auto;
`;
const BoardWrapper = styled.div``;

const Board = styled.div`
  background-color: #b8e994;
  width: 100%;
  border: 1px solid #78e08f;
  margin:5px auto;
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
    setValue("text","");
  };
  console.log(toDos);
  return (
    <Wrapper>
      <Title>{toDoKey}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("text")} type="text" />
      </Form>
      <Droppable droppableId={toDoKey}>
        {(provided) => (
          <Board ref={provided.innerRef} {...provided.droppableProps}>
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
export default ParentElemnet;
