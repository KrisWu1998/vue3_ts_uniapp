import { reactive, toRefs } from 'vue';

export default function () {
  const state = reactive({
    userInfo: {
      nickName: '呵呵哒',
      avatar: 'https://tfs.alipayobjects.com/images/partner/TB1orDWbRhDDuNjm2GmXXXb2pXa'
    },
  })
  return {
    ...toRefs(state)
  }
}