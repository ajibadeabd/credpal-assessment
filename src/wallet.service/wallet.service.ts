import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './database/entity/wallet.entity';
import { Repository, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IFundingRequest, IWithdrawRequest } from './type';
import { TransactionService } from '../transaction.service/transaction.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private transactionService: TransactionService,
  ) {}

  private async queryRunner(): Promise<any> {
    const queryRunner =
      await this.walletRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }
  private async getOneTransaction(Model, filter): Promise<any> {
    return Model.findOne(Wallet, {
      where: filter,
      lock: { mode: 'pessimistic_write' },
    });
  }

  async createWallet(): Promise<Wallet> {
    return this.walletRepository.save({
      balance: 0,
      id: uuidv4(),
    });
  }
  async fundWallet(body: IFundingRequest): Promise<Wallet> {
    const queryRunner: QueryRunner = await this.queryRunner();
    try {
      let wallet = await this.getOneTransaction(queryRunner.manager, {
        id: body.id,
      });
      if (!wallet) {
        throw new HttpException('wallet does not exist', 400);
      }
      wallet.balance += body.fundingAmount;
      wallet = await queryRunner.manager.save(wallet);
      await queryRunner.commitTransaction();
      return wallet;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      await this.transactionService.createTransaction(
        body.id,
        body.fundingAmount,
        'credit',
      );
    }
  }

  async withdrawFromWallet(body: IWithdrawRequest): Promise<Wallet> {
    const queryRunner = await this.queryRunner();
    try {
      let wallet = await this.getOneTransaction(queryRunner.manager, {
        id: body.id,
      });
      if (!wallet) throw new HttpException('Wallet does not exist', 400);
      if (wallet.balance < body.amount)
        throw new HttpException('Insufficient balance', 400);
      wallet.balance -= body.amount;
      wallet = await queryRunner.manager.save(wallet);
      await queryRunner.commitTransaction();
      return wallet;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      await this.transactionService.createTransaction(
        body.id,
        body.amount,
        'debit',
      );
    }
  }
}
