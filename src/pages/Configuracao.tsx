import Card from "../components/Card"
import Formualrio from "../components/Formulario/Formulario"
import ListaParticipantes from "../components/ListaParticipantes/ListaParticipantes"
import { Rodape } from "../components/Rodape/Rodape"

export const Configuracao = () => {
  return (
    <Card>
      <section>
        <h2>Vamos começar!</h2>
        <Formualrio />
        <ListaParticipantes />
        <Rodape />
      </section>
    </Card>
  )
}