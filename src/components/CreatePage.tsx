import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { IToDos, IValue, toDoState } from "../atoms";
const Wrapper = styled.div`
  background-color: #0fbcf9;
  width: 100%;
  height: 800px;
  min-height: 400px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  padding: 50px;
`;
const ManualBox = styled.div`
  border: 1px solid white;
  width: 100%;
  height: 100%;
  padding: 50px;
  text-align: center;
`;
const SelectBox = styled.div`
  border: 1px solid white;
  width: 100%;
  height: 100%;
  padding: 50px;
  text-align: center;
`;

const Form = styled.form``;
const Select = styled.select`
  text-align: center;
  width: 50%;
  height: 50%;
  border-radius: 20px;
  border: none;
  font-size: 15px;
`;
const Option = styled.option``;
const Input = styled.input`
  margin-bottom: 20px;
`;

interface IInput {
  text: string;
}
interface IBoardProps {
  toDoKey: string;
  toDos: IValue[];
}
function CreatePage({toDos,toDoKey}:IBoardProps) {
  const { register, handleSubmit, setValue } = useForm<IInput>();
  const setToDos = useSetRecoilState<IToDos>(toDoState);
  const [curDate, setCurDate] = useState(new Date().toISOString().slice(0, 10));
  const onvalid = ({text}: IInput) => {
    setToDos((prev:any) => {
      const formInfo = {
        text,
        id: Date.now(),
        startDate: curDate,
      };
      return {
        ...prev,
        [toDoKey]: [...prev[toDoKey],formInfo],
      };
    });
    setValue("text", "");
  };
  return (
    <Wrapper>
      <ManualBox></ManualBox>
      <SelectBox>
        <Form onChange={handleSubmit(onvalid)}>
          <Input {...register("text")} type="text" />
          <Input
            value={curDate}
            onChange={(e) => setCurDate(e.target.value)}
            type="date"
          />
        </Form>
      </SelectBox>
    </Wrapper>
  );
}
export default CreatePage;
