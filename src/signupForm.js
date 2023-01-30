import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import "./style/signupForm.css";
import logoImage from './images/logo.svg';
import logoEscudo from './images/image1.svg';


function SignupForm(_props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useAlert();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert.error("As senhas não correspondem");
      return;
    }

    axios
    .get(`https://server-biobyte.herokuapp.com/verificaEmail/${email}`)
    .then((response) => {
      if (response === 400) {
        return;
      }

      const data = { name, surname, email, password };
      axios
        .post("https://server-biobyte.herokuapp.com/conta/cadastro", data)
        .then((response) => {
          console.log(response);
          alert.success("Dados enviados com sucesso!");
          setName("");
          setSurname("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      alert.error("Email já cadastrado");
      console.log(error);
    });
};


  return (
    <div className="container">
      <div className="form-container">
          <form onSubmit={handleSubmit}>
          <img src={logoImage} className="logo" alt="Logo" />
          <h1>Criar sua Conta do Google</h1>
          <div className="form-informations">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Sobrenome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-informations">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
          </div>
          
          <p className="form-instrucoes">
            Você pode usar letras, números e pontos finais
          </p>
          <a href="" className="form-instrucoes-a">
            Usar meu endereço de e-mail atual em vez disso
          </a>
          <div className="form-informations">
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            </div>
          </div>
          <p className="form-instrucoes">
            Use oito ou mais caracteres com uma combinação de letras, números e
            símbolos
          </p>
          <div className="avancar">
            <a href="">Faça login em vez disso</a>
            <button type="submit" className="btn btn-primary">
              Criar conta
            </button>
          </div>
          
        </form>
        
        <img src={logoEscudo} alt="escudo" className="image"/>
        
      </div>
      
    </div>
  );
}

export default SignupForm;
