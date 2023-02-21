import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ITransactionGenerationResponse } from './type';

@Controller('wallet')
export class TransactionController {
  constructor(private readonly walletService: TransactionService) {}
  @Get(':id/transactions/:page/:limit')
  async getTransactions(
    @Param('id') id: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<ITransactionGenerationResponse> {
    const transactions = await this.walletService.getTransactions(
      id,
      page,
      limit,
    );
    return {
      transactions,
      message: 'Transaction fetched successfully',
    };
  }
}
