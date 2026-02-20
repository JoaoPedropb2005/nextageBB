<h1 align="center">
  NextageBB
</h1>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-recursos-e-regras-de-negócio">Recursos</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-autores">Autores</a>
</p>

<p align="center">
  <em>Uma rede social onde os verdadeiros protagonistas são os seus personagens.</em>
</p>

## Sobre o Projeto

O **NextageBB** é um sistema inovador de gerenciamento e interação para personagens de jogos MMO/RPG. Diferente de redes sociais tradicionais onde os usuários interagem entre si, no NextageBB o **Gamer** atua apenas como um "gerente" de sua conta. Toda a interação social (Postagens, Comentários, Curtidas e Seguidores) acontece **exclusivamente através dos personagens criados**, garantindo uma imersão completa.

O grande diferencial arquitetural do projeto é o isolamento de instâncias: personagens só podem interagir, buscar e ver postagens de outros personagens que pertençam ao **mesmo universo de jogo** (Same Game Universe).

> **Demonstração em Vídeo:** [Assista ao fluxo completo da aplicação aqui](https://streamyard.com/xswkyruahq2n)

---

## Recursos e Regras de Negócio

* **Autenticação e Separação de Papéis:** Sistema seguro de Login e Cadastro para Gamers.
* **Integração com RAWG API:** Na forja de um novo personagem, o sistema consome a API oficial do RAWG para vincular o herói a um jogo real, extraindo metadados e capas oficiais.
* **Sistema de Roster:** Uma interface fluida onde o Gamer pode visualizar e alternar (Switch Character) entre todos os personagens da sua conta.
* **Isolamento de Multiverso (Same Game Universe):** * O sistema de busca (Find Players) blinda as consultas no banco de dados. Um personagem de *Assassin's Creed Syndicate* jamais cruzará com um de *Clair Obscur*.
* **Feed Dinâmico e Social:**
  * O Feed não é global. Ele é populado estritamente com base nos personagens do mesmo universo que o usuário atual decidiu seguir (Follow/Unfollow).
  * Postagens em tempo real, sistema de Comentários encadeados e Curtidas.

---

## Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna, dividindo as responsabilidades entre uma API RESTful robusta e um cliente reativo.

**Back-End:**
* Java 21
* Spring Boot (Web, Data JPA)
* Spring Security (Autenticação e Proteção de Rotas)
* Hibernate / JPA
* MySQL (Banco de Dados Relacional)

**Front-End:**
* React.js (com Vite para build rápido)
* React Router DOM (Navegação SPA)
* Axios (Consumo da API Rest e da RAWG API)
* CSS Modules / Inline Styles (Design System customizado com tema Dark)

---

## Como Executar
  
Para rodar este projeto localmente na sua máquina, siga os passos abaixo:

### Pré-requisitos
* **Java 21** instalado.
* **Node.js** (Versão 20+ ou 22+ recomendada pelo Vite).
* **MySQL Server** rodando localmente.

### 1. Configurando o Banco de Dados
Acesse o terminal do seu MySQL (usuário padrão é `root` com senha padrão `root`, mude conforme suas credenciais mysql e adapte o application.properties) e crie o banco de dados que o Spring Boot irá consumir (comandos para colar no Mysql server):
```
  create database db_nextagebb;
  use db_nextagebb;
  show tables;
```
<p> Nesta etapa o banco deve estar vazio </p>

### 2. Subindo o Node
Agora é necessário que entre no terminal dentro da pasta nextagebb-front e execute estes comandos (caso ainda não tenha node instalado):
```
npm install
```
```
npm run dev
```
<p>O terminal deve ficar com algo parecido com <em>13:11:17 [vite] (client) page reload index.html (x2)</em></p>

### 3. Rodando o NextageBB
Abra o arquivo no diretório raiz (nextagebb) na IDE da sua preferência (Recomendado: vscode); Realize a instalação das extensões:

* **Extension Pack for Java + Spring**
* **Extension Pack for Java**

<p>Siga pelas pastas SRC -> MAIN -> JAVA e chegue no arquivo <em>NextagebbApplication</em>, clique nele com o botão direito e rode. Nesta etapa o banco de dados que estava vazio será preenchido automaticamente. Volte ao mysql e teste novamente:</p>

```
use db_nextagebb;
```
```
show tables;
```
<p>Devem aparecer 8 tabelas.</p>

### URL de acesso
<p>Após todos os passos anteriores terem sucesso, pesquise a seguinte url na sua máquina:</p>
<p><a href="http://localhost:5173/">NextageBB</a></p>

### Desenvolvedores
* <p>Julia Soares Monteiro - Desenvolvedora Full-Stack</p>
* <p>João Pedro Pereira Barbosa - Desenvolvedor Full-Stack</p>
