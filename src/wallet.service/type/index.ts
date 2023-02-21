import { Wallet } from '../database/entity/wallet.entity';

export interface IFundingRequest {
  id: string;
  fundingAmount: number;
}

export interface IWithdrawRequest {
  id: string;
  amount: number;
}

export interface IWalletGenerationResponse {
  walletDetails: Wallet;
  message: string;
}
