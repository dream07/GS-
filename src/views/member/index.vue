<template>
  <div class="member-container">
    <div class="global">
      <div class="seachBox">
        <el-date-picker
          v-model="searchForm.time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="注册开始日期"
          end-placeholder="注册结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="onPick"
        />
        <el-select
          v-model="searchForm.grade"
          placeholder="年级"
          style="margin-left: 20px;"
          @change="dataInit"
        >
          <el-option
            label="全部"
            value="0"
          />
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.gradename"
            :value="item.id"
          />
        </el-select>
        <el-input
          v-model="searchForm.key"
          placeholder="用户名/手机号"
          style="width: 200px; margin-left: 20px;"
        />
        <el-button
          type="success"
          style="margin-left: 20px;"
          @click="tableSearch"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          @click="seachReset"
        >
          重置
        </el-button>
      </div>
      <!-- <div class="tabBox"> -->
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />会员列表
            </p>
            <!-- <el-button type="primary" size="mini" icon="el-icon-folder-add">新增菜品</el-button> -->
            <!-- <el-button plain size="mini">批量修改</el-button> -->
            <!-- <el-tooltip class="item" effect="dark" content="导出" placement="top-start">
                      <el-button type="primary" plain size="mini" icon="el-icon-upload"></el-button>
                  </el-tooltip> -->
            <div
              class="moreHandleRight"
              style="margin-right:50px"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="导出"
                placement="top"
              >
                <el-button
                  icon="el-icon-upload"
                  size="small"
                  style="padding: 5px;height: 30px;font-size: 18px;border-radius: 0;margin-left:10px"
                  @click="exportToExcel"
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="打印"
                placement="top"
              >
                <el-button
                  icon="el-icon-printer"
                  size="small"
                  style="padding: 5px;height: 30px;font-size: 18px;border-radius: 0;"
                  @click="printContent"
                />
              </el-tooltip>
            </div>
          </div>
          <el-table
            id="foodtable"
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
          >
            <el-table-column
              label="用户名"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.tel }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="年级"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.grade=='0'?'无':scope.row.grade }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="积分"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.integral_total }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="在线时长"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.viewingtime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="注册时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.addtime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="最后观看时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.viewingendtime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row.mid)"
                >
                  查看详情
                </el-button>
                <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="1"
            :page-sizes="[5, 10, 15, 20, 25, 30]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin: 10px 0 10px 10px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>


  export default {

    data() {
      return {
        currentRole: 'adminmember',
        page: 1,
        limit: 10,
        total: 0,
        loading: true,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
        keyword: '',
        searchForm: {
          key: '',
          time: ['', ''],
          grade: ''
        },
        options: [],
        value: '',
        tableData: []

      }
    },

    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editormember'
      // }
      this.token = this.$Cookies.get('Admin-Token');
      this.dataInit();
      this.$axios.post('/admin/main/getGradeList', {
        token: this.token,
        limit: 1000,
        page: 1
      }, response => {
        console.log(response);
        this.options = response.list
      })
    },
    methods: {
      dataInit() {
        this.loading = true;
        this.$axios.post('/admin/index/getMemberList', {
          token: this.token,
          key: this.searchForm.key,
          grade: this.searchForm.grade == '' ? '-1' : this.searchForm.grade,
          starttime: this.searchForm.time[0],
          endtime: this.searchForm.time[1],
          limit: this.limit,
          page: this.page
        }, response => {
          console.log(response);
          this.total = response.data.count;
          this.tableData = response.data.list;
          this.loading = false;
        })
      },
      handleEdit(id) {
        this.$router.push({ path: '/memberDetail', query: { globId: id } })
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      exportToExcel() {
        let et = this.XLSX.utils.table_to_book(document.getElementById('foodtable')); //此处传入table的DOM节点
        let etout = this.XLSX.write(et, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        });
        try {
          this.FileSaver.saveAs(new Blob([etout], {
            type: 'application/octet-stream'
          }), 'trade-publish.xlsx');   //trade-publish.xlsx 为导出的文件名
        } catch (e) {

        }
        return etout;
      },
      printContent() {
        //判断iframe是否存在，不存在则创建iframe
        var el = document.getElementById("foodtable");
        var iframe = document.getElementById("print-iframe");
        if (!iframe) {
          iframe = document.createElement('IFRAME');
          var doc = null;
          iframe.setAttribute("id", "print-iframe");
          iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
          document.body.appendChild(iframe);

          //这里可以自定义样式
          //doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
        }
        doc = iframe.contentWindow.document;
        doc.write("<style>.cell {text-align: center;line-height: 40px;}</style>");
        doc.write('<div>' + el.innerHTML + '</div>');
        doc.close();
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0) {
          document.body.removeChild(iframe);
        }
      },
      handleSizeChange(val) {
        this.limit = val;
        this.dataInit();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.dataInit();
      },
      onPick(date) {
        this.searchForm.time[0] = date[0];
        this.searchForm.time[1] = date[1];
      },
      tableSearch() {
        this.dataInit()
      },
      seachReset() {
        this.searchForm.key = ''
        this.searchForm.time = ['', '']
        this.searchForm.grade = ''
        this.dataInit()
      }
    },
  }
</script>

<style>
  .global {
    padding: 20px;
  }

  .tabBox {
    border: 1px solid #ddd;
    margin-top: 20px;
    border-bottom: none;
  }
</style>