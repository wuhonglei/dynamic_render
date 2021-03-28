<template>
	<h1 class="server_container-wrapper">
		{{num}}

		<i-banner>我是子组件</i-banner>
	</h1>
</template>

<script>
// TODO 仅用于模块依赖表示，动态渲染模板无用动态引用模块。
// 为了让引用生效，需要通过 mix 引入第三方模块
import { get } from 'lodash-es';

export default {
	// TODO 仅用于前端动态注册组件用
	components: {
		iBanner: 'iBanner'
	},

	// TODO 仅用于前端动态 mixin 用
	mixins: [
		'UtilsMix'
	],
	data() {
		return {
			num: 'two'
		}
	},
	mounted() {
		console.info(get({age: 18}, 'age'));
		this.sayHello('world');
	},
}
</script>

<style>
.server_container-wrapper {
	color: blue;
}
</style>