# Description

The app is a decentralized application (dapp) that allows users to mint tokens for any Ethereum address from a smart contract deployed on the Goerli test network. The app also displays the user's balance and contract metadata on a dashboard and listens for blockchain transfer events to notify the user about the status of their transactions. The app is built using Next.js, TypeScript, Ethers.js, Metamask, and TailwindCSS and is deployed on Vercel.

## Getting Started

This app is deployed on Vercel and can be accessed from this [link](https://add3-frontend.vercel.app/). 

### To run it locally

1. Install the dependencies by running ``` yarn install ``` or ```npm install```

2. Then add the ```CONTRACT_ADDRESS``` in the .env file.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

