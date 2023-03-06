import axios from 'axios'
import {Moment}from 'moment'
import User from '../Entities/User'
import moment from 'moment'

export type UserResponse = {
  id: number
  name: string
  email: string
  password: string
  birthdate: string
}

export type UserCreatePayload = {
  name: string
  email: string
  password: string
  birthdate: Moment
}

export type UserUpdatePayload = {
  id: number
  name: string
  email: string
  password: string
  birthdate: Moment
}

export type UserDeletePayload = {
  id: number
}

export const UserMapper = (response: UserResponse): User => {
  const birthdate = moment(response.birthdate)

  return new User(
    response.id,
    response.name,
    response.email,
    response.password,
    birthdate,
  )
}

export default class UserService {
  private static endpoint = 'http://localhost:8080/api/users'

  public static async searchAll() {
    const response = await axios.get(this.endpoint)

    return response.data.map(UserMapper)
  }

  public static async create(user: UserCreatePayload) {
    const response = await axios.post(this.endpoint, user)

    return UserMapper(response.data)
  }

  public static async update(user: UserUpdatePayload) {
    const response = await axios.put(this.endpoint, user)

    return UserMapper(response.data)
  }

  public static async delete(user: UserDeletePayload) {
    const response = await axios.delete(
      this.endpoint + `/${user.id}`,
    )

    return UserMapper(response.data)
  }
}