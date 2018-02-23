import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public channelList:any;
  public uniqDates:any;

  constructor(private http: HttpClient){ }
  ngOnInit() {
    this.getChannelList();
  } // close of ngonit

    getChannelList(){
      this.http.get('../assets/channelList.json').subscribe(data => {
          this.channelList = data;
          console.log("list : "+ this.channelList);
          this.uniqDates = this.formatObj(this.channelList);
          console.log("uniqDates : "+ this.uniqDates);
        });
      }

      formatObj(list):any {
        console.log("format called.. ");
        var dates = [], l = list.length, i;
        let uniqDates = [];
        let vik = [];
        for( i=0; i<l; i++) {
            let date = list[i].time.split(" ")[0];
            if( dates[list[i].time.split(" ")[0]]) {
              // uniqDates[list[i].time.split(" ")[0]].push(list[i]);

              continue
            };
            dates[list[i].time.split(" ")[0]] = true;
            // uniqDates[list[i].time.split(" ")[0]] = [];
            // uniqDates[list[i].time.split(" ")[0]].push(list[i]);
            vik.push(list[i].time.split(" ")[0]);
            console.log("in loop :"+ list[i].time.split(" ")[0]);
        }
        // this.uniqDates = output;
        console.log("uniqDates : "+ vik);
        return vik;
      }

      formatDate(d){
        var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];
        var fd = new Date(d);
        // var fd1 = fd.split(" ");
        // console.log("--------------"+ fd1);
        // var year = 1900;
        var year = fd.getFullYear();
        return day[fd.getDay()] +", "+ month[fd.getMonth()] +" "+ fd.getDate() +", "+ year;
      }

      formatTime(time){
        // var time = t.split(" ")[1];
        var date = new Date(time);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        var minStr = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minStr + ' ' + ampm;
        hours++;
        var endTime = hours + ':' + minStr + ' ' + ampm;
        return strTime + " - "+ endTime +" EDT";
      }
      formatT(t){
        return t.split(" ")[0];
      }


  } // end of class



  //
  // formatObj():any {
  //   console.log("format called.. ");
  //   var dates = [], l = this.channelList.length, i;
  //   this.uniqDates = [];
  //   for( i=0; i<l; i++) {
  //       let date = this.channelList[i].time.split(" ")[0];
  //       if( dates[this.channelList[i].time.split(" ")[0]]) {
  //         this.uniqDates[this.channelList[i].time.split(" ")[0]].push(this.channelList[i]);
  //         continue
  //       };
  //       dates[this.channelList[i].time.split(" ")[0]] = true;
  //       this.uniqDates[this.channelList[i].time.split(" ")[0]] = [];
  //       this.uniqDates[this.channelList[i].time.split(" ")[0]].push(this.channelList[i]);
  //       console.log("in loop :"+ this.uniqDates);
  //   }
  //   // this.uniqDates = output;
  //   console.log("uniqDates : "+ this.uniqDates);
  // }


// }
