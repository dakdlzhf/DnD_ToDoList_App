import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import "./App.css";
import { IToDos, toDoState } from "./atoms";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import ParentElemnet from "./components/ParentElement";
import Constructor from "./components/Constructor";
import { IoDocumentTextOutline } from "react-icons/io5";
import Chart from "./components/Chart";
import Timer from "./components/Timer";

const Wrapper = styled.div`
  padding: 50px;
  min-width: 670px;
  height:100vh;
  width:100%;
  background-position:center center;
  background-size:cover;
  background-repeat:no-repeat;

`;
const Herder = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top: 10px solid #20bf6b;
  border-bottom: 10px solid #20bf6b;
`;
const HeaderTitle = styled(motion.div)`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  font-family: "Song Myung", serif;
  /* font-family: 'Jua', sans-serif; */
`;
const CategoryAddBox = styled(motion.div)`
  width: 100%;
  text-align: center;

  span {
    cursor: pointer;
    font-size: 2.5rem;
    font-family: "Jua", sans-serif;
    transition: color 1s;
    &:hover {
      color: #20bf6b;
    }
  }
`;
const HeaderClock = styled(motion.div)``;

const TrashBox = styled.div`
  width: 10%;
  margin: auto;
  height: 50px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: transform 1s;
  span {
    font-size: 3rem;
    color: #1e272e;
  }
  &:hover {
    transform: scale(1.2);
  }
`;

const BoarderContainer = styled.div`
  width: inherit;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const titleBoxVariants = {
  to: {
    x: -window.innerWidth,
  },
  doing: {
    x: 0,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
};
const boarderAddBoxVariants = {
  to: {
    x: -window.innerWidth,
  },
  doing: {
    x: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      duration: 1.5,
    },
  },
};
const clockVariants = {
  to: {
    x: -window.innerWidth,
  },
  doing: {
    x: 0,
    transition: {
      delay: 1,
      type: "spring",
      duration: 1.5,
    },
  },
};
const chartVariants = {
  to: {
    x: -window.innerWidth,
  },
  doing: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [visible, setVigible] = useState(false);
  const toggle = () => {
    if (Object.keys(toDos).length >= 6) {
      window.alert("보드를 6개이상은 만들수 없습니다!");
    } else {
      setVigible((prev) => !prev);
    }
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
          <HeaderTitle variants={titleBoxVariants} initial="to" animate="doing">
            To Do List <IoDocumentTextOutline />
          </HeaderTitle>
          <CategoryAddBox
            variants={boarderAddBoxVariants}
            initial="to"
            animate="doing"
            onClick={toggle}
          >
            <span>새보드생성</span>
          </CategoryAddBox>
          <HeaderClock variants={clockVariants} initial="to" animate="doing">
            <Timer />
          </HeaderClock>
        </Herder>
        {visible ? (
          <Constructor setVigible={setVigible} visible={visible} />
        ) : null}
        <motion.div variants={chartVariants} initial="to" animate="doing">
          <Chart />
        </motion.div>
        <TrashBox>
          <Droppable droppableId="DELETE">
            {(provided) => (
              <span ref={provided.innerRef} {...provided.droppableProps}>
                <FaTrashRestoreAlt />
                {provided.placeholder}
              </span>
            )}
          </Droppable>
        </TrashBox>
        <BoarderContainer>
          {Object.keys(toDos)?.map((toDoKey?) => (
            <ParentElemnet
              key={toDoKey}
              toDosP={toDos[toDoKey]}
              toDoKey={toDoKey}
            />
          ))}
        </BoarderContainer>
      </DragDropContext>
    </Wrapper>
  );
}

export default React.memo(App);
