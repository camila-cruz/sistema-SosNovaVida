# Sistema SOS Nova Vida
Sistema de controle para a ONG SOS Nova Vida.
Implementado pelos alunos da FATEC São Caetano do Sul.

Previsão de defesa perante a banca: 12/2017.
***
# Integrantes:

### Joice Benedini Calister - RA: 1680481511024
### Julio - RA: 1680481511024
### Gabriel Viana - RA: 1680481511036
### Camila Cruz - RA: 1680481511007
### Yuri Cabral - RA: 141681030
***
# Orientado por:
Prof. Dr. Me. Flávio Viotti
# Co-orientado por:
Prof. Dr. Me. Ricardo Gondo
# Tema:
Implementação de um sistema de controle interno para a SOS Nova Vida.

# Stop talking, show me the app!
### BackEnd
Pré-requisito: Node, NPM e Nodemon<br>
Baixar Node em: https://nodejs.org/
Após Node instalado, instalar o Nodemon:
~~~shell
npm i -g nodemon
~~~
Após instalado, executar 
~~~shell
$ cd server
$ npm install
~~~
Os comandos acima irão baixar as dependências do back-end. Uma vez rodado os comandos acima, não é mais necessário rodá-los até que as dependências mudem. Para subir o servidor, executar o comando
~~~shell
$ nodemon index.js
~~~

### FrontEnd
Pré-requisito: npm e live-server<br>
~~~shell
$ cd client # Navega para a pasta client
$ npm install # Instala as dependências
$ npm i -g live-server # Instala o pacote live-server, que será responsável por prover o servidor front-end.
$ live-server #Inicia o servidor. Porta padrão: 8080. Caso desejar alterar, executar live-server port=<NUMERO DA PORTA>
~~~