import F2 from '@antv/f2';
import { my as F2Context } from '@antv/f2-context';

function convertTouches(eventDetail) {
  if (!eventDetail) {
    return [];
  }
  const { x, y } = eventDetail;
  return [{ x, y}];
}

function convertEvent(mouseEvent) {
  const touches = convertTouches(mouseEvent.detail);
  const changedTouches = touches;
  return {
    preventDefault: function() {},
    touches,
    changedTouches,
  }
}

Component({
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
    mouseDown(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchstart', convertEvent(e));
    },
    mouseMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchmove', convertEvent(e));
    },
    mouseUp(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchend', convertEvent(e));
    }
  }
});
