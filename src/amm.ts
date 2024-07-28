import { BondingCurveAccount } from "./bondingCurveAccount";
import { GlobalAccount } from "./globalAccount";

export type BuyResult = {
    token_amount: bigint;
    sol_amount: bigint;
};

export type SellResult = {
    token_amount: bigint;
    sol_amount: bigint;
};

export class AMM {
    constructor(
        public virtualSolReserves: bigint,
        public virtualTokenReserves: bigint,
        public realSolReserves: bigint,
        public realTokenReserves: bigint,
        public initialVirtualTokenReserves: bigint
    ) {}

    static fromGlobalAccount(global: GlobalAccount): AMM {
        return new AMM(
            global.initialVirtualSolReserves,
            global.initialVirtualTokenReserves,
            0n,
            global.initialRealTokenReserves,
            global.initialVirtualTokenReserves
        );
    }

    static fromBondingCurveAccount(bonding_curve: BondingCurveAccount, initialVirtualTokenReserves: bigint): AMM {
        return new AMM(
            bonding_curve.virtualSolReserves,
            bonding_curve.virtualTokenReserves,
            bonding_curve.realSolReserves,
            bonding_curve.realTokenReserves,
            initialVirtualTokenReserves
        );
    }

    getBuyPrice(tokens: bigint): bigint {
        const product_of_reserves = this.virtualSolReserves * this.virtualTokenReserves;
        const new_virtual_token_reserves = this.virtualTokenReserves - tokens;
        const new_virtual_sol_reserves = product_of_reserves / new_virtual_token_reserves + 1n;
        const amount_needed = new_virtual_sol_reserves > this.virtualSolReserves ? new_virtual_sol_reserves - this.virtualSolReserves : 0n;
        return amount_needed > 0n ? amount_needed : 0n;
    }

    applyBuy(token_amount: bigint): BuyResult {
        const final_token_amount = token_amount > this.realTokenReserves ? this.realTokenReserves : token_amount;
        const sol_amount = this.getBuyPrice(final_token_amount);

        this.virtualTokenReserves = this.virtualTokenReserves - final_token_amount;
        this.realTokenReserves = this.realTokenReserves - final_token_amount;

        this.virtualSolReserves = this.virtualSolReserves + sol_amount;
        this.realSolReserves = this.realSolReserves + sol_amount;

        return {
            token_amount: final_token_amount,
            sol_amount: sol_amount
        }
    }

    applySell(token_amount: bigint): SellResult {
        this.virtualTokenReserves = this.virtualTokenReserves + token_amount;
        this.realTokenReserves = this.realTokenReserves + token_amount;

        const sell_price = this.getSellPrice(token_amount);

        this.virtualSolReserves = this.virtualSolReserves - sell_price;
        this.realSolReserves = this.realSolReserves - sell_price;

        return {
            token_amount: token_amount,
            sol_amount: sell_price
        }
    }

    getSellPrice(tokens: bigint): bigint {
        const scaling_factor = this.initialVirtualTokenReserves;
        const token_sell_proportion = (tokens * scaling_factor) / this.virtualTokenReserves;
        const sol_received = (this.virtualSolReserves * token_sell_proportion) / scaling_factor;
        return sol_received < this.realSolReserves ? sol_received : this.realSolReserves;
    }
}