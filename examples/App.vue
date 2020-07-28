<template>
  <div id="app">
    <elt-transfer
        :show-query="true"
        :show-pagination="true"
        :pagination-call-back="paginationCallBack"
        :left-columns="leftColumns"
        :title-texts="['待选','已选']"
        :button-texts="['添加','删除']"
        :query-texts="['筛选','筛选']"
        :table-row-key="row => row.name"
        v-model="tableData"
    >
      <!-- 可以使用插槽获取到列信息和行信息，从而进行数据的处理 -->
      <template v-slot:default="{scope}">
        <div>
          <span v-if="scope.col.id === 'gender'">{{scope.row.gender === '男' ? '男生' : '女生'}}</span>
          <span v-else>{{scope.row[scope.col.id]}}</span>
        </div>
      </template>
      <template v-slot:leftCondition="{scope}">
        <el-form-item label="姓名">
          <el-input v-model="scope.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="scope.age" placeholder="年龄"></el-input>
        </el-form-item>
      </template>
      <template v-slot:rightCondition="{scope}">
        <el-form-item label="名称">
          <el-input v-model="scope.name" placeholder="名称"></el-input>
        </el-form-item>
      </template>
    </elt-transfer>
    <div>
      v-Model : {{tableData.length}}
    </div>
  </div>
</template>

<script>

  import eltTransfer from '../src/eltTransfer'

  export default {
    name: 'app',
    data() {
      return {
        tableData: [
          {name: '方琼岚', gender: '女', age: 15},
          {name: '焉彦珺', gender: '女', age: 15}
        ],
        leftColumns: [
          {label: '姓名', id: 'name', width: '120px'},
          {label: '性别', id: 'gender', width: '120px'},
          {label: '年龄', id: 'age',}
        ],

        data1: [
          {name: '佘寄南', gender: '男', age: 12},
          {name: '聊夏云', gender: '男', age: 13},
          {name: '出凌柏', gender: '男', age: 14},
          {name: '丛琴心', gender: '女', age: 15},
          {name: '方琼岚', gender: '女', age: 15},
          {name: '焉彦珺', gender: '女', age: 15},
          {name: '第凝旋', gender: '女', age: 15},
          {name: '续文君', gender: '女', age: 15},
          {name: '独松雪', gender: '女', age: 15},
          {name: '有念桃', gender: '女', age: 15},
          {name: '闻人晶瑶', gender: '男', age: 12},
          {name: '祖震博', gender: '男', age: 13},
          {name: '史妞妞', gender: '男', age: 14},
          {name: '天如风', gender: '女', age: 15},
          {name: '隗飞昂', gender: '女', age: 15},
          {name: '堵舒', gender: '女', age: 15},
          {name: '菅芬', gender: '女', age: 15},
          {name: '疏千风', gender: '女', age: 15},
          {name: '项虹颖', gender: '女', age: 15},
          {name: '劳念云', gender: '女', age: 15},
          {name: '闻凝绿', gender: '男', age: 12},
          {name: '牧冬莲', gender: '男', age: 13},
          {name: '楚驰颖', gender: '男', age: 14},
          {name: '奕丹山', gender: '女', age: 15},
          {name: '姬孤晴', gender: '女', age: 15},
          {name: '邛俊晤', gender: '女', age: 15},
          {name: '悟瑜蓓', gender: '女', age: 15},
          {name: '桓嘉颖', gender: '女', age: 15},
          {name: '卿安琪', gender: '女', age: 15},
          {name: '程宾', gender: '女', age: 15},
          {name: '答斐', gender: '男', age: 12},
          {name: '竺琬凝', gender: '男', age: 13},
          {name: '谷鸿才', gender: '男', age: 14},
          {name: '牵忆南', gender: '女', age: 15},
          {name: '飞晓彤', gender: '女', age: 15},
          {name: '范鸿波', gender: '女', age: 15},
          {name: '庚经亘', gender: '女', age: 15},
          {name: '干芮欣', gender: '女', age: 15},
          {name: '才靖荷', gender: '女', age: 15},
          {name: '原婧', gender: '女', age: 15},
          {name: '士霞飞', gender: '男', age: 12},
          {name: '首雨安', gender: '男', age: 13},
          {name: '保皛', gender: '男', age: 14},
          {name: '皇甫文轩', gender: '女', age: 15},
          {name: '颛孙兴平', gender: '女', age: 15},
          {name: '水鸾', gender: '女', age: 15},
          {name: '仉棠', gender: '女', age: 15},
          {name: '伦昊昊', gender: '女', age: 15},
          {name: '速晟睿', gender: '女', age: 15},
          {name: '万俟仪芳', gender: '女', age: 15},
          {name: '卫孟', gender: '男', age: 12},
          {name: '仆访波', gender: '男', age: 13},
          {name: '奚冰海', gender: '男', age: 14},
          {name: '褚冰香', gender: '女', age: 15},
          {name: '布凌丝', gender: '女', age: 15},
          {name: '苦星', gender: '女', age: 15},
          {name: '钦忆安', gender: '女', age: 15},
          {name: '姒晓曼', gender: '女', age: 15},
          {name: '蒉英武', gender: '女', age: 15},
          {name: '锺晴美', gender: '女', age: 15},
          {name: '泥元槐', gender: '男', age: 12},
          {name: '买初珍', gender: '男', age: 13},
          {name: '秦乾', gender: '男', age: 14},
          {name: '谭白山', gender: '女', age: 15},
          {name: '登幻翠', gender: '女', age: 15},
          {name: '蚁盼夏', gender: '女', age: 15},
          {name: '居梓莹', gender: '女', age: 15},
          {name: '中觅风', gender: '女', age: 15},
          {name: '慈珺琦', gender: '女', age: 15},
          {name: '谏听云', gender: '女', age: 15},
          {name: '应鹏煊', gender: '男', age: 12},
          {name: '驹霁', gender: '男', age: 13},
          {name: '慕容智纯', gender: '男', age: 14},
          {name: '可茹薇', gender: '女', age: 15},
          {name: '夫冰薇', gender: '女', age: 15},
          {name: '李朋', gender: '女', age: 15},
          {name: '轩辕萍韵', gender: '女', age: 15},
          {name: '简沛蓝', gender: '女', age: 15},
          {name: '粟阳舒', gender: '女', age: 15},
          {name: '郦高韵', gender: '女', age: 15},
        ]
      }
    },
    components: {
      'elt-transfer': eltTransfer
    },
    methods: {
      paginationCallBack(obj) {
        // console.log(obj)
        let d = this.data1.filter((item, index) => {
          if (index >= (obj.pageIndex - 1) * obj.pageSize && index < obj.pageIndex * obj.pageSize) {
            return true;
          }
          return false;
        });
        return new Promise(((resolve, reject) => {
          try {
            resolve({total: this.data1.length, data: d})
          } catch {
            reject()
          }
        }))
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
