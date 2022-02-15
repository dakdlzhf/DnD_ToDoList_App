import { atom } from "recoil";

export interface IValue{
    id:number,
    text:string,
}
export interface IToDos {
    [key:string]:IValue[];
}

export const toDoState = atom<IToDos>({
    key:"todo",
    default:{
        TODO:[],
        DOING:[],
    },
})