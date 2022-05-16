### 封装uni.request请求，并挂在到全局

**创建util>api.js**

```js
// 封装get请求
const baseUrl = "http://localhost:8082"
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			method: options.method,
			data: options.data,
			url: baseUrl+options.url,
			success(res) {
				if(res.data.status !== 0) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					title: '获取数据失败'
				})
				reject(err)
			}
		})
	})
}
```

**在main.js中导入并挂载到全局**

```js
import { myRequest } from './util/api.js'
Vue.prototype.$myRequest = myReques
```

**使用**		

````
methods: {
  async getSwipers () {
    const res = await this.$myRequest({
      method: 'GET',
      url: '/api/getlunbo'
    })
    this.swipers = res.data.message
  }
}
````

