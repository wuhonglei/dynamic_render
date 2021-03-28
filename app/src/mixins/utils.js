import {get } from 'lodash-es';

export default {
    created() {
        console.info('mixin created');
    },
    methods: {
        sayHello(word) {
            console.info('hello', get({ name: 'wuhonglei' }, 'name'));
        }
    }
}