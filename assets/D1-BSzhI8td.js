import{a4 as h,w as f,o as d,c as l}from"./index-BbyR67Fl.js";const w=h({__name:"D1",props:{input:{}},emits:["onFinished"],setup(a,{emit:i}){const s=a,u=i,e=[],o=[],p={},m=()=>{if(s.input){s.input.forEach(t=>{if(t.length<1)return;const n=t.split("   ").map(Number);e.push(n[0]),o.push(n[1]),p[n[1]]=(p[n[1]]||0)+1}),e.sort((t,n)=>t-n),o.sort((t,n)=>t-n);const r=e.map((t,n)=>Math.abs(t-o[n])).reduce((t,n)=>t+n),c=e.map(t=>t*(p[t]||0)).reduce((t,n)=>t+n);u("onFinished",r,c)}};return f(()=>s.input,()=>m(),{immediate:!0}),(r,c)=>(d(),l("span"))}});export{w as default};