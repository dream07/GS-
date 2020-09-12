<template>
  <div class="member-container">
    <el-dialog
      title="详情"
      :visible.sync="detailFeed"
      width="30%"
      :before-close="handleClose"
      top="10vh"
    >
      <el-form
        ref="detailFeedForm"
        :model="detailFeedForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户ID"
          prop="name"
        >
          <el-input v-model="detailFeedForm.mid" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="name"
        >
          <el-input v-model="detailFeedForm.tel" />
        </el-form-item>
        <el-form-item
          label="反馈时间"
          prop="name"
        >
          <el-input v-model="detailFeedForm.addtime" />
        </el-form-item>
        <el-form-item
          label="反馈内容"
          prop="name"
        >
          <el-input
            v-model="detailFeedForm.content"
            type="textarea"
          />
        </el-form-item>
        <div
          v-if="detailFeedForm.list.length==0"
          style="text-align: center;"
        >
          <el-divider>暂无客服回复</el-divider>
        </div>
        <div
          v-for="(item,index) in detailFeedForm.list"
          :key="item.id"
        >
          <el-divider />
          <el-form-item
            label="客服回复"
            prop="name"
            style="margin-top: -10px;"
          >
            <el-button
              v-if="item.type==3"
              type="success"
              plain
              round
              size="mini"
            >
              已处理
            </el-button>
            <el-button
              v-if="item.type==2"
              type="warning"
              plain
              round
              size="mini"
            >
              延期处理
            </el-button>
            <el-button
              v-if="item.type==1"
              type="primary"
              plain
              round
              size="mini"
            >
              待处理
            </el-button>
          </el-form-item>
          <el-form-item
            label="回复时间"
            prop="desc"
            style="margin-top: -10px;"
          >
            <el-input v-model="item.addtime" />
          </el-form-item>
          <el-form-item
            label="回复内容"
            prop="desc"
          >
            <el-input
              v-model="item.content"
              type="textarea"
            />
          </el-form-item>
        </div>


        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handelFeed = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="处理"
      :visible.sync="handelFeed"
      width="30%"
      :before-close="handleClose"
      top="5vh"
    >
      <el-form
        ref="handelFeedForm"
        :model="handelFeedForm"
        :rules="handelRuleFeed"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="回复标题"
          prop="title"
        >
          <el-input v-model="handelFeedForm.title" />
        </el-form-item>
        <el-form-item
          label="回复内容"
          prop="content"
        >
          <el-input v-model="handelFeedForm.content" />
        </el-form-item>
        <el-form-item
          label="处理状态"
          prop="type"
        >
          <el-select
            v-model="handelFeedForm.type"
            placeholder="请选择处理状态"
            style="width: 100%;"
          >
            <el-option
              label="待处理"
              :value="1"
            />
            <el-option
              label="延期处理"
              :value="2"
            />
            <el-option
              label="已处理"
              :value="3"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="结果通知"
          prop="enable"
        >
          <el-select
            v-model="handelFeedForm.enable"
            placeholder="请选择通知方式"
            style="width: 100%;"
          >
            <el-option
              label="通知"
              :value="1"
            />
            <el-option
              label="不通知"
              :value="0"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handelFeedFormSure('handelFeedForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div class="global">
      <div class="globalTop">
        <div class="seachBox">
          <el-input
            v-model="searchForm.content"
            placeholder="请输入关键字"
            style="width: 200px;"
          />
          <el-select
            v-model="searchForm.type"
            placeholder="处理状态"
            style="margin-left: 20px;"
            @change="dataInit"
          >
            <el-option
              label="全部"
              value="-1"
            />
            <el-option
              label="未处理"
              value="0"
            />
            <el-option
              label="待处理"
              value="1"
            />
            <el-option
              label="延期处理"
              value="2"
            />
            <el-option
              label="已处理"
              value="3"
            />
          </el-select>
          <el-button
            type="success"
            style="margin-left: 20px;"
            @click="dataInit"
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
        <!-- <el-button type="primary" icon="el-icon-folder-add" size="medium" @click="handelFeed=true">新建视频
        </el-button> -->
      </div>
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />意见反馈列表
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
              label="ID"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="反馈内容"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="反馈时间"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.addtime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="处理状态"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.type==0">未处理</span>
                <span v-if="scope.row.type==1">待处理</span>
                <span v-if="scope.row.type==2">延期处理</span>
                <span v-if="scope.row.type==3">已处理</span>
              </template>
            </el-table-column>
            <el-table-column
              label="处理时间"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cltime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="通知结果"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.enable==-1">未处理</span>
                <span v-if="scope.row.enable==0">不发送通知</span>
                <span v-if="scope.row.enable==1">发送通知</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="208px"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDetail(scope.row.id)"
                >
                  详情
                </el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row.id)"
                >
                  处理
                </el-button>
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
        handelFeed: false,
        detailFeed: false,
        collectTan: false,
        imageUrl: '',
        searchForm: {
          content: '',
          type: ''
        },
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

        detailFeedForm: {
          mid: '',
          content: '',
          addtime: '',
          tel: '',
          list: []
        },
        handelFeedForm: {
          content: '',
          title: '',
          type: '',
          enable: '',
        },
        handelRuleFeed: {
          content: [
            { required: true, message: '请输入回复内容', trigger: 'blur' },
          ],
          title: [
            { required: true, message: '请输入回复标题', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择处理状态', trigger: 'change' },
          ],
          enable: [
            { required: true, message: '请输入选择通知方式', trigger: 'change' },
          ]
        },
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
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
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
        this.$axios.post('/admin/Msg/getFeedList', {
          token: this.token,
          content: this.searchForm.content,
          type: this.searchForm.type == '' ? '-1' : this.searchForm.type,
          limit: this.limit,
          page: this.page
        }, response => {
          console.log(response);
          this.total = response.count;
          this.tableData = response.list;
          this.loading = false;
        })
      },
      handleDetail(id) {
        this.detailFeed = true
        this.id = id
        this.$axios.post('/admin/Msg/getFeedForm', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          this.detailFeedForm.mid = response.info.mid
          this.detailFeedForm.content = response.info.content
          this.detailFeedForm.addtime = response.info.addtime
          this.detailFeedForm.tel = response.info.tel
          this.detailFeedForm.list = response.list
        })
      },
      handleEdit(id) {
        this.handelFeed = true
        this.id = id
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.handelFeed = false
            this.detailFeed = false
            done();
          })
          .catch(_ => { });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
      },
      seachReset() {
        this.searchForm.content = ''
        this.searchForm.type = ''
        this.dataInit()
      },
      handleSizeChange(val) {
        this.limit = val;
        this.dataInit();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.dataInit();
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
      handelFeedFormSure(handelFeedForm) {
        this.$refs[handelFeedForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/Msg/getFeedType', {
              token: this.token,
              id: this.id,
              title: this.handelFeedForm.title,
              type: this.handelFeedForm.type,
              content: this.handelFeedForm.content,
              enable: this.handelFeedForm.enable,
            }, response => {
              this.$refs[handelFeedForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.handelFeed = false;
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      }
    },
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }

  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }

  .global {
    padding: 20px;
  }

  .tabBox {
    border: 1px solid #ddd;
    margin-top: 20px;
    border-bottom: none;
  }

  .globalTop {
    display: flex;
    display: -ms-flexbox;
    justify-content: space-between;
    -ms-flex-pack: justify;
    align-items: center;
    -ms-flex-align: center;
  }

  .foodrecordTable {
    padding-top: 0;
    border: 1px solid #ddd;
  }

  .moreHandle {
    display: -webkit-box;
    display: flex;
    display: -ms-flexbox;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -ms-flex-pack: justify;
    -webkit-box-align: center;
    align-items: center;
    -ms-flex-align: center;
  }

  .title {
    font-size: 14px;
    padding: 10px;
    color: #5e6d82;
    font-family: auto;
  }

  .title i {
    margin-right: 5px;
  }

  .foodBotBox {
    margin-top: 18px;
  }

  .el-table th {
    font-family: auto;
  }
</style>