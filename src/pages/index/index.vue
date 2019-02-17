<template>
  <div class="container">

    <mp-button open-type="getUserInfo" @getuserinfo="getUserInfo">用户授权</mp-button>

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>


    <mp-button type="primary"  btnClass="mb15" @click="Send2Srv_Work" :disabled="dis1">加班打卡</mp-button>
    <mp-button type="primary"  btnClass="mb15" @click="Send2Srv_Rest" :disabled="dis2">下班打卡</mp-button>
    <mp-button type="primary"  btnClass="mb15" @click="GetOvertimeRecords">加班记录</mp-button>


    <mp-toast :type="warn"  v-model="showToast" :content="content" :duration="2000"></mp-toast>
    <mp-toast :type="warn"  v-model="showToastLogin" :content="contentLogin" :duration="2000"></mp-toast>

  </div>
</template>

<script>
import card from '@/components/card'
import mpButton from 'mpvue-weui/src/button'
import mpToast from 'mpvue-weui/src/toast'


export default {
  data () {
    return {
      lastTouchTime: 0,
      startTime: 0,
      finishTime: 0,
      dis1: false,
      dis2: true,
      intervalNum: '',
      showToast: false,
      showToastLogin: false,
      content: "60秒内不许再次打卡",
      contentLogin: '未登录',
      userInfo: 0,
      status: 1,
    }
  },

  components: {
    card,
    mpButton,
    mpToast
  },

  methods: {

    GetOvertimeRecords(){
      if(this.userInfo == 0){
        this.showToastLogin = true;
        return;
      }
      wx.navigateTo({
        url: '/pages/records/main?username='+this.userInfo
      })
    },

    Send2Srv_Rest(){
      if(this.userInfo == 0){
        this.showToastLogin = true;
        return;
      }
      this.finishTime = new Date().getTime();
      var that = this;

      // if(this.finishTime - this.lastTouchTime > 60000)
      // {
      //   this.lastTouchTime = this.finishTime;
      // }
      // else {
      //   this.showToast = true;
      //   return;
      // }


      wx.request({
        url: "https://gopher.imdo.co/ModifyRecord",
        //url: "http://127.0.0.1:12000/record",
        data:{
          'type': '0',
          'finish_time': this.finishTime.toString(),
          'name': this.userInfo,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
          console.log("success");
          clearInterval(that.intervalNum);
          wx.setStorage({
            key: 'status',
            data: 1,
          })
          that.dis2 = true;
          that.dis1 = false;
        },

        fail: function(res) {
          console.log("fail");
          clearInterval(that.intervalNum);
          that.intervalNum = setInterval(that.Send2Srv_Rest, 30000)
        },
      })
    },

    Send2Srv_Work(){
      if(this.userInfo == 0){
        this.showToastLogin = true;
        return;
      }
      this.startTime = new Date().getTime();
      var that = this;

      // if(this.startTime - this.lastTouchTime > 60000)
      // {
      //   this.lastTouchTime = this.startTime;
      // }
      // else {
      //   this.showToast = true;
      //   return;
      // }

      wx.request({
        url: "https://gopher.imdo.co/AddRecord",
        //url: "http://127.0.0.1:12000/record",
        data:{
          'type': '1',
          'start_time': this.startTime.toString(),
          'name': this.userInfo,
          'description': 'test'
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
          console.log("success");
          clearInterval(that.intervalNum);
          wx.setStorage({
            key: 'status',
            data: 0,
          })
          that.dis2 = false;
          that.dis1 = true;
        },

        fail: function(res) {
          console.log("fail");
          clearInterval(that.intervalNum);
          that.intervalNum = setInterval(that.Send2Srv_Work, 30000)
        },
      })

    },

    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      var that = this;

      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(data) {
                console.log(data.userInfo)
                that.userInfo = data.userInfo.nickName;
              }
            })
          } else {
            // 没有授权过的用户，跳转到自己写的授权提示页面
            wx.navigateTo({
              url: '/pages/getUserInfo/main'
            })
          }
        }
      })
    },

    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    login(){
      // 调用登录接口
      wx.login({
        success: () => {
          console.log("login success");
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.login()
    this.getUserInfo()

  },

  onReady(){
    var that = this;
    wx.getStorage({
      key: 'status',

      success(res) {
        console.log(res.data)
        if(res.data == 0){ //上班打卡禁用，下班打卡有效
          that.dis1 = true;
          that.dis2 = false;
        }
        else if (res.data == 1){
          that.dis2 = true;
          that.dis1 = false;
        }
        console.log("读取成功");
      },

      fail(res){
        console.log("小程序首次运行");
        wx.setStorage({
          key: 'status',
          data: 1,
        })
        that.dis2 = true;
        that.dis1 = false;
        console.log("初始化写入成功");
      }

    })

  }


}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 80px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

</style>
