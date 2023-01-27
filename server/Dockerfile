# Premade image 
FROM node:16

# Working directory
WORKDIR /app

# Copy package*.json to working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy code to working directory
COPY . .

# Enviroment variable PORT
ENV PORT=3500

# Expose port 3500 to the "world" (More like expose port 3500 to outside of docker container)
EXPOSE 3500

# Compile TypeScript to JavaScript
RUN npx tsc

# Start the javascript app
CMD [ "npm", "start" ]