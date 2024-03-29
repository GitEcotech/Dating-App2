import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, NgxGalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit{
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[]= [];
  galleryImages: NgxGalleryImage[]= [];
  activeTab?: TabDirective;
  messages: Message[] =[];

  constructor(private memberService:MembersService, private route:ActivatedRoute,
      private messageService: MessageService) {}

  ngOnInit(): void { 
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.galleryImages = this.getImages();
    
    this.galleryOptions=[
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  onTabActivated(data:TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages'){
      this,this.loadMessages();
    }
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  loadMessages(){
    if (this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages=> this.messages = messages
      })
    }
  }

  getImages(){
    if(!this.member) return [];
    const imageUrls =[];
    for(const photo of this.member.photos){
      imageUrls.push({
        small:photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrls;
  }

  
  // loadMember(){
  //   var username = this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next : member => {
  //       this.member=member;
  //       this.galleryImages = this.getImages();
  //     }
  //   })
  // }

}
