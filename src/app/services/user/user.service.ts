import { Users } from './../API'
import { AuthService } from './auth.service';

export class UserService {
  public user = undefined;

  constructor(private authService: AuthService) {
    this.init()
  }

  async init() {
    await this.authService.init()

    if(this.authService.jwtToken) {
      if(!this.getSession()) this.addUser()
      else this.user = this.getSession()
    }
  }

  addUser() {
    if(!this.authService.jwtToken) return false

    Users.getMe(this.authService.jwtToken)
      .then(response => {

        // Get data
        const data = response.data

        console.log(data)
        // Format data
        const dataFormat = {
          email: data.email,
          username: data.username,
          confirmed: data.confirmed,
        }

        this.user = dataFormat
        this.setSession(dataFormat)
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);

        this.user = null
      });
  }

  removeUser() {
    this.user = null

    this.removeSession()
  }

  removeSession() {
    sessionStorage.removeItem('user');
  }

  setSession(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getSession() {
    return JSON.parse(sessionStorage.getItem('user')) || null
  }
}