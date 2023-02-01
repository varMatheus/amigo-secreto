import React, { useRef, useState } from "react";
import { useAdicionarParticipante } from "../../state/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "../../state/hooks/useMensagemDeErro";
import './Formulario.css';

export default function Formualrio() {
  const [nome, setNome] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const adicionarNaLista = useAdicionarParticipante();
  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome('');
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={adicionarParticipante}>
      <div className='grupo-input-btn'>
        <input onChange={evento => setNome(evento.target.value)}
          value={nome}
          ref={inputRef}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
        {mensagemDeErro && <p className='alerta' role="alert">{mensagemDeErro}</p>}
      </div>
    </form>
  );
}