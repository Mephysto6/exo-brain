// import { Repetition } from "src/app/core/enums/enum-repetition";

export interface ActionI {
  id: number,
  name: string,
  time : number,
  priority: number,
  repetition: string,
  repetition_hour: number,
  repetition_day: number,
  creation_date: string,
  last_done: string,
}
