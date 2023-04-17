FROM node:16.17.0

WORKDIR /app

ADD . /app

# COPY package.json yarn.lock.
# RUN yarn install
# COPY . .
CMD yarn start
