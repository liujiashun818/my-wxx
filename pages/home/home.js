// pages/home/home.js
import { fetchData, starToArray } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTeaters: {
      movies: [],
      name: '电影'
    },
    comingSoon: {
      movies: [],
      name: '即将上映'
    },
    top250: {
      movies: [],
      name: 'top250'
    }
  },
  bindToSearch(){
    // 跳转到所搜索
    wx.navigateTo({
      url: 'search-page/search-page',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    fetchData('https://douban.uieee.com/v2/movie/in_theaters?star=0&count=6').then((res) => {
      this.processData(res, '电影', 'inTheaters');
    })
    // fetchData('https://douban.uieee.com/v2/movie/coming_soon?star=0&count=6').then(res => {
    //   this.processData(res, '即将上映', 'comingSoon');
    // });
    // fetchData('https://douban.uieee.com/v2/movie/top250?star=0&count=6').then(res => {
    //   this.processData(res, 'top250', 'top250');
    // });
  },
  bindToMore(e) {
    var val = e.currentTarget.dataset.more;
    console.log('val', val);
    wx.navigateTo({
      url: 'detail/detail?type=' + val,
    });
  },
  processData(res, name, type) {
    var datas = res.data.subjects;
    if (!datas){
      return []
    }
    var arr = [];
    for (var i = 0; i < datas.length; i++) {
      var cur = datas[i];
      console.log('cur', cur);
      console.log('starToArray', starToArray);
      var tmpl = {
        images: cur.images.medium,
        title: cur.title.length>6? cur.title.slice(0,6) + '...' : cur.title,
        rating: {
          stars: starToArray(cur.rating.stars),
          average: cur.rating.average
        }
      }
      arr.push(tmpl);
    }
    var obj = {};
    obj[type] = {
      movies: arr,
      name
    }
    this.setData(obj);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})