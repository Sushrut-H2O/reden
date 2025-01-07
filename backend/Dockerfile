# Use an official Node.js runtime as a parent image
FROM node:22.4.0

RUN mkdir -p /app

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ../package.json .
COPY ../package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Set environment variables
ENV MONGO_DB_URI=mongodb+srv://sushrutwate:xXekYVZKNTNRq2Cy@cluster0.foqkqwx.mongodb.net/chat-db?retryWrites=true&w=majority&appName=Cluster0
ENV JWT_SECRET=atk534hE8Vh7BCQDM/yz4xc1lMIy/K2XavwxKwYsNwA=
ENV NODE_ENV=production

# Command to run the backend server
CMD ["npm", "run", "server"]
