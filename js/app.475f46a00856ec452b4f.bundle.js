(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const o=s(89),{lightningChart:a,AxisTickStrategies:r,emptyFill:l,AutoCursorModes:n,IndividualPointFill:i,Themes:c}=o,d=a({resourcesBaseUrl:new URL(document.head.baseURI).origin+new URL(document.head.baseURI).pathname+"resources/"}).ChartXY({defaultAxisX:{type:"linear-highPrecision"},theme:c[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0}).setTitle("Custom data selection interaction (drag with left mouse above chart)"),u=d.getDefaultAxisX().setTickStrategy(r.DateTime).setAnimationScroll(!1);d.setMouseInteractionPan(!1).setMouseInteractionRectangleFit(!1).setMouseInteractionRectangleZoom(!1).setMouseInteractionWheelZoom(!1),d.forEachAxis((e=>e.setMouseInteractions(!1)));const g=[];let h=100;for(let e=0;e<1e3;e+=1){const t=Date.UTC(2023,0,e),s=h+(2*Math.random()-1),o=e;h=s,g.push({x:t,y:s,id:o})}const S=d.addPointLineAreaSeries({dataPattern:"ProgressiveX",colors:!0,ids:!0}).appendJSON(g,{x:"x",y:"y",id:"id"}).setMouseInteractions(!1),m=S.getStrokeStyle().getFillStyle().getColor(),x=d.getTheme().examples.unfocusedDataColor,p=d.getTheme().examples.positiveFillStyle.getColor();S.setAreaFillStyle(l).setStrokeStyle((e=>e.setFillStyle(new i))).fill({color:m});const C=u.addBand(!1).setVisible(!1);d.onSeriesBackgroundMouseDragStart(((e,t)=>{const s=d.translateCoordinate(t,d.coordsAxis);C.setVisible(!0),C.setValueStart(s.x).setValueEnd(s.x),d.setAutoCursorMode(n.disabled)})),d.onSeriesBackgroundMouseDrag(((e,t)=>{const s=d.translateCoordinate(t,d.coordsAxis);C.setValueEnd(s.x)})),d.onSeriesBackgroundMouseDragStop(((e,t)=>{C.setVisible(!1),d.setAutoCursorMode(n.snapToClosest);const s=Math.min(C.getValueStart(),C.getValueEnd()),o=Math.max(C.getValueStart(),C.getValueEnd()),a=S.readBack(),r=[];for(let e=0;e<a.xValues.length;e+=1){const t=a.xValues[e];t>=s&&t<=o&&r.push(a.ids[e])}S.fill({color:x}).alterSamplesByID(r,{color:p})}))}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);