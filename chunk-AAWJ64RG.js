import{a as n}from"./chunk-VOSBTLBV.js";import{a as N,b as H,c as M}from"./chunk-7IR6FQY6.js";import{a as I}from"./chunk-LZZYUYSO.js";import"./chunk-YZQKBSXU.js";import"./chunk-6DGE2S5E.js";import{f as V,g as y}from"./chunk-3GMZJHT4.js";import"./chunk-AZDBKI4P.js";import"./chunk-FL7BS3BX.js";import"./chunk-Q5VVKPDT.js";import"./chunk-IK75FPLE.js";import"./chunk-BH5DKTT6.js";import"./chunk-NTMY3SYH.js";import{a as z,b as w,c as T,d as k,e as h}from"./chunk-PRNJDQ6J.js";import"./chunk-ESTIS766.js";import"./chunk-F5ALC7SR.js";import"./chunk-67WDHJZZ.js";import"./chunk-6E3GIBKW.js";import"./chunk-L7ZCTNHS.js";import"./chunk-NGTZY5Y2.js";import{Aa as _,Ac as r,Bc as E,Jc as v,Ma as a,Na as c,Ob as g,Qb as b,cc as t,dc as i,dd as D,ec as x,ic as d,oc as m,qc as F,ub as C,wa as f,zc as S}from"./chunk-PHCOYEBV.js";import"./chunk-VB56BUGO.js";function O(p,l){if(p&1){let e=d();t(0,"button",7),m("click",function(){a(e);let o=F();return c(o.intoFull())}),r(1,"\u8FDB\u5165\u5168\u5C4F"),i()}}function W(p,l){if(p&1){let e=d();t(0,"button",7),m("click",function(){a(e);let o=F();return c(o.toggle())}),r(1,"\u5207\u6362\u5168\u5C4F"),i()}}function q(p,l){if(p&1){let e=d();t(0,"button",7),m("click",function(){a(e);let o=F();return c(o.exitFull())}),r(1,"\u9000\u51FA\u5168\u5C4F"),i()}}var s=class s{constructor(){this.pageHeaderInfo={title:"\u5168\u5C4F\u793A\u4F8B",breadcrumb:["\u9996\u9875","\u529F\u80FD","\u5168\u5C4F\u793A\u4F8B"]};this.isFullscreenFlag=!0;this.cdr=f(D)}toggle(){n.isEnabled&&n.toggle()}exitFull(){n.isEnabled&&n.exit()}intoDomFull(l){n.isEnabled&&n.request(l)}intoFull(){n.isEnabled&&n.request()}ngOnInit(){n.onchange(()=>{setTimeout(()=>{this.isFullscreenFlag=!this.isFullscreenFlag,this.cdr.markForCheck()},10)})}};s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=_({type:s,selectors:[["app-full-screen"]],standalone:!0,features:[v],decls:21,vars:2,consts:[["dom",""],[3,"pageHeaderInfo"],[1,"normal-table-wrap"],["nzTitle","Window Full Screen(\u4E0D\u77E5\u9053\u4E3A\u4EC0\u4E48vben\u975E\u8981\u5199\u82F1\u6587)"],["nz-button","","nzType","primary",3,"click",4,"nzSpaceItem"],[1,"sp-28","text-error"],["nzTitle","Dom Full Screen",1,"m-t-15"],["nz-button","","nzType","primary",3,"click"],[1,"m-t-30","center",2,"height","600px","background","white","margin-left","auto","margin-right","auto"],[1,"text-center","sp-28","text-error"]],template:function(e,u){if(e&1){let o=d();x(0,"app-page-header",1),t(1,"div",2)(2,"nz-card",3)(3,"nz-space"),g(4,O,2,0,"button",4)(5,W,2,0,"button",4)(6,q,2,0,"button",4),i(),t(7,"div"),r(8," \u5F53\u524D\u5168\u5C4F\u72B6\u6001\uFF1A "),t(9,"span",5),r(10),i()()(),t(11,"nz-card",6)(12,"button",7),m("click",function(){a(o);let P=S(15);return c(u.intoDomFull(P))}),r(13,"\u4E0B\u9762\u4E00\u6574\u5757\u7684dom\u5168\u5C4F"),i()(),t(14,"div",8,0)(16,"div")(17,"p",9),r(18,"\u6211\u5C31\u662F\u8FD9\u4E2A\u53EF\u80FD\u88AB\u5168\u5C4F\u7684dom"),i(),t(19,"button",7),m("click",function(){return a(o),c(u.exitFull())}),r(20,"\u6211\u8FD9\u4E2Adom\u53D6\u6D88\u5168\u5C4F"),i()()()()}e&2&&(b("pageHeaderInfo",u.pageHeaderInfo),C(10),E(!u.isFullscreenFlag))},dependencies:[I,y,V,M,H,N,h,k,z,w,T],encapsulation:2,changeDetection:0});var A=s;export{A as FullScreenComponent};
