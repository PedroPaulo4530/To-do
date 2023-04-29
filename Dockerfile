# Use uma imagem do Node.js como base
FROM node:14

# Cria um diretório de trabalho para a aplicação
WORKDIR /pedropaulo/src/app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o código da aplicação
COPY . .

# Expõe a porta 3000 para acessar o servidor Express
EXPOSE 3000

# Inicia o servidor da aplicação
CMD ["npm", "start"]
