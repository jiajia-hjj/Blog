可以在父路由中的component中写

```js
component: {
    render: c => c("router-view")
}

```

，就可以正常显示出子路由的内容，不然会发现页面中该是子路由显示内容的地方是空白的。

```
const recom = {
    template: `<router-view></router-view>`
}
```



```js
{
    path: '/test',
    redirect: "/test/test1",
    component:{
        render: c => c("router-view")
    },
    children: [{
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/Test/Test1.vue'),
        meta: {
            need_login: true //需要登录
        }
    },
        {
            path: 'test2',
            name: 'Test2',
            component: () => import('@/views/Test/Test2.vue'),
            meta: {
                need_login: true //需要登录
            }
        },
    ]
}
```

