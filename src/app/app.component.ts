import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, debounceTime, fromEvent, map, of } from 'rxjs'
//import { Observable } from 'rxjs/Observable'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('btn') button : any ;
  buttonSubscription: any;
  constructor(private elm: ElementRef) {
  }
  //btnStream$ : Observable<any> = fromEvent(this.button, 'click')  
  users = [
    { id:'1', name:'John', isActive:true},
    { id:'2', name:'Jack', isActive:true},
    { id:'3', name:'Mike', isActive:true},
  ];

  user$ = new BehaviorSubject<{id: string; name:string;}|null>(null)
  users$ = of(this.users);
  usernames$ = this.users$.pipe(map((users) => users));
  documentClick$ = fromEvent(document, 'click');

  data$ = combineLatest([
    this.user$,
    this.usernames$,
  ]).pipe(map(([users, usernames]) => ({
    users,
    usernames
  }))
  );

  ngOnInit(): void {
    //  setTimeout(()=> {
    //   this.user$.next({id: '1', name: 'John'});
    //  },5000)
     
    //  this.documentClick$.subscribe((event) => {
    //   console.log(event)
    //  })

    //  this.user$.subscribe((user) => {
    //   console.log(user)
    //  })
  }

  ngAfterViewInit(){
    this.buttonClick()
    // this.btnStream$?.subscribe((e) => {
    //   console.log('e')
    //  },
    //  (err) => {
    //   console.log(err)
    //  },
    //  () => {
    //   console.log("Completed")
    //  })
  }

  
  buttonClick() {
    let buttonO = document.querySelector('#btno');
    let btnEvent = fromEvent(buttonO, 'click')
    this.buttonSubscription =  fromEvent(this.button.nativeElement, 'click')
        .pipe(debounceTime(300))
        .subscribe((res) => console.log(res),
          (err)=> {
            console.log(err)
          },
          ()=> {
            console.log("Completed")
          });
   }
}
