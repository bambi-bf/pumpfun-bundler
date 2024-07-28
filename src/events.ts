import { PublicKey } from "@solana/web3.js";
import {
  CompleteEvent,
  CreateEvent,
  SetParamsEvent,
  TradeEvent,
} from "./types";

export function toCreateEvent(event: CreateEvent): CreateEvent {
  return {
    name: event.name,
    symbol: event.symbol,
    uri: event.uri,
    mint: new PublicKey(event.mint),
    bondingCurve: new PublicKey(event.bondingCurve),
    user: new PublicKey(event.user),
  };
}

export function toCompleteEvent(event: CompleteEvent): CompleteEvent {
  return {
    user: new PublicKey(event.user),
    mint: new PublicKey(event.mint),
    bondingCurve: new PublicKey(event.bondingCurve),
    timestamp: event.timestamp,
  };
}

export function toTradeEvent(event: TradeEvent): TradeEvent {
  return {
    mint: new PublicKey(event.mint),
    solAmount: BigInt(event.solAmount),
    tokenAmount: BigInt(event.tokenAmount),
    isBuy: event.isBuy,
    user: new PublicKey(event.user),
    timestamp: Number(event.timestamp),
    virtualSolReserves: BigInt(event.virtualSolReserves),
    virtualTokenReserves: BigInt(event.virtualTokenReserves),
    realSolReserves: BigInt(event.realSolReserves),
    realTokenReserves: BigInt(event.realTokenReserves),
  };
}

export function toSetParamsEvent(event: SetParamsEvent): SetParamsEvent {
  return {
    feeRecipient: new PublicKey(event.feeRecipient),
    initialVirtualTokenReserves: BigInt(event.initialVirtualTokenReserves),
    initialVirtualSolReserves: BigInt(event.initialVirtualSolReserves),
    initialRealTokenReserves: BigInt(event.initialRealTokenReserves),
    tokenTotalSupply: BigInt(event.tokenTotalSupply),
    feeBasisPoints: BigInt(event.feeBasisPoints),
  };
}
