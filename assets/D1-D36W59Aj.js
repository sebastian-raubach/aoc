import{a4 as h,o as m,c as f}from"./index-7b6stP1L.js";const d=h({__name:"D1",props:{input:{}},emits:["onFinished"],setup(a,{emit:u}){const r=a,l=u,o=[["one","1"],["two","2"],["three","3"],["four","4"],["five","5"],["six","6"],["seven","7"],["eight","8"],["nine","9"]];if(r.input){const c=r.input.concat().map(n=>{const e=n.replace(/\D/g,"").split("");return e.length>0?+(e[0]+e[e.length-1]):0}).reduce((n,e)=>n+e,0),p=r.input.concat().map(n=>{const e=[];for(let t=0;t<n.length;t++){const i=n.charAt(t);if(i>="0"&&i<="9")e.push(n[t]);else for(let s=0;s<o.length;s++)if(n.substring(t).indexOf(o[s][0])===0){e.push(o[s][1]);break}}return e.length>0?+(e[0]+e[e.length-1]):0}).reduce((n,e)=>n+e,0);l("onFinished",c,p)}return(c,p)=>(m(),f("span"))}});export{d as default};