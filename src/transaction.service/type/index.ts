import { Transaction } from '../database/entity/transaction.entity';

export interface ITransactionGenerationResponse {
  transactions: Transaction[];
  message: string;
}
