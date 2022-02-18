import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface IChildrenProps {
  toDoText: string;
  index: number;
  id: number;
  timer: string;
  date: string;
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
  span{
    text-align:start;
    word-break:break-all; 
  }
  div{
    text-align:end;
    width:100px;
    font-size:0.6rem;
    display:flex;
    flex-direction:column;

  }
`;
function ChildrenElement({ toDoText, index, id, timer, date }: IChildrenProps) {
  
  return (
    <Wrapper>
      
      <Draggable draggableId={id + ""} index={index}>
        {(provided) => (
          <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span> {toDoText} </span>
            <div> <p>{date}</p><p>{timer}</p> </div>
          </Item>
        )}
      </Draggable>
      
    </Wrapper>
  );
}
export default ChildrenElement;
