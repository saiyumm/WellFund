# WellFund

## Description
WellFund is a decentralized crowdfunding platform built on the Ethereum blockchain. It aims to revolutionize the way fundraising is conducted by leveraging the transparency, security, and efficiency provided by blockchain technology.

--------------------------------------------------------

## Dependencies
To run the WellFund project locally, the following dependencies are required:
- Node.js
- Hardhat
- Ganache

--------------------------------------------------------

## Installation Guide
1. Install Node.js: Visit [Node.js website](https://nodejs.org/) and follow the instructions to install Node.js on your machine.

2. Install Hardhat: Open your terminal and run the following command:
```
npm install --global hardhat
```

3. Install Ganache: Visit the [Ganache website](https://www.trufflesuite.com/ganache) and download Ganache for your operating system. Install Ganache on your machine.

--------------------------------------------------------

## Running WellFund Locally
To run WellFund locally using Hardhat and Ganache, follow these steps:

1. Navigate to the project directory.
2. Install the project dependencies by running the following command:

    ```
    npm install
    ```
3. Make sure you have Hardhat installed globally. If not, you can install it by running the following command:

    ```
    npm install -g hardhat
    ```

4. Start the local Hardhat network by running the following command:

    ```
    npx hardhat node
    ```
    _This command will spin up a local blockchain network with a set of predefined accounts._

5. In a separate terminal window, deploy the smart contracts to the local network by running the following command:

    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```
    _This command will compile and deploy the smart contracts to the local Hardhat network._
6. Once the smart contracts are deployed, you can start the WellFund application by running the following command:

    ```
    npm start
    ```

    This will start the application and make it accessible through a local development server.

> Please note that these instructions assume that you have Node.js and npm (Node Package Manager) installed on your machine.

--------------------------------------------------------

For any issues or difficulties encountered during the project setup or execution, please feel free to reach out to [Saiyam Jain](jainsanyam1432@gmail.com) for prompt assistance and support.