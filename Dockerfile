# Base image
FROM node:14

# Set the working directory
WORKDIR /TRUSTWORTHY-MODULES-2
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]