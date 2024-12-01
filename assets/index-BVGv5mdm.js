import{m as w,o as a,c as f,a as o,p as F,Z as O,g as D,z as R,K as N,k as m,r as A,f as V,u as j,e as l,a4 as E,ag as H,a6 as c,a7 as n,ac as L,af as $,ab as k,ae as P,V as S,ah as T}from"./index-D5ALquCz.js";import{_ as U}from"./chevron-double-left-D9rbAqus.js";import{V as Y,s as q,a as G,b as K,e as W,d as Z}from"./VCard-DjjvSQwE.js";import{q as J,t as z,s as Q,v as X}from"./VDivider-Kt02eHz0.js";import{m as tt,u as et,a as I}from"./VOverlay-7B8KIJWr.js";import{f as at}from"./forwardRefs-DWGaNmQL.js";const nt={viewBox:"0 0 16 16",width:"1em",height:"1em"};function lt(t,e){return a(),f("svg",nt,e[0]||(e[0]=[o("path",{fill:"currentColor",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2"},null,-1)]))}const ot=w({name:"bi-exclamation-triangle-fill",render:lt}),st={viewBox:"0 0 16 16",width:"1em",height:"1em"};function rt(t,e){return a(),f("svg",st,e[0]||(e[0]=[o("g",{fill:"currentColor"},[o("path",{d:"M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809z"}),o("path",{"fill-rule":"evenodd",d:"M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1zm3.64 2l.25-1h7.22l.25 1z"})],-1)]))}const it=w({name:"bi-easel2-fill",render:rt}),ct={viewBox:"0 0 16 16",width:"1em",height:"1em"};function ut(t,e){return a(),f("svg",ct,e[0]||(e[0]=[o("path",{fill:"currentColor",d:"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73l3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356l-.83 4.73zm4.905-2.767l-3.686 1.894l.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575l-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957l-3.686-1.894a.5.5 0 0 0-.461 0z"},null,-1)]))}const dt=w({name:"bi-star",render:ut}),mt={viewBox:"0 0 16 16",width:"1em",height:"1em"};function ft(t,e){return a(),f("svg",mt,e[0]||(e[0]=[o("path",{fill:"currentColor",d:"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327l4.898.696c.441.062.612.636.282.95l-3.522 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"},null,-1)]))}const _t=w({name:"bi-star-fill",render:ft}),gt=F({id:String,text:String,...O(tt({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"VTooltip"),M=D()({name:"VTooltip",props:gt(),emits:{"update:modelValue":t=>!0},setup(t,e){let{slots:s}=e;const _=R(t,"modelValue"),{scopeId:B}=et(),u=N(),p=m(()=>t.id||`v-tooltip-${u}`),g=A(),h=m(()=>t.location.split(" ").length>1?t.location:t.location+" center"),y=m(()=>t.origin==="auto"||t.origin==="overlap"||t.origin.split(" ").length>1||t.location.split(" ").length>1?t.origin:t.origin+" center"),b=m(()=>t.transition?t.transition:_.value?"scale-transition":"fade-transition"),r=m(()=>V({"aria-describedby":p.value},t.activatorProps));return j(()=>{const v=I.filterProps(t);return l(I,V({ref:g,class:["v-tooltip",t.class],style:t.style,id:p.value},v,{modelValue:_.value,"onUpdate:modelValue":i=>_.value=i,transition:b.value,absolute:!0,location:h.value,origin:y.value,persistent:!0,role:"tooltip",activatorProps:r.value,_disableGlobalStack:!0},B),{activator:s.activator,default:function(){var C;for(var i=arguments.length,x=new Array(i),d=0;d<i;d++)x[d]=arguments[d];return((C=s.default)==null?void 0:C.call(s,...x))??t.text}})}),at({},g)}}),vt={class:"text-h4"},pt={class:"d-flex justify-space-between align-center"},kt=E({__name:"index",setup(t){const e=H(),s=A(e.params.year||""),_=m(()=>{if(s.value)return q.get(+s.value)});return(B,u)=>{const p=U,g=_t,h=dt,y=it,b=ot;return a(),c(X,null,{default:n(()=>[l(z,{class:"mb-3",to:"/",variant:"tonal"},{default:n(()=>[l(J,null,{default:n(()=>[l(p)]),_:1}),u[0]||(u[0]=L(" Back"))]),_:1}),o("h1",vt,"Year "+$(k(s)),1),l(Q,{class:"my-4"}),l(Y,null,{default:n(()=>[(a(!0),f(S,null,P(k(_),(r,v)=>(a(),c(G,{key:`day-${v}`,cols:12,md:3,sm:6},{default:n(()=>[l(K,{class:"h-100 d-flex justify-space-between flex-column",subtitle:r.title,variant:"tonal"},{title:n(()=>[o("div",pt,[o("span",null,"Day "+$(v+1),1),o("span",null,[r.partOne?(a(),c(g,{key:0,class:"ms-1 text-star"})):(a(),c(h,{key:1,class:"ms-1 text-disabled"})),r.partTwo?(a(),c(g,{key:2,class:"ms-1 text-star"})):(a(),c(h,{key:3,class:"ms-1 text-disabled"}))])])]),default:n(()=>[l(W,null,{default:n(()=>[r.isVisual?(a(),c(M,{key:0,text:"This task has a visual representation of the result."},{activator:n(({props:i})=>[l(y,V({class:"me-2",ref_for:!0},i),null,16)]),_:1})):T("",!0),r.warnings?(a(!0),f(S,{key:1},P(r.warnings,(i,x)=>(a(),c(M,{key:`warning-${x}`,text:i},{activator:n(({props:d})=>[l(b,V({class:"me-2 text-warning",ref_for:!0},d),null,16)]),_:2},1032,["text"]))),128)):T("",!0)]),_:2},1024),l(Z,{class:"d-flex justify-space-between"},{default:n(()=>[l(z,{to:`${k(s)}/${v+1}`},{default:n(()=>u[1]||(u[1]=[L("View")])),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["subtitle"])]),_:2},1024))),128))]),_:1})]),_:1})}}});export{kt as default};