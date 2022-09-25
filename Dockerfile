FROM node:14.18.3-alpine as build

WORKDIR /usr/src/coliseo/engine
COPY package.json package-lock.json tsconfig.json ./

# Because colors break logs
ENV NPM_CONFIG_COLOR=false

# Used for development sharing of dependencies
RUN npm i -g yalc

# Production or not doesn't really matter as this image will not be used other than for building
RUN npm ci

# Copy env files
COPY .env* ./

# Necessary files for building the app
COPY src/ src/

# Build package
RUN npm run build

# Locally publish the dependency
CMD yalc publish
