import {Component, Input, OnInit} from '@angular/core';
import {Feed, PostsService} from "./posts.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {CommentsComponent} from "./comments/comments.component";
import {rooturl} from "../../WebTool";
import {HttpClient} from "@angular/common/http";

const album_data = ["https://www.rice.edu/_images/feature-rice-facts.jpg",
  "https://www.rice.edu/_images/feature-why-rice.jpg",
  "https://www.rice.edu/_images/uploads/2015/baker-college-746x496.jpg",
  "https://www.rice.edu/_images/uploads/2015/martel-around-at-night-746x496.jpg"];


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  textContent = '';

  imgUrl: string;

  feedList: Feed[];

  searchCondition = '';

  searchRes: Feed[];

  netId: string;

  album = "https://www.rice.edu/_images/uploads/2015/martel-around-at-night-746x496.jpg";

  index = 0;

  selectedFile: File = null;

  @Input()
  set getNetIdFromParent(getNetIdFromParent: string){
    if(getNetIdFromParent != null && getNetIdFromParent != ''){
      const obj = JSON.parse(getNetIdFromParent);
      if(obj.flag == 1){
        this.postsService.addNewFollowingsPosts(obj.netId)
          .subscribe((res) => {
            const articles = res['articles'];
            for(let i = 0 ; i < articles.length ; i++){
              this.feedList.push(this.postsService.typeExchange(articles[i]));
            }
            this.postsService.sortFeedListByTime(this.feedList);
            this.searchRes = this.postsService.copyFeedList(this.feedList);
          });
      }else{
        this.feedList = this.postsService.removeFollowingsPosts(obj.netId, this.feedList);
        this.searchRes = this.postsService.copyFeedList(this.feedList);
      }
    }
  }

  /*modalRef: BsModalRef;*/

  constructor(private postsService: PostsService,
              private modalService: BsModalService,
              private http: HttpClient) {}

  ngOnInit() {
    this.feedList = [];
    this.searchRes = [];
    this.netId = localStorage['loginStatus'];
    this.imgUrl = "https://www.rice.edu/_images/feature-why-rice.jpg";
    this.getAllFeed();

    /*setInterval(() => {
      this.index = (this.index + 1) % album_data.length;
      this.album = album_data[this.index];
    }, 2500);*/
  }

  getAllFeed(){
    this.postsService.getFeedList()
      .subscribe((res) => {
        const articles = res['articles'];
        for(let i = 0 ; i < articles.length ; i++){
          this.feedList.push(this.postsService.typeExchange(articles[i]));
          this.postsService.sortFeedListByTime(this.feedList);
        }
        this.searchRes = this.postsService.copyFeedList(this.feedList);
      });
  }

  reset(){
    this.textContent = '';
  }

  postFeed(){
    if(this.textContent != ''){
      this.postsService.postFeed(this.netId, this.textContent, this.imgUrl)
        .subscribe((res) =>{
          let f = new Feed();
          const date = new Date();
          f.pic = this.imgUrl;
          f.content = this.textContent;
          f.create_time = this.postsService.genStrDate(date);
          f.author = this.netId;
          this.feedList.unshift(f);
          this.searchRes = this.postsService.copyFeedList(this.feedList);
          this.textContent = '';
      });
    }
  }

  searchPost(){
    if(this.searchCondition != ''){
      this.searchRes = this.postsService.searchPost(this.feedList, this.searchCondition);
      this.searchCondition = '';
    }else{
      this.searchRes = this.feedList;
    }
  }

  modalRef: BsModalRef;
  showComments(index: number){
    this.modalRef = this.modalService.show(CommentsComponent, {
      initialState:{
        title: 'Comment List',
        feed: this.feedList[index]
      }
    });
  }
}
