import{a as le,d as me}from"./chunk-XZ4HCJWZ.js";import{a as de}from"./chunk-LZZYUYSO.js";import"./chunk-YZQKBSXU.js";import"./chunk-6DGE2S5E.js";import{a as Q}from"./chunk-2KO7AHLC.js";import{a as ce,b as ae}from"./chunk-GCSUWZMT.js";import"./chunk-RXT5VOHD.js";import{f as ue,g as pe}from"./chunk-3GMZJHT4.js";import"./chunk-AZDBKI4P.js";import"./chunk-FL7BS3BX.js";import"./chunk-Q5VVKPDT.js";import"./chunk-OFQES6HH.js";import{a as ne,d as re,e as se}from"./chunk-WKOMYM5O.js";import{d as L,g as U,k as K,w as q}from"./chunk-6GAZF5ON.js";import"./chunk-JS4TD4O2.js";import"./chunk-H5LORQQP.js";import"./chunk-U5DI5JIS.js";import{a as te,b as oe,c as ie}from"./chunk-F45NW6BW.js";import"./chunk-IK75FPLE.js";import"./chunk-BH5DKTT6.js";import"./chunk-NTMY3SYH.js";import{a as X,b as Y,c as Z,d as $,e as ee}from"./chunk-PRNJDQ6J.js";import"./chunk-ESTIS766.js";import"./chunk-F5ALC7SR.js";import"./chunk-67WDHJZZ.js";import{a as J}from"./chunk-YN3PI5LS.js";import"./chunk-6E3GIBKW.js";import"./chunk-L7ZCTNHS.js";import"./chunk-NGTZY5Y2.js";import{$b as A,Aa as E,Ac as h,Bc as j,Cc as R,Fc as O,Gc as H,Hc as P,Jc as V,Kc as v,Qb as _,Ua as W,a as N,ac as I,b as T,bc as M,cc as l,d as S,dc as m,dd as G,ec as B,g as z,h as F,j as y,oc as D,ub as f,wa as w}from"./chunk-PHCOYEBV.js";import"./chunk-VB56BUGO.js";var he={url:"",deserializer:c=>JSON.parse(c.data),serializer:c=>JSON.stringify(c)},be="WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }",g=class c extends F{constructor(e,o){if(super(),this._socket=null,e instanceof S)this.destination=o,this.source=e;else{let t=this._config=Object.assign({},he);if(this._output=new z,typeof e=="string")t.url=e;else for(let r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);if(!t.WebSocketCtor&&WebSocket)t.WebSocketCtor=WebSocket;else if(!t.WebSocketCtor)throw new Error("no WebSocket constructor can be found");this.destination=new y}}lift(e){let o=new c(this._config,this.destination);return o.operator=e,o.source=this,o}_resetState(){this._socket=null,this.source||(this.destination=new y),this._output=new z}multiplex(e,o,t){let r=this;return new S(i=>{try{r.next(e())}catch(a){i.error(a)}let n=r.subscribe({next:a=>{try{t(a)&&i.next(a)}catch(s){i.error(s)}},error:a=>i.error(a),complete:()=>i.complete()});return()=>{try{r.next(o())}catch(a){i.error(a)}n.unsubscribe()}})}_connectSocket(){let{WebSocketCtor:e,protocol:o,url:t,binaryType:r}=this._config,i=this._output,n=null;try{n=o?new e(t,o):new e(t),this._socket=n,r&&(this._socket.binaryType=r)}catch(s){i.error(s);return}let a=new N(()=>{this._socket=null,n&&n.readyState===1&&n.close()});n.onopen=s=>{let{_socket:p}=this;if(!p){n.close(),this._resetState();return}let{openObserver:x}=this._config;x&&x.next(s);let k=this.destination;this.destination=T.create(u=>{if(n.readyState===1)try{let{serializer:d}=this._config;n.send(d(u))}catch(d){this.destination.error(d)}},u=>{let{closingObserver:d}=this._config;d&&d.next(void 0),u&&u.code?n.close(u.code,u.reason):i.error(new TypeError(be)),this._resetState()},()=>{let{closingObserver:u}=this._config;u&&u.next(void 0),n.close(),this._resetState()}),k&&k instanceof y&&a.add(k.subscribe(this.destination))},n.onerror=s=>{this._resetState(),i.error(s)},n.onclose=s=>{n===this._socket&&this._resetState();let{closeObserver:p}=this._config;p&&p.next(s),s.wasClean?i.complete():i.error(s)},n.onmessage=s=>{try{let{deserializer:p}=this._config;i.next(p(s))}catch(p){i.error(p)}}}_subscribe(e){let{source:o}=this;return o?o.subscribe(e):(this._socket||this._connectSocket(),this._output.subscribe(e),e.add(()=>{let{_socket:t}=this;this._output.observers.length===0&&(t&&(t.readyState===1||t.readyState===0)&&t.close(),this._resetState())}),e)}unsubscribe(){let{_socket:e}=this;e&&(e.readyState===1||e.readyState===0)&&e.close(),this._resetState(),super.unsubscribe()}};function C(c){return new g(c)}var ye=()=>[16,16],_e=()=>({minRows:3,maxRows:5});function ge(c,e){if(c&1&&(l(0,"div",9)(1,"span",10),h(2),m()(),l(3,"div",11),h(4,"\u5DF2\u8BFB"),m()),c&2){let o=e.$implicit;f(2),j(o)}}var b=class b{constructor(){this.concate=!0;this.destroyRef=w(W);this.pageHeaderInfo={title:"websocket",breadcrumb:["\u9996\u9875","\u529F\u80FD","websocket"]};this.subject=C(`ws://${Q}:8003/webSocket`);this.result=[];this.msg="";this.cdr=w(G)}send(){this.subject.next(this.msg),this.msg=""}end(){this.subject.complete(),this.concate=!1}ngAfterViewInit(){this.subject.pipe(J(this.destroyRef)).subscribe(e=>{this.result.push(e.message),this.result=[...this.result],this.cdr.markForCheck()})}ngOnDestroy(){this.subject.complete()}};b.\u0275fac=function(o){return new(o||b)},b.\u0275cmp=E({type:b,selectors:[["app-websocket"]],standalone:!0,features:[V],decls:15,vars:7,consts:[[3,"pageHeaderInfo"],[1,"normal-table-wrap"],["nz-row","",3,"nzGutter"],["nz-col","","nzFlex","300px"],["nz-input","","placeholder","\u53D1\u9001\u7684\u5185\u5BB9\u670D\u52A1\u7AEF\u4F1A\u8FD4\u56DE",1,"m-b-8",3,"ngModelChange","nzAutosize","ngModel"],["nz-button","","nzType","primary",3,"click"],["nz-button","","nzType","default",1,"m-l-8",3,"click"],["nz-col","","nzFlex","auto"],["nzTitle","\u6D88\u606F\u5185\u5BB9"],["nz-result-content","",1,"m-t-0","p-8","text-break","m-b-8"],["nz-typography",""],["nz-typography","","nzType","secondary",1,"sp-12","text-right","m-t-5"]],template:function(o,t){o&1&&(B(0,"app-page-header",0),l(1,"div",1)(2,"div",2)(3,"div",3)(4,"textarea",4),P("ngModelChange",function(i){return H(t.msg,i)||(t.msg=i),i}),m(),l(5,"button",5),D("click",function(){return t.send()}),h(6,"\u53D1\u9001"),m(),l(7,"button",6),D("click",function(){return t.end()}),h(8,"\u65AD\u5F00\u8FDE\u63A5"),m(),l(9,"span"),h(10),m()(),l(11,"div",7)(12,"nz-card",8),I(13,ge,5,1,null,null,A),m()()()()),o&2&&(_("pageHeaderInfo",t.pageHeaderInfo),f(2),_("nzGutter",v(5,ye)),f(2),_("nzAutosize",v(6,_e)),O("ngModel",t.msg),f(6),R("\u94FE\u63A5\u72B6\u6001\uFF1A",t.concate,""),f(3),M(t.result))},dependencies:[de,ie,oe,te,se,ne,re,q,L,U,K,ee,$,X,Y,Z,pe,ue,me,le,ae,ce],encapsulation:2,changeDetection:0});var fe=b;export{fe as WebsocketComponent};
