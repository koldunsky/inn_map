FROM docker-registry.inn.ru/4game-docker:latest

ARG TARGET

COPY . /dist

WORKDIR /dist

RUN rm -rf /id_rsa
COPY id_rsa /root/.ssh/

RUN npm install &&\
    npm run ${TARGET} &&\
    rm /root/.ssh/id_rsa

ENTRYPOINT ["npm", "version"]
