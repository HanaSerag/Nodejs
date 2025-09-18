const socket = io();
const username = localStorage.getItem("username");
document.getElementById("user").textContent = username;

socket.emit("register", username);

let selectedUser = null;
let chattedUsers = [];

const chatBox = document.getElementById("chatBox");

const searchInput = document.getElementById('searchUser');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

async function searchUsers() {
    const query = searchInput.value.trim();
    if (!query) {
        searchResults.innerHTML = '';
        return;
    }

    try {
        const res = await fetch(`http://127.0.0.1:3000/search-users?username=${query}`);
        const data = await res.json();
        const users = data.users || data;

        searchResults.innerHTML = '';
        users.forEach(u => {
            const div = document.createElement('div');
            div.textContent = u.username;
            div.addEventListener('click', () => {
                selectedUser = u.username;
                document.getElementById("toUser").value = selectedUser;
                searchInput.value = '';
                searchResults.innerHTML = '';
            });
            searchResults.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}

searchBtn.addEventListener('click', searchUsers);

searchInput.addEventListener('input', searchUsers);


// Send message
document.getElementById("sendBtn").addEventListener("click", () => {
    const message = document.getElementById("message").value;
    if (!selectedUser) return alert("Select a user first!");
    if (!message) return;

    socket.emit("private-message", { to: selectedUser, message });
    addMessage(`You ${selectedUser}: ${message}`);
    document.getElementById("message").value = "";
});

// Receive message
socket.on("private-message", (data) => {
    addMessage(`${data.from} ➡️ You: ${data.message}`, data.from);
});

// Add message function
function addMessage(msg, from = null) {
    const p = document.createElement("p");
    p.textContent = msg;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (from && !chattedUsers.includes(from)) {
        chattedUsers.push(from);
        updateChattedUsers();
    }
}
 
// Logout
document.getElementById("logout").addEventListener("click", () => {
    fetch('http://127.0.0.1:3000/logout')
    .then(res => res.json())
    .then((data) => {
        if (data.message === "Logout successful") {
            localStorage.removeItem("username");
            window.location.href = "/login";
        } else {
            alert(data.message);
        }
    })
    .catch(err => alert(err));
});
