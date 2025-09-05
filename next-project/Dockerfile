# 1. Imagen base
FROM node:20-alpine

# 2. Crear carpeta de trabajo
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar solo dependencias de producción
RUN npm install --production

# 5. Copiar todo el código
COPY . .

# 6. Build de Next.js
RUN npm run build

# 7. Puerto
EXPOSE 3000

# 8. Iniciar app
CMD ["npm", "start"]
