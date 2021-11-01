import { useEffect } from 'react';

async function register(email, password) {
  const response = await fetch('http://localhost:4000/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  const { token } = await response.json();
  localStorage.setItem("token", token)
}

async function login(email, password) {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  const { token } = await response.json();
  localStorage.setItem("token", token)
  console.log("logged in successfuly!!")
}

function App() {
  useEffect(async () => {
    login("qQ", "456")
  })
  return (
    <div>
    </div>
  );
}

export default App;
