import{a4 as h,w as f,o as g,c as d}from"./index-D5ALquCz.js";const b=h({__name:"D1",props:{input:{}},emits:["onFinished"],setup(a,{emit:u}){const s=a,l=u,o=[["one","1"],["two","2"],["three","3"],["four","4"],["five","5"],["six","6"],["seven","7"],["eight","8"],["nine","9"]],m=()=>{if(s.input){const c=s.input.concat().map(n=>{const e=n.replace(/\D/g,"").split("");return e.length>0?+(e[0]+e[e.length-1]):0}).reduce((n,e)=>n+e,0),i=s.input.concat().map(n=>{const e=[];for(let t=0;t<n.length;t++){const p=n.charAt(t);if(p>="0"&&p<="9")e.push(n[t]);else for(let r=0;r<o.length;r++)if(n.substring(t).indexOf(o[r][0])===0){e.push(o[r][1]);break}}return e.length>0?+(e[0]+e[e.length-1]):0}).reduce((n,e)=>n+e,0);l("onFinished",c,i)}};return f(()=>s.input,()=>m(),{immediate:!0}),(c,i)=>(g(),d("span"))}});export{b as default};
