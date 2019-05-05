import {
  fetchData, starToArray
} from '../../../utils/util.js';
Page({
  data: {
    movies: [],
    count: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var type = options.type;
    var str = ''
    switch (type) {
      case '电影':
        str = 'https://douban.uieee.com/v2/movie/in_theaters';
        break;
      case '即将上映':
        str = 'https://douban.uieee.com/v2/movie/coming_soon'
        break;
      case 'top250':
        str = 'https://douban.uieee.com/v2/movie/top250'
        break;
    }
    fetchData(str).then(res => {
      this.processData(res);
    });
    this.setData({
      url: str
    })
  },
  lazyLoad() {
    var count = this.data.count + 20;
    this.setData({
      count
    })
    wx.showNavigationBarLoading();
    fetchData(this.data.url + "?start=" + count + '&count=20').then(res => {
      this.processData(res);
    })
  },
  processData(res) {
    var datas = res.data.subjects;
    var arr = [];
    if (datas.length){
    for (var i = 0; i < datas.length; i++) {
      var cur = datas[i
      ];
      var tmpl = {
        images: cur.images.medium,
        title: cur.title.length > 6 ? cur.title.slice(0,
          6) + '...' : cur.title,
        rating: {
          stars: starToArray(cur.rating.stars),
          average: cur.rating.average
        }
      }
      arr.push(tmpl);
    }
    };
    //如果以前有电影，说明要延迟加载
    if (this.data.movies.length > 0) {
      var arr = this.data.movies.concat(arr);
    }
    this.setData({
      movies: arr
    });
    wx.hideNavigationBarLoading()
    console.log(arr);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})