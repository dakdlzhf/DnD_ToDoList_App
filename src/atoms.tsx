import { atom } from "recoil";

export interface IValue{
    id:number,
    date:string,
    title:string,
    text:string,
    time:string,
}
export interface IToDos {
    [key:string]:IValue[];
}
const defaultId = Date.now();
const defaultDate = new Date().toISOString().slice(0,10);
const defaultTitle ="TODO"
const defaultText = "example text";
const defaultTime = new Date().toLocaleTimeString();

export const toDoState = atom<IToDos>({
    key:"todo",
    default:{
        TODO:[{id:defaultId,date:defaultDate,title:defaultTitle,text:defaultText,time:defaultTime}],
        DOING:[],
        DONE:[],
    },
})