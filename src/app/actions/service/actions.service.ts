import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  // private collection$ !: Observable<Action[]> ;

  constructor() {
    // this.collection = this.http.get<Action[]>(`${this.url_api}/actions`) ;
  }



  // // getter
  // get collection() : Observable<Action[]> {
  //   // return value
  //   return this.collection$ ;
  // }
  // // setter
  // set collection(collec: Observable<Action[]>) {
  //   // set value to property
  //   this.collection$ = collec ;
  // }

  // // observable (donc à utiliser avec this.orderService.add(item).subcribe() )
  // public add(item: Action) : Observable<Action> {
  //   return this.http.post<Action>(`${this.url_api}/actions`, item) ;
  // }

  // public getById(id: number) : Observable<Action> {
  //   return this.http.get<Action>(`${this.url_api}/actions/${id}`)
  // }

  // public update(obj: Action) : Observable<Action> {
  //   return this.http.put<Action>(`${this.url_api}/actions/${obj.id}`, obj)
  // }
}
