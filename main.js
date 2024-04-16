document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameOrEmail = document.getElementById("login").value;
    const password = document.getElementById("parole").value;
    const errorElement = document.querySelector(".form__message");

    try {
      // Make a POST request to login endpoint
      console.log("KneeGears");
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          

        },
        body: JSON.stringify({
          email: usernameOrEmail,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.token) {
        // Login successful, store token in local storage
        localStorage.setItem("token", responseData.token);
        // Redirect user to mainpage.html or perform other actions
        window.location.href = "mainpage.html";
      } else {
        // Login failed, display error message
        setFormMessage(loginForm, "error", "Invalid username or password");
      }
    } catch (error) {
      console.error("An error occurred during the request:", error);
      setFormMessage(loginForm, "error", "An unexpected error occurred");
    }
  });
});


// function setFormMessage(formElement, type, message) {
//   const messageElement = formElement.querySelector(".form__message");

//   messageElement.textContent = message;
//   messageElement.classList.remove(
//     "form__message--success",
//     "form__message--error"
//   );
//   messageElement.classList.add(`form__message--${type}`);
// }

// function setInputError(inputElement, message) {
//   inputElement.classList.add("form__input--error");
//   inputElement.parentElement.querySelector(
//     ".form__input-error-message"
//   ).textContent = message;
// }

// function clearInputError(inputElement) {
//   inputElement.classList.remove("form__input--error");
//   inputElement.parentElement.querySelector(
//     ".form__input-error-message"
//   ).textContent = "";
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.querySelector("#login");
//   const createAccountForm = document.querySelector("#createAccount");

//   document
//     .querySelector("#linkCreateAccount")
//     .addEventListener("click", (e) => {
//       e.preventDefault();
//       loginForm.classList.add("form--hidden");
//       createAccountForm.classList.remove("form--hidden");
//     });

//   document.querySelector("#linkLogin").addEventListener("click", (e) => {
//     e.preventDefault();
//     loginForm.classList.remove("form--hidden");
//     createAccountForm.classList.add("form--hidden");
//   });

//   loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Perform your AJAX/Fetch login

//     setFormMessage(loginForm, "error", "Invalid username");
//   });

//   document.querySelectorAll(".form__input").forEach((inputElement) => {
//     inputElement.addEventListener("blur", (e) => {
//       if (
//         e.target.id === "signupUsername" &&
//         e.target.value.length > 0 &&
//         e.target.value.length < 10
//       ) {
//         setInputError(
//           inputElement,
//           "Username must be at least 10 characters in length"
//         );
//       }
//     });

//     inputElement.addEventListener("input", (e) => {
//       clearInputError(inputElement);
//     });
//   });
// });
