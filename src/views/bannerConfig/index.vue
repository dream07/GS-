<template>
  <div class="member-container">
    <el-dialog
      title="添加banner"
      :visible.sync="addBanner"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="addBannerForm"
        :model="addBannerForm"
        :rules="addBannerRuleForm"
        label-width="79px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="分类"
          prop="enable"
        >
          <el-select
            v-model="addBannerForm.enable"
            placeholder="请选择分类"
            style="width: 100%;"
          >
            <el-option
              label="首页"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转路径">
          <el-input
            v-model="addBannerForm.url"
            placeholder="请输入排序号"
          />
        </el-form-item>
        <el-form-item
          label="排序号"
          prop="sort"
        >
          <el-input
            v-model="addBannerForm.sort"
            placeholder="请输入排序号"
          />
        </el-form-item>
        <el-form-item
          label="图片"
          prop="img"
        >
          <el-upload
            class="avatar-uploader"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload1"
          >
            <img
              v-if="addBannerForm.img"
              :src="addBannerForm.img"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="addBannerFormSure('addBannerForm')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑banner"
      :visible.sync="editBanner"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="editBannerForm"
        :model="editBannerForm"
        :rules="editBannerRuleForm"
        label-width="79px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="分类"
          prop="enable"
        >
          <el-select
            v-model="editBannerForm.enable"
            placeholder="请选择分类"
            style="width: 100%;"
          >
            <el-option
              label="首页"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转路径">
          <el-input
            v-model="editBannerForm.url"
            placeholder="请输入排序号"
          />
        </el-form-item>
        <el-form-item
          label="排序号"
          prop="sort"
        >
          <el-input
            v-model="editBannerForm.sort"
            placeholder="请输入排序号"
          />
        </el-form-item>
        <el-form-item
          label="图片"
          prop="img"
        >
          <el-upload
            class="avatar-uploader"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload2"
          >
            <img
              v-if="editBannerForm.img"
              :src="editBannerForm.img"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="editBannerFormSure('editBannerForm')"
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
        @click="addBanner=true"
      >
        新增banner
      </el-button>
      <!-- <div class="tabBox"> -->
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />banner列表
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
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="70px"
            />
            <el-table-column
              label="图片"
              align="center"
            >
              <template slot-scope="scope">
                <img
                  :src="scope.row.img"
                  alt=""
                  style="width: 50px;height: 50px;"
                >
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              align="center"
            >
              <template slot-scope="scope">
                <span>首页</span>
              </template>
            </el-table-column>

            <el-table-column
              label="排序号"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.sort }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.addtime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.dupdatetimeate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.type"
                  :active-value="1"
                  :inactive-value="0"
                  @change="enableSwitch(scope.row.id)"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row.id)"
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
        addBanner: false,
        editBanner: false,
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
        addBannerRuleForm: {
          img: [
            { required: true, message: '请上传banner图片', trigger: 'blur' },
          ],
          enable: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          url: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          sort: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
        },
        editBannerRuleForm: {
          img: [
            { required: true, message: '请上传banner图片', trigger: 'blur' },
          ],
          enable: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          url: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
          sort: [
            { required: true, message: '请选择分类', trigger: 'change' },
          ],
        },
        addBannerForm: {
          img: '',
          enable: '',
          url: '',
          sort: ''
        },
        editBannerForm: {
          img: '',
          enable: '',
          url: '',
          sort: ''
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData: []
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
        this.$axios.post('/admin/main/getBannerList', {
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
      addBannerFormSure(addBannerForm) {
        this.$refs[addBannerForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/main/getBannerAdd', {
              token: this.token,
              img: this.addBannerForm.img,
              enable: this.addBannerForm.enable,
              url: this.addBannerForm.url,
              sort: this.addBannerForm.sort
            }, response => {
              this.$refs[addBannerForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.addBanner = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      editBannerFormSure(editBannerForm) {
        this.$refs[editBannerForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/main/getBannerEdit', {
              token: this.token,
              id: this.id,
              img: this.editBannerForm.img,
              enable: this.editBannerForm.enable,
              url: this.editBannerForm.url,
              sort: this.editBannerForm.sort
            }, response => {
              this.$refs[editBannerForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.editBanner = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      handleEdit(id) {
        this.editBanner = true;
        this.id = id
        this.$axios.post('/admin/main/getBannerform', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          this.editBannerForm.img = response.data.img
          this.editBannerForm.url = response.data.url
          this.editBannerForm.enable = response.data.enable
          this.editBannerForm.sort = response.data.sort
        })
      },
      handleDelete(id, index) {
        this.$axios.post('/admin/main/getBannerDel', {
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
            this.addBanner = false
            this.editBanner = false
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
      handleAvatarSuccess1(res, file) {
        this.addBannerForm.img = res.url
      },
      handleAvatarSuccess2(res, file) {
        this.editBannerForm.img = res.url
      },
      beforeAvatarUpload1(file) {
        console.log(file);
        const isJPG = file.type == 'image/jpeg';
        const isPNG = file.type == 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(isJPG);
        if (!isJPG&&!isPNG) {
          this.$message.error('上传文件后缀不允许');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      beforeAvatarUpload2(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG&&!isPNG) {
          this.$message.error('上传文件后缀不允许');
        }
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
      },
      enableSwitch(id) {
        this.$axios.post('/admin/main/getBannerType', {
          token: this.token,
          id: id,
        }, response => {

        })
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