// import F2 from '@antv/f2';
const F2 = require('@antv/f2/lib/index-all'); //解决pieLabel报错
import { my as F2Context } from '@antv/f2-context';


function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () { };
  }
  return e
}

Component({
  data: {
    firstEnter: true, //用于比较是否第一次鼠标hover到图表，第一次的话触发一下touchStart事件，帮助展示tooltips
  },
  props: {
    onInit: () => {}
  },
  didMount() {
    const id = `f2-canvas-${this.$id}`;
    const myCtx = my.createCanvasContext(id);
    const context = F2Context(myCtx);

    const query = my.createSelectorQuery();
    query
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        // 获取画布实际宽高
        const { width, height } = res[0];
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 高清解决方案
        this.setData({
          id,
          width: width * pixelRatio,
          height: height * pixelRatio
        });
        const chart = this.props.onInit(F2, { context, width, height, pixelRatio });
        if (chart) {
          this.chart = chart;
          this.canvasEl = chart.get('el');
        }
      });
  },
  methods: {
    //pc端需要tooltip效果，在mouseMove触发touchstart事件,去掉mouseDown事件
    mouseMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      this.handlePosition(e);
    },
    mouseUp(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      this.handlePosition(e);
    },
    handlePosition(e) {
      const {id, firstEnter} = this.data;
      const canvasEl = this.canvasEl;
      const that = this;
      const query = my.createSelectorQuery()
      query.select('#f2-canvas-wrapper').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        var offsetX = e.detail.x - res[0].left - res[1].scrollLeft;
        var offsetY = e.detail.y - res[0].top - res[1].scrollTop;
        var x = offsetX;
        var y = offsetY;
        const typeMap = {
          'mouseup': 'touchEnd',
          'mousemove': 'touchMove',
        }
        const obj = {
          x,
          y,
          "identifier": 0
        }
        const currentTarget = {
          dataset: {},
          id,
          tagName: "canvas"
        }
        const newEvent = {
          currentTarget,
        }
        newEvent.touches = [obj];
        newEvent.changedTouches = [obj];
        newEvent.points = [obj];
        newEvent.type = typeMap[e.type];
        canvasEl.dispatchEvent(firstEnter? 'touchstart':newEvent.type.toLowerCase(), wrapEvent(newEvent));
        if(firstEnter) {
          that.setData({
            firstEnter: false
          })
        }
      })

    },
  }
});
