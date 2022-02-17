import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IChildrenProps {
  toDoText: string;
  index: number;
  id: number;
  timer:string;
  date:string;
}
const Wrapper = styled.div``;
const Textbox = styled(motion.div)`

`;
const DateTimeBox = styled(motion.div)`
  font-size:0.5rem;
`;
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
function ChildrenElement ({toDoText,index,id,timer,date}: IChildrenProps) {
 
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
};
export default ChildrenElement;
