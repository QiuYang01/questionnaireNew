<template>
<div >
    <div v-for="item in allinfo" :key="item.id">
    <el-card class="box-card" shadow="always" >
        <div class="name"><label>问卷名</label>{{item.name}}</div>
        <div class="time"><label>时间</label>{{item.time}}</div>
        <div class="id"><label>问卷号</label>{{item.id}}</div>
        <div class="user"><label>发布者</label>{{item.user}}</div>
    </el-card>
    </div>

 </div>
</template>
<script>
export default {
    data() {
        return {
          allinfo:[
        //       {
        //       name:'',
        //       time:'',
        //       id:'',
        //       user:'',
        //   }
          ]  
        }
    },
    methods:{
        read(key){ //点击后
            alert(key);
        }
    },
    created(){  //获取数据
    // console.log("idshi"+this.$store.state.userId);  刷新会被清掉
    this.axios.get('http://127.0.0.1:8888/questionnaire/myquestionnaire', {params : {id:sessionStorage.getItem("setUserId")}})
          .then((response)=> {
       // console.log(response.data.message.length);
        // this.allinfo = response.data.message;
        for(var i=0; i<response.data.message.length; i++){
           // console.log(response.data.message[i]);
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
    width: 20%;
    float: right;
     padding-bottom: 18px;
     overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
label {
    font-size: 16px;
    color: skyblue;
    padding-right: 10px
}

  .box-card {
    width: 80%;
    margin: 10px auto;
    text-align: left;
    font-size: 16px;
 
  }
</style>