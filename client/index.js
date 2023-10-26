window.onload = function(){
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  console.log('isLoggedIn', isLoggedIn)
  if(isLoggedIn != null){
    window.location.href = '/home.html'
  }
}

const logregBox = document.querySelector('.logreg-box');
const loginLink= document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');


registerLink.addEventListener('click' ,()=>{
    logregBox.classList.add('active')
})

loginLink.addEventListener('click' ,()=>{
    logregBox.classList.remove('active')
})
  

function login(){
   const email = document.getElementById('loginEmail').value;
   const password = document.getElementById('loginPassword').value;
   const form = document.getElementById('form-login');
   const data = { email, password};
    fetch('http://localhost:3030/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
            
            if(data.message){
                
                localStorage.setItem('isLoggedIn', true);
                window.location.href = '/home.html';
                
            }
            if(data.error){
                alert(data.error);
                form.reset();
             }
        })
        .catch(error => console.error('Error:', error));
}

function signup(){
    const username = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const form = document.getElementById('form-register');
    const data = {username, email, password};
     fetch('http://localhost:3030/signup', {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
           'Content-Type': 'application/json'
         }
       })
         .then(response => response.json())
         .then(data => {
              if(data.message){
                 localStorage.setItem('isLoggedIn', true)
                 window.location.href = '/home.html'
             }
             if(data.error){
                alert(data.error)
                form.reset();
             }
         })
         .catch(error => 
            console.error('Error:', error)

            );
 }


