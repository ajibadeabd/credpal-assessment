import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './database/entity/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionFactory } from './database/factory';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private transactionFactory: TransactionFactory,
  ) {}

  async getTransactions(
    id: string,
    page: number,
    limit: number,
  ): Promise<Transaction[]> {
    return this.transactionFactory.getTransactions({
      where: { transactionId: id },
      skip: (page || 1 - 1) * limit || 10,
      take: limit || 10,
    });
  }

  async createTransaction(
    id: string,
    amount: number,
    transactionType: string,
  ): Promise<Transaction> {
    return this.transactionFactory.createTransaction(
      id,
      amount,
      transactionType,
    );
  }
}
