import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Follower, FollowingService} from "./following.service";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  addNetId: string;

  netId: string;

  followers: Follower[];

  errMsg: string;

  @Output() sendNetId = new EventEmitter<string>();

  constructor(private followeringService: FollowingService) {}

  ngOnInit() {
    this.netId = localStorage['loginStatus'];
    this.followers = [];
    this.followeringService.initFollowerList(this.netId).subscribe(data => {
      if(data){
        for(let i = 0 ; i < data['following'].length ; i++){
          let f = new Follower();
          f.netId = data['following'][i].username;
          f.avatar = data['following'][i].avatar;
          f.headline = data['following'][i].headline;
          f.display_name = data['following'][i].display_name;
          this.followers.push(f);
        }
      }
    });
  }

  addFollower(){
    const res = this.followeringService.addFollower(this.addNetId, this.followers, this.netId);
    if(res) {
      this.followeringService.getProfile(this.addNetId)
        .subscribe((profile) => {
          if(profile){
            let f = new Follower();
            f.netId = profile['username'];
            f.display_name = profile['display_name'];
            f.avatar = profile['avatar'];
            f.headline = profile['headline'];
            this.followers.push(f);
            this.followeringService.updateFollowers(profile['username']);
            this.sendNetId.emit(JSON.stringify({'netId': this.addNetId, 'flag': 1}));
            this.addNetId = '';
          }else{
            this.addNetId = '';
            this.errMsg = "invalid adding";
            setTimeout(() => {
              this.errMsg = '';
            }, 2000);
          }
        });
    } else {
      this.addNetId = '';
      this.errMsg = "invalid adding";
      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    }
  }

  unfollow(netId: string){
    let i = 0;
    for(; i < this.followers.length ; i++){
      if(this.followers[i].netId == netId){
        break;
      }
    }
    this.followers.splice(i, 1);
    this.followeringService.removeFollowing(netId);
    this.sendNetId.emit(JSON.stringify({'netId': netId, 'flag': 0}));
  }
}
