# treinamentos_desenvolvimento_1

## Descrição
Este projeto foi criado no contexto de uma série de treinamentos ministrados por nós aos nossos colegas desenvolvedores na Sommus Sistemas com o objetivo de auxiliar devs migrando de outras tecnologias 
e programas legados da organização para as tecnologias que usamos nos nossos produtos mais modernos (C# e JS), também a metodologia é preparar um desafio demonstrando o desenvolvimento básico de partes
da aplicação e liberando para que os próprios devs participantes possam cumprir os objetivos propostos em cada dia do treinamento.

## O projeto
O projeto é um sistema de cadastro de músicas, ele deve permitir a criação, leitura, atualização e exclusão de músicas (CRUD).

O projeto tem um frontend desenvolvido em JS, HTML e CSS puro, sem uso de frameworks e uma API em .NET 7 que realiza operações em um banco de dados MySQL.

O backend foi iniciado como uma Minimal API, também usada para instruir sobre injeção de dependência (DI), mas existe o objetivo de extrair os endpoints no futuro para controllers para demonstrar
o processo de migração de um para outro. Também a arquitetura de pastas sera evoluída para se adequar a padrões usados em outros produtos da empresa, como DDD, TDD e Clean Archtecture.

O frontend começa com um único arquivo HTML, CSS e JS (index) e pode vir a evoluir para uma estrutura que comporte mais arquivos de forma organizada e funcione como um SPA, usando outros arquivos 
HTML, CSS e JS como componentes para montar a interface.

## Para rodar o projeto
- Backend:
  1. Tenha o .NET 7 instalado
  2. Use o terminal para navegar até a pasta backend/CadastroMusicas.Api
  3. Rode o comando `dotnet watch run`

- Frontend:
  1. Tenha o VS Code com a extensão Live Server instalada
  2. Use o botão na barra de status ou o comando `Ctrl + Shift + P` e digite `Live Server: Open with Live Server`