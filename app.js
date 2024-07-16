let users = {
    "96581": "Nayeli",
    // Otros códigos y nombres aquí
};

function login() {
    let code = document.getElementById("code").value;
    if (users[code]) {
        sessionStorage.setItem("username", users[code]);
        document.getElementById("username").textContent = users[code];
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("chat-screen").style.display = "block";
        loadMessages();
        setInterval(loadMessages, 3000); // Cargar mensajes cada 3 segundos
    } else {
        document.getElementById("error-msg").textContent = "Código incorrecto.";
    }
}

function logout() {
    sessionStorage.removeItem("username");
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("chat-screen").style.display = "none";
}

function sendMessage() {
    let message = document.getElementById("message").value;
    if (message.trim()) {
        let username = sessionStorage.getItem("username");
        let messageElement = document.createElement("div");
        messageElement.textContent = `${username}: ${message}`;
        messageElement.className = "self";
        document.getElementById("messages").appendChild(messageElement);
        document.getElementById("message").value = "";
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;

        fetch('save_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&message=${message}`
        }).then(response => response.json())
          .then(data => {
              if (data.status !== 'success') {
                  alert('Error al enviar mensaje');
              }
          });
    }
}

function loadMessages() {
    fetch('get_messages.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById("messages").innerHTML = data;
            document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
        });
}

window.onload = function() {
    if (sessionStorage.getItem("username")) {
        document.getElementById("username").textContent = sessionStorage.getItem("username");
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("chat-screen").style.display = "block";
        loadMessages();
        setInterval(loadMessages, 3000); // Cargar mensajes cada 3 segundos
    }
};
