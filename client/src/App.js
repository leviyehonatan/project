import { useEffect } from 'react';

async function register(email, password) {
  const response = await fetch('http://localhost:4000/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  }).catch(err => {
    console.log(err)
  })
  return response.body
}

function App() {
  useEffect(async () => {
    register("123", "456")
  })
  return (
    <div>

    </div>
  );
}

export default App;
