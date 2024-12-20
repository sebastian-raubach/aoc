var w={},o={},p={};/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 */let v=class h{constructor(t,e,r){if(typeof t!="function")throw new Error("Heap constructor expects a compare function");this._compare=t,this._nodes=Array.isArray(e)?e:[],this._leaf=r||null}toArray(){return Array.from(this._nodes)}_hasLeftChild(t){return t*2+1<this.size()}_hasRightChild(t){return t*2+2<this.size()}_compareAt(t,e){return this._compare(this._nodes[t],this._nodes[e])}_swap(t,e){const r=this._nodes[t];this._nodes[t]=this._nodes[e],this._nodes[e]=r}_shouldSwap(t,e){return t<0||t>=this.size()||e<0||e>=this.size()?!1:this._compareAt(t,e)>0}_compareChildrenOf(t){if(!this._hasLeftChild(t)&&!this._hasRightChild(t))return-1;const e=t*2+1,r=t*2+2;return this._hasLeftChild(t)?this._hasRightChild(t)&&this._compareAt(e,r)>0?r:e:r}_compareChildrenBefore(t,e,r){return this._compareAt(r,e)<=0&&r<t?r:e}_heapifyUp(t){let e=t,r=Math.floor((e-1)/2);for(;this._shouldSwap(r,e);)this._swap(r,e),e=r,r=Math.floor((e-1)/2)}_heapifyDown(t){let e=t,r=this._compareChildrenOf(e);for(;this._shouldSwap(e,r);)this._swap(e,r),e=r,r=this._compareChildrenOf(e)}_heapifyDownUntil(t){let e=0,r=1,i=2,n;for(;r<t;)n=this._compareChildrenBefore(t,r,i),this._shouldSwap(e,n)&&this._swap(e,n),e=n,r=e*2+1,i=e*2+2}insert(t){return this._nodes.push(t),this._heapifyUp(this.size()-1),(this._leaf===null||this._compare(t,this._leaf)>0)&&(this._leaf=t),this}push(t){return this.insert(t)}extractRoot(){if(this.isEmpty())return null;const t=this.root();return this._nodes[0]=this._nodes[this.size()-1],this._nodes.pop(),this._heapifyDown(0),t===this._leaf&&(this._leaf=this.root()),t}pop(){return this.extractRoot()}sort(){for(let t=this.size()-1;t>0;t-=1)this._swap(0,t),this._heapifyDownUntil(t);return this._nodes}fix(){for(let t=Math.floor(this.size()/2)-1;t>=0;t-=1)this._heapifyDown(t);for(let t=Math.floor(this.size()/2);t<this.size();t+=1){const e=this._nodes[t];(this._leaf===null||this._compare(e,this._leaf)>0)&&(this._leaf=e)}return this}isValid(){const t=e=>{let r=!0,i=!0;if(this._hasLeftChild(e)){const n=e*2+1;if(this._compareAt(e,n)>0)return!1;r=t(n)}if(this._hasRightChild(e)){const n=e*2+2;if(this._compareAt(e,n)>0)return!1;i=t(n)}return r&&i};return t(0)}clone(){return new h(this._compare,this._nodes.slice(),this._leaf)}root(){return this.isEmpty()?null:this._nodes[0]}top(){return this.root()}leaf(){return this._leaf}size(){return this._nodes.length}isEmpty(){return this.size()===0}clear(){this._nodes=[],this._leaf=null}[Symbol.iterator](){let t=this.size();return{next:()=>(t-=1,{value:this.pop(),done:t===-1})}}static heapify(t,e){if(!Array.isArray(t))throw new Error("Heap.heapify expects an array of values");if(typeof e!="function")throw new Error("Heap.heapify expects a compare function");return new h(e,t).fix()}static isHeapified(t,e){return new h(e,t).isValid()}};p.Heap=v;var x={};/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 */const{Heap:c}=p,f=s=>(t,e)=>{const r=typeof s=="function"?s(t):t,i=typeof s=="function"?s(e):e;return r<=i?-1:1};let Q=class a{constructor(t,e){this._getCompareValue=t,this._heap=e||new c(f(t))}toArray(){return Array.from(this._heap._nodes)}insert(t){return this._heap.insert(t)}push(t){return this.insert(t)}extractRoot(){return this._heap.extractRoot()}pop(){return this.extractRoot()}sort(){return this._heap.sort()}fix(){return this._heap.fix()}isValid(){return this._heap.isValid()}root(){return this._heap.root()}top(){return this.root()}leaf(){return this._heap.leaf()}size(){return this._heap.size()}isEmpty(){return this._heap.isEmpty()}clear(){this._heap.clear()}clone(){return new a(this._getCompareValue,this._heap.clone())}[Symbol.iterator](){let t=this.size();return{next:()=>(t-=1,{value:this.pop(),done:t===-1})}}static heapify(t,e){if(!Array.isArray(t))throw new Error("MinHeap.heapify expects an array");const r=new c(f(e),t);return new a(e,r).fix()}static isHeapified(t,e){const r=new c(f(e),t);return new a(e,r).isValid()}};x.MinHeap=Q;var m={};/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 */const{Heap:l}=p,_=s=>(t,e)=>{const r=typeof s=="function"?s(t):t,i=typeof s=="function"?s(e):e;return r<i?1:-1};let P=class u{constructor(t,e){this._getCompareValue=t,this._heap=e||new l(_(t))}insert(t){return this._heap.insert(t)}push(t){return this.insert(t)}extractRoot(){return this._heap.extractRoot()}pop(){return this.extractRoot()}sort(){return this._heap.sort()}toArray(){return Array.from(this._heap._nodes)}fix(){return this._heap.fix()}isValid(){return this._heap.isValid()}root(){return this._heap.root()}top(){return this.root()}leaf(){return this._heap.leaf()}size(){return this._heap.size()}isEmpty(){return this._heap.isEmpty()}clear(){this._heap.clear()}clone(){return new u(this._getCompareValue,this._heap.clone())}[Symbol.iterator](){let t=this.size();return{next:()=>(t-=1,{value:this.pop(),done:t===-1})}}static heapify(t,e){if(!Array.isArray(t))throw new Error("MaxHeap.heapify expects an array");const r=new l(_(e),t);return new u(e,r).fix()}static isHeapified(t,e){const r=new l(_(e),t);return new u(e,r).isValid()}};m.MaxHeap=P;const{Heap:q}=p,{MinHeap:R}=x,{MaxHeap:$}=m;o.Heap=q;o.MinHeap=R;o.MaxHeap=$;/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */const{Heap:b,MinHeap:y}=o,S=s=>(t,e)=>{const r=typeof s=="function"?s(t):t,i=typeof s=="function"?s(e):e;return r<=i?-1:1};let k=class H{constructor(t,e){if(t&&typeof t!="function")throw new Error("MinPriorityQueue constructor requires a callback for object values");this._heap=e||new y(t)}front(){return this._heap.root()}back(){return this._heap.leaf()}enqueue(t){return this._heap.insert(t)}push(t){return this.enqueue(t)}dequeue(){return this._heap.extractRoot()}pop(){return this.dequeue()}remove(t){if(typeof t!="function")throw new Error("MinPriorityQueue remove expects a callback");const e=[],r=[];for(;!this.isEmpty();){const i=this.pop();t(i)?e.push(i):r.push(i)}return r.forEach(i=>this.push(i)),e}size(){return this._heap.size()}isEmpty(){return this._heap.isEmpty()}clear(){this._heap.clear()}toArray(){return this._heap.clone().sort().reverse()}[Symbol.iterator](){let t=this.size();return{next:()=>(t-=1,{value:this.pop(),done:t===-1})}}static fromArray(t,e){const r=new b(S(e),t);return new H(e,new y(e,r).fix())}};w.MinPriorityQueue=k;var M={};/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */const{Heap:D,MaxHeap:d}=o,L=s=>(t,e)=>{const r=typeof s=="function"?s(t):t,i=typeof s=="function"?s(e):e;return r<i?1:-1};let U=class z{constructor(t,e){if(t&&typeof t!="function")throw new Error("MaxPriorityQueue constructor requires a callback for object values");this._heap=e||new d(t)}front(){return this._heap.root()}back(){return this._heap.leaf()}enqueue(t){return this._heap.insert(t)}push(t){return this.enqueue(t)}dequeue(){return this._heap.extractRoot()}pop(){return this.dequeue()}remove(t){if(typeof t!="function")throw new Error("MaxPriorityQueue remove expects a callback");const e=[],r=[];for(;!this.isEmpty();){const i=this.pop();t(i)?e.push(i):r.push(i)}return r.forEach(i=>this.push(i)),e}size(){return this._heap.size()}isEmpty(){return this._heap.isEmpty()}clear(){this._heap.clear()}toArray(){return this._heap.clone().sort().reverse()}[Symbol.iterator](){let t=this.size();return{next:()=>(t-=1,{value:this.pop(),done:t===-1})}}static fromArray(t,e){const r=new D(L(e),t);return new z(e,new d(e,r).fix())}};M.MaxPriorityQueue=U;var E={};/**
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */const{Heap:O}=o;let B=class A{constructor(t,e){if(typeof t!="function")throw new Error("PriorityQueue constructor expects a compare function");this._heap=new O(t,e),e&&this._heap.fix()}front(){return this._heap.root()}back(){return this._heap.leaf()}enqueue(t){return this._heap.insert(t)}push(t){return this.enqueue(t)}dequeue(){return this._heap.extractRoot()}pop(){return this.dequeue()}remove(t){if(typeof t!="function")throw new Error("PriorityQueue remove expects a callback");const e=[],r=[];for(;!this.isEmpty();){const i=this.pop();t(i)?e.push(i):r.push(i)}return r.forEach(i=>this.push(i)),e}size(){return this._heap.size()}isEmpty(){return this._heap.isEmpty()}clear(){this._heap.clear()}toArray(){return this._heap.clone().sort().reverse()}[Symbol.iterator](){let t=this.size();return{next:()=>(t-=1,{value:this.pop(),done:t===-1})}}static fromArray(t,e){return new A(e,t)}};E.PriorityQueue=B;const{MinPriorityQueue:C}=w,{MaxPriorityQueue:j}=M,{PriorityQueue:F}=E;var G={MinPriorityQueue:C,MaxPriorityQueue:j,PriorityQueue:F};export{G as p};