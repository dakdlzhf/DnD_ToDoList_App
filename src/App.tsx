import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import "./App.css";
import { toDoState } from "./atoms";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import ParentElemnet from "./components/ParentElement";
import Constructor from "./components/Constructor";
import { IoDocumentTextOutline } from "react-icons/io5";
import Chart from "./components/Chart";

const Wrapper = styled.div`
  padding: 30px;
  min-width: 670px;
`;
const Herder = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;
const HeaderTitle = styled(motion.div)`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  font-family: "Song Myung", serif;
  /* font-family: 'Jua', sans-serif; */
`;
const CategoryAddBox = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: 2.5rem;
  font-family: "Jua", sans-serif;
`;

const TrashBox = styled.div`
  width: 10%;
  margin: auto;
  height: 50px;
  text-align: center;
  padding-top: 10px;
  transition: transform 1s;
  span {
    font-size: 2.5rem;
    color: #1e272e;
  }
  &:hover {
    transform: scale(1.3);
  }
`;
const trachVariants = {
  initial: {
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  animate: {
    scale: 1.3,
    transition: {
      duration: 1,
    },
  },
};

const BoarderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
const CartInfoBox = styled.div`

`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [visible, setVigible] = useState(false);
  const [chartBtn,setChartBtn] = useState(true);

  const toggle = () => {
    setVigible((prev) => !prev);
  };
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
          <HeaderTitle>
            To Do List <IoDocumentTextOutline />
          </HeaderTitle>
          <CategoryAddBox onClick={toggle}>새보드생성</CategoryAddBox>
        </Herder>
        {visible ? (
          <Constructor setVigible={setVigible} visible={visible} />
        ) : null}
        <TrashBox>
          <Droppable droppableId="DELETE">
            {(provided) => (
              <span ref={provided.innerRef} {...provided.droppableProps}>
                <FaTrash />
                {provided.placeholder}
              </span>
            )}
          </Droppable>
        </TrashBox>
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
      {chartBtn? <CartInfoBox>
        <Chart />
      </CartInfoBox>:null}
    </Wrapper>
  );
}

export default App;
