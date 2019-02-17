<template>
  <div>
    <ul>
      <li v-for="(record, index) in records" :class="{ red: aa }" :key="index">
        {{index+1}} :  {{record.start_time}} 到 {{record.finish_time}}
        <!--<card :text="record.start_time"></card>-->

      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },


  data () {
    return {
      logs: [],
      records:[],
      userName: ''
    }
  },

  methods:{

    dateFtt(fmt,date)
    { //author: meizz
      var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    },

getRecords(){

      var that = this;
      wx.request({
        url: "https://gopher.imdo.co/GetRecords",
        data:{
          'name': this.userName,
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
          console.log("success");
          clearInterval(that.intervalNum);

          for(var i = 0; i < res.data.records.length; i++){
            var startDate = new Date(res.data.records[i].start_time)
            var finishDate = new Date(res.data.records[i].finish_time)
            res.data.records[i].start_time = that.dateFtt("MM.dd hh:mm:ss", startDate);
            res.data.records[i].finish_time = that.dateFtt("MM.dd hh:mm:ss", finishDate);
          }

          that.records = res.data.records
        },

        fail: function(res) {
          console.log("fail");
          clearInterval(that.intervalNum);
          that.intervalNum = setInterval(that.getRecords, 30000)
        },
      })
    }

  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))

  },

  onLoad(options){
    this.userName = options.username
    this.getRecords()
  },

  onReady(){

  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
