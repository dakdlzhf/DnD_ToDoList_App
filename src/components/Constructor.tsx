import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { IToDos, toDoState } from "../atoms";

const Constructore = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 30px;
  height: 400px;
  border: none;
  color: white;
`;
const LeftImage = styled.div`
  background-image:url("https://mblogthumb-phinf.pstatic.net/20120228_14/ys001suh_13304379228933K0hp_JPEG/xyny_2005.jpg?type=w2");
  background-position: center center;
  background-size:cover;
  border: none;
  border-radius: 20px;
`;
const RightFormBox = styled.div`
  background-color: white;
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Form = styled.form`
  width: 100%;
  display: block;
`;
const Input = styled.input`
  width: 100%;
  display: block;
  border-radius:20px;
  margin-top: 20px;
  font-size: 2rem;
  font-family: "Jua", sans-serif;
  padding: 10px;
  padding-left:15px;
  
`;
const TextArea = styled.textarea`
  width: inherit;
  display: block;
  resize: none;
  margin-top: 20px;
  font-size: 2rem;
  font-family: "Jua", sans-serif;
  padding: 15px;
`;
const Button = styled.button`
  width: inherit;
  margin: auto;
  width:20%;
  padding:5px;
  margin-top: 20px;
  display: block;
  border: none;
  font-size: 1.5rem;
  font-family: "Jua", sans-serif;
  border-radius: 5px;
  cursor: pointer;
`;
const ErrorText = styled.div`
  color: black;
  font-size: 1.5rem;
  font-family: 'Nanum Pen Script', cursive;
`;
const produceVariants = {
  start: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  end: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
 /*  invisible:{
    y:0,
  },
  visible:{
    y:500,
    transition:{
      duration:1,
    }
  } */
};
interface IForm {
  title: string;
  text: string;
}
interface IVisible {
  visible: boolean;
  setVigible:(value: boolean | ((prevVar: boolean) => boolean)) => void;
}

function Constructor(props: IVisible) {
  const [curDate, setCurDate] = useState(new Date().toISOString().slice(0, 10));
  const [toDos, setToDos] = useRecoilState(toDoState);
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const formHandler = ({ title, text }: IForm) => {
    setToDos((prev:any) => {
      const NewData = {
        id: Date.now(),
        date: curDate,
        title,
        text,
        time: new Date().toLocaleTimeString(),
      };
      return {
        ...prev,
        [title]: [NewData],
      };
    });
    setValue("title", "");
    setValue("text", "");
    props.setVigible((prev)=>!prev);
  };
  
  return (
    <Constructore variants={produceVariants} initial="start" animate="end">
      <LeftImage />
      <RightFormBox>
        <Form onSubmit={handleSubmit(formHandler)}>
          <Input
            {...register("title", {
              required: "보드에 이름을 만들어주세요.",
              minLength: {
                value: 1,
                message: "제목은 최소 1글자 이상 적어주셔야합니다.",
              },
            })}
            type="text"
            placeholder="Title"
          />
          <ErrorText>{errors.title?.message}</ErrorText>
          <TextArea
            {...register("text", {
              required: "자유롭게 입력해보세요.",
              minLength: {
                value: 2,
                message: "내용은 최소 2글자 이상 적어주셔야합니다.",
              },
            })}
            placeholder="Description"
          />
          <ErrorText>{errors.text?.message}</ErrorText>
          <Input
            type="date"
            value={curDate}
            onChange={(e) => setCurDate(e.target.value)}
          />
          <Button type="submit">완성</Button>
        </Form>
      </RightFormBox>
    </Constructore>
  );
}
export default React.memo(Constructor);
