import { atom } from "recoil";

export interface IValue{
    id:number,
    date:string,
    title:string,
    text:string,
    time:string,
    checking:boolean,
}
export interface IToDos {
    [key:string]:IValue[];
}

export const toDoState = atom<IToDos>({
    key:"todo",
    default:{
        TODO:[],
        DOING:[],
        DONE:[],
    },
})