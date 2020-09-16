import { Component, Input } from '@angular/core'

import * as firebase from 'firebase'

import { User } from '../models/user'
import { UsersService } from '../services/users.service'

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css'
  ]
})
export class UsersComponent {
  @Input() user: User

  @Input() uploadProgress: number

  private selectedFile: File

  constructor (private userService: UsersService) {}

  createUser (user: User) {
    let uploadTask = firebase
      .storage()
      .ref()
      .child('uploads')
      .child(`${this.selectedFile.name}_${Date.now()}`)
      .put(this.selectedFile)

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploadProgress = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100)
      },
      (err) => {
        console.log(err)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((URL) => {
          user.pic = URL
          this.userService.createUser(user)
        })
      }
    )
  }

  updateUser (user: User) {
    let uploadTask = firebase
      .storage()
      .ref()
      .child('uploads')
      .child(`${this.selectedFile.name}_${Date.now()}`)
      .put(this.selectedFile)

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploadProgress = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100)
      },
      (err) => {
        console.log(err)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((URL) => {
          if (user.pic) {
            this.deletePic(user.pic)
            user.pic = ''
          }
          user.pic = URL
          this.userService.updateUser(user)
        })
      }
    )
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

  detectFileChange (event) {
    this.selectedFile = event.target.files[0]
  }
}
