import{a4 as m,o as h,c as f}from"./index-Dw31knaQ.js";const l=m({__name:"D1",props:{input:{}},emits:["onFinished"],setup(a,{emit:i}){const p=a,u=i,e=[],o=[],s={};if(p.input){p.input.forEach(t=>{if(t.length<1)return;const n=t.split("   ").map(Number);e.push(n[0]),o.push(n[1]),s[n[1]]=(s[n[1]]||0)+1}),e.sort((t,n)=>t-n),o.sort((t,n)=>t-n);const r=e.map((t,n)=>Math.abs(t-o[n])).reduce((t,n)=>t+n),c=e.map(t=>t*(s[t]||0)).reduce((t,n)=>t+n);u("onFinished",r,c)}return(r,c)=>(h(),f("span"))}});export{l as default};
