import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import "./App.css";
import { toDoState } from "./atoms";
import { useForm } from "react-hook-form";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import CreatePage from "./components/CreatePage";
import { motion } from "framer-motion";
import ParentElemnet from "./components/ParentElement";
const Wrapper = styled.div`
  padding: 30px;
`;
const Herder = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const HeaderTitle = styled(motion.div)`
  width: 90%;
  margin-left: 10px;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
`;
const Trash = styled.div`
  font-size: 2.5rem;
  color: #eb2f06;
  transition: scale 1s;
  &:hover {
    transform: scale(1.1);
  }
`;
const BoarderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register,handleSubmit,setValue} = useForm();
  const saveData = () => {
    window.localStorage.setItem("TODOLIST", JSON.stringify(toDos));
  };
  const loadData = () => {
    const getData = window.localStorage.getItem("TODOLIST");
    if (getData) {
      return JSON.parse(getData);
    }
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setToDos((prev) => {
        const droppable = [...prev[source.droppableId]];
        const taskObj = droppable[source.index];
        droppable.splice(source.index, 1);
        droppable.splice(destination.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: droppable,
        };
      });
    } else if (destination?.droppableId === "DELETE") {
      setToDos((prev) => {
        const copy = [...prev[source.droppableId]];
        copy.splice(source.index, 1);
        return {
          ...prev,
          [source.droppableId]: copy,
        };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setToDos((prev) => {
        const srcdroppable = [...prev[source.droppableId]];
        const taskObj = srcdroppable[source.index];
        srcdroppable.splice(source.index, 1);
        const destDroppable = [...prev[destination.droppableId]];
        destDroppable.splice(destination.index, 0, taskObj);

        return {
          ...prev,
          [source.droppableId]: srcdroppable,
          [destination.droppableId]: destDroppable,
        };
      });
    }
  };
  useEffect(() => {
    setToDos(loadData);
  }, []);
  useEffect(() => {
    //localstorage 저장
    saveData();
  }, [toDos]);
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Herder>
          <HeaderTitle>To Do List</HeaderTitle>
          <Trash>
            <Droppable droppableId="DELETE">
              {(provided) => (
                <span ref={provided.innerRef} {...provided.droppableProps}>
                  <FaTrash />
                  {provided.placeholder}
                </span>
              )}
            </Droppable>
          </Trash>
        </Herder>
        <BoarderContainer>
          {Object.keys(toDos)?.map((toDoKey) => (
            <ParentElemnet
              key={toDoKey}
              toDos={toDos[toDoKey]}
              toDoKey={toDoKey}
            />
          ))}
        </BoarderContainer>
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
