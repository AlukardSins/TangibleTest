import { Injectable } from '@angular/core'

import { AngularFirestore } from '@angular/fire/firestore'

import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor (private firestore: AngularFirestore) {}

  private API = this.firestore.collection('users')

  // User CRUD
  // Create
  createUser (data: User) {
    return this.API.add(data)
  }

  // Read
  getAll () {
    return this.API.snapshotChanges()
  }

  // Update
  updateUser (data: User) {
    return this.API.doc(data.id).set(data)
  }

  // Delete
  deleteUser (id: string) {
    return this.API.doc(id).delete()
  }
}
