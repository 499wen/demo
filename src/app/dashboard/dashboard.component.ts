import { Component, OnInit , Input} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, throwError } from 'rxjs';
import {map} from 'rxjs/operators';

const FeedQuery = gql`
      {
        users{
          id
          username
          email
          password
        }
      }
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})

export class DashboardComponent implements OnInit {
  
  username = "";
  password = "";
  bool = false;
  num : number;

  user: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.user = this.apollo
      .watchQuery({query: FeedQuery})
      .valueChanges.pipe(map(({data}) => data.users));
  }

  is_exist():void{
    this.num = 0;
    if(this.username && this.password){
      
      this.user.forEach(v => {
        console.log(1)
        v.forEach(k => {
          if( this.username === k.username && this.password === k.password){
            this.num ++;
          }

        })
        if(this.num == 1){
          this.bool = true;
        }else {
          console.log(2)
          this.bool = false;
          alert('密码或用户名错误！！！');
        }
      })
      
    }else{
      alert('密码或用户名不能为空！！！');
    }
  }

}
