# ============================================
# Dockerfile — Mis Contactos
# Servidor: Nginx Alpine (ligero y seguro)
# Uso:
#   docker build -t contactos-app .
#   docker run -p 8080:80 contactos-app
#   Abrir http://localhost:8080
# ============================================

# Imagen base oficial de Nginx en su variante Alpine (mínima)
FROM nginx:alpine

# Elimina la página de bienvenida por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia únicamente los archivos de la app al directorio web
COPY index.html        /usr/share/nginx/html/
COPY css/              /usr/share/nginx/html/css/
COPY js/               /usr/share/nginx/html/js/

# Puerto en el que escucha Nginx
EXPOSE 80
