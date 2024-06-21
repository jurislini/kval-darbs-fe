document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  const openPopupButton = document.getElementById('new-task-submit');
  const popup = document.getElementById('reminderPopup');
  const closePopup = document.getElementById('closePopup');
  const reminderForm = document.getElementById('reminderForm');
  let map, marker;

  // Function lai loadotu tasks no localstorage
  const loadTasksFromLocalStorage = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => {
          const task_el = createTaskElement(task.content);
          list_el.appendChild(task_el);
      });
  };

  // Function lai saglabatu tasks localstorage
  const saveTasksToLocalStorage = () => {
      const tasks = Array.from(list_el.children).map((taskEl) => {
          return {
              content: taskEl.querySelector(".text").value,
          };
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function lai izveidotu task elementus
  const createTaskElement = (taskContent) => {
      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");

      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = taskContent;
      task_input_el.setAttribute("readonly", "readonly");

      task_content_el.appendChild(task_input_el);
      task_el.appendChild(task_content_el);

      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerText = "Edit";

      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerText = "Delete";

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
      task_el.appendChild(task_actions_el);

      // Event listener priekš edit pogas
      task_edit_el.addEventListener("click", () => {
          if (task_edit_el.innerText.toLowerCase() === "edit") {
              task_edit_el.innerText = "Save";
              task_input_el.removeAttribute("readonly");
              task_input_el.focus();
          } else {
              task_edit_el.innerText = "Edit";
              task_input_el.setAttribute("readonly", "readonly");
              saveTasksToLocalStorage(); // Saglaba tasks localstorage pec editing
          }
      });

      // Event listener prieks delete button
      task_delete_el.addEventListener("click", () => {
          list_el.removeChild(task_el);
          saveTasksToLocalStorage(); // Saglaba tasks pec deletion localstorage
      });

      return task_el;
  };

  // Load tasks no localstorage pec page load
  loadTasksFromLocalStorage();

  // Event listener (adding new task)
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      popup.style.display = 'block'; // Popup logs
  });

  // Event listener prieks popuploga aizversanas
  closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
  });

  window.onclick = function(event) {
      if (event.target == popup) {
          popup.style.display = 'none';
      }
  };

  reminderForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const date = document.getElementById('date').value;
      const latitude = document.getElementById('latitude').value;
      const longitude = document.getElementById('longitude').value;

      // Šeit varat apstrādāt veidlapas iesniegšanu, piemēram, saglabāt atgādinājumu serverī
      const taskContent = `Title: ${title}, Description: ${description}, Date: ${date}, Location: (${latitude}, ${longitude})`;
      const task_el = createTaskElement(taskContent);
      list_el.appendChild(task_el);

      saveTasksToLocalStorage(); // Saglabājiet tasks localstorage pēc jauna uzdevuma pievienošanas
      popup.style.display = 'none';
  });

  window.initMap = function() {
      const initialPosition = { lat: -34.397, lng: 150.644 };
      map = new google.maps.Map(document.getElementById('map'), {
          center: initialPosition,
          zoom: 8
      });
      marker = new google.maps.Marker({
          position: initialPosition,
          map: map,
          draggable: true
      });
      google.maps.event.addListener(marker, 'position_changed', function() {
          const lat = marker.getPosition().lat();
          const lng = marker.getPosition().lng();
          document.getElementById('latitude').value = lat;
          document.getElementById('longitude').value = lng;
      });
  };
});

function logout() {
    fetch('/index.html', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'), // Localstorage token (if you have one)
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Logout successful, clear token and redirect the user to the login page
            localStorage.removeItem('token');
            window.location.href = '/index.html'; // Redirect to login page
        } else {
            // Handle logout error
            console.error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}

// Attach the logout function to the logout button
const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
};