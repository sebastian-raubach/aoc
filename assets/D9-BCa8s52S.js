import{a4 as u,w as a,o as l,c as h}from"./index-TLJ236SR.js";const d=u({__name:"D9",props:{input:{}},emits:["onFinished"],setup(c,{emit:p}){const s=c,r=p,o=e=>{const n=[];for(let t=1;t<e.length;t++)n.push(e[t]-e[t-1]);if(n.every(t=>t===0))return[0,0];{const t=o(n);return[n[0]-t[0],n[n.length-1]+t[1]]}},m=()=>{if(s.input){const e=[0,0];s.input.forEach(n=>{const t=n.split(" ").map(Number),i=o(t);e[0]+=t[0]-i[0],e[1]+=t[t.length-1]+i[1]}),r("onFinished",e[1],e[0])}};return a(()=>s.input,()=>m(),{immediate:!0}),(e,n)=>(l(),h("span"))}});export{d as default};