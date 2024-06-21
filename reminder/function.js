//remider setup
document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const email = formData.get('email');
    const reminder_date = formData.get('reminder_date');
    const message = formData.get('message');
  
    fetch('/api/reminders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Ensuro ka user token ir localstorage
        },
        body: JSON.stringify({ email, reminder_date, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Reminder set successfully!');
        } else {
            alert('Error setting reminder');
        }
    })
    .catch(error => console.error('Error:', error));
  });