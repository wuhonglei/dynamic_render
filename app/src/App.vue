<template>
	<div id="app">
		<aside class="sidebar-container">
			<button @click="useTemplate('1')">使用模板1</button>
			<button @click="useTemplate('2')">使用模板2</button>
		</aside>
		<main ref="content">

		</main>
	</div>
</template>

<script>

import Vue from 'vue';
import iBanner from './components/banner.vue';

import UtilsMix from './mixins/utils.js';

import {get} from 'lodash-es';
window.get = get;

export default {
	name: 'App',
	components: {
		iBanner,
	},
	data() {
		return {
			styleId: Date.now()
		}
	},
	methods: {
		async useTemplate(id) {
			if (this.component) {
				this.component.$destroy();
			}
			const res = await this.axios.get(`/template/${id}`);
			const content = res.data.data.content;
			this.destroyCode();
			this.renderCode(content);
		},
		destroyCode() {
			const $target = document.querySelector(`style[id="${this.styleId}"]`);
			if ($target) {
				$target.parentElement.removeChild($target);
			}

			if (this.component) {
				this.$refs.content.removeChild(this.component.$el);
				this.component.$destroy();
				this.component = null;
			}
		},
		renderCode(code) {
			this.splitCode(code);
			const parseStrToFunc = new Function(this.js)();

			parseStrToFunc.template = this.html;

      // TODO 可以根据模板中 components 名称动态注册需要的组件
      parseStrToFunc.components = {
        iBanner
      };

      // TODO 可以根据模板中 mixins 名称动态注册需要的组件 mix
      parseStrToFunc.mixins = [
        UtilsMix
      ];
      window.extend = Vue.extend;
			const Component = Vue.extend(parseStrToFunc);
			this.component = new Component().$mount();

			const style = document.createElement('style');
			style.type = 'text/css';
			style.id = this.styleId;
			style.innerHTML = this.css;
			document.getElementsByTagName('head')[0].appendChild(style);

			this.$refs.content.appendChild(this.component.$el);
		},
		getSource(source, type) {
			const regex = new RegExp(`<${type}[^>]*>`);
			let openingTag = source.match(regex);

			if (!openingTag) return '';
			else openingTag = openingTag[0];

			return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
		},
		splitCode(code) {
			const script = this.getSource(code, 'script').replace(/^([\s\S]*)export default/, 'return ');
			const style = this.getSource(code, 'style');
			const template = this.getSource(code, 'template');

			this.js = script;
			this.css = style;
			this.html = template;
		},
	},
}
</script>

<style>
body {
	padding: 0;
	margin: 0;
}

#app {
	display: flex;
	height: 100vh;
}

.sidebar-container {
	display: flex;
	flex-direction: column;

	padding: 20px;
}
</style>
