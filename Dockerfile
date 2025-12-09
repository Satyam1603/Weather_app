FROM nginix:apline
COPY . /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


