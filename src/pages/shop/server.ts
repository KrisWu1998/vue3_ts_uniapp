import data from '@/servers/shopListData.js';

export const getShopData = (): Promise<any> =>{
  return Promise.resolve(data)
}