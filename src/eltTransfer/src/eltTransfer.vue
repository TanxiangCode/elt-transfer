<template>
  <div class="transfer">
    <div class="transfer-panel">
      <p class="transfer-panel-header">
        <span>{{titleTexts && titleTexts[0]}}</span>
        <span>{{leftSelection.length}}/{{leftTableData.length}}</span>
      </p>
      <el-table
          ref="leftTable"
          size="small"
          :max-height="maxHeight"
          :height="minHeight"
          :data="leftTableData"
          :row-style="handleRowStyle"
          @row-click="handleLeftRowClick"
          @selection-change="handleLeftSelectionChange"
          border stripe>
        <el-table-column
            width="40px"
            type="selection"
            :selectable="handleSelectable"></el-table-column>
        <el-table-column v-for="col in leftColumns"
                         :prop="col.id"
                         :key="col.id"
                         :label="col.label"
                         :width="col.width">
          <template slot-scope="scope">
            <slot v-bind:scope="{row: scope.row, col: col}">

            </slot>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-if="showPagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :pager-count="5"
          :total="totalSize"
          layout="total, sizes, prev, pager, next">
      </el-pagination>
    </div>
    <div class="transfer-buttons">
      <el-button
          type="primary"
          :class="buttonClasses"
          @click.native="addToRight"
          :disabled="disabledLeftButton">
        <span v-if="buttonTexts[0] !== undefined" class="button-text">{{ buttonTexts[0] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button
          type="primary"
          :class="buttonClasses"
          @click.native="addToLeft"
          :disabled="rightSelection.length === 0">
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[1] !== undefined" class="button-text">{{ buttonTexts[1] }}</span>
      </el-button>
    </div>
    <div class="transfer-panel">
      <p class="transfer-panel-header">
        <span>{{titleTexts && titleTexts[1]}}</span>
        <span>{{rightSelection.length}}/{{rightTableData.length}}</span>
      </p>
      <el-table
          ref="rightTable"
          size="small"
          :max-height="maxHeight"
          :height="minHeight"
          :data="rightTableData"
          @row-click="handleRightRowClick"
          @selection-change="handleRightSelectionChange"
          border stripe>
        <el-table-column width="40px" type="selection"></el-table-column>
        <el-table-column v-for="col in rightColumns || leftColumns"
                         :prop="col.id"
                         :key="col.id"
                         :label="col.label"
                         :width="col.width">
          <template slot-scope="scope">
            <slot v-bind:scope="{row: scope.row, col: col}">

            </slot>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-if="showPagination"
          :total="rightTableData.length"
          layout="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      // 显示分页
      showPagination: {
        type: Boolean,
        default: false
      },
      // 左侧分页回调
      paginationCallBack: {
        type: Function,
        default: function () {
          return {total: 0, data: null};
        }
      },
      // 标题文本
      titleTexts: {
        type: Array,
        default() {
          return ['待选项', '已选项']
        }
      },
      // 按钮文本
      buttonTexts: {
        type: Array,
        default() {
          return [];
        }
      },

      // 左侧参数
      leftColumns: {
        type: Array,
        default() {
          return [];
        }
      },
      // 右侧参数
      rightColumns: {
        type: Array,
        default() {
          return undefined;
        }
      },
      // 表格最小高度
      minHeight: {
        type: String,
        default: "300px",
      },
      // 表格最大高度
      maxHeight: {
        type: String,
        default: "500px",
      }
    },
    data() {
      return {
        leftTableData: [],
        rightTableData: this.value || [],
        pageIndex: 1,
        pageSize: 20,
        totalSize: 100,
        leftSelection: [],
        rightSelection: [],
      }
    },
    created() {
      this.handlePaginationCallBack();
    },
    computed: {
      hasButtonTexts() {
        return this.buttonTexts.length === 2;
      },
      buttonClasses() {
        return ['transfer-button', {'is-with-texts': this.hasButtonTexts}];
      },
      disabledLeftButton() {
        return !this.leftSelection.some(item => this.rightTableData.indexOf(item) === -1);
      },
    },
    methods: {
      handleLeftSelectionChange(selection) {
        this.leftSelection = selection;
      },
      handleRightSelectionChange(selection) {
        this.rightSelection = selection;
      },
      handleLeftRowClick(row) {
        if (this.rightTableData.indexOf(row) === -1) {
          this.$refs.leftTable.toggleRowSelection(row);
        }
      },
      handleRightRowClick(row) {
        this.$refs.rightTable.toggleRowSelection(row);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.handlePaginationCallBack();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.handlePaginationCallBack();
      },
      handlePaginationCallBack() {
        if (this.showPagination && this.paginationCallBack) {
          let result = this.paginationCallBack.call(null, this.pageIndex, this.pageSize);
          if (result && Array.isArray(result.data)) {
            this.leftTableData = result.data;
            this.totalSize = result.total;
          }

          this.$nextTick(() => {
            this.leftTableData.forEach(item => {
              let index = this.rightTableData.indexOf(item);
              this.$refs.leftTable.toggleRowSelection(item, index !== -1);
            });
          })
        }
      },
      handleRowStyle({row}) {
        if (this.rightTableData.indexOf(row) !== -1) {
          return {
            color: "blue",
          };
        }
        return {};
      },
      handleSelectable(row) {
        return this.rightTableData.indexOf(row) === -1;
      },
      addToRight() {
        for (let item of this.leftSelection) {
          let index = this.rightTableData.indexOf(item);
          if (index === -1) {
            this.rightTableData.push(item);
          }
        }
        this.$emit('input', this.rightTableData);
      },
      addToLeft() {
        this.rightSelection.forEach(item => {
          let index = this.rightTableData.indexOf(item);
          if (index !== -1) {
            this.rightTableData.splice(index, 1);
            this.$refs.leftTable.toggleRowSelection(item, false);
          }
        });
        this.$emit('input', this.rightTableData);
      }
    }
  }
</script>

<style scoped>
  .transfer {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-icon-arrow-right, .el-icon-arrow-left {
    font-size: 40px;
    cursor: pointer;
  }

  .transfer-panel {
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    overflow: hidden;
    background: #FFF;
    display: inline-block;
    width: calc((100% - 100px) / 2);
    max-height: 100%;
    box-sizing: border-box;
    position: relative
  }

  .transfer-panel .transfer-panel-header {
    height: 40px;
    line-height: 40px;
    background: #F5F7FA;
    margin: 0;
    padding-left: 15px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #000;
  }

  .transfer-panel-header span:last-child {
    position: absolute;
    right: 15px;
  }

  .transfer-buttons {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
  }

  .transfer-button {
    display: block;
    margin: 0 auto;
    padding: 10px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    font-size: 0
  }

  .transfer-button .button-text {
    margin-left: 2px;
    margin-right: 5px;
  }

  .transfer-button.is-with-texts {
    border-radius: 4px
  }

  .transfer-button.is-disabled, .transfer-button.is-disabled:hover {
    border: 1px solid #DCDFE6;
    background-color: #F5F7FA;
    color: #C0C4CC
  }

  .transfer-button:first-child {
    margin-bottom: 10px
  }

  .transfer-button:nth-child(2) {
    margin: 0 auto;
  }

  .transfer-button i, .transfer-button span {
    font-size: 14px
  }
</style>
