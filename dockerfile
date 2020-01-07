# system dependencies
FROM node:10.16.0-alpine AS system-dependencies
RUN apk add --update --no-cache build-base curl bash libc6-compat python

# application dependencies
FROM system-dependencies AS application-dependencies
WORKDIR /app
COPY package*.json yarn.lock /app/
RUN yarn install

# CI: lint & test & build
FROM application-dependencies AS ci
WORKDIR /app
COPY . /app
ENV NODE_ENV=production \
  PORT=8080
RUN yarn run ci

# Release
FROM ci AS release
WORKDIR /app
COPY --from=ci /app/package*.json /app/yarn.lock /app/
RUN yarn install --production --ignore-scripts --prefer-offline
COPY --from=ci /app/src /app/src
COPY --from=ci /app/dist /app/dist

# If deployed to GKE, health check is enabled and override by deployment.yaml by default from ingress. Dockerfile HEALTHCHECK is duplicated with k8s HEALTHCHECK
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:${PORT}/api/v1/ping || exit 1

EXPOSE ${PORT}
CMD yarn start
