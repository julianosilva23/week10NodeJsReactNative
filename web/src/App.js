import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './componentes/DevItem/index';
import DevForm from './componentes/DevForm/index';
import './global.css';

import './App.css';
import './Sidebar.css';
import './Main.css';
// Componente, função que retorna algum conteúdo HTML/JS/CSS que qual não interface no restante da aplicação
// Propriedade: Informações que um componente PAI para para o compoente FILHO
// Estado: Inforamções mantidas pelo componente (lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data)
    }
    loadDevs();
  }, [])
  async function handleAddDev(data) {

    const response = await api.post('/devs', data);    

    // adição de um array dentro da javascript
    setDevs([...devs, response.data])

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}          
        </ul>
      </main>
    </div>
  );
}

export default App;
