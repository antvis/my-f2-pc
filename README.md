# F2 淘宝PC小程序

F2 的淘宝PC小程序，支持原生 [F2](https://f2.antv.vision/) 的所有功能，欢迎使用反馈。

## 说明
使用方式同[my-f2](https://github.com/antvis/my-f2) 完全一致

## 如何使用

### 1. 安装依赖
项目默认初始化出来的是没有`package.json`的，需要新增`package.json`后再安装

```bash
## 没有package.json时执行下面这段
## echo "{}" > package.json

npm install @antv/my-f2-pc --save
```

### 2. 使用自定义组件

#### 1. 打开json文件，引入组件

```json
{
  "usingComponents": {
    "f2": "@antv/my-f2-pc"
  }
}
```

#### 2. axml 使用组件

```xml
<view class="container">
  <f2 class="f2-chart" onInit="onInitChart"></f2>
</view>
```

#### 3. acss 设置宽高
```css
.f2-chart {
  width: 100%;
  height: 500rpx;
}
```

#### 4. 实例化图表

```js
Page({
  data: {},
  onInitChart(F2, config) {
    const chart = new F2.Chart(config);
    const data = [
      { value: 63.4, city: 'New York', date: '2011-10-01' },
      { value: 62.7, city: 'Alaska', date: '2011-10-01' },
      { value: 72.2, city: 'Austin', date: '2011-10-01' },
      { value: 58, city: 'New York', date: '2011-10-02' },
      { value: 59.9, city: 'Alaska', date: '2011-10-02' },
      { value: 67.7, city: 'Austin', date: '2011-10-02' },
      { value: 53.3, city: 'New York', date: '2011-10-03' },
      { value: 59.1, city: 'Alaska', date: '2011-10-03' },
      { value: 69.4, city: 'Austin', date: '2011-10-03' },
    ];
    chart.source(data, {
      date: {
        range: [0, 1],
        type: 'timeCat',
        mask: 'MM-DD'
      },
      value: {
        max: 300,
        tickCount: 4
      }
    });
    chart.area().position('date*value').color('city').adjust('stack');
    chart.line().position('date*value').color('city').adjust('stack');
    chart.render();
    // 注意：需要把chart return 出来
    return chart;
  }
});
```

## API

- F2 API 参见：[https://f2.antv.vision/zh/docs/api/f2](https://f2.antv.vision/zh/docs/api/f2)

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/my-f2-pc/issues) 看看有没有类似的 bug 或者建议。

## License

[MIT license](https://github.com/antvis/my-f2-pc/blob/master/LICENSE)
