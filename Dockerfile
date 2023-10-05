# Use an official Node runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Use a smaller base image for the final container
FROM node:14-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built app from the previous build stage
COPY --from=build /app/dist /app

# Install serve globally to run the app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5173

# Command to run the application
CMD ["serve", "-s", ".", "-l", "5173"]
