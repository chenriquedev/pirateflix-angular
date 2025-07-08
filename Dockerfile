FROM node:alpine AS builder

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
COPY . .
ARG NG_APP_BASE_URL
ARG NG_APP_TOKEN
ENV NG_APP_BASE_URL=${NG_APP_BASE_URL}
ENV NG_APP_TOKEN=${NG_APP_TOKEN}

# Remove the proxy configuration to avoid issues with the build process
# RUN rm -f src/app/config/proxy.config.json
# Use the environment variables for the base URL and token

RUN npm install -g @angular/cli && npm run build

FROM nginx:alpine

COPY --from=builder /usr/app/dist/pirate-flix /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
