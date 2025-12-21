# ---------- BUILD ----------
FROM node:20-alpine AS build
WORKDIR /app

# 👇 ACCEPT BUILD ARG
ARG VITE_API_URL
# 👇 MAKE IT AVAILABLE TO VITE
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- SERVE ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
