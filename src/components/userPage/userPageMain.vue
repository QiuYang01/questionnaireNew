<template>
<div >
    <div @click="read(item.id)" v-for="item in allinfo" :key="item.id">
    <el-card class="box-card" shadow="always" >
        <div class="name"><label>问卷名</label>{{item.name}}</div>
        <div class="time"><label>时间</label>{{item.time}}</div>
        <div class="id"><label>问卷号</label>{{item.id}}</div>
        <div class="user"><label>发布者</label>{{item.user}}</div>
    </el-card>
    </div>
     <el-card class="box-card" shadow="always" >
        <div class="name"><label>问卷名</label></div>
        <div class="time"><label>时间</label></div>
        <div class="id"><label>问卷号</label></div>
        <div class="user"><label>发布者</label></div>
        <router-link to='/login'><button>后台</button></router-link>
    </el-card>
    
    <el-drawer
    :visible.sync="drawer"
    size="90%"
    direction="ttb"   
    :before-close="handleClose">
     <!-- 每次选不同的问卷都重新渲染，传值不同，在created里面初始化子组件数据 -->
     <carousel v-if="this.drawer" v-bind:questionaire_id="this.wenjuanid" ></carousel>
    </el-drawer>
 </div>
</template>
<script>
import carousel from '@/components/userPage/carousel' //引入走马灯切换题目的组件
export default {
     components:{carousel},     //注册
    data() {
        return {
           wenjuanid:'0',
          drawer: false,  //控制drawer是否显示
          allinfo:[
              
          ]  
        }
    },
    methods:{
        read(key){ //点击后
            //alert(key);
            this.wenjuanid = key;
            this.drawer = true;
        },
         handleClose(done) {
        var msg = "您真的确定要关闭吗？\n\n请确认！"; 
        if (confirm(msg)==true){ 
            this.drawer = false;    //会自动
            done();
        }else{ 
            this.$message('您没有关闭');
        }  
      }
    },
    created(){  //获取数据  
        this.axios.get('http://127.0.0.1:8888/questionnaire/allquestionnaire')
          .then((response)=> {
        console.log(response.data.message.length);
        // this.allinfo = response.data.message;
        for(var i=0; i<response.data.message.length; i++){
            console.log(response.data.message[i]);
            this.allinfo.push( { name:' ',
              time:' ',
              id:' ',
              user:' '})
            this.allinfo[i].name = response.data.message[i].questionnaire_name;
            this.allinfo[i].time = response.data.message[i].questionnaire_date;
            this.allinfo[i].id = response.data.message[i].questionnaire_id;
            this.allinfo[i].user = response.data.message[i].userid;
        }
            
        })
        .catch(function (error) {
        console.log(error);
        });
    }
}
</script>
<style  scoped>
.name,
.id{
    width: 70%;
    float: left;
    padding-bottom: 18px;
     overflow: hidden;  /* //超出文字省略号 */
    text-overflow:ellipsis;
    white-space: nowrap;
}
.time,
.user{
    width: 30%;
    float: right;
     padding-bottom: 18px;
     overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
label {
    font-size: 14px;
    color: skyblue;
    padding-right: 5px
}

  .box-card {
    width: 80%;
    margin: 10px auto;
    text-align: left;
    font-size: 14px;
 
  }
</style>