import { Transaction } from '../entity/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionFactory {
  private transactionRepository;

  constructor() {
    this.transactionRepository = Transaction;
  }

  async createTransaction(
    id: string,
    balance: number,
    transactionType: string,
  ): Promise<Transaction> {
    const newTransaction = this.transactionRepository.create({
      transactionId: id,
      balance,
      transactionType,
    });
    return this.transactionRepository.save(newTransaction);
  }

  async getTransactions(filterData): Promise<Transaction[]> {
    return this.transactionRepository.find(filterData);
  }
}
