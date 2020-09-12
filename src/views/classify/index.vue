<template>
  <div class="member-container">
    <el-dialog
      title="新建分类"
      :visible.sync="addClass"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="addClassForm"
        :model="addClassForm"
        :rules="addClassRuleForm"
        label-width="79px"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择分类" style="width: 100%;">
            <el-option label="首页" value="shanghai"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item
          label="年级名称"
          prop="gradename"
        >
          <el-input
            v-model="addClassForm.gradename"
            placeholder="请输入年级名称"
          />
        </el-form-item>
        <el-form-item
          label="序号"
          prop="sort"
        >
          <el-input
            v-model="addClassForm.sort"
            placeholder="请输入排序号"
          />
        </el-form-item>
        <!-- <el-form-item label="图片" prop="region">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="addClassFormSure('addClassForm')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑分类"
      :visible.sync="editClass"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="editClassForm"
        :model="editClassForm"
        :rules="editClassRuleForm"
        label-width="79px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="年级名称"
          prop="gradename"
        >
          <el-input
            v-model="editClassForm.gradename"
            placeholder="请输入年级名称"
          />
        </el-form-item>
        <el-form-item
          label="序号"
          prop="sort"
        >
          <el-input
            v-model="editClassForm.sort"
            placeholder="请输入排序号"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="editClassFormSure('editClassForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div class="global">
      <!-- <div class="seachBox">
        <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-select v-model="value" placeholder="年级" style="margin-left: 20px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input v-model="keyword" placeholder="用户名/手机号" style="width: 200px; margin-left: 20px;"></el-input>
        <el-button type="success" style="margin-left: 20px;">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </div> -->
      <el-button
        icon="el-icon-folder-add"
        type="primary"
        size="mini"
        @click="addClass=true"
      >
        新建分类
      </el-button>
      <!-- <div class="tabBox"> -->
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />分类列表
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
              <!-- <el-popover
                      placement="bottom"
                      title="标题"
                      width="200"
                      trigger="click"
                      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                      style="width:30px;height: 30px;">
                      <el-button slot="reference" size="small"
                          style="padding:5px;height: 30px;border-radius: 0;vertical-align: top;">
                          <i class="iconfont icon-filter" style="display: inline-block;width: 18px;height: 18px;font-size: 17px;"></i>
                      </el-button>
                    </el-popover> -->
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
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="100px"
            />
            <el-table-column
              label="年级名称"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.gradename }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row.id)"
                >
                  编辑
                </el-button>
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="再想想"
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除该信息"
                  @onConfirm="handleDelete(scope.row.id,scope.$index)"
                >
                  <el-button
                    slot="reference"
                    style="margin-left: 10px;"
                    size="mini"
                    type="danger"
                    :class="[scope.row.specialoffer==true ? 'putaway' : '']"
                  >
                    删除
                  </el-button>
                </el-popconfirm>
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
        addClass: false,
        editClass: false,
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        addClassRuleForm: {
          gradename: [
            { required: true, message: '请输入年级名称', trigger: 'blur' },
          ],
          sort: [
            { required: true, message: '请输入序号', trigger: 'blur' },
          ]

        },
        editClassRuleForm: {
          gradename: [
            { required: true, message: '请输入年级名称', trigger: 'blur' },
          ],
          sort: [
            { required: true, message: '请输入序号', trigger: 'blur' },
          ]
        },
        addClassForm: {
          gradename: '',
          sort: ''
        },
        editClassForm: {
          gradename: '',
          sort: ''
        },

        imageUrl: '',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },

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
        options: [],
        value: '',
        tableData: [],
        id: ''
      }
    },
    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editormember'
      // }
      this.token = this.$Cookies.get('Admin-Token');
      this.dataInit()
    },
    methods: {
      dataInit() {
        this.loading = true;
        this.$axios.post('/admin/main/getGradeList', {
          token: this.token,
          limit: this.limit,
          page: this.page
        }, response => {
          console.log(response);
          this.total = response.count;
          this.tableData = response.list;
          this.loading = false;
        })
      },
      addClassFormSure(addClassForm) {
        this.$refs[addClassForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/main/getGradeAdd', {
              token: this.token,
              gradename: this.addClassForm.gradename,
              sort: this.addClassForm.sort
            }, response => {
              this.$refs[addClassForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.addClass = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      editClassFormSure(editClassForm) {
        this.$refs[editClassForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/main/getGradeEdit', {
              token: this.token,
              id: this.id,
              gradename: this.editClassForm.gradename,
              sort: this.editClassForm.sort
            }, response => {
              this.$refs[editClassForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.editClass = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      handleEdit(index, id) {
        this.editClass = true;
        this.id = id
        this.$axios.post('/admin/main/getGradeForm', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          this.editClassForm.gradename = response.data.gradename
          this.editClassForm.sort = response.data.sort
        })
      },
      handleDelete(id,index) {
        this.$axios.post('/admin/main/getGradeDel', {
          token: this.token,
          id: id,
        }, response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success'
            });
            this.tableData.splice(index, 1)
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.addClass = false
            this.editClass = false
            done();
          }).catch(_ => { });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
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