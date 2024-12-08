import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchListRepository: typeof Watchlist,
  ) {}

  async createAsset(user, dto) {
    const watchlist = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId,
    };

    await this.watchListRepository.create(watchlist);

    return watchlist;
  }
}
