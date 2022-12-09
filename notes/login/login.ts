const form: any = document.querySelector('.login-window-form');
const emailInput: any = document.getElementById('emailInput');
const passwordInput: any = document.getElementById('passwordInput');

form.onsubmit = function(e){
    e.preventDefault();
    fetch("http://127.0.0.1:3000/api/auth/login", {
      method: "POST",
      headers: {
        ["Content-type"]: "application/json",
      },
      body: JSON.stringify({
        login : emailInput?.value,
        pass : passwordInput?.value,
      }),
    }).then((res) => {
        if (res.status === 200){
            window.location.href = 'index.html'
        }
    })
}