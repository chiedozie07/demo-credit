# App Name: DemoCredit

## Brief Description: 
DemoCredit is Chiedozie's Lendsqr backend engineer assessment V2 mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## Table of Contents
1. [Features](#features)
2. [Contributing](#contributing)
3. [License](#license)
4. [Contact](#contact)
5. [Usage](#usage)
6. [Installation](#installation)
   
## Features 
1: New user creation, this feature creates new user with the DemoCredit required data for their onbording.
2: Existing user account funding, is a feature that enables the user to fund their account after they have been onborded.
3: Funds transfer, with this feafure a user is able to transfer funds directly from their account's wallet to another user.
4: Funds withdraw, with this feafure a user is able to withdraw funds from directly from their account's wallet to their bank account.
5: Blacklist Check: Uses Lendsqr Adjutor Karma API to prevent blacklisted users from being 

## Contributing
Contributions are welcome! Please follow these steps:

1: Fork the repository.
2: Create a new branch (git checkout -b feature/YourFeature).
3: Commit your changes (git commit -m 'Add some feature').
4: Push to the branch (git push origin feature/YourFeature).
5: Open a pull request on the dev branch.

## License
Include license information if applicable.
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Name: Chiedozie Ezidiegwu
Email: ezidiegwuchiedozie17@gmail.com
LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/chiedozie-ezidiegwu-9859a5167/)

## Installation
## Step-by-step guide on how to install your project.
Prerequisites
Node.js (LTS version)
MySQL database

## Steps
## 1: Clone the Repository:
```bash
`git clone https://github.com/chiedozie07/demo-credit.git`

# 2: Change to the project directory and install Dependencies:
`npm install`

# 3: Set Up Environment Variables:
```bash
`
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=demo_credit_wallet
KARMA_API_URL=https://adjutor.lendsqr.com/v2/verification/karma/:identity
KARMA_API_KEY=yourapikey
`
# 4: Setup MySQL server installation and configuration to run database migrations:
 # Install and setup MySQL server and database locally on your machine to test the DemoCredit server app
 ```bash
 `npx knex migrate:latest`


 # 5 Start the Server to run the app using this command
 ```bash
 `npm run dev` 
 

 ## Usage
#After setting up and running the server, you can interact with the API using tools like Postman or vscode REST Client extension. You can also integrate it with your front-end application or other services.

API Endpoints

# User Management
Description: Create a new user account.
POST `http://localhost:7000/users`
content-type: application/json

Request Body:
`{
    "first_name": "Chiedozie",
    "last_name": "Lawrence",
    "email": "chiedozielawrence1@example.com",
    "phone": "08030000000",
    "next_of_kind": "Dozie Lawrence",
    "dob": "07/11/1995",
    "password": "passW123"
}`

# Response:
`{
  "message": "User created successfully",
  "userData": {
    "id": 1,
    "first_name": "Chiedozie",
    "last_name": "Lawrence",
    "email": "chiedozielawrence1@example.com",
    "phone": "08030000000",
    "account_no": 8053835011,
    "next_of_kind": "Future Wife",
    "dob": "1960-12-19T23:00:00.000Z",
    "balance": 0.00,
    "created_at": "2024-06-28T17:23:26.000Z",
    "updated_at": "2024-06-30T08:05:29.000Z"
  },
  token: "tyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpYXQiOjB3MTk3MzI2NTAsImV4cCI6MTcxOTczNjI1MH0.IVGzmxrXFlmokr-4mVmvuaWKibFdk5q_QIxyBOcETeH "
}

# User account funding
Description: Fund a user account.

POST `http://localhost:7000/users/1/fund`
content-type: application/json

# Request Body:
`{
  "amount": 5000
}`

# Response:
`{
  "message": "Account funded successfully",
  "amout_funded": 5000,
  "userData": {
    "id": 1,
    "first_name": "Chiedozie",
    "last_name": "Lawrence",
    "email": "chiedozielawrence1@example.com",
    "phone": "08030000000",
    "account_no": 8053835011,
    "next_of_kind": "Future Wife",
    "dob": "1960-12-19T23:00:00.000Z",
    "balance": 5000.00,
    "created_at": "2024-06-28T17:23:26.000Z",
    "updated_at": "2024-06-30T08:05:29.000Z"
  }
}`

# Transfer Fund to another existing user
Description: Transfer funds to another user.

POST `http://localhost:7000/users/1/transfer`
content-type: application/json

# Request Body:
`{
  "recipientEmail": "username2@example.com",
  "amount": 2150
}`

# Response:
`{
  "message": "Funds transferred successfully",
  "amount_transfered": 2150,
  "updatedSenderData": {
    "id": 1,
    "first_name": "Chiedozie",
    "last_name": "Lawrence",
    "email": "chiedozielawrence1@example.com",
    "phone": "08030000000",
    "next_of_kind": "Future Wife",
    "dob": "1960-12-19T23:00:00.000Z",
    "account_no": 8053835011,
    "balance": 2850.00,
    "created_at": "2024-06-28T17:23:26.000Z",
    "updated_at": "2024-06-30T13:23:03.000Z"
  }
}`

# Withdraw Fund
Description: Withdraw funds from a user account.

POST `http://localhost:7000/users/1/withdraw`
content-type: application/json

# Request Body:
`{
    "amount": 2500
}`

# Response:
`{
  "message": "Funds withdrawn successfully!",
  "amount_withdrawn": 2500,
  "updatedUserData": {
    "id": 1,
    "first_name": "Chiedozie",
    "last_name": "Lawrence",
    "email": "chiedozielawrence1@example.com",
    "phone": "08030000000",
    "next_of_kind": "Future Wife",
    "dob": "1960-12-19T23:00:00.000Z",
    "account_no": 8053835011,
    "balance": 350.00,
    "created_at": "2024-06-28T17:23:26.000Z",
    "updated_at": "2024-06-30T13:23:03.000Z"
  }
}`

## Error Responses
For error scenarios, the server returns appropriate HTTP status codes along with a descriptive message. For example:

1: 403 Forbidden: If a user is blacklisted during account creation.
2: 400 Bad Request: If there are insufficient funds during transfers or withdrawals and
3: 500  For internal Server Error.

