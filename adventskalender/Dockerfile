FROM busybox:latest

# Create a non-root user to run our server
RUN adduser -D frifle
USER frifle
WORKDIR /home/frifle

# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-p", "3000"]

COPY src/main/webapp/ ./
