export class Observable<T> {
    value?: T;
    _observers: Function[];
    constructor (value?: T){
        this.value = value;
        this._observers = [];
    }
    subscribe(observer: Function){
        this._observers.push(observer)
    }
    unsubscribe(observer: Function){
        const index = this._observers.indexOf(observer);
        this._observers.splice(index, 1)
    }
    next(value: T){
        this.value = value;
        for(const observer of this._observers){
            observer(value)                                                  //observer - функция, которая передается через subscribe вo view !!!
        }
    }
}