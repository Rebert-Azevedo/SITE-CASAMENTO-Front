# Dockerfile para o Frontend (localizado em SITE-CASAMENTO/frontend/)

# --- Etapa 1: Build da Aplicação React ---
# Usa uma imagem Node.js para construir (compilar) seu aplicativo React.
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração de dependência
COPY package*.json ./

# Instala todas as dependências (dev e prod para o build)
RUN npm install

# Copia o código-fonte da sua aplicação React
COPY . .

# Executa o comando de build do React (npm run build).
# Isso gerará a pasta 'build' com os arquivos estáticos de produção.
RUN npm run build

# --- Etapa 2: Servir a Aplicação Construída (usando Nginx) ---
# Usa uma imagem Nginx leve para servir os arquivos estáticos de produção.
FROM nginx:stable-alpine

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia um arquivo de configuração Nginx personalizado (se você tiver um, caso contrário, pode pular)
# Se não tiver, o Nginx servirá os arquivos da pasta /usr/share/nginx/html por padrão.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos construídos do React (da etapa 'builder') para o diretório de serviço do Nginx.
COPY --from=builder /app/build /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão para servidores web como Nginx.
EXPOSE 80

# Comando para iniciar o Nginx e mantê-lo em execução.
CMD ["nginx", "-g", "daemon off;"]