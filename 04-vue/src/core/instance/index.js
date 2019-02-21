import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // _init 方法在 src/core/instance/init.js 中定义
  this._init(options)
}

// new Vue(options) 的执行过程
// 执行 _init 方法，主要是 三点： 1. 合并options，2.挂载vm， 3.初始化各种东西；
// 挂载vm 的过程中，如果 options 中没有 render 方法，先根据 template 或者 el 生成 render，然后使用 $mount 方法
// 在 $mount 方法中，调用 mountComponent 方法，
// 在 mountComponent 方法中，使用 vm._render 方法生成 vnode 传入 vm._update 方法中，挂载 dom
//  vm._render 方法中是调用 vm.$createElement 方法生成 dom

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
