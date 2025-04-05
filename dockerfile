# Etapa de construcción para ARM64 y x86_64 (amd64)
FROM node:20-alpine AS builder

# Detectamos la plataforma y ajustamos el comportamiento si es necesario
ARG TARGETPLATFORM
ARG ENVFILE


RUN echo "Construyendo para la plataforma: $TARGETPLATFORM"

WORKDIR /app

# Copia los archivos esenciales para la instalación de dependencias
COPY package*.json tsconfig.json ./
COPY . .
COPY ${ENVFILE} .env


# Instala dependencias de manera reproducible
RUN yarn install --frozen-lockfile

# Copia el resto del código y compila TypeScript
COPY . .
RUN yarn build

# Etapa final (ejecución de la aplicación)
FROM node:20-alpine

WORKDIR /app

ARG TARGETPLATFORM
ARG ENVFILE
# Copia solo los archivos necesarios de la etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/${ENVFILE} ./.env
COPY package.json ./

# Dependiendo de la plataforma, podemos configurar algo diferente (si es necesario)

RUN echo "Corriendo en la plataforma: $TARGETPLATFORM"

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]
