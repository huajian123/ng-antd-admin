import{b as We,e as Le,h as Ue,i as Re,j as je,k as $e,l as Qe}from"./chunk-MNPH6ZK6.js";import{a as Ee,d as Ie}from"./chunk-OFQES6HH.js";import{a as Be,e as Ve}from"./chunk-WKOMYM5O.js";import{d as _e,g as he,k as ge,w as ve}from"./chunk-6GAZF5ON.js";import{c as Ae,i as Fe}from"./chunk-JS4TD4O2.js";import{i as Me,j as be}from"./chunk-H5LORQQP.js";import{G as we,H as De,I as U,P as Ne,Q as Se,p as xe}from"./chunk-IK75FPLE.js";import{a as Oe,b as ke}from"./chunk-NTMY3SYH.js";import{a as B,b as V,c as Pe,d as W,e as L}from"./chunk-PRNJDQ6J.js";import{Q as ye,X as te,ca as A,da as F,ea as Te}from"./chunk-F5ALC7SR.js";import{d as fe,p as ze,v as Ce}from"./chunk-NGTZY5Y2.js";import{$b as se,Aa as M,Ac as p,Ba as re,Bc as v,Ca as ae,Cc as D,Fc as N,Gc as S,Hc as E,Jc as I,Kb as Q,Lb as ce,Ma as d,Na as u,Ob as z,Pb as H,Pc as Y,Qb as f,Qc as ee,Sb as q,Uc as de,Va as T,Xa as b,Z as ne,Zb as h,_ as ie,ac as le,bc as me,cc as a,dc as c,dd as ue,ec as w,fc as G,g as j,gc as Z,ia as k,ic as g,id as y,oc as C,qc as s,r as $,ra as oe,ub as m,vb as _,wc as J,xc as K,yc as X,zc as pe}from"./chunk-PHCOYEBV.js";import{a as O}from"./chunk-VB56BUGO.js";var tt=["okBtn"],nt=["cancelBtn"];function it(i,t){i&1&&(a(0,"div",6),w(1,"span",14),c())}function ot(i,t){if(i&1&&(G(0),a(1,"span",16),w(2,"span",17),c(),Z()),i&2){let e=t.$implicit;m(2),f("nzType",e||"exclamation-circle")}}function rt(i,t){if(i&1&&(G(0),z(1,ot,3,1,"ng-container",10),a(2,"div",15),p(3),c(),Z()),i&2){let e=s(2);m(),f("nzStringTemplateOutlet",e.nzIcon),m(2),v(e.nzTitle)}}function at(i,t){if(i&1&&p(0),i&2){let e=s(2);D(" ",e.nzCancelText," ")}}function ct(i,t){i&1&&(p(0),Y(1,"nzI18n")),i&2&&D(" ",ee(1,1,"Modal.cancelText")," ")}function st(i,t){if(i&1&&p(0),i&2){let e=s(2);D(" ",e.nzOkText," ")}}function lt(i,t){i&1&&(p(0),Y(1,"nzI18n")),i&2&&D(" ",ee(1,1,"Modal.okText")," ")}function mt(i,t){if(i&1){let e=g();a(0,"div",4)(1,"div",5),z(2,it,2,0,"div",6),a(3,"div",7)(4,"div")(5,"div",8)(6,"div",9),z(7,rt,4,2,"ng-container",10),c(),a(8,"div",11)(9,"button",12,1),C("click",function(){d(e);let n=s();return u(n.onCancel())}),z(11,at,1,1)(12,ct,2,3),c(),a(13,"button",13,2),C("click",function(){d(e);let n=s();return u(n.onConfirm())}),z(15,st,1,1)(16,lt,2,3),c()()()()()()()}if(i&2){let e=s();q("ant-popover-rtl",e.dir==="rtl"),f("cdkTrapFocusAutoCapture",e.nzAutoFocus!==null)("ngClass",e._classMap)("ngStyle",e.nzOverlayStyle)("@.disabled",!!(e.noAnimation!=null&&e.noAnimation.nzNoAnimation))("nzNoAnimation",e.noAnimation==null?null:e.noAnimation.nzNoAnimation)("@zoomBigMotion","active"),m(2),h(e.nzPopconfirmShowArrow?2:-1),m(5),f("nzStringTemplateOutlet",e.nzTitle),m(2),f("nzSize","small"),H("cdkFocusInitial",e.nzAutoFocus==="cancel"||null),m(2),h(e.nzCancelText?11:12),m(2),f("nzSize","small")("nzType",e.nzOkType!=="danger"?e.nzOkType:"primary")("nzDanger",e.nzOkDanger||e.nzOkType==="danger")("nzLoading",e.confirmLoading)("disabled",e.nzOkDisabled),H("cdkFocusInitial",e.nzAutoFocus==="ok"||null),m(2),h(e.nzOkText?15:16)}}var pt="popconfirm",He=(()=>{let t=class t extends Ee{getProxyPropertyMap(){return O({nzOkText:["nzOkText",()=>this.nzOkText],nzOkType:["nzOkType",()=>this.nzOkType],nzOkDanger:["nzOkDanger",()=>this.nzOkDanger],nzOkDisabled:["nzOkDisabled",()=>this.nzOkDisabled],nzCancelText:["nzCancelText",()=>this.nzCancelText],nzBeforeConfirm:["nzBeforeConfirm",()=>this.nzBeforeConfirm],nzCondition:["nzCondition",()=>this.nzCondition],nzIcon:["nzIcon",()=>this.nzIcon],nzPopconfirmShowArrow:["nzPopconfirmShowArrow",()=>this.nzPopconfirmShowArrow],nzPopconfirmBackdrop:["nzBackdrop",()=>this.nzPopconfirmBackdrop],nzAutoFocus:["nzAutoFocus",()=>this.nzAutofocus]},super.getProxyPropertyMap())}constructor(){super(qe),this._nzModuleName=pt,this.trigger="click",this.placement="top",this.nzCondition=!1,this.nzPopconfirmShowArrow=!0,this.nzPopconfirmBackdrop=!1,this.nzAutofocus=null,this.visibleChange=new b,this.nzOnCancel=new b,this.nzOnConfirm=new b}createComponent(){super.createComponent(),this.component.nzOnCancel.pipe(k(this.destroy$)).subscribe(()=>{this.nzOnCancel.emit()}),this.component.nzOnConfirm.pipe(k(this.destroy$)).subscribe(()=>{this.nzOnConfirm.emit()})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275dir=ae({type:t,selectors:[["","nz-popconfirm",""]],hostVars:2,hostBindings:function(n,o){n&2&&q("ant-popover-open",o.visible)},inputs:{arrowPointAtCenter:[2,"nzPopconfirmArrowPointAtCenter","arrowPointAtCenter",y],title:[0,"nzPopconfirmTitle","title"],directiveTitle:[0,"nz-popconfirm","directiveTitle"],trigger:[0,"nzPopconfirmTrigger","trigger"],placement:[0,"nzPopconfirmPlacement","placement"],origin:[0,"nzPopconfirmOrigin","origin"],mouseEnterDelay:[0,"nzPopconfirmMouseEnterDelay","mouseEnterDelay"],mouseLeaveDelay:[0,"nzPopconfirmMouseLeaveDelay","mouseLeaveDelay"],overlayClassName:[0,"nzPopconfirmOverlayClassName","overlayClassName"],overlayStyle:[0,"nzPopconfirmOverlayStyle","overlayStyle"],visible:[0,"nzPopconfirmVisible","visible"],nzOkText:"nzOkText",nzOkType:"nzOkType",nzOkDisabled:[2,"nzOkDisabled","nzOkDisabled",y],nzOkDanger:[2,"nzOkDanger","nzOkDanger",y],nzCancelText:"nzCancelText",nzBeforeConfirm:"nzBeforeConfirm",nzIcon:"nzIcon",nzCondition:[2,"nzCondition","nzCondition",y],nzPopconfirmShowArrow:[2,"nzPopconfirmShowArrow","nzPopconfirmShowArrow",y],nzPopconfirmBackdrop:"nzPopconfirmBackdrop",nzAutofocus:"nzAutofocus"},outputs:{visibleChange:"nzPopconfirmVisibleChange",nzOnCancel:"nzOnCancel",nzOnConfirm:"nzOnConfirm"},exportAs:["nzPopconfirm"],standalone:!0,features:[ce,Q]});let i=t;return $([te()],i.prototype,"nzPopconfirmBackdrop",void 0),$([te()],i.prototype,"nzAutofocus",void 0),i})(),qe=(()=>{let t=class t extends Ie{constructor(r,n,o,l,P){super(r,o,P),this.elementRef=n,this.nzCondition=!1,this.nzPopconfirmShowArrow=!0,this.nzOkType="primary",this.nzOkDanger=!1,this.nzOkDisabled=!1,this.nzAutoFocus=null,this.nzBeforeConfirm=null,this.nzOnCancel=new j,this.nzOnConfirm=new j,this._trigger="click",this.elementFocusedBeforeModalWasOpened=null,this._prefix="ant-popover",this.confirmLoading=!1,this.document=l}ngOnDestroy(){super.ngOnDestroy(),this.nzOnCancel.complete(),this.nzOnConfirm.complete()}show(){this.nzCondition?this.onConfirm():(this.capturePreviouslyFocusedElement(),super.show())}hide(){super.hide(),this.restoreFocus()}handleConfirm(){this.nzOnConfirm.next(),super.hide()}onCancel(){this.nzOnCancel.next(),super.hide()}onConfirm(){if(this.nzBeforeConfirm){let r=ye(this.nzBeforeConfirm()).pipe(ie());this.confirmLoading=!0,r.pipe(ne(()=>{this.confirmLoading=!1,this.cdr.markForCheck()}),k(this.nzVisibleChange),k(this.destroy$)).subscribe(n=>{n&&this.handleConfirm()})}else this.handleConfirm()}capturePreviouslyFocusedElement(){this.document&&(this.elementFocusedBeforeModalWasOpened=this.document.activeElement)}restoreFocus(){let r=this.elementFocusedBeforeModalWasOpened;if(r&&typeof r.focus=="function"){let n=this.document.activeElement,o=this.elementRef.nativeElement;(!n||n===this.document.body||n===o||o.contains(n))&&r.focus()}}};t.\u0275fac=function(n){return new(n||t)(_(ue),_(T),_(Te,8),_(fe,8),_(U,9))},t.\u0275cmp=M({type:t,selectors:[["nz-popconfirm"]],viewQuery:function(n,o){if(n&1&&(J(tt,5,T),J(nt,5,T)),n&2){let l;K(l=X())&&(o.okBtn=l),K(l=X())&&(o.cancelBtn=l)}},exportAs:["nzPopconfirmComponent"],standalone:!0,features:[Q,I],decls:2,vars:6,consts:[["overlay","cdkConnectedOverlay"],["cancelBtn",""],["okBtn",""],["cdkConnectedOverlay","","nzConnectedOverlay","",3,"overlayOutsideClick","detach","positionChange","cdkConnectedOverlayHasBackdrop","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayOpen","cdkConnectedOverlayPush","nzArrowPointAtCenter"],["cdkTrapFocus","",1,"ant-popover",3,"cdkTrapFocusAutoCapture","ngClass","ngStyle","nzNoAnimation"],[1,"ant-popover-content"],[1,"ant-popover-arrow"],[1,"ant-popover-inner"],[1,"ant-popover-inner-content"],[1,"ant-popover-message"],[4,"nzStringTemplateOutlet"],[1,"ant-popover-buttons"],["nz-button","",3,"click","nzSize"],["nz-button","",3,"click","nzSize","nzType","nzDanger","nzLoading","disabled"],[1,"ant-popover-arrow-content"],[1,"ant-popover-message-title"],[1,"ant-popover-message-icon"],["nz-icon","","nzTheme","fill",3,"nzType"]],template:function(n,o){if(n&1){let l=g();z(0,mt,17,20,"ng-template",3,0,de),C("overlayOutsideClick",function(R){return d(l),u(o.onClickOutside(R))})("detach",function(){return d(l),u(o.hide())})("positionChange",function(R){return d(l),u(o.onPositionChange(R))})}n&2&&f("cdkConnectedOverlayHasBackdrop",o.nzBackdrop)("cdkConnectedOverlayOrigin",o.origin)("cdkConnectedOverlayPositions",o._positions)("cdkConnectedOverlayOpen",o._visible)("cdkConnectedOverlayPush",o.cdkConnectedOverlayPush)("nzArrowPointAtCenter",o.nzArrowPointAtCenter)},dependencies:[De,we,Se,Ne,Fe,Ae,ze,Ce,U,ke,Oe,F,A,L,W,B,V,be,Me],encapsulation:2,data:{animation:[xe]},changeDetection:0});let i=t;return i})(),Ge=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=re({type:t}),t.\u0275inj=oe({imports:[qe]});let i=t;return i})();function ut(i,t){if(i&1){let e=g();a(0,"td"),p(1),c(),a(2,"td"),p(3),c(),a(4,"td"),p(5),c(),a(6,"td")(7,"a",7),C("click",function(){d(e);let n=s().$implicit,o=s();return u(o.startEdit(n.id))}),p(8,"Edit"),c()()}if(i&2){let e=s().$implicit;m(),v(e.name),m(2),v(e.age),m(2),v(e.address)}}function ft(i,t){if(i&1){let e=g();a(0,"td")(1,"input",8),E("ngModelChange",function(n){d(e);let o=s().$implicit,l=s();return S(l.editCache[o.id].data.name,n)||(l.editCache[o.id].data.name=n),u(n)}),c()(),a(2,"td")(3,"input",8),E("ngModelChange",function(n){d(e);let o=s().$implicit,l=s();return S(l.editCache[o.id].data.age,n)||(l.editCache[o.id].data.age=n),u(n)}),c()(),a(4,"td")(5,"input",8),E("ngModelChange",function(n){d(e);let o=s().$implicit,l=s();return S(l.editCache[o.id].data.address,n)||(l.editCache[o.id].data.address=n),u(n)}),c()(),a(6,"td")(7,"a",9),C("click",function(){d(e);let n=s().$implicit,o=s();return u(o.saveEdit(n.id))}),p(8,"Save"),c(),a(9,"a",10),C("nzOnConfirm",function(){d(e);let n=s().$implicit,o=s();return u(o.cancelEdit(n.id))}),p(10,"Cancel"),c()()}if(i&2){let e=s().$implicit,r=s();m(),N("ngModel",r.editCache[e.id].data.name),m(2),N("ngModel",r.editCache[e.id].data.age),m(2),N("ngModel",r.editCache[e.id].data.address)}}function zt(i,t){if(i&1&&(a(0,"tr"),z(1,ut,9,3)(2,ft,11,3),c()),i&2){let e=t.$implicit,r=s();m(),h(r.editCache[e.id].edit?2:1)}}var x=class x{constructor(){this.editCache={};this.listOfData=[]}startEdit(t){this.editCache[t].edit=!0}cancelEdit(t){let e=this.listOfData.findIndex(r=>r.id===t);this.editCache[t]={data:O({},this.listOfData[e]),edit:!1}}saveEdit(t){let e=this.listOfData.findIndex(r=>r.id===t);Object.assign(this.listOfData[e],this.editCache[t].data),this.editCache[t].edit=!1}updateEditCache(){this.listOfData.forEach(t=>{this.editCache[t.id]={edit:!1,data:O({},t)}})}ngOnInit(){let t=[];for(let e=0;e<10;e++)t.push({id:`${e}`,name:`Edrward ${e}`,age:32,address:`London Park no. ${e}`});this.listOfData=t,this.updateEditCache()}};x.\u0275fac=function(e){return new(e||x)},x.\u0275cmp=M({type:x,selectors:[["app-user-member-manage"]],standalone:!0,features:[I],decls:18,vars:2,consts:[["editRowTable",""],[3,"nzData","nzFrontPagination"],["nzWidth","25%"],["nzWidth","15%"],["nzWidth","40%"],["nz-button","","nzType","dashed",1,"add-button","with-full"],["nz-icon","","nzType","plus"],[3,"click"],["type","text","nz-input","",3,"ngModelChange","ngModel"],[1,"save",3,"click"],["nz-popconfirm","","nzTitle","Sure to cancel?",3,"nzOnConfirm"]],template:function(e,r){if(e&1&&(a(0,"nz-table",1,0)(2,"thead")(3,"tr")(4,"th",2),p(5,"\u6210\u5458\u59D3\u540D"),c(),a(6,"th",3),p(7,"\u5DE5\u53F7"),c(),a(8,"th",4),p(9,"\u6240\u5C5E\u90E8\u95E8"),c(),a(10,"th"),p(11,"\u64CD\u4F5C"),c()()(),a(12,"tbody"),le(13,zt,3,1,"tr",null,se),c()(),a(15,"button",5),w(16,"i",6),p(17,` \u65B0\u589E\u6210\u5458
`),c()),e&2){let n=pe(1);f("nzData",r.listOfData)("nzFrontPagination",!1),m(13),me(n.data)}},dependencies:[Qe,Re,We,Le,$e,Ue,je,Ve,Be,ve,_e,he,ge,Ge,He,L,W,B,V,Pe,F,A],encapsulation:2,changeDetection:0});var Ze=x;export{Ze as a};
