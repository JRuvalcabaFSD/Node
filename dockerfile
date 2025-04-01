FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar la caché de Docker
COPY package*.json tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Permite la ejecución desde un script en package.json
ENTRYPOINT ["npm", "run"]

# Comando por defecto para iniciar la aplicación
CMD ["start"]
