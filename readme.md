## 说明
该项目展示了前端从服务端动态拿取内容进行渲染

TODO 未解决的问题：

1.如何允许访问 import、require 方式引入的内容
答：
方式1、将 import 的内容声明为全局变量，例如
```
import { get } from 'lodash-es'
window.get = get;
```

方式2、改变原有的 import 、require 使用方式
```
// before
import { get } from 'lodash-es'
export default{
    methods: {
        formateData() {
            return get(obj, 'a.b');
        }
    }
}

// after
import { get } from 'lodash-es'
export default{
    methods: {
        formateData() {
            return this.get(obj, 'a.b'); // this.get 将通过 mixin 方式混入该组件
        }
    }
}
```

## 项目运行
```
// app 前端目录
npm run server

// server 后端目录(可以使用 nodemon 实时监听)
node ./bin/www
```

## 效果
![运行效果](./demo.gif)