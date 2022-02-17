import { makeAutoObservable } from "mobx";
import {observer} from 'mobx-react';

interface TestStore {
  check: boolean;
}

export class Tstore {
  constructor() {
    makeAutoObservable(this);
  }
  check = false;

  toggleCheck (){
      this.check = !this.check
  }
}
const Store:any = new Tstore();

export default Store;
