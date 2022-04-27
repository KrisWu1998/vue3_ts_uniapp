import { IUserInfo } from './composables/userInfo';
import { IMoneyList, TbaseCoverUrl } from './composables/money-list';

export interface ShopSteupData {
  userInfo: IUserInfo,
  moneyList: IMoneyList,
  baseCoverUrl: TbaseCoverUrl
}