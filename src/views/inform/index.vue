<template>
  <div class="member-container">
    <el-dialog
      title="新建通知"
      :visible.sync="addInform"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="addInformForm"
        :model="addInformForm"
        :rules="addRuleInform"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="addInformForm.title"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="type"
        >
          <el-select
            v-model="addInformForm.type"
            placeholder="请选择类型"
            style="width: 100%;"
          >
            <el-option
              label="系统通知"
              :value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="通知内容"
          prop="concent"
        >
          <el-input
            v-model="addInformForm.concent"
            type="textarea"
            placeholder="请输入通知内容"
          />
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="enable"
          label-width="79px"
          style="margin-left: -3px;width: 100%;"
        >
          <el-radio-group v-model="addInformForm.enable">
            <el-radio :label="0">
              现在发布
            </el-radio>
            <el-radio :label="1">
              选择时间<el-date-picker
                v-model="addInformForm.releasetime"
                type="date"
                style="margin-left: 20px;width: 70%;"
                placeholder="选择日期"
                :disabled="addInformForm.enable=='0'?true:false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-radio>
          </el-radio-group>
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
          @click="addInformFormSure('addInformForm')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="editInform"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="editInformForm"
        :model="editInformForm"
        :rules="editRuleInform"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="editInformForm.title"
            placeholder="请输入标题"
          />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="type"
        >
          <el-select
            v-model="editInformForm.type"
            placeholder="请选择类型"
            style="width: 100%;"
          >
            <el-option
              label="系统通知"
              :value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="通知内容"
          prop="concent"
        >
          <el-input
            v-model="editInformForm.concent"
            type="textarea"
            placeholder="请输入通知内容"
          />
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="enable"
          label-width="79px"
          style="margin-left: -3px;"
        >
          <el-radio-group v-model="editInformForm.enable">
            <el-radio :label="0">
              现在发布
            </el-radio>
            <el-radio :label="1">
              选择时间<el-date-picker
                v-model="editInformForm.releasetime"
                type="date"
                style="margin-left: 20px;width: 70%;"
                placeholder="选择日期"
                :disabled="editInformForm.enable=='0'?true:false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-radio>
          </el-radio-group>
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
          @click="editInformFormSure('editInformForm')"
        >确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog
      title="查看"
      :visible.sync="detailInform"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="editInformForm"
        :model="editInformForm"
        :rules="editRuleInform"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="editInformForm.title"
            placeholder="请输入标题"
            disabled="disabled"
          />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="type"
        >
          <el-select
            v-model="editInformForm.type"
            placeholder="请选择类型"
            style="width: 100%;"
            disabled="disabled"
          >
            <el-option
              label="系统通知"
              :value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="通知内容"
          prop="concent"
        >
          <el-input
            v-model="editInformForm.concent"
            type="textarea"
            placeholder="请输入通知内容"
            disabled="disabled"
          />
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="enable"
          label-width="79px"
          style="margin-left: -3px;"
        >
          <el-radio-group
            v-model="editInformForm.enable"
            disabled="disabled"
          >
            <el-radio :label="0">
              现在发布
            </el-radio>
            <el-radio :label="1">
              选择时间<el-date-picker
                v-model="editInformForm.releasetime"
                type="date"
                style="margin-left: 20px;width: 70%;"
                placeholder="选择日期"
                :disabled="editInformForm.enable=='0'?true:false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="图片" prop="region">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editInformFormSure('editInformForm')">确 定</el-button>
      </span> -->
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
        @click="addInform=true"
      >
        新增通知
      </el-button>
      <!-- <div class="tabBox"> -->
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />通知列表
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
              label="标题"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="文章内容"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.concent }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="当前状态"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.enable==0">已发布</span>
                <span v-if="scope.row.enable==1">待发布</span>
              </template>
            </el-table-column>
            <el-table-column
              label="发布时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.releasetime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.enable==1"
                  size="mini"
                  style="margin-left: 10px;"
                  @click="handleRelease(scope.$index,scope.row.id)"
                >
                  发布
                </el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row.id)"
                >
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  style="margin-top: 10px;"
                  @click="handleShow(scope.$index, scope.row.id)"
                >
                  查看
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
                    style="margin-left: 10px;margin-top: 10px;"
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
        addInform: false,
        editInform: false,
        detailInform: false,
        page: 1,
        limit: 10,
        total: 0,
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
        addInformForm: {
          title: '',
          type: '',
          concent: '',
          enable: '',
          releasetime: '',
        },
        editInformForm: {
          title: '',
          type: '',
          concent: '',
          enable: '',
          releasetime: '',
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
        addRuleInform: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择通知类型', trigger: 'change' },
          ],
          concent: [
            { required: true, message: '请输入通知内容', trigger: 'blur' },
          ],
          enable: [
            { required: true, message: '请选择发布时间类型', trigger: 'blur' },
          ],
          releasetime: [
            { required: true, message: '请选择发布时间', trigger: 'blur' },
          ],
        },
        editRuleInform: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择通知类型', trigger: 'change' },
          ],
          concent: [
            { required: true, message: '请输入通知内容', trigger: 'blur' },
          ],
          enable: [
            { required: true, message: '请选择发布时间类型', trigger: 'blur' },
          ],
          releasetime: [
            { required: true, message: '请选择发布时间', trigger: 'blur' },
          ],
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
        this.$axios.post('/admin/Msg/getMsgList', {
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
      addInformFormSure(addInformForm) {
        this.$refs[addInformForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/Msg/getMsgAdd', {
              token: this.token,
              title: this.addInformForm.title,
              type: this.addInformForm.type,
              concent: this.addInformForm.concent,
              enable: this.addInformForm.enable,
              releasetime: this.addInformForm.releasetime,
            }, response => {
              this.$refs[addInformForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.addInform = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      editInformFormSure(editInformForm) {
        this.$refs[editInformForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/Msg/getMsgEdit', {
              token: this.token,
              id: this.id,
              title: this.editInformForm.title,
              type: this.editInformForm.type,
              concent: this.editInformForm.concent,
              enable: this.editInformForm.enable,
              releasetime: this.editInformForm.releasetime,
            }, response => {

              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.$refs[editInformForm].resetFields();
                this.editInform = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      handleRelease(index, id) {
        this.$axios.post('/admin/Msg/getMsgType', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success'
            });
            // this.tableData[index].enable = 0;
            this.dataInit()
          } else {
            this.$message.error(response.msg);
          }
        })
      },
      handleShow(index, id) {
        this.detailInform = true
        this.id = id
        this.$axios.post('/admin/Msg/getMsgForm', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          this.editInformForm.title = response.data.title
          this.editInformForm.type = response.data.type
          this.editInformForm.concent = response.data.concent
          this.editInformForm.enable = response.data.enable
          this.editInformForm.releasetime = response.data.releasetime
        })
      },
      handleEdit(index, id) {
        this.editInform = true;
        this.id = id
        this.$axios.post('/admin/Msg/getMsgForm', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          this.editInformForm.title = response.data.title
          this.editInformForm.type = response.data.type
          this.editInformForm.concent = response.data.concent
          this.editInformForm.enable = response.data.enable
          this.editInformForm.releasetime = response.data.releasetime
        })
      },
      handleDelete(id,index) {
        this.$axios.post('/admin/Msg/getMsgDel', {
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
            this.addInform = false
            this.editInform = false
            this.detailInform = false
            done();
          }).catch(_ => { });
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
      handleSizeChange(val) {
        this.limit = val;
        this.dataInit();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.dataInit();
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