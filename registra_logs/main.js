const form = document.querySelector('#Register-form');
form.addEventListener('submit',async function(e){
    e.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const passConfirm = document.getElementById("password-confirm").value;


  const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',

      },
      body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          username: username,
          password_confirmation: passConfirm,
      }),
  });

  const data = await response.json();
  console.log(data);

  // Handlo token storage and redireto kad notiek succsessful reģistrācija
  if (response.ok) {
    localStorage.setItem('token', data.token);
    // Redirect or perform other actions kad notiek succsessful reģistrācija
    window.location.href = '/mainpage.html';
  } else {
    // reģistrācijas error handling
    alert(data.error || 'Epasts jau tiek izmantots');
  }})

// async function registerUser(e) {
//   e.preventDefault();
//   const fullName = document.getElementById("fullName").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;


//   const response = await fetch('/api/register', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//           name: fullName,
//           email: email,
//           password: password,
//       }),
//   });

//   const data = await response.json();
//   console.log(data);

//   // Handle token storage and redirection upon successful registration
//   if (response.ok) {
//     const data = await response.json();
//     localStorage.setItem('token', data.token);
//     // Redirect or perform other actions upon successful registration
//     window.location.href = '/mainpage.html';
//   } else {
//     // Handle registration failure
//     const errorData = await response.json();
//     alert(errorData.error || 'Registration failed');
//   }}

// async function loginUser() {
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;

//   const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//           email: email,
//           password: password,
//       }),
//   });

//   const data = await response.json();
//   console.log(data);
// }
  // Handle token storage and redirection upon successful login
  
// Handle successful registration

// Handle successful registration




//   async function handleFormSubmission() {
//   try {
//     const form = document.querySelector("#Register-form");
//     form.addEventListener('submit', event => {
//       event.preventDefault();
//     })


//     const formData = new FormData(form);


//     const response = await fetch('URL_idfk', {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const responseData = await response.json();

//     if (responseData.success) {
//       window.location.href = '../index.html';
//     } else if (responseData.validation) {
//       backendValidation(responseData.validation);
//     } else {
//       console.error("Unexpected response from the server");
//     }
//   } catch (error) {
//     console.error("An error occurred during the request:", error);
//   }
// }