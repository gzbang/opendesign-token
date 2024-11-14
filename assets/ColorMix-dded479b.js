import{d as w,r as m,j as g,k as M,c,a as B,b as e,n as C,w as n,l as a,t as b,g as i,o as I,p as N,i as T,_ as H}from"./index-26d22bc9.js";function x(u){let d=u.replace("#","");return{r:+("0x"+d[0]+d[1]),g:+("0x"+d[2]+d[3]),b:+("0x"+d[4]+d[5])}}function k(u){const d=u.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?(\d|(\.[1-9]{1,2})))\)$/);function p(o){return("0"+parseInt(o).toString(16)).slice(-2)}return d?("#"+p(d[1])+p(d[2])+p(d[3])).toUpperCase():""}const y=u=>(N("data-v-7b1fbfd9"),u=u(),T(),u),h={class:"page-demo"},D=y(()=>e("h2",null,"Color Mix",-1)),G={class:"mix-section"},R={class:"color-item"},A=y(()=>e("div",{class:"name"},"Color 1",-1)),P={class:"value"},j={class:"value"},z={class:"color-input"},E={class:"chanel"},q={class:"chanel"},F={class:"chanel"},J={class:"chanel"},K={class:"color-percent"},L={class:"color-item"},O=y(()=>e("div",{class:"name"},"Color 2",-1)),Q={class:"value"},W={class:"value"},X={class:"color-input"},Y={class:"chanel"},Z={class:"chanel"},ll={class:"chanel"},el={class:"chanel"},tl={class:"color-percent"},ol={class:"color-item"},sl=y(()=>e("div",{class:"name"},"混合颜色",-1)),nl={class:"value"},al={class:"value"},dl=w({__name:"ColorMix",setup(u){document.title="Design Token -- Color Mix";const d=m("#fff");g(()=>d.value,r=>{console.log(r);const l=x(r);o.r=l.r,o.g=l.g,o.b=l.b});const p=m("#4587c4");g(()=>p.value,r=>{console.log(r);const l=x(r);s.r=l.r,s.g=l.g,s.b=l.b});const o=M({r:255,g:255,b:255,a:100,p:50}),_=c(()=>`rgba(${o.r}, ${o.g}, ${o.b}, ${o.a/100})`),V=m(k(_.value));g(()=>V.value,r=>{const l=x(r);o.r=l.r,o.g=l.g,o.b=l.b});const s=M({r:69,g:135,b:196,a:100,p:50}),U=c(()=>`rgba(${s.r}, ${s.g}, ${s.b}, ${s.a/100})`),f=m(k(U.value));g(()=>f.value,r=>{const l=x(r);s.r=l.r,s.g=l.g,s.b=l.b});const v=c(()=>({r:Math.ceil(o.r*o.p/100+s.r*s.p/100),g:Math.ceil(o.g*o.p/100+s.g*s.p/100),b:Math.ceil(o.b*o.p/100+s.b*s.p/100),a:Math.ceil(o.a*o.p/100+s.a*s.p/100)})),$=c(()=>`rgba(${v.value.r}, ${v.value.g}, ${v.value.b}, ${v.value.a/100})`),S=c(()=>k($.value));return(r,l)=>(I(),B("div",h,[D,e("div",G,[e("div",R,[A,e("div",{class:"color-box",style:C({backgroundColor:_.value})},[n(e("input",{type:"color","onUpdate:modelValue":l[0]||(l[0]=t=>d.value=t),class:"color-picker"},null,512),[[a,d.value]])],4),e("div",P,b(_.value),1),e("div",j,[n(e("input",{type:"text","onUpdate:modelValue":l[1]||(l[1]=t=>V.value=t),style:{width:"100px"}},null,512),[[a,V.value]])]),e("div",z,[e("div",E,[i(" R: "),n(e("input",{type:"range",min:"0",max:"255",class:"slider","onUpdate:modelValue":l[2]||(l[2]=t=>o.r=t)},null,512),[[a,o.r]]),n(e("input",{type:"text","onUpdate:modelValue":l[3]||(l[3]=t=>o.r=t)},null,512),[[a,o.r]])]),e("div",q,[i(" G: "),n(e("input",{type:"range",min:"0",max:"255",class:"slider","onUpdate:modelValue":l[4]||(l[4]=t=>o.g=t)},null,512),[[a,o.g]]),n(e("input",{type:"text","onUpdate:modelValue":l[5]||(l[5]=t=>o.g=t)},null,512),[[a,o.g]])]),e("div",F,[i(" B: "),n(e("input",{type:"range",min:"0",max:"255",class:"slider","onUpdate:modelValue":l[6]||(l[6]=t=>o.b=t)},null,512),[[a,o.b]]),n(e("input",{type:"text","onUpdate:modelValue":l[7]||(l[7]=t=>o.b=t)},null,512),[[a,o.b]])]),e("div",J,[i(" A: "),n(e("input",{type:"range",min:"0",max:"100",class:"slider","onUpdate:modelValue":l[8]||(l[8]=t=>o.a=t),disabled:""},null,512),[[a,o.a]]),n(e("input",{type:"text","onUpdate:modelValue":l[9]||(l[9]=t=>o.a=t),readonly:""},null,512),[[a,o.a]])])]),e("div",K,[e("span",null,[i("混合比："),n(e("input",{type:"range",min:"0",max:"100",class:"slider","onUpdate:modelValue":l[10]||(l[10]=t=>o.p=t)},null,512),[[a,o.p]]),i(),n(e("input",{type:"text","onUpdate:modelValue":l[11]||(l[11]=t=>o.p=t)},null,512),[[a,o.p]]),i("% ")])])]),e("div",L,[O,e("div",{class:"color-box",style:C({backgroundColor:U.value})},[n(e("input",{type:"color","onUpdate:modelValue":l[12]||(l[12]=t=>p.value=t),class:"color-picker"},null,512),[[a,p.value]])],4),e("div",Q,b(U.value),1),e("div",W,[n(e("input",{type:"text","onUpdate:modelValue":l[13]||(l[13]=t=>f.value=t),style:{width:"100px"}},null,512),[[a,f.value]])]),e("div",X,[e("div",Y,[i(" R: "),n(e("input",{type:"range",min:"0",max:"255",class:"slider","onUpdate:modelValue":l[14]||(l[14]=t=>s.r=t)},null,512),[[a,s.r]]),n(e("input",{type:"text","onUpdate:modelValue":l[15]||(l[15]=t=>s.r=t)},null,512),[[a,s.r]])]),e("div",Z,[i(" G: "),n(e("input",{type:"range",min:"0",max:"255",class:"slider","onUpdate:modelValue":l[16]||(l[16]=t=>s.g=t)},null,512),[[a,s.g]]),n(e("input",{type:"text","onUpdate:modelValue":l[17]||(l[17]=t=>s.g=t)},null,512),[[a,s.g]])]),e("div",ll,[i(" B: "),n(e("input",{type:"range",min:"0",max:"255",class:"slider","onUpdate:modelValue":l[18]||(l[18]=t=>s.b=t)},null,512),[[a,s.b]]),n(e("input",{type:"text","onUpdate:modelValue":l[19]||(l[19]=t=>s.b=t)},null,512),[[a,s.b]])]),e("div",el,[i(" A: "),n(e("input",{type:"range",min:"0",max:"100",class:"slider","onUpdate:modelValue":l[20]||(l[20]=t=>s.a=t),disabled:""},null,512),[[a,s.a]]),n(e("input",{type:"text","onUpdate:modelValue":l[21]||(l[21]=t=>s.a=t),readonly:""},null,512),[[a,s.a]])])]),e("div",tl,[e("span",null,[i("混合比："),n(e("input",{type:"range",min:"0",max:"100",class:"slider","onUpdate:modelValue":l[22]||(l[22]=t=>s.p=t)},null,512),[[a,s.p]]),i(),n(e("input",{type:"text","onUpdate:modelValue":l[23]||(l[23]=t=>s.p=t)},null,512),[[a,s.p]]),i(" % ")])])]),e("div",ol,[sl,e("div",{class:"color-box",style:C({backgroundColor:$.value})},null,4),e("div",nl,b($.value),1),e("div",al,b(S.value),1)])])]))}});const rl=H(dl,[["__scopeId","data-v-7b1fbfd9"]]);export{rl as default};