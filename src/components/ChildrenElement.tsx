import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IChildrenProps {
  toDoText: string;
  index: number;
  id: number;
}
const Wrapper = styled.div``;
const Item = styled.div`
  border-radius: 5px;
  margin-top: 5px;
  padding: 10px;
  background-color: white;
`;
function ChildrenElement({ toDoText, index, id }: IChildrenProps) {
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
          </Item>
        )}
      </Draggable>
    </Wrapper>
  );
}
export default React.memo(ChildrenElement);
