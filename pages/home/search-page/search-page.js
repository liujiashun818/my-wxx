// pages/home/search-page/search-page.js
import { fetchData } from '../../../utils/util.js';
Page({
  timer: '',
  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    movies:[],
    historys: [],
    val:''
  },
  searchByHistory(e){
    var val = e.currentTarget.dataset.history;
    this.setData({
      val,
      flag:false
    })
    fetchData('https://douban.uieee.com/v2/movie/search?q=' + val).then(
    (res) =>{
      this.processData(res);
    })
  },
  clearHistory(){
    wx.clearStorage();
    this.setData({
      historys:[]
    })
  },
  valToSearch(e){
    var val = e.detail.value;
    if (val){
      this.setData({
        flag:false
      })
      clearTimeout(this.timer);
     this.timer = setTimeout(()=>{
       fetchData('https://douban.uieee.com/v2/movie/search?q=' + val).then(res => {
          this.processData(res);
        })
      },500);

    }else{
      clearTimeout(this.timer);
      this.setData({
        flag:true,
        movies:[]
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var historys = wx.getStorageSync('historys') || [];
    this.setData({
      historys
    })
  },
  saveStorge(e){
    var val = e.detail.value;
    // 如果输入框有值，并且历史记录中没有存储过
    var historys = wx.getStorageSync('historys') || [];
    var flag = historys.find((item) => {
      return item == val;
    })
    if(val != '' && !flag){
      historys.push(val);
      wx.setStorageSync('historys', historys);
      this.setData({
        historys
      })
    }
  },
  processData(res){
    var datas = res.data.subjects;
    var arr = [];
    for (var i = 0; i < datas.length;i++){
      var cur = datas[i];
      var tmpl = {
        image:cur.images.small,
        title:cur.title,
        average:cur.rating.average,
        year:cur.year
      }
      arr.push(tmpl);
    }
    this.setData({movies: arr})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})