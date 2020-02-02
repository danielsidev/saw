# Microservice SAW - Sales Analysis Watcher
Um microserviço para assitir mudanças em um diretório de entrada, consultar os arquivos e gerar relatórios de vendas.

### Instalação

Requer [Node.js](https://nodejs.org/) v13+

Abra um terminal, na raiz do projeto, e instale as dependências. 
```sh
$ npm install 
```
#### O microserviço irá ler arquvivos alocados no diretório $USER/data/in, processar as informações e gerar arquivos com dados de relatório em $USER/data/out. Os arquivos devem epossuir seu conteúdo separados por (ç) C cedilha, e separados por quebra linha (\n)  neste formato:
```sh
001ç0988766544çMarioç90000
001ç1122343217çTaniaç70000.99
```
#### O microserviço assiatirá o diretório constantemente e irá avisar via console/log toda vez que um arquivo for adicionado ou removido.
### Testes
Execute o comando:
```sh
$ npm test
```
### Para ambiente Local com node/nodemon
```sh
$ npm run local
```
### Para ambiente Dev, Homolog ou Production com PM2, respectivamente:

```sh
$ npm run dev
```
```sh
$ npm run hmg
```
```sh
$ npm run prod  
```
 
 ---
 
