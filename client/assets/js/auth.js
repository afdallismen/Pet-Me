$(document).ready(function() {
    $('#form-login').submit(handleSubmitLogin)
    $('#form-register').submit(handleSubmitRegister)
})

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
      })
      .catch(err => console.log(err))
  }

  function handleGoogleSignin (googleUser) {
    let token = googleUser.getAuthResponse().id_token

    axios
      .post('http://localhost:3000/auth/google-signin', { token })
      .then(({ data }) => {
        saveLogin(data)
      })
      .catch(err => console.log(err))
  }

  function handleClickLogout () {
    let auth2 = gapi.auth2.getAuthInstance()

    auth2.signOut().then(function () {
      console.log('signed-out')
      localStorage.removeItem('PetMe_user')
      localStorage.removeItem('PetMe_token')
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
      })
      .catch(err => console.log(err))
  }