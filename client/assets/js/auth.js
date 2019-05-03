$(document).ready(function() {
    $('#form-login').submit(handleSubmitLogin)
    $('#form-register').submit(handleSubmitRegister)
    if(localStorage.PetMe_token) hideLogin()
})

function hideLogin() {
    $('.register-modal-button').hide()
    $('.login-modal-button').hide()
    $('.sign-out').show()
}

function showLogin() {
  $('.register-modal-button').show()
    $('.login-modal-button').show()
    $('.sign-out').hide()
}

function saveLogin (data) {
    console.log('signed-in')
    console.log(data)
    localStorage.setItem('PetMe_user', JSON.stringify(data.user))
    localStorage.setItem('PetMe_token', data.token)
  }

  function handleSubmitLogin (e) {
    e.preventDefault()

    let email = $('#login-email').val()
    let password = $('#login-password').val()
    
    axios
      .post('http://localhost:3000/auth/login', {
        email,
        password
      })
      .then(({ data }) => {
        saveLogin(data)
        console.log('successfully logged in')
        Swal.fire({
          type: 'success',
          title: 'Login success',
          text: 'Welcome to pet me!',
          timer: 1500 
        })
        hideLogin()
        $('#loginModal').modal('hide')
      })
      .catch(err => console.log(err))
  }

  function handleGoogleSignin (googleUser) {
    let token = googleUser.getAuthResponse().id_token

    axios
      .post('http://localhost:3000/auth/google-signin', { token })
      .then(({ data }) => {
        saveLogin(data)
        Swal.fire({
          type: 'success',
          title: 'Login success',
          text: 'Welcome to pet me!',
          timer: 1500
        })
        $('#loginModal').modal('hide')
        hideLogin()
      })
      .catch(err => console.log(err))
  }

  function handleClickLogout () {
    let auth2 = gapi.auth2.getAuthInstance()

    auth2.signOut().then(function () {
      console.log('signed-out')
      localStorage.removeItem('PetMe_user')
      localStorage.removeItem('PetMe_token')

      showLogin()
    })
  }

  function handleSubmitRegister(e) {
    console.log('handling submit')
    e.preventDefault()

    let name = $('#register-name').val()
    let email = $('#register-email').val()
    let password = $('#register-password').val()

    axios
      .post('http://localhost:3000/auth/register', {
        name,
        email,
        password
      })
      .then(({ data }) => {
        console.log(data)
        console.log('register success')
        Swal.fire({
          type: 'success',
          title: 'Register success',
          text: 'You can now log in to Pet Me!',
          timer: 1500
        })
        $('#registerModal').modal('hide')
      })
      .catch(err => console.log(err))
  }