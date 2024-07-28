# Pumpfun Bundler README

## Overview

This is the best, fastest, and most efficient self-bundling script for PumpFun, allowing you to create a token and buy tokens with your own 25 buyers in one single bundle.

## Installation

`
npm i pumpdotfun-sdk
`

## Usage Example

First you need to create a `.env` file and set your RPC URL like in the `.env.example`

Then you need to fund an account with atleast 0.004 SOL that is generated when running the command below
To launch your token on Pumpfun site, edit the metadata as desired.
```typescript
    const metadata = {
      "name": "B@mbi",
      "symbol": "Bam",
      "description": "Bambi token",
      "image": "./upload/img.jpg",
      "showName": true,
      "createdOn": "https://pump.fun",
      "twitter": "https://x.com/bambi",
      "telegram": "https://t.me/bambi",
      "website": "https://bambi"
}
```
`
npx ts-node example/basic/index.ts
`
You can check token launch and bundling in this link:
  - pumpfun site
    https://pump.fun/2q4JLenwD1cRhzSLu3uPMQPw4fTEYp7bLtfmBwFLb48v
  - solscan.io
    ![alt text](image.png)

### PumpDotFunSDK Class

The `PumpDotFunSDK` class provides methods to interact with the PumpFun protocol. Below are the method signatures and their descriptions.


#### createAndBuy

```typescript
async createAndBuy(
  creator: Keypair,
  mint: Keypair,
  createTokenMetadata: CreateTokenMetadata,
  buyAmountSol: bigint,
  slippageBasisPoints: bigint = 500n,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Creates a new token and buys it.
- **Parameters**:
  - `creator`: The keypair of the token creator.
  - `mint`: The keypair of the mint account.
  - `createTokenMetadata`: Metadata for the token.
  - `buyAmountSol`: Amount of SOL to buy.
  - `slippageBasisPoints`: Slippage in basis points (default: 500).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### buy

```typescript
async buy(
  buyer: Keypair,
  mint: PublicKey,
  buyAmountSol: bigint,
  slippageBasisPoints: bigint = 500n,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Buys a specified amount of tokens.
- **Parameters**:
  - `buyer`: The keypair of the buyer.
  - `mint`: The public key of the mint account.
  - `buyAmountSol`: Amount of SOL to buy.
  - `slippageBasisPoints`: Slippage in basis points (default: 500).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### sell

```typescript
async sell(
  seller: Keypair,
  mint: PublicKey,
  sellTokenAmount: bigint,
  slippageBasisPoints: bigint = 500n,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Sells a specified amount of tokens.
- **Parameters**:
  - `seller`: The keypair of the seller.
  - `mint`: The public key of the mint account.
  - `sellTokenAmount`: Amount of tokens to sell.
  - `slippageBasisPoints`: Slippage in basis points (default: 500).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### addEventListener

```typescript
addEventListener<T extends PumpFunEventType>(
  eventType: T,
  callback: (event: PumpFunEventHandlers[T], slot: number, signature: string) => void
): number
```

- Adds an event listener for the specified event type.
- **Parameters**:
  - `eventType`: The type of event to listen for.
  - `callback`: The callback function to execute when the event occurs.
- **Returns**: An identifier for the event listener.

#### removeEventListener

```typescript
removeEventListener(eventId: number): void
```

- Removes the event listener with the specified identifier.
- **Parameters**:
  - `eventId`: The identifier of the event listener to remove.

### Running the Examples

#### Basic Example

To run the basic example for creating, buying, and selling tokens, use the following command:

```bash
npx ts-node example/basic/index.ts
```

#### Event Subscription Example

This example demonstrates how to set up event subscriptions using the PumpFun SDK.

#### Script: `example/events/events.ts`

```typescript
import dotenv from "dotenv";
import { Connection, Keypair } from "@solana/web3.js";
import { PumpFunSDK } from "pumpdotfun-sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";

dotenv.config();

const getProvider = () => {
  if (!process.env.HELIUS_RPC_URL) {
    throw new Error("Please set HELIUS_RPC_URL in .env file");
  }

  const connection = new Connection(process.env.HELIUS_RPC_URL || "");
  const wallet = new NodeWallet(new Keypair());
  return new AnchorProvider(connection, wallet, { commitment: "finalized" });
};

const setupEventListeners = async (sdk) => {
  const createEventId = sdk.addEventListener("createEvent", (event, slot, signature) => {
    console.log("createEvent", event, slot, signature);
  });
  console.log("Subscribed to createEvent with ID:", createEventId);

  const tradeEventId = sdk.addEventListener("tradeEvent", (event, slot, signature) => {
    console.log("tradeEvent", event, slot, signature);
  });
  console.log("Subscribed to tradeEvent with ID:", tradeEventId);

  const completeEventId = sdk.addEventListener("completeEvent", (event, slot, signature) => {
    console.log("completeEvent", event, slot, signature);
  });
  console.log("Subscribed to completeEvent with ID:", completeEventId);
};

const main = async () => {
  try {
    const provider = getProvider();
    const sdk = new PumpFunSDK(provider);

    // Set up event listeners
    await setupEventListeners(sdk);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
```

#### Running the Event Subscription Example

To run the event subscription example, use the following command:

```bash
npx ts-node example/events/events.ts
```

## Contributing

We welcome contributions! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

By following this README, you should be able to install the PumpDotFun SDK, run the provided examples, and understand how to set up event listeners and perform token operations.
