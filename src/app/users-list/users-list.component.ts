import { Component, OnInit } from '@angular/core'

import * as firebase from 'firebase'

import { User } from '../models/user'
import { UsersService } from '../services/users.service'

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: [
    './users-list.component.css'
  ]
})
export class UsersListComponent implements OnInit {
  users: User[]
  selectedUser: User

  constructor (private userService: UsersService) {}

  ngOnInit () {
    this.userService.getAll().subscribe((data) => {
      if (data.length === 0) {
        this.users = null
      } else {
        this.users = data.map((u) => {
          return {
            id: u.payload.doc.id,
            ...u.payload.doc.data() as {}
          } as User
        })
      }
    })
  }

  selectUser (user: User) {
    this.selectedUser = user
  }

  newUser () {
    const newUser: User = {
      name: {
        first: '',
        last: ''
      },
      email: ''
    }

    this.selectUser(newUser)
  }

  deleteUser (user: User) {
    this.deletePic(user.pic)
    this.userService.deleteUser(user.id)
  }

  deletePic (URI: string) {
    let splitQ = URI.split('?')
    let fileURI = splitQ[0].split('/')
    let child = fileURI[7].split('%2F')
    let fileRef = child[1]
    firebase.storage().ref().child('uploads').child(fileRef).delete()
  }
}
