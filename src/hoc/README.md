# 前言

高阶组件本身不是组件，它是一个参数为组件，返回值也是一个组件的函数。

高阶作用用于`强化组件，复用逻辑，提升渲染性`能等作用。

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

[HOC思维导图](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b05e1efc4e84808a0bb84c9cac4ab4b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

`讨论:`

1. 高阶组件，它解决了什么问题？
2. 有几种高阶组件，它们优缺点是什么？
3. 如何写一个优秀高阶组件？
4. hoc怎么处理静态属性，跨层级ref等问题？
5. 高阶组件怎么控制渲染，隔离渲染？
6. 高阶组件怎么监控原始组件的状态？


## 几种包装强化组件的方式

1. mixins

    ```jsx
    const customMixin = {  /* 自定义 mixins */
      componentDidMount(){
        console.log( '------componentDidMount------' )
      },
      say(){
        console.log(this.state.name)
      }
    }

    function componentClassMixins(Component,mixin){ /* 继承 */
      for(let key in mixin){
        Component.prototype[key] = mixin[key]
      }
    }
    ```
2. extends 继承模式
3. 修饰器模式
