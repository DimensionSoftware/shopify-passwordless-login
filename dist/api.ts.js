var n,t=(n=require("node-fetch"))&&"object"==typeof n&&"default"in n?n.default:n,e=n=>encodeURIComponent(n).replace(/[!'()*]/g,n=>`%${n.charCodeAt(0).toString(16).toUpperCase()}`);function r(n,t){return t.encode?t.strict?e(n):encodeURIComponent(n):n}function o(){var n=["a","e","i","o","u"],t=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];return t[Math.floor(Math.random()*t.length)]+n[Math.floor(Math.random()*n.length)]}exports.login=function(n){return{social:function(t){return"https://"+n+".myshopify.com/apps/dimensionauth/"+t+"/1?native=1"},passwordless:function(e){try{return Promise.resolve(t("https://"+n+".myshopify.com/apps/dimensionauth/passwordless?"+((n,t)=>{if(!n)return"";const e=function(n){switch(n.arrayFormat){case"index":return t=>(e,o)=>{const i=e.length;return void 0===o?e:null===o?[...e,[r(t,n),"[",i,"]"].join("")]:[...e,[r(t,n),"[",r(i,n),"]=",r(o,n)].join("")]};case"bracket":return t=>(e,o)=>void 0===o?e:null===o?[...e,[r(t,n),"[]"].join("")]:[...e,[r(t,n),"[]=",r(o,n)].join("")];case"comma":return t=>(e,o,i)=>null==o||0===o.length?e:0===i?[[r(t,n),"=",r(o,n)].join("")]:[[e,r(o,n)].join(",")];default:return t=>(e,o)=>void 0===o?e:null===o?[...e,r(t,n)]:[...e,[r(t,n),"=",r(o,n)].join("")]}}(t=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},t)),o=Object.keys(n);return!1!==t.sort&&o.sort(t.sort),o.map(o=>{const i=n[o];return void 0===i?"":null===i?r(o,t):Array.isArray(i)?i.reduce(e(o),[]).join("&"):r(o,t)+"="+r(i,t)}).filter(n=>n.length>0).join("&")})({email:e.email,native:1,code:o()+" &nbsp; "+o()+" &nbsp; "+Math.floor(10*Math.random())}))).then(function(n){return n.json()})}catch(n){return Promise.reject(n)}}}};
//# sourceMappingURL=api.ts.js.map
