FROM node:18.20.0-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

#ENTRYPOINT ["npm"]
#CMD [ "run", "preview" ]
CMD [ "npm", "run", "preview" ]
