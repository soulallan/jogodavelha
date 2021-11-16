import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App(): JSX.Element {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    setTela('jogo');

  }
  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === `X` ? `O` : `X`);

    verificarGanhador(tabuleiro, linha, coluna);
    function verificarGanhador(tabuleiro, linha, coluna) {
      if (tabuleiro[linha][0] !== '' && tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
        finalizarJogo(tabuleiro[linha][0]);
      }
    }
    if (tabuleiro[0][coluna] !== '' && tabuleiro[coluna][1] && tabuleiro[coluna][1] === tabuleiro[coluna][2]) {
      finalizarJogo(tabuleiro[coluna][0]);
    }
    if (tabuleiro[0][0] !== '' && tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      finalizarJogo(tabuleiro[0][0]);
    }
    if (tabuleiro[0][2] !== '' && tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      finalizarJogo(tabuleiro[0][2]);
    }
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }
    setJogadasRestantes((jogadasRestantes - 1));
    function finalizarJogo(jogador) {
      setGanhador(jogador);
      setTela('ganhador');
    }

    switch (tela) {
      case 'menu':
        return getTelaMenu();
      case 'jogo':
        return getTelaJogo();
      case 'ganhador':
        return getTelaGanhador();
    }

    function getTelaMenu() {
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titulo}>Jogo da Velha</Text>
          <Text style={styles.subtitulo}> Selecione o primeiro jogador</Text>

          <View style={styles.inlineItems}>
            <TouchableOpacity
              style={styles.boxJogador}
              onPress={() => iniciarJogo('X')}>
              <text style={styles.jogadorX}>X</text>
            </TouchableOpacity>

            <TouchableOpacity>
              style={styles.boxJogador}
              onPress={() => iniciarJogo('O')}>
              <text style={styles.jogadorO}>O</text>
            </TouchableOpacity></View>

        </View>
      );
    }
    function getTelaJogo() { } {
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titulo}>Jogo da Velha</Text>

          {
            tabuleiro.map((linha, numeroLinha) => {
              return (
                <View Key={numeroLinha} style={styles.inlineItems}>
                  {
                    linha.map((coluna.numeroColuna) => {
                  return (
                  <TouchableOpacity
                    key={numeroColuna}
                    style={styles.boxJogador}
                    onPress={() => jogar(numeroLinha, numeroColuna)}>
                    disabled={coluna !== ''}>
                    <      text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</text>
                  </TouchableOpacity>
                  )
                        })
                    }
                </View>
              )
            })
          }
          <TouchableOpacity
            style={styles.botaoMenu}>
            onPress={() => setTela('menu')}>
            <Text style={styles.textoBotaoMenu}>Voltar ao menu</Text>
          </TouchableOpacity>
        </View>
      );
    }
    function getTelaGanhador() { } {
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.titulo}>Jogo da Velha</Text>
          <Text style={styles.subtitulo}>Resultado final</Text>

          {
            ganhador === '' &&
            <Text style={styles.ganhador}>Nenhum ganhador</Text>
          }
          {
            ganhador !== '' &&
            <>
              <Text styles={styles.ganhador}>Ganhador</Text>
              <view
                style={styles.boxJogador}>
                <      text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</text>
              </View>
            </>
          }

          <TouchableOpacity
            style={styles.botaoMenu}>
            onPress={() => setTela('menu')}>
            <Text style={styles.textoBotaoMenu}>Voltar ao menu</Text>
          </TouchableOpacity>
        </View>
      );
    }


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#333"
      },
      subtitulo: {
        fontSize: 20,
        color: '#555',
        marginTop: 20
      },
      boxJogador: {
        width: 80,
        height: 80,
        backgroundColor: "#ddd",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
      },
      jogadorX: {
        fontSize: 40,
        color: '#553fda'
      },
      jogadorO: {
        fontSize: 40,
        color: '#da3f3f'
      },
      inlineItems: {
        flexDirection: 'row'
      },
      botaoMenu: {
        marginTop: 20
      },
      textoBotaoMenu: {
        color: '#4e6fe4'
      }
ganhador: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'

      }

    });
  }
