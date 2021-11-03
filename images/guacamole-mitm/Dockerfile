ARG GOMPLATE_VERSION=v3.10.0
ARG NGINX_VERSION=1.21.3


# Use a named build stage for gomplate
FROM hairyhenderson/gomplate:${GOMPLATE_VERSION} AS gomplate


FROM nginx:${NGINX_VERSION}

# Remove unused file and make config directories for the Nginx user
RUN rm -rf /etc/nginx/conf.d /docker-entrypoint.d/* && \
    mkdir -p /var/cache/nginx /var/run/nginx && \
    chown nginx:nginx /var/cache/nginx /var/run/nginx

# Install gomplate from the previous stage
COPY --from=gomplate /gomplate /usr/bin/gomplate

# Copy in configuration files
COPY ./bin /usr/bin/
COPY ./etc /etc/

# Use a custom start script to template the configuration
CMD ["/usr/bin/nginx-start"]
