<template>
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
  <el-form-item >   
  问卷名 <el-input placeholder="请输入问卷名" ref="name" v-model="dynamicValidateForm.name" style="width:80%; margin:20px;" ></el-input>
  </el-form-item>
  <el-form-item
    v-for="(questionAndOption, index) in dynamicValidateForm.questionAndOptions"
    :key="questionAndOption.key"
    :prop="'questionAndOptions.' + index + '.questinContext'"
    :rules="{required: true, message: '还有未填', trigger: 'blur'}">
    <!-- 题目不能为空，选项可以为空 -->
   <el-input   placeholder="请输入题目" v-model="questionAndOption.questinContext">
     <template slot="prepend">
     题目{{index+1}}
     </template>
    </el-input>
   <el-input  placeholder="请输入选项A" v-model="questionAndOption.option1"><template slot="prepend">A</template></el-input>
   <el-input placeholder="请输入选项B" v-model="questionAndOption.option2"><template slot="prepend">B</template></el-input>
   <el-input placeholder="请输入选项C" v-model="questionAndOption.option3"><template slot="prepend">C</template></el-input>
   <el-input placeholder="请输入选项D" v-model="questionAndOption.option4"><template slot="prepend">D</template></el-input>
   <el-button @click.prevent="removeDomain(questionAndOption)" style="width:100%" type="warning">删除</el-button>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm(dynamicValidateForm)">发  布</el-button>
    <el-button @click="addDomain">添加题目</el-button>
    <!-- <el-button @click="resetForm(dynamicValidateForm)">重置</el-button> -->
  </el-form-item>
</el-form>
</template>
<script>
// import qs from 'qs' // 使用qs对post传送的据序列化
  export default {
    data() {
      return {
        dynamicValidateForm: {
          questionAndOptions: [{
            questinContext: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            key:'',
            question_number:''
          }],
          name: '',
          time:'',
          userId:this.$store.state.userId
        },
        postData:{
          questionandoptionList:[
            {option1:'',
             option2:'',
             option3:'',
             option4:'',
             question_content:'',
             question_number:''
            }],
          questionnaire_date:'',
          questionnaire_name:'',
          userid:''
        }
      };
    },
    methods: {
      getTime(){  //格式化返回当前时间
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      return yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    },
      submitForm(dynamicValidateForm) {
        dynamicValidateForm.time = this.getTime();
      // console.log(this.$refs.name.value);
        //  console.log( dynamicValidateForm);
         console.log( dynamicValidateForm);
        this.$refs.dynamicValidateForm.validate((valid) => {
          if ( valid && this.$refs.name.value!='') {
            alert('submit!');
            //
            this.postData.questionnaire_date = new Date();
            this.postData.questionnaire_name = dynamicValidateForm.name;
            this.postData.userid = parseInt(sessionStorage.getItem("setUserId"));
            for(let i=0; i<dynamicValidateForm.questionAndOptions.length; i++){
              if(i!=0)
              this.postData.questionandoptionList.push({option1:'', option2:'', option3:'', option4:'', question_content:'', question_number:''})
               this.postData.questionandoptionList[i].question_number = i+1;
               this.postData.questionandoptionList[i].question_content = dynamicValidateForm.questionAndOptions[i].questinContext;
               this.postData.questionandoptionList[i].option1 = dynamicValidateForm.questionAndOptions[i].option1;
               this.postData.questionandoptionList[i].option2 = dynamicValidateForm.questionAndOptions[i].option2;
               this.postData.questionandoptionList[i].option3 = dynamicValidateForm.questionAndOptions[i].option3;
               this.postData.questionandoptionList[i].option4 = dynamicValidateForm.questionAndOptions[i].option4; 
            }
          console.log(JSON.stringify(this.postData));
            this.axios({
              method:"post",
                url:'http://127.0.0.1:8888/questionnaire/Insert',
                data: JSON.stringify(this.postData),
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'  
                }
            })
            .then(res=>{
                if(res.data.status == 200)
                  this.$message('发布成功')
                else
                  this.$message(res.data.msg)
            })
            .catch(Error=>{
                console.log(Error)
            })


            console.log( this.postData);

            
          } else {
            console.log('error submit!!');
            alert("请填写完整");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.questionAndOptions.indexOf(item)
        console.log(index);
        if (index !== -1) {
          this.dynamicValidateForm.questionAndOptions.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.questionAndOptions.push({
          questinContext: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            key: Date.now(),
             question_number:''
        });
      }
    },
    
  }
</script>
<style  scoped>
.el-form-item__content {
  margin-left: 10px;
}
</style>
