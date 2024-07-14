import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Multas.css';
import detranLogo from './img/logo.png';
import { cadastrarMulta } from './services/api';

const Multas = () => {
  const navigate = useNavigate();
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [pontos, setPontos] = useState('');
  const [tipo, setTipo] = useState('');
  const [veiculoId, setVeiculoId] = useState('');
  const [multas, setMultas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const multa = { valor, data, pontos, tipo, veiculoId };
      const response = await cadastrarMulta(multa);  // Uso da função de API
      alert('Multa cadastrada com sucesso!');
      console.log(response);
      setMultas([...multas, response]);
    } catch (error) {
      alert('Erro ao cadastrar multa: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src={detranLogo} alt="DetranSys Logo" className="logo" />
        <div className="close-icon" onClick={() => navigate('/visualizar')}>✖</div>
      </div>
      <form onSubmit={handleSubmit} className="form-multa">
        <div className="cadastrar-multa">
          <label>Valor:</label>
          <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Digite o valor" />
          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} placeholder="Digite a data" />
          <label>Pontos:</label>
          <input type="number" value={pontos} onChange={(e) => setPontos(e.target.value)} placeholder="Digite os pontos" />
          <label>Tipo:</label>
          <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Digite o tipo" />
          <label>Veículo ID:</label>
          <input type="text" value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)} placeholder="Digite o veículo ID" />
          <div className="buttons">
          <button className="button" type="submit">Cadastrar Multa</button>
          </div>
        </div>

      </form>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Data</th>
              <th>Pontos</th>
              <th>Tipo</th>
              <th>Veículo ID</th>
            </tr>
          </thead>
          <tbody>
            {multas && multas.length > 0 ? (
              multas.map((multa) => (
                <tr key={multa.id}>
                  <td>{multa.valor}</td>
                  <td>{multa.data}</td>
                  <td>{multa.pontos}</td>
                  <td>{multa.tipo}</td>
                  <td>{multa.veiculoId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhuma multa encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button className="button" onClick={() => navigate('/Cadastrar_carro')}>Cadastrar Veículo</button>
      </div>
    </div>
  );
};

export default Multas;
