import{a as Ae,b as Le,c as $e}from"./chunk-7IR6FQY6.js";import{a as Ve}from"./chunk-LZZYUYSO.js";import"./chunk-YZQKBSXU.js";import"./chunk-6DGE2S5E.js";import{c as We,d as He}from"./chunk-Y7DWSVT7.js";import"./chunk-AZDBKI4P.js";import"./chunk-FL7BS3BX.js";import"./chunk-Q5VVKPDT.js";import"./chunk-JS4TD4O2.js";import{A as xe,D as Ne,E as Me,a as be,i as Pe}from"./chunk-IK75FPLE.js";import{l as L,m as Te}from"./chunk-BH5DKTT6.js";import"./chunk-NTMY3SYH.js";import{a as Re,b as Fe,c as Ze,d as Oe,e as je}from"./chunk-PRNJDQ6J.js";import"./chunk-ESTIS766.js";import{W as A,X as R,ca as De,da as Ee,ea as ee,s as M}from"./chunk-F5ALC7SR.js";import"./chunk-67WDHJZZ.js";import"./chunk-6E3GIBKW.js";import{n as ke}from"./chunk-L7ZCTNHS.js";import{d as _e}from"./chunk-NGTZY5Y2.js";import{$b as U,Aa as E,Ac as V,Ba as le,Ca as me,Dc as Ce,Eb as ge,Ic as Se,Jc as N,K as P,La as he,Lb as fe,Ma as w,Na as y,O as X,Ob as C,Pb as ue,Qb as T,Rb as j,Sa as O,Sb as x,V as oe,Va as pe,Xa as B,Zb as W,ac as G,bc as Q,cc as m,dc as p,dd as J,ec as h,g as k,ha as re,ia as d,ic as H,id as Ie,kc as ve,ob as de,oc as f,pc as ze,qa as ae,qc as u,r as b,ra as se,rc as we,sc as ye,ub as g,va as D,vb as l,wa as ce,wc as Y,xc as K,yc as q}from"./chunk-PHCOYEBV.js";import{a as z}from"./chunk-VB56BUGO.js";var it=["imgRef"],nt=["imagePreviewWrapper"];function ot(i,n){if(i&1){let r=H();m(0,"div",13),f("click",function(t){w(r);let o=u();return y(o.onSwitchLeft(t))}),h(1,"span",14),p(),m(2,"div",15),f("click",function(t){w(r);let o=u();return y(o.onSwitchRight(t))}),h(3,"span",16),p()}if(i&2){let r=u();x("ant-image-preview-switch-left-disabled",r.index<=0),g(2),x("ant-image-preview-switch-right-disabled",r.index>=r.images.length-1)}}function rt(i,n){if(i&1&&(m(0,"li",5),V(1),p()),i&2){let r=u();g(),Ce("",r.index+1," / ",r.images.length,"")}}function at(i,n){if(i&1){let r=H();m(0,"li",17),f("click",function(){let t=w(r).$implicit;return y(t.onClick())}),h(1,"span",18),p()}if(i&2){let r,e=n.$implicit,t=u();x("ant-image-preview-operations-operation-disabled",t.zoomOutDisabled&&e.type==="zoomOut"),g(),T("nzType",e.icon)("nzRotate",(r=e.rotate)!==null&&r!==void 0?r:0)}}function st(i,n){if(i&1&&h(0,"img",20,1),i&2){let r=u().$implicit,e=u();j("width",r.width)("height",r.height)("transform",e.previewImageTransform),ue("src",e.sanitizerResourceUrl(r.src),de)("srcset",r.srcset)("alt",r.alt)}}function ct(i,n){if(i&1&&C(0,st,2,9,"img",19),i&2){let r=n.$index,e=u();W(r===e.index?0:-1)}}var lt=["*"];var Ye="image";function mt(i){let n={};return i.width<=i.clientWidth&&i.height<=i.clientHeight&&(n={x:0,y:0}),(i.width>i.clientWidth||i.height>i.clientHeight)&&(n={x:Ge(i.left,i.width,i.clientWidth),y:Ge(i.top,i.height,i.clientHeight)}),n}function ht(i){let n=i.getBoundingClientRect(),r=document.documentElement;return{left:n.left+(window.pageXOffset||r.scrollLeft)-(r.clientLeft||document.body.clientLeft||0),top:n.top+(window.pageYOffset||r.scrollTop)-(r.clientTop||document.body.clientTop||0)}}function pt(){let i=document.documentElement.clientWidth,n=window.innerHeight||document.documentElement.clientHeight;return{width:i,height:n}}function Ge(i,n,r){let e=i+n,t=(n-r)/2,o=null;return n>r?(i>0&&(o=t),i<0&&e<r&&(o=-t)):(i<0||e>r)&&(o=i<0?t:-t),o}var F=class{constructor(){this.nzKeyboard=!0,this.nzNoAnimation=!1,this.nzMaskClosable=!0,this.nzCloseOnNavigation=!0}},Qe={x:0,y:0},te=.5,dt=1,gt=0,Ke=(()=>{let n=class n{get animationDisabled(){return this.config.nzNoAnimation??!1}get maskClosable(){let e=this.nzConfigService.getConfigForComponent(Ye)||{};return this.config.nzMaskClosable??e.nzMaskClosable??!0}constructor(e,t,o,a,c,s){this.ngZone=e,this.cdr=t,this.nzConfigService=o,this.config=a,this.destroy$=c,this.sanitizer=s,this._defaultNzZoom=dt,this._defaultNzScaleStep=te,this._defaultNzRotate=gt,this.images=[],this.index=0,this.isDragging=!1,this.visible=!0,this.animationStateChanged=new B,this.scaleStepMap=new Map,this.previewImageTransform="",this.previewImageWrapperTransform="",this.operations=[{icon:"close",onClick:()=>{this.onClose()},type:"close"},{icon:"zoom-in",onClick:()=>{this.onZoomIn()},type:"zoomIn"},{icon:"zoom-out",onClick:()=>{this.onZoomOut()},type:"zoomOut"},{icon:"rotate-right",onClick:()=>{this.onRotateRight()},type:"rotateRight"},{icon:"rotate-left",onClick:()=>{this.onRotateLeft()},type:"rotateLeft"},{icon:"swap",onClick:()=>{this.onHorizontalFlip()},type:"flipHorizontally"},{icon:"swap",onClick:()=>{this.onVerticalFlip()},type:"flipVertically",rotate:90}],this.zoomOutDisabled=!1,this.position=z({},Qe),this.closeClick=new B,this.zoom=this.config.nzZoom??this._defaultNzZoom,this.scaleStep=this.config.nzScaleStep??this._defaultNzScaleStep,this.rotate=this.config.nzRotate??this._defaultNzRotate,this.flipHorizontally=this.config.nzFlipHorizontally??!1,this.flipVertically=this.config.nzFlipVertically??!1,this.updateZoomOutDisabled(),this.updatePreviewImageTransform(),this.updatePreviewImageWrapperTransform()}ngOnInit(){this.ngZone.runOutsideAngular(()=>{P(this.imagePreviewWrapper.nativeElement,"mousedown").pipe(d(this.destroy$)).subscribe(()=>{this.isDragging=!0}),P(this.imagePreviewWrapper.nativeElement,"wheel").pipe(d(this.destroy$)).subscribe(e=>{this.ngZone.run(()=>this.wheelZoomEventHandler(e))})})}setImages(e,t){t&&(this.scaleStepMap=t),this.images=e,this.markForCheck()}switchTo(e){this.index=e,this.markForCheck()}next(){this.index<this.images.length-1&&(this.reset(),this.index++,this.updatePreviewImageTransform(),this.updatePreviewImageWrapperTransform(),this.updateZoomOutDisabled(),this.markForCheck())}prev(){this.index>0&&(this.reset(),this.index--,this.updatePreviewImageTransform(),this.updatePreviewImageWrapperTransform(),this.updateZoomOutDisabled(),this.markForCheck())}markForCheck(){this.cdr.markForCheck()}onClose(){this.visible=!1,this.closeClick.emit()}onZoomIn(){let e=this.scaleStepMap.get(this.images[this.index].src??this.images[this.index].srcset)??this.scaleStep;this.zoom+=e,this.updatePreviewImageTransform(),this.updateZoomOutDisabled()}onZoomOut(){if(this.zoom>1){let e=this.scaleStepMap.get(this.images[this.index].src??this.images[this.index].srcset)??this.scaleStep;this.zoom-=e,this.updatePreviewImageTransform(),this.updateZoomOutDisabled(),this.zoom<=1&&this.reCenterImage()}}onRotateRight(){this.rotate+=90,this.updatePreviewImageTransform()}onRotateLeft(){this.rotate-=90,this.updatePreviewImageTransform()}onSwitchLeft(e){e.preventDefault(),e.stopPropagation(),this.prev()}onSwitchRight(e){e.preventDefault(),e.stopPropagation(),this.next()}onHorizontalFlip(){this.flipHorizontally=!this.flipHorizontally,this.updatePreviewImageTransform()}onVerticalFlip(){this.flipVertically=!this.flipVertically,this.updatePreviewImageTransform()}wheelZoomEventHandler(e){e.preventDefault(),e.stopPropagation(),this.handlerImageTransformationWhileZoomingWithMouse(e,e.deltaY),this.handleImageScaleWhileZoomingWithMouse(e.deltaY),this.updatePreviewImageWrapperTransform(),this.updatePreviewImageTransform(),this.markForCheck()}onAnimationStart(e){this.animationStateChanged.emit(e)}onAnimationDone(e){this.animationStateChanged.emit(e)}onDragEnd(e){this.isDragging=!1;let t=this.imageRef.nativeElement.offsetWidth*this.zoom,o=this.imageRef.nativeElement.offsetHeight*this.zoom,{left:a,top:c}=ht(this.imageRef.nativeElement),{width:s,height:v}=pt(),Z=this.rotate%180!==0,_=mt({width:Z?o:t,height:Z?t:o,left:a,top:c,clientWidth:s,clientHeight:v});M(_.x)||M(_.y)?this.position=z(z({},this.position),_):!M(_.x)&&!M(_.y)&&(this.position={x:e.source.getFreeDragPosition().x,y:e.source.getFreeDragPosition().y})}sanitizerResourceUrl(e){return this.sanitizer.bypassSecurityTrustResourceUrl(e)}updatePreviewImageTransform(){this.previewImageTransform=`scale3d(${this.zoom*(this.flipHorizontally?-1:1)}, ${this.zoom*(this.flipVertically?-1:1)}, 1) rotate(${this.rotate}deg)`}updatePreviewImageWrapperTransform(){this.previewImageWrapperTransform=`translate3d(${this.position.x}px, ${this.position.y}px, 0)`}updateZoomOutDisabled(){this.zoomOutDisabled=this.zoom<=1}handlerImageTransformationWhileZoomingWithMouse(e,t){let o,a=this.imageRef.nativeElement,s=getComputedStyle(a).transform.match(/matrix.*\((.+)\)/);s?o=+s[1].split(", ")[0]:o=this.zoom;let v=(e.clientX-a.getBoundingClientRect().x)/o,Z=(e.clientY-a.getBoundingClientRect().y)/o,I=t<0?this.scaleStep/2:-this.scaleStep/2;this.position.x+=-v*I*2+a.offsetWidth*I,this.position.y+=-Z*I*2+a.offsetHeight*I}handleImageScaleWhileZoomingWithMouse(e){this.isZoomedInWithMouseWheel(e)?this.onZoomIn():this.onZoomOut(),this.zoom<=1&&this.reCenterImage()}isZoomedInWithMouseWheel(e){return e<0}reset(){this.zoom=this.config.nzZoom??this._defaultNzZoom,this.scaleStep=this.config.nzScaleStep??this._defaultNzScaleStep,this.rotate=this.config.nzRotate??this._defaultNzRotate,this.flipHorizontally=!1,this.flipVertically=!1,this.reCenterImage()}reCenterImage(){this.position=z({},Qe)}};n.\u0275fac=function(t){return new(t||n)(l(ge),l(J),l(A),l(F),l(L),l(ke))},n.\u0275cmp=E({type:n,selectors:[["nz-image-preview"]],viewQuery:function(t,o){if(t&1&&(Y(it,5),Y(nt,7)),t&2){let a;K(a=q())&&(o.imageRef=a.first),K(a=q())&&(o.imagePreviewWrapper=a.first)}},hostAttrs:[1,"ant-image-preview-root"],hostVars:6,hostBindings:function(t,o){t&1&&ze("@fadeMotion.start",function(c){return o.onAnimationStart(c)})("@fadeMotion.done",function(c){return o.onAnimationDone(c)}),t&2&&(ve("@.disabled",o.config.nzNoAnimation)("@fadeMotion",o.visible?"enter":"leave"),j("z-index",o.config.nzZIndex),x("ant-image-preview-moving",o.isDragging))},exportAs:["nzImagePreview"],standalone:!0,features:[Se([L]),N],decls:17,vars:5,consts:[["imagePreviewWrapper",""],["imgRef",""],[1,"ant-image-preview-mask"],[1,"ant-image-preview-operations-wrapper"],[1,"ant-image-preview-operations"],[1,"ant-image-preview-operations-progress"],[1,"ant-image-preview-operations-operation",3,"ant-image-preview-operations-operation-disabled"],["tabindex","-1",1,"ant-image-preview-wrap",3,"click"],["role","dialog","aria-modal","true",1,"ant-image-preview"],["tabindex","0","aria-hidden","true",2,"width","0","height","0","overflow","hidden","outline","none"],[1,"ant-image-preview-content"],[1,"ant-image-preview-body"],["cdkDrag","",1,"ant-image-preview-img-wrapper",3,"cdkDragEnded","cdkDragFreeDragPosition"],[1,"ant-image-preview-switch-left",3,"click"],["nz-icon","","nzType","left","nzTheme","outline"],[1,"ant-image-preview-switch-right",3,"click"],["nz-icon","","nzType","right","nzTheme","outline"],[1,"ant-image-preview-operations-operation",3,"click"],["nz-icon","","nzTheme","outline",1,"ant-image-preview-operations-icon",3,"nzType","nzRotate"],["cdkDragHandle","",1,"ant-image-preview-img",3,"width","height","transform"],["cdkDragHandle","",1,"ant-image-preview-img"]],template:function(t,o){if(t&1){let a=H();h(0,"div",2),m(1,"div",3),C(2,ot,4,4),m(3,"ul",4),C(4,rt,2,2,"li",5),G(5,at,2,4,"li",6,U),p()(),m(7,"div",7),f("click",function(s){return w(a),y(o.maskClosable&&s.target===s.currentTarget&&o.onClose())}),m(8,"div",8),h(9,"div",9),m(10,"div",10)(11,"div",11)(12,"div",12,0),f("cdkDragEnded",function(s){return w(a),y(o.onDragEnd(s))}),G(14,ct,1,1,null,null,U),p()()(),h(16,"div",9),p()()}t&2&&(g(2),W(o.images.length>1?2:-1),g(2),W(o.images.length>1?4:-1),g(),Q(o.operations),g(7),j("transform",o.previewImageWrapperTransform),T("cdkDragFreeDragPosition",o.position),g(2),Q(o.images))},dependencies:[Ee,De,We,He],encapsulation:2,data:{animation:[Pe]},changeDetection:0});let i=n;return i})(),ie=class{constructor(n,r,e){this.previewInstance=n,this.config=r,this.overlayRef=e,this.destroy$=new k,e.keydownEvents().pipe(X(t=>this.config.nzKeyboard&&(t.keyCode===27||t.keyCode===37||t.keyCode===39)&&!Te(t))).subscribe(t=>{t.preventDefault(),t.keyCode===27&&n.onClose(),t.keyCode===37&&this.prev(),t.keyCode===39&&this.next()}),e.detachments().subscribe(()=>{this.overlayRef.dispose()}),n.closeClick.pipe(oe(1),re(()=>n.animationStateChanged),X(t=>t.phaseName==="done"),d(this.destroy$)).subscribe(()=>{this.close()})}switchTo(n){this.previewInstance.switchTo(n)}next(){this.previewInstance.next()}prev(){this.previewInstance.prev()}close(){this.destroy$.next(),this.overlayRef.dispose()}},$=(()=>{let n=class n{constructor(e,t,o,a){this.overlay=e,this.injector=t,this.nzConfigService=o,this.directionality=a}preview(e,t,o){return this.display(e,t,o)}display(e,t,o){let a=z(z({},new F),t??{}),c=this.createOverlay(a),s=this.attachPreviewComponent(c,a);s.setImages(e,o);let v=new ie(s,a,c);return s.previewRef=v,v}attachPreviewComponent(e,t){let o=O.create({parent:this.injector,providers:[{provide:Ne,useValue:e},{provide:F,useValue:t}]}),a=new be(Ke,null,o);return e.attach(a).instance}createOverlay(e){let t=this.nzConfigService.getConfigForComponent(Ye)||{},o=new xe({scrollStrategy:this.overlay.scrollStrategies.block(),positionStrategy:this.overlay.position().global(),disposeOnNavigation:e.nzCloseOnNavigation??t.nzCloseOnNavigation??!0,direction:e.nzDirection||t.nzDirection||this.directionality.value});return this.overlay.create(o)}};n.\u0275fac=function(t){return new(t||n)(D(Me),D(O),D(A),D(ee,8))},n.\u0275prov=ae({token:n,factory:n.\u0275fac});let i=n;return i})(),ne=(()=>{let n=class n{constructor(){this.nzScaleStep=null,this.images=[]}addImage(e){this.images.push(e)}};n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=E({type:n,selectors:[["nz-image-group"]],inputs:{nzScaleStep:"nzScaleStep"},exportAs:["nzImageGroup"],standalone:!0,features:[N],ngContentSelectors:lt,decls:1,vars:0,template:function(t,o){t&1&&(we(),ye(0))},encapsulation:2,changeDetection:0});let i=n;return i})(),ft="image",qe=(()=>{let n=class n{get previewable(){return!this.nzDisablePreview&&this.status!=="error"}constructor(e,t,o,a,c,s,v){this.document=e,this.nzConfigService=t,this.elementRef=o,this.nzImageService=a,this.cdr=c,this.parentGroup=s,this.directionality=v,this._nzModuleName=ft,this.nzSrc="",this.nzSrcset="",this.nzDisablePreview=!1,this.nzFallback=null,this.nzPlaceholder=null,this.nzScaleStep=null,this.status="normal",this.backLoadDestroy$=new k,this.destroy$=new k}ngOnInit(){this.backLoad(),this.parentGroup&&this.parentGroup.addImage(this),this.directionality&&(this.directionality.change?.pipe(d(this.destroy$)).subscribe(e=>{this.dir=e,this.cdr.detectChanges()}),this.dir=this.directionality.value)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}onPreview(){if(this.previewable)if(this.parentGroup){let e=this.parentGroup.images.filter(s=>s.previewable),t=e.map(s=>({src:s.nzSrc,srcset:s.nzSrcset})),o=e.findIndex(s=>this===s),a=new Map;e.forEach(s=>{a.set(s.nzSrc??s.nzSrcset,s.nzScaleStep??this.parentGroup.nzScaleStep??this.nzScaleStep??te)}),this.nzImageService.preview(t,{nzDirection:this.dir},a).switchTo(o)}else{let e=[{src:this.nzSrc,srcset:this.nzSrcset}];this.nzImageService.preview(e,{nzDirection:this.dir,nzScaleStep:this.nzScaleStep??te})}}getElement(){return this.elementRef}ngOnChanges(e){let{nzSrc:t}=e;t&&(this.getElement().nativeElement.src=t.currentValue,this.backLoad())}backLoad(){this.backLoadImage=this.document.createElement("img"),this.backLoadImage.src=this.nzSrc,this.backLoadImage.srcset=this.nzSrcset,this.status="loading",this.backLoadDestroy$.next(),this.backLoadDestroy$.complete(),this.backLoadDestroy$=new k,this.backLoadImage.complete?(this.status="normal",this.getElement().nativeElement.src=this.nzSrc,this.getElement().nativeElement.srcset=this.nzSrcset):(this.nzPlaceholder?(this.getElement().nativeElement.src=this.nzPlaceholder,this.getElement().nativeElement.srcset=""):(this.getElement().nativeElement.src=this.nzSrc,this.getElement().nativeElement.srcset=this.nzSrcset),P(this.backLoadImage,"load").pipe(d(this.backLoadDestroy$),d(this.destroy$)).subscribe(()=>{this.status="normal",this.getElement().nativeElement.src=this.nzSrc,this.getElement().nativeElement.srcset=this.nzSrcset}),P(this.backLoadImage,"error").pipe(d(this.backLoadDestroy$),d(this.destroy$)).subscribe(()=>{this.status="error",this.nzFallback&&(this.getElement().nativeElement.src=this.nzFallback,this.getElement().nativeElement.srcset="")}))}};n.\u0275fac=function(t){return new(t||n)(l(_e),l(A),l(pe),l($),l(J),l(ne,8),l(ee,8))},n.\u0275dir=me({type:n,selectors:[["img","nz-image",""]],hostBindings:function(t,o){t&1&&f("click",function(){return o.onPreview()})},inputs:{nzSrc:"nzSrc",nzSrcset:"nzSrcset",nzDisablePreview:[2,"nzDisablePreview","nzDisablePreview",Ie],nzFallback:"nzFallback",nzPlaceholder:"nzPlaceholder",nzScaleStep:"nzScaleStep"},exportAs:["nzImage"],standalone:!0,features:[fe,he]});let i=n;return b([R()],i.prototype,"nzDisablePreview",void 0),b([R()],i.prototype,"nzFallback",void 0),b([R()],i.prototype,"nzPlaceholder",void 0),b([R()],i.prototype,"nzScaleStep",void 0),i})(),Je=(()=>{let n=class n{};n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=le({type:n}),n.\u0275inj=se({providers:[$],imports:[Ke]});let i=n;return i})();function vt(i,n){i&1&&h(0,"img",5)}function zt(i,n){i&1&&h(0,"img",6)}var S=class S{constructor(){this.pageHeaderInfo={title:"\u56FE\u7247\u9884\u89C8",breadcrumb:["\u9996\u9875","\u529F\u80FD","\u56FE\u7247\u9884\u89C8"]};this.nzImageService=ce($)}onClick(){let n=[{src:"https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg",width:"200px",height:"200px",alt:"ng-zorro"},{src:"https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg",width:"200px",height:"200px",alt:"angular"}];this.nzImageService.preview(n,{nzZoom:1.5,nzRotate:0})}};S.\u0275fac=function(r){return new(r||S)},S.\u0275cmp=E({type:S,selectors:[["app-img-preview"]],standalone:!0,features:[N],decls:9,vars:1,consts:[[3,"pageHeaderInfo"],[1,"normal-table-wrap"],["alt","","nz-image","","nzSrc","https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","width","200px",4,"nzSpaceItem"],["alt","","nz-image","","nzSrc","https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg","width","200px",4,"nzSpaceItem"],["nz-button","","nzType","primary",1,"m-t-8",3,"click"],["alt","","nz-image","","nzSrc","https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","width","200px"],["alt","","nz-image","","nzSrc","https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg","width","200px"]],template:function(r,e){r&1&&(h(0,"app-page-header",0),m(1,"div",1)(2,"nz-image-group")(3,"nz-space"),C(4,vt,1,0,"img",2)(5,zt,1,0,"img",3),p()(),h(6,"br"),m(7,"button",4),f("click",function(){return e.onClick()}),V(8,"\u65E0\u56FE\u9884\u89C8"),p()()),r&2&&T("pageHeaderInfo",e.pageHeaderInfo)},dependencies:[Ve,Je,qe,ne,$e,Le,Ae,je,Oe,Re,Fe,Ze],styles:["img[_ngcontent-%COMP%]{max-width:200px}"],changeDetection:0});var et=S;export{et as ImgPreviewComponent};
