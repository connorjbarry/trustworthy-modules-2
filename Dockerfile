FROM node:16-alpine

# Set the working directory
ARG WORKDIR
WORKDIR ${WORKDIR}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

COPY prisma/schema.prisma ./prisma/

# Run prisma generate
RUN npx prisma generate --schema=./prisma/schema.prisma
# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
RUN npm run build
CMD ["npm", "run", "start"]