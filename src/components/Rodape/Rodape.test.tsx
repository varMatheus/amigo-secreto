import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { Rodape } from "./Rodape";

const mockDeNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

jest.mock('../../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockDeNavegacao
  }
})

describe('quando não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('a brincadeira não pode ser iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)

    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  })
})

describe('quando existem participantes suficientes', () => {

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Vini', 'Marcos'])
  })

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button');

    expect(botao).not.toBeDisabled();
  })

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button');

    fireEvent.click(botao);

    expect(mockDeNavegacao).toHaveBeenCalledTimes(1);
    expect(mockDeNavegacao).toHaveBeenCalledWith('/sorteio');
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
})