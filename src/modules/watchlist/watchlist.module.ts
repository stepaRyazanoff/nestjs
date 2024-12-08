import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';

@Module({
  controllers: [WatchlistController],
  providers: [WatchlistService],
  imports: [SequelizeModule.forFeature([Watchlist])],
})
export class WatchlistModule {}
