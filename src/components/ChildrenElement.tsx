import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IChildrenProps {
  toDoText: string;
  index: number;
  id: number;
}
const Wrapper = styled.div`
  background-color: black;
  color: white;
  padding: 10px;
  margin-top:5px;
`;
const Item = styled.div``;
function ChildrenElement({ toDoText, index, id }: IChildrenProps) {
  return (
    <Wrapper>
      <Draggable draggableId={id+""} index={index}>
        {(provided) => (
          <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {toDoText}
          </Item>
        )}
      </Draggable>
    </Wrapper>
  );
}
export default ChildrenElement;
