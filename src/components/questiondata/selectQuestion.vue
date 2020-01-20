<template>
<div >
    <div @click="read(item.id)" v-for="item in allinfo" :key="item.id">
    <el-card class="box-card" shadow="always" >
        <div class="name"><label>问卷名</label>{{item.name}}</div>
        <div class="time"><label>时间</label>{{item.time}}</div>
    </el-card>
    </div>
     
    
    <el-drawer
    :visible.sync="drawer"
    size="90%"
    direction="ttb"   
    :before-close="handleClose">
     <!-- 每次选不同的问卷都重新渲染，传值不同，在created里面初始化子组件数据 -->
     <div>    
         <showData v-for="(item,index) in questionAndOptonNum" :key="index" :questionAndOptonNum="item" :index="index">11</showData>
    </div>
     <!-- <carousel v-if="this.drawer" v-bind:questionaire_id="this.wenjuanid" ></carousel> -->
    </el-drawer>
 </div>
    
</template>
<script>
import showData from '@/components/questiondata/showdata' //引入走马灯切换题目的组件
export default {
    components:{showData},
    data() {
        return {
             drawer: false,  //控制drawer是否显示,
             allinfo:[] ,
            questionAndOptonNum:[
                {
                    options:[
                            {value:335, name:'选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1'},
                            {value:310, name:'选项2'},
                            {value:234, name:'选项3'},
                            {value:135, name:'选项4'}
                           ],
                    titleText:'题目一题目一题目一题目一题目一题目一',
                },
                {
                    options:[
                            {value:335, name:'选项1'},
                            {value:310, name:'选项2'},
                            {value:234, name:'选项3'},
                            {value:135, name:'选项4'}
                           ],
                    titleText:'题目2',
                },
                 {
                    options:[
                           {value:335, name:'选项1'},
                            {value:310, name:'选项2'},
                            {value:234, name:'选项3'},
                            {value:135, name:'选项4'}
                           ],
                    titleText:'题目3',
                },
            ]
        }
    },
    methods:{
        read(key){ //点击后
            //alert(key);
            console.log("问卷id为"+key);
    // 在这里通过问卷id查出题目和选项和答案赋值
            this.drawer = true;
        },
         handleClose(done) {
            done();
      }
    },
    created(){  //获取数据  
        this.axios.get('http://127.0.0.1:8888/questionnaire/allquestionnaire')
          .then((response)=> {
        console.log(response.data.message.length);
        // this.allinfo = response.data.message;
        //将获取的数据赋值给data
        for(var i=0; i<response.data.message.length; i++){
            console.log(response.data.message[i]);
            this.allinfo.push( { name:' ', time:' ',  id:' ', user:' '})
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
.time
{
    width: 70%;
    float: left;
    padding-bottom: 18px;
     overflow: hidden;  /* //超出文字省略号 */
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