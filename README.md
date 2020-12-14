## Desafio Bloom
API REST com comunicação com a API HG Weather

## **Como executar a aplicação**
Para executar a aplicação é necessário ter Node.js e Docker instalado no computador.
Siga os passos:
 1. Faça um clone do código fonte deste repositório
 2. Após clonar o repositório, navegue até o repositório
 3. Certifique-se de que o Docker esteja rodando no computador
 4. Em um terminal apontado para a pasta raiz do projeto, rode o comando "npm run build-docker" e aguarde
 5. Caso queira levantar o serviço da API, utilize o comando "npm run up-docker". Para para o serviço utilize o comando "npm run down-docker"
 6. Caso queira executar os testes automatizados, utilize o comando "npm run test-docker"

## **API REST**
Para iniciar a API REST, digite o comando "npm run up-docker". O Docker irá expor o serviço na porta 3000.

Para testar os endpoints, as requisições devem ser feitas para o endereço "http://localhost:3000/ROTA_DESEJADA".

As requisições devem ser feitas por meio de um REST Client, como Postman ou Insomnia.

Link para a documentação para consumir a API: [Documentação API](https://documenter.getpostman.com/view/4301994/TVsoGVpb#82e4e972-e2c6-4ecb-8f06-101e5ed1cf2b)