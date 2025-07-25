#!/bin/sh
echo "🔄 Gerando nginx.conf com variável de ambiente..."

# Lê o template e substitui $TMDB_KEY pelo valor do runtime
envsubst '$TMDB_KEY' < /etc/nginx/templates/nginx.conf > /etc/nginx/conf.d/default.conf

echo "✅ Nginx pronto. Subindo servidor..."
exec nginx -g 'daemon off;'
