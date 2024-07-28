import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import * as web3 from '@solana/web3.js';
import fs from "fs";

async function createKeypair() {
  // Generate a new keypair
  const keypair = web3.Keypair.generate();

  // Extract the public key and secret key
  const publicKey = keypair.publicKey;
  const secretKey = keypair.secretKey;

  // Convert keys to base58 strings (for display or storage)
  const publicKeyBase58 = publicKey.toBase58();
  const secretKeyBase58 = bs58.encode(secretKey);

  // Print out the keys (for demonstration purposes)
  console.log('Public Key:', publicKeyBase58);
  console.log('Secret Key:', secretKeyBase58);

  const data = {
    "publicKey": publicKeyBase58,
    "secretKey": secretKeyBase58
  }
  const metadataString = JSON.stringify(data);
  const bufferContent = Buffer.from(metadataString, 'utf-8');
  fs.writeFileSync("./example/basic/.keys/mint.json", bufferContent);
  return keypair; // Return the keypair object if needed
}

createKeypair()