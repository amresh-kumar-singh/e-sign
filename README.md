# Zoho Sign Project

This project is aimed at integrating Zoho Sign into a web application, allowing users to sign documents electronically. It consists of both server-side and client-side code.

### Description

The server-side code is responsible for handling communication with the Zoho Sign API, managing documents, and orchestrating the signing process.

## Technologies Used

- NestJS (a progressive Node.js framework)
- Node.js
- ReactJS (for client side)

## Installation and Start

1. Clone the repository:

   ```bash
   git clone https://github.com/amresh-kumar-singh/e-sign.git
   ```

2. Navigate to the project directory:

   ```bash
   cd e-sign
   ```

3. To start server Navigate to server

   ```bash
   cd server
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the server(default port 3000)

   ```bash
   npm start
   ```

6. To start the client navigate back to root directory of project i.e. e-sign

   ```bash
   cd ../e-sign
   ```

7. To start client Navigate to server

   ```bash
   cd client
   ```

8. Install dependencies(client)

   ```bash
   npm install
   ```

9. Start client(default on port 5173)

   ```bash
   npm run dev
   ```

## Usage

- Access the client app in your browser at [http://localhost:5173/](http://localhost:5173/)
- Access the server api on [http://localhost:3000/](http://localhost:3000/)

## Configuration

- To access the Zoho Sign APIs, you'll need to obtain a refresh token, client ID, and client secret from Zoho Sign. Once you have these credentials, update their respective fields in the local.env file.

## License

This project is licensed under the MIT.

## Documentation

1.  Postman documentaion of api is available on

    ```bash
    https://documenter.getpostman.com/view/23591986/2s9YyzdxoU
    ```
