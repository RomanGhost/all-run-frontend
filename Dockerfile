# Сначала билдим Angular-приложение
FROM node:20 as build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Потом берем nginx и копируем туда готовую статику
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist/all-run/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]