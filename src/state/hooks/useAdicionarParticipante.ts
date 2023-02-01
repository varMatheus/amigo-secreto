import { useSetRecoilState, useRecoilValue } from "recoil"
import { erroState, listaDeParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaDeParticipantesState);
  const setErro = useSetRecoilState(erroState)
  const lista = useRecoilValue(listaDeParticipantesState)

  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)) {
      setErro('Nomes duplicados não são permitidos!')
      setTimeout(() => {
        setErro('')
      }, 5000)
      return
    }
    return setLista(listaAtual => [...listaAtual, nomeDoParticipante]);
  }
}