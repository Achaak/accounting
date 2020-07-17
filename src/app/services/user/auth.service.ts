import { Auth, Users } from './../API'
import { Router } from '@angular/router'

export class AuthService {
  jwtToken = undefined

  constructor(private router: Router) {
    this.init()
  }

  async init() {
    

    if(!this.getSession()) this.jwtToken = null
    else await this.jwtValidation()
  }

  async getJwtToken() {
    if(this.jwtToken === undefined) await this.init()

    return this.jwtToken
  }

  async signIn({ identifier, password }) {
    let message
    let status

    const func = await Auth.getLocal(identifier, password)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      // Set session
      this.setSession(func.data.jwt)
  
      // Set variable auth
      this.jwtToken = func.data.jwt
    }
    else {
      message = func.data.message[0].messages[0].message
    }

    return {
      message: message,
      status: status
    }
  }

  signOut() {
    this.jwtToken = null
    
    this.removeSession()
  }

  async jwtValidation() {
    let token = this.getSession()

    await Users.getMe(token)
      .then(response => {
        this.jwtToken = token
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);

        this.jwtToken = null
      });
  }

  removeSession() {
    sessionStorage.removeItem('jwtToken')
  }

  setSession(sessionToken) {
    sessionStorage.setItem('jwtToken', sessionToken);
  }

  getSession() {
    return sessionStorage.getItem('jwtToken') || null
  }
}