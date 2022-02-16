import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BsCheckLg } from "react-icons/bs";
import { toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
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
  const [check, setCheck] = useState(false);
  const setToDos = useSetRecoilState(toDoState);
  const checkToggle = () => {
    setCheck((prev) => !prev);
  };
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
            <Check onClick={checkToggle}bgColor={check ? "green" : "grey"}>
              <BsCheckLg />
            </Check>
          </Item>
        )}
      </Draggable>
    </Wrapper>
  );
}
export default React.memo(ChildrenElement);
