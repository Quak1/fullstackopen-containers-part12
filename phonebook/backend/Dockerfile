FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY ../frontend .
RUN npm ci
RUN npm run build

FROM node:16
WORKDIR /usr/src/app
COPY ./backend .
COPY --from=build-stage /usr/src/app/build ./build
RUN npm ci
CMD ["npm", "start"]
