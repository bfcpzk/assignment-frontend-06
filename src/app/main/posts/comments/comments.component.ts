import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  title;
  feed;
  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
  }
}
