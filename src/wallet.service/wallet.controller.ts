import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './database/entity/wallet.entity';
import { IWalletGenerationResponse } from './type';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async createWallet(): Promise<IWalletGenerationResponse> {
    const walletDetails = await this.walletService.createWallet();

    return {
      walletDetails,
      message: 'Wallet created successfully',
    };
  }
  @Post(':id/fund')
  async fundWallet(
    @Param('id') id: string,
    @Body('fundingAmount') fundingAmount: number,
  ): Promise<IWalletGenerationResponse> {
    const walletDetails = await this.walletService.fundWallet({
      fundingAmount,
      id,
    });
    return {
      walletDetails,
      message: 'Wallet funded successfully',
    };
  }

  @Post(':id/withdraw')
  async withdrawFromWallet(
    @Param('id') id: string,
    @Body('amount') amount: number,
  ): Promise<Wallet> {
    return this.walletService.withdrawFromWallet({ id, amount });
  }
}
