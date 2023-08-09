import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Currencies, ExchangeRateDto } from '..';

@Injectable()
export class ExchangeHelper {
  #EXCHANGE_URL: string;
  constructor(private readonly config: ConfigService) {
    this.#EXCHANGE_URL = this.config.get<string>('EXCHANGE_URL');
  }

  private async getExchangeRate(): Promise<ExchangeRateDto> {
    return await axios.get(this.#EXCHANGE_URL).then((res) => res.data.results);
  }

  async exchange(amount: number, currency: Currencies): Promise<number> {
    const exchangeRates = await this.getExchangeRate();
    const amountKgs = amount / exchangeRates[currency];
    return +amountKgs.toFixed(2);
  }
}
