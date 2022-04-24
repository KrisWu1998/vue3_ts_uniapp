<template>
  <view class="wrap">
    <Header />
    <Content />
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Header from './components/header';
import Content from './components/content';
export default defineComponent({
  components: { 
    Header,
    Content
  },
	setup () {
		const methods = reactive({
			handleClick () {
				
			}
		})
		return {
			...methods
		}
	}
	
})
</script>

<style lang="less" scoped>
.wrap{
  width: 100%;
  min-height: 100vh;
}


</style>
