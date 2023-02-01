import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../state/hooks/useListaDeParticipantes';
import ListaParticipantes from './ListaParticipantes';


jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

describe('uma lista vazia de participantes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('deve ser renderizada sem elementos', () => {
    render(<RecoilRoot>
      <ListaParticipantes />
    </RecoilRoot>);

    const itens = screen.queryAllByRole('listitem');

    expect(itens).toHaveLength(0);
  })
})

describe('uma lista preenchida de participantes', () => {
  const participantes = ['Ana', 'Vini'];
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('deve ser renderizada sem elementos', () => {
    render(<RecoilRoot>
      <ListaParticipantes />
    </RecoilRoot>);

    const itens = screen.queryAllByRole('listitem');
    expect(itens).toHaveLength(participantes.length);
  })
})