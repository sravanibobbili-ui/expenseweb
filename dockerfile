# # Use the official Node.js image as a base
# FROM node:latest as build-stage

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install --force

# # Copy the rest of the application code
# COPY . .

# # Expose the port on which Vite development server runs
# EXPOSE 5173

# # Command to run the Vite development server
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]



FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 5173



CMD ["npm", "run","dev","--", "--host", "0.0.0.0"]