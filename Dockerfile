# ---------- Build Angular ----------
    FROM node:22 AS build

    WORKDIR /app
    
    # copiar dependencias
    COPY package*.json ./
    
    # instalar dependencias
    RUN npm install --legacy-peer-deps
    
    # copiar el proyecto
    COPY . .
    
    # build de angular con base-href para gateway
    RUN npm run build -- --base-href /chat/
    
    
    # ---------- NGINX ----------
    FROM nginx:alpine
    
    # copiar configuración nginx
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # copiar build angular al servidor nginx
    COPY --from=build /app/dist/chat-support-client/browser /usr/share/nginx/html
    
    EXPOSE 80