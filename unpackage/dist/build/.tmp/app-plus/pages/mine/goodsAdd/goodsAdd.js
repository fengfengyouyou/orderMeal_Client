(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/goodsAdd/goodsAdd"],{"71d1":function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return o})},"7c2b":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("a34a")),r=i(n("c76c")),u=n("2f62");function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,o,a,r,u){try{var i=e[r](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(o,a)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(o,a){var r=e.apply(t,n);function u(e){c(r,o,a,u,i,"next",e)}function i(e){c(r,o,a,u,i,"throw",e)}u(void 0)})}}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){f(e,t,n[t])})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={data:function(){return{goodsInfo:{name:"",price:"",attribute:[],image:"",type:""},goodsImg:"/static/plus.png",percent:0,isUpload:!1,domainName:r.default}},computed:d({},(0,u.mapState)(["token"])),onLoad:function(){e("log",this.token," at pages\\mine\\goodsAdd\\goodsAdd.vue:63")},methods:d({},(0,u.mapActions)(["addGoods"]),{formSubmit:function(){var t=s(a.default.mark(function t(){var n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e("log",this.goodsInfo," at pages\\mine\\goodsAdd\\goodsAdd.vue:68"),t.next=3,this.addGoods({params:this.goodsInfo});case 3:n=t.sent,e("log","来了",n," at pages\\mine\\goodsAdd\\goodsAdd.vue:72");case 5:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),formReset:function(){},addAttr:function(){this.goodsInfo.attribute.push({type:"",valueArr:[]})},chooseImg:function(){var t=this;o.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(n){e("log",n," at pages\\mine\\goodsAdd\\goodsAdd.vue:89"),t.goodsImg=n.tempFilePaths;var a=n.tempFilePaths;t.isUpload=!0;var u=o.uploadFile({url:r.default+"/file/upload",filePath:a[0],name:"file",headers:{Authorization:t.token},formData:{},success:function(n){var o=JSON.parse(n.data);e("log",o," at pages\\mine\\goodsAdd\\goodsAdd.vue:104"),t.goodsInfo.image=o.filePath},complete:function(){t.isUpload=!1,t.percent=0}});u.onProgressUpdate(function(e){t.percent=e.progress})}})}})};t.default=l}).call(this,n("0de9")["default"],n("6e42")["default"])},8044:function(e,t,n){"use strict";(function(e){n("4e61"),n("921b");o(n("66fd"));var t=o(n("aff4"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},aff4:function(e,t,n){"use strict";n.r(t);var o=n("71d1"),a=n("e352");for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);n("b4f9");var u,i=n("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"2eb6b645",null,!1,o["a"],u);t["default"]=c.exports},b4f9:function(e,t,n){"use strict";var o=n("c462"),a=n.n(o);a.a},c462:function(e,t,n){},e352:function(e,t,n){"use strict";n.r(t);var o=n("7c2b"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a}},[["8044","common/runtime","common/vendor"]]]);