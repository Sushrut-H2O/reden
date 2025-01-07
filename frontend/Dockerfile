# Use an official Node.js runtime as a parent image
FROM node:22.4.0

RUN mkdir -p /app

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY ./package.json .
# COPY ./package-lock.json .

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the React app for production
RUN npm run build

# Expose port 8000 to the outside world
EXPOSE 8000

# Command to run the React app
CMD ["npm", "run", "dev"]
