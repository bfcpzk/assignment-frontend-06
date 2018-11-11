import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rooturl} from "../../WebTool";

export class Feed{
  aid: number;
  netId: string;
  author: string;
  create_time: string;
  content: string;
  pic: string;
  comments: Com[];
}

export class Com{
  cid: number;
  content: string;
  create_time: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  BASE_URL = rooturl;

  constructor(private http: HttpClient) { }

  sortFeedListByTime(feedList: Feed[]){
    feedList.sort((a: Feed, b: Feed) => {
      if(a.create_time > b.create_time) return -1;
      else if(a.create_time < b.create_time) return 1;
      else return 0;
    });
  }

  searchPost(feedList: Feed[], searchCondition: string) {
    this.sortFeedListByTime(feedList);
    let tmpArr = [];
    for(let i = 0 ; i < feedList.length ; i++){
      if(feedList[i].content.includes(searchCondition)
        || feedList[i].author.toLowerCase() == searchCondition.toLowerCase()){
        tmpArr.push(feedList[i]);
      }
    }
    return tmpArr;
  }

  getFeedList(){
    return this.http.get(this.BASE_URL + '/articles', {withCredentials: true});
  }

  genStrDate(date: Date): string{
    const month = (date.getMonth() < 9) ? ("0" + (date.getMonth() + 1)) : ("" + (date.getMonth() + 1));
    const day = (date.getDate() < 10) ? ("0" + date.getDate()) : ("" + date.getDate());
    return date.getFullYear() + '-' + month + '-' + day;
  }

  postFeed(netId: string, textContent: string, imgUrl: string){
    return this.http.post(this.BASE_URL + '/article', {text: textContent, image: imgUrl}, {withCredentials: true});
  }

  copyFeedList(tmpFeedList: Feed[]){
    let feedList = [];
    for(let i = 0 ; i < tmpFeedList.length ; i++){
      feedList.push(tmpFeedList[i]);
    }
    return feedList;
  }

  addNewFollowingsPosts(newNetId: string){
    return this.http.get(this.BASE_URL + '/articles/' + newNetId, {withCredentials: true});
  }

  removeFollowingsPosts(newNetId: string, feedList: Feed[]){
    let tmpArr = [];
    for(let i = 0 ; i < feedList.length ; i++){
      if(feedList[i].netId != newNetId) tmpArr.push(feedList[i]);
    }
    return tmpArr;
  }

  getValue(): number{
    return 10;
  }

  typeExchange(article : any): Feed{
    let feed = new Feed();
    feed.netId = article.username;
    feed.author = article.author;
    feed.content = article.content;
    feed.create_time = this.genStrDate(new Date(article.create_time));
    feed.pic = article.pic;
    feed.comments = [];
    const comments_i = article.comments;
    for(let j = 0 ; j < comments_i.length ; j++){
      let comment = new Com();
      comment.cid = comments_i[j].cid;
      comment.content = comments_i[j].content;
      comment.create_time = this.genStrDate(new Date(comments_i[j].create_time));
      feed.comments.push(comment);
    }
    return feed;
  }

  getProfile(addNetId: string){
    return this.http.get(this.BASE_URL + '/profile/' + addNetId, {withCredentials: true});
  }
}
