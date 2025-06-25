# Dockerfile para o Frontend (localizado em SITE-CASAMENTO/frontend/)

# --- Etapa 1: Build da Aplicação React ---
FROM node:20-alpine AS builder # Esta imagem inclui Node.js e npm

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração de dependência
COPY package*.json ./

# Instala todas as dependências
RUN npm install # Este é o comando que o Railway deve executar!

# Copia o código-fonte da sua aplicação React
COPY . .

# Executa o comando de build do React
RUN npm run build

# --- Etapa 2: Servir a Aplicação Construída (usando Nginx) ---
FROM nginx:stable-alpine

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos construídos do React para o diretório de serviço do Nginx.
COPY --from=builder /app/build /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão para servidores web como Nginx.
EXPOSE 80

# Comando para iniciar o Nginx e mantê-lo em execução.
CMD ["nginx", "-g", "daemon off;"]