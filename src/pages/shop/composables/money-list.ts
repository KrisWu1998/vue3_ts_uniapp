import { reactive, ref, toRefs, watch, onMounted } from 'vue';

export default function () {
  const state = reactive({
    moneyList: [
      {
        cover: '/static/shop-goods.png',
        title: "顶配 iPhone Xs 256g超大电池",
        need_coin: 200, // 需要租币的量
        need_pay: 99, // 需要加多少r
        price: '12.8', // 原价
        total_num: '1440', // 已被兑换多少件
        tags: '包邮'
      },
      {
        cover: '/static/shop-goods.png',
        title: "顶配 iPhone Xs 256g超大电池",
        need_coin: 200, // 需要租币的量
        need_pay: 99, // 需要加多少r
        price: '12.8', // 原价
        total_num: '1440', // 已被兑换多少件
        tags: ''
      },
      {
        cover: '/static/shop-goods.png',
        title: "顶配 iPhone Xs 256g超大电池",
        need_coin: 200, // 需要租币的量
        need_pay: 99, // 需要加多少r
        price: '12.8', // 原价
        total_num: '1440', // 已被兑换多少件
        tags: '包邮'
      },
      {
        cover: '/static/shop-goods.png',
        title: "顶配 iPhone Xs 256g超大电池",
        need_coin: 200, // 需要租币的量
        need_pay: 99, // 需要加多少r
        price: '12.8', // 原价
        total_num: '1440', // 已被兑换多少件
        tags: '包邮'
      },
    ],
  });
  const baseCoverUrl = ref('/static/shop-goods.png')
  return {
    ...toRefs(state),
    baseCoverUrl
  }
}