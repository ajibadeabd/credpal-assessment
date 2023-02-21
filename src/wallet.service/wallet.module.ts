import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { TransactionService } from '../transaction.service/transaction.service';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './database/entity/wallet.entity';
import { Transaction } from '../transaction.service/database/entity/Transaction.entity';
import { TransactionFactory } from '../transaction.service/database/factory';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, Transaction])],
  controllers: [WalletController],
  providers: [TransactionFactory, WalletService, TransactionService],
})
export class WalletModule {}
