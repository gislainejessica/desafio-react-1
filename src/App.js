import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    const indexCount = repositories.length
    const res = await api.post('repositories', {
      id: indexCount,
      title: `Novo Projeto${Date.now()}`,
      owner: "Gislaine Jéssica"
    })

    setRepositories([...repositories, res.data])
    console.log(repositories)
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(response => {
      console.log(response)
    })
    setRepositories(repositories.filter(repo => repo.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
