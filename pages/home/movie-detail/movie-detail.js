// pages/home/movie-detail/movie-detail.js
import { fetchData, starToArray} from '../../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    fetchData('https://douban.uieee.com/v2/movie/subject/'+id).then((res)=>{
      this.processData(res);
    })
  },
  processData(res){
    var data = res.data;
    var movie = {
      image: data.images.medium,
      rating:{
        average:data.rating.average,
        stars: starToArray(data.rating.stars),
        title:data.title,
      },
       summary: data.summary.slice(0,150)+ '...',
    }
    this.setData({
      movie
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindToBig(){
    wx.previewImage({
      urls: [this.data.movie.image],
    })
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