/* @flow */

import config from '../config'
import VNode, { createEmptyVNode } from './vnode'
import { createComponent } from './create-component'
import { traverse } from '../observer/traverse'

import {
  warn,
  // 不是 undefined 或 null
  isDef,
  // 是 undefined 或 null 
  isUndef,
  //  true
  isTrue,
  // return obj !== null && typeof obj === 'object'
  isObject,
  // 是原始数据类型（number， string， boolean， symbol）
  isPrimitive,
  // 
  resolveAsset
} from '../util/index'

import {
  normalizeChildren,
  simpleNormalizeChildren
} from './helpers/index'

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
/**
 * 
 * @param {*} context 
 * @param {*} tag 
 * @param {*} data 
 * @param {*} children 
 * @param {*} normalizationType 表示子节点规范的类型。类型不同，规范的方法就不一样，主要是参考 render 函数是编译生成的还是用户手写的。
 * @param {Boolean} alwaysNormalize  true 或 false, 如果为 true，则是用户手写的 render 函数；如果为 false，则是模板编译过来的
 */
// createElement 实际上是对 _createElement 方法的封装，允许传入的参数更加灵活
export function createElement ( context, tag, data, children, normalizationType, alwaysNormalize ){
  // 如果 render 函数的第二个参数是数组或是基本数据类型，第二至第四个参数往后挪一位，第二位设置为undefined
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

/**
 * 
 * @param {Component} context 表示 VNode 的上下文环境
 * @param {String/Component} tag 表示标签
 * @param {VNode} data 表示VNode的数据
 * @param {*} children VNode 的子节点
 * @param {*} normalizationType 表示子节点规范的类型，类型不同规范的方法也不一样
 */
export function _createElement (context, tag,  data , children, normalizationType){
  // 如果data 带有 __ob__ 属性，且不是在生产环境，就提示错误信息；并返回空的VNode
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    return createEmptyVNode()
  }
  // 如果 data 有 is 属性，那就用 is 属性代替 tag，可能是动态组件的 is 属性
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }

  // 如果没有传入标签名，就返回空的VNode
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }

  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn('Avoid using non-primitive value as key, use string/number value instead.',context)
    }
  }

  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  // normalizationType 表示子节点规范的类型。类型不同，规范的方法就不一样，主要是参考 render 函数是编译生成的还是用户手写的。
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  // 规范化 children 之后，创建 VNode 实例
  let vnode, ns
  // 如果 tag 是 string 类型，则继续判断是否是内置的节点，如果是，则直接创建普通的 VNode，如果是已注册的组件名，则通过 createComponent 创建一个组件类型的 VNode， 否则创建一个未知标签类型的 Vnode
  // 如果 tag 是一个 Component 类型， 则直接调用 createComponent 创建一个组件类型的节点
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode( tag, data, children, undefined, undefined, context )
    }
  } else {
    // 此时 tag 是 component（Ctor）
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined
    force = true
  }
  if (isDef(vnode.children)) {
    for (let i = 0, l = vnode.children.length; i < l; i++) {
      const child = vnode.children[i]
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force)
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style)
  }
  if (isObject(data.class)) {
    traverse(data.class)
  }
}
