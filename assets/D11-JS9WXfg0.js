import{a4 as w,w as y,o as d,c as g}from"./index-mNFiNGF7.js";const E=w({__name:"D11",props:{input:{}},emits:["onFinished"],setup(p,{emit:h}){const a=p,u=h,m=s=>{const n={rows:[],cols:[]};for(let t=0;t<s.length;t++)s[t].every(e=>e===".")&&n.rows.push(t);for(let t=0;t<s[0].length;t++){let e=!0;for(let r=0;r<s.length;r++)if(s[r][t]!=="."){e=!1;break}e&&n.cols.push(t)}return n},f=(s,n,t)=>{const e=JSON.parse(JSON.stringify(s));e.forEach(o=>{const l=n.cols.filter(c=>c<o.x).length,i=n.rows.filter(c=>c<o.y).length;o.x+=l*t,o.y+=i*t});let r=0;for(let o=0;o<e.length;o++)for(let l=o+1;l<e.length;l++)r+=Math.abs(e[o].x-e[l].x)+Math.abs(e[o].y-e[l].y);return r},x=()=>{if(a.input){const s=a.input.map(o=>o.split("")),n=[];s.forEach((o,l)=>{o.forEach((i,c)=>{i==="#"&&n.push({x:c,y:l})})});const t=m(s),e=f(n,t,1),r=f(n,t,999999);u("onFinished",e,r)}};return y(()=>a.input,()=>x(),{immediate:!0}),(s,n)=>(d(),g("span"))}});export{E as default};
