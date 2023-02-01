import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe('O comportamento do Formulario.tsx', () => {
  // Função do jest
  test('quando o input esta vazio novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    //encontra no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    //encontra o botao
    const botao = screen.getByRole('button');
    //garanti q o input esta no documento
    expect(input).toBeInTheDocument();
    //garanti que o botao esta desabilitado
    expect(botao).toBeDisabled();
  })

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    //encontra no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    //encontra o botao
    const botao = screen.getByRole('button');
    //inseri um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    //clica no botao de submeter
    fireEvent.click(botao)
    // garantir q o input esteja com o foco ativo 
    expect(input).toHaveFocus();
    //garanti q o input n tem valor
    expect(input).toHaveValue("");
  })

  test('nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole('alert');
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!');
  });

  test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const botao = screen.getByRole('button');
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeInTheDocument();
    act(() => {
      jest.runAllTimers();
    })
    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  });

})

