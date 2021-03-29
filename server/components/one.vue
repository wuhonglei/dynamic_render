<template>
	<div>
		<p>
			案例说明：
			1. 能够渲染 template、script、style 内容
			2. 能够调用 methods 中的方法
		</p>
		<h1 class="server_container-wrapper">
			{{num}}
			<button @click="increase()">增加</button>
		</h1>
	</div>
</template>

<script>

export default {
	data() {
		return {
			num: 1
		}
	},
	methods: {
		increase() {
			this.num++;
		}
	},
}
</script>

<style>
.server_container-wrapper {
	color: red;
}
</style>