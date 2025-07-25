FROM node:alpine AS builder

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
COPY . .

# Remove the proxy configuration to avoid issues with the build process
# RUN rm -f src/app/config/proxy.config.json
# Use the environment variables for the base URL and token

RUN npm install -g @angular/cli && npm run build

FROM nginx:alpine

RUN apk add --no-cache ca-certificates && update-ca-certificates

COPY --from=builder /usr/app/dist/pirate-flix /usr/share/nginx/html

COPY nginx.conf /etc/nginx/templates/nginx.conf
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
