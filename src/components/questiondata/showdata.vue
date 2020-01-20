<template>
  <div class="shoowdata">
     <div class="pie">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div class="mainnn" style="width:100%;height: 300px"></div>
                <!-- 如果使用id后面的会覆盖前面的 -->
    </div>
  </div>
</template>

<script>
export default { // 显示结果的组件，画饼图，传入题目和选项和对应人数
  props:["questionAndOptonNum","index"],
  data() {
    return {
      options:[
                
              ],
      titleText:''
      
    }
  },
 mounted(){
     console.log(this.questionAndOptonNum+this.index);
    this.options = this.questionAndOptonNum.options;
     this.titleText = this.questionAndOptonNum.titleText;
    // console.log(this.options)
    this.initData();
  },
  methods:{
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementsByClassName("mainnn")[this.index]);
      // 绘制图表
      myChart.setOption({
          title : {
              text: this.titleText,//主标题
              x:'center',//x轴方向对齐方式
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                //   center: ['50%', '60%'],
                  data:this.options,
                //   itemStyle: {
                //       emphasis: {
                //           shadowBlur: 10,
                //           shadowOffsetX: 0,
                //           shadowColor: 'rgba(0, 0, 0, 0.5)'
                //       }
                //   }
              }
          ]
      });
    },
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoowdata{
    margin-top: 20px;
}
</style>
