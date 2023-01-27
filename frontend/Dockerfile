FROM NODE:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3500