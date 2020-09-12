<template>
  <div class="member-container integral">
    <el-dialog
      title="添加规则"
      :visible.sync="addIntegralTan"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="addruleForm"
        :model="addruleForm"
        :rules="addruleRule"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="选择商品"
          prop="product"
        >
          <el-select
            v-model="addruleForm.product"
            placeholder="请选择商品"
            style="width: 100%;"
            @change="productChange"
          >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="有效期"
          prop="validity"
        >
          <el-date-picker
            v-model="addruleForm.validity"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions1"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            @change="onPick1"
          />
        </el-form-item>
        <el-form-item
          label="所需积分"
          prop="integral"
        >
          <el-input v-model="addruleForm.integral" />
        </el-form-item>
        <el-form-item
          label="图片"
          prop="imageUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            disabled
          >
            <img
              v-if="addruleForm.imageUrl"
              :src="addruleForm.imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>


        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="addruleFormSure('addruleForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="editConversion"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="editruleForm"
        :model="editruleForm"
        :rules="editruleRule"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="选择商品"
          prop="product"
        >
          <el-select
            v-model="editruleForm.product"
            placeholder="请选择商品"
            style="width: 100%;"
            @change="productChange"
          >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="有效期"
          prop="validity"
        >
          <el-date-picker
            v-model="editruleForm.validity"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions1"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            @change="onPick2"
          />
        </el-form-item>
        <el-form-item
          label="所需积分"
          prop="integral"
        >
          <el-input v-model="editruleForm.integral" />
        </el-form-item>
        <el-form-item
          label="图片"
          prop="imageUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            disabled
          >
            <img
              v-if="editruleForm.imageUrl"
              :src="editruleForm.imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>


        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="editruleFormSure('editruleForm')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog title="提示" :visible.sync="integralEditTan" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <div class="global">
      <el-tabs
        v-model="activeName"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          label="兑换管理"
          name="first"
        >
          <div class="seachBox">
            <!-- <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker> -->
            <el-input
              v-model="searchForm.key"
              placeholder="用户名/手机号"
              style="width: 200px"
            />
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              style="margin-left: 20px;"
            />
            <el-input
              v-model="searchForm.number"
              placeholder="订单编号"
              style="width: 200px;margin-left: 20px;"
            />
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
          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />兑换管理
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
                      @click="exportToExcel1"
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
                      @click="printContent1"
                    />
                  </el-tooltip>
                </div>
              </div>
              <el-table
                id="foodtable1"
                v-loading="loading"
                :data="tableData1"
                style="width: 100%"
                :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
              >
                <el-table-column
                  label="订单编号"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.number }}</span>
                  </template>
                </el-table-column>
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
                  label="商品名称"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="消费积分"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.integral }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="兑换时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.addtime }}</span>
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
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
              />
            </div>
          </div>
          <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane
          label="兑换设置"
          name="second"
        >
          <div class="conversionTop">
            <el-select
              v-model="type"
              placeholder="状态"
              @change="getExchangeList"
            >
              <el-option
                label="全部"
                value="-1"
              />
              <el-option
                label="未开始"
                value="0"
              />
              <el-option
                label="进行中"
                value="1"
              />
              <el-option
                label="过期"
                value="2"
              />
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-folder-add"
              size="medium"
              @click="addIntegral('addruleForm')"
            >
              添加规则
            </el-button>
          </div>

          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />兑换设置
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
                      @click="exportToExcel2"
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
                      @click="printContent2"
                    />
                  </el-tooltip>
                </div>
              </div>
              <el-table
                id="foodtable2"
                v-loading="loading"
                :data="tableData2"
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
                  label="商品名称"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.vname }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="已兑数量"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.usenum }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="所需积分"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.integral }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="有效期"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.starttime+ ' 至 ' +scope.row.endtime }}</span>
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
                  label="状态"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.type==0">未开始</span>
                    <span v-if="scope.row.type==1">进行中</span>
                    <span v-if="scope.row.type==2">过期</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="conversionEtit(scope.row.id)"
                    >
                      编辑
                    </el-button>
                    <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="取消"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定删除该信息"
                      @onConfirm="conversionDel(scope.$index,scope.row.id)"
                    >
                      <el-button
                        slot="reference"
                        size="mini"
                        style="margin-left: 10px;"
                        type="danger"
                      >
                        删除
                      </el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
              <!-- </div> -->
              <el-pagination
                :current-page="1"
                :page-sizes="[5, 10, 15, 20, 25, 30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="margin: 10px 0 10px 10px;"
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        loading: true,
        page1: 1,
        limit1: 10,
        page2: 1,
        limit2: 10,
        total: 0,
        vid: '',
        currentRole: 'adminmember',
        productList: [],
        activeName: 'first',
        addIntegralTan: false,
        integralDetail: '',
        imageUrl: '',
        watchStreamRadio: '1',
        ifEveryDay: false,
        weekAFew: false,
        checkAll: false,
        checkedCities: ['上海', '北京'],
        editConversion: false,
        dailyClockItData: [
          {
            dateNum: 1,
            dailyClockItValue: ''
          }
        ],
        watchStreamData: [''],
        searchForm: {
          key: '',
          time: ['', ''],
          number: ''
        },
        pickerOptions: {
          shortcuts: [{
            text: '过去一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '过去三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pickerOptions1: {
          shortcuts: [{
            text: '未来一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pickerOption1: {
          shortcuts: [{
            text: '未来一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
        keyword: '',
        options: [],
        value: '',
        type: '',
        tableData1: [],
        tableData2: [],
        ruleForm: {
          name: '',
          region: 'firstLogin',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '0',
          desc: '',
        },
        addruleForm: {
          product: '',
          integral: '',
          validity: '',
          imageUrl: '',
          starttime: '',
          endtime: '',
        },
        editruleForm: {
          product: '',
          integral: '',
          validity: '',
          imageUrl: '',
          starttime: '',
          endtime: '',
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
        addruleRule: {
          product: [
            { required: true, message: '请选择商品', trigger: 'change' },
            { required: true, message: '请选择商品', trigger: 'blur' }
          ],
          integral: [
            { required: true, message: '请输入所需积分', trigger: 'blur' },
          ],
          validity: [
            { required: true, message: '请选择有效期', trigger: 'blur' },
          ],
          imageUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
        editruleRule: {
          product: [
            { required: true, message: '请选择商品', trigger: 'change' },
            { required: true, message: '请选择商品', trigger: 'blur' }
          ],
          integral: [
            { required: true, message: '请输入所需积分', trigger: 'blur' },
          ],
          validity: [
            { required: true, message: '请选择有效期', trigger: 'blur' },
          ],
          imageUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
      }
    },

    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editormember'
      // }
      this.token = this.$Cookies.get('Admin-Token');
      this.dataInit();
      this.$axios.post('/admin/Center/getVodList', {
        token: this.token,
        name: '',
        time: ''
      }, response => {
        console.log(response);
        this.productList = response.list;
      })
    },
    methods: {
      dataInit() {
        this.loading = true
        this.$axios.post('/admin/main/getMemberExchange', {
          token: this.token,
          number: this.searchForm.number,
          name: this.searchForm.key,
          starttime: this.searchForm.time[0],
          endtime: this.searchForm.time[1],
          type: this.type,
          limit: this.limit1,
          page: this.page1,
        }, response => {
          console.log(response);
          this.tableData1 = response.list;
          this.total = response.count;
          this.loading = false;
        })
      },
      getExchangeList() {
        this.loading = true
        this.$axios.post('/admin/main/getExchangeList', {
          token: this.token,
          type: this.type == '' ? '-1' : this.type,
          limit: this.limit2,
          page: this.page2,
        }, response => {
          console.log(response);
          this.tableData2 = response.list;
          this.total = response.count;
          this.loading = false;
        })
      },
      addIntegral(addruleForm) {
        console.log('111');
        // this.$refs[addruleForm].resetFields();
        this.addIntegralTan = true

      },
      addruleFormSure(addruleForm) {
        this.$refs[addruleForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/main/getExchangeAdd', {
              token: this.token,
              vid: this.addruleForm.product,
              integral: this.addruleForm.integral,
              starttime: this.addruleForm.starttime,
              endtime: this.addruleForm.endtime
            }, response => {
              this.$refs[addruleForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.addIntegralTan = false

                this.getExchangeList()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      editruleFormSure(editruleForm) {
        this.$refs[editruleForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/main/getExchangeEdit', {
              token: this.token,
              id: this.vid,
              vid: this.editruleForm.product,
              integral: this.editruleForm.integral,
              starttime: this.editruleForm.starttime,
              endtime: this.editruleForm.endtime
            }, response => {
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.editIntegralTan = false
                this.getExchangeList()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      conversionDel(index,id) {
        this.$axios.post('/admin/main/getExchangeDel', {
          token: this.token,
          id: id,
        }, response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success'
            });
            this.tableData2.splice(index,1)
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      productChange(val) {
        let obj = {};
        obj = this.productList.find((item) => {
          console.log(item); // 这里的dataSourceOptions就是上面遍历的数据源
          return item.id === val;// 筛选出匹配数据
        });
        console.log('全部数据', obj)
        this.addruleForm.imageUrl = obj.imgcover
      },
      handleEdit(index, row) {
        this.$router.push({ path: '/memberDetail' })
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      conversionEtit(id) {
        console.log(id);
        this.editConversion = true
        this.vid = id
        this.$axios.post('/admin/main/getExchangeForm', {
          token: this.token,
          id: id,
        }, response => {
          console.log(response);
          this.editruleForm.product = response.data.vid
          this.editruleForm.integral = response.data.integral
          this.editruleForm.validity = [response.data.starttime, response.data.endtime]
          this.editruleForm.starttime = response.data.starttime;
          this.editruleForm.endtime = response.data.endtime;
          let obj = {};
          obj = this.productList.find((item) => {
            console.log(item); // 这里的dataSourceOptions就是上面遍历的数据源
            return item.id === response.data.vid;// 筛选出匹配数据
          });
          this.editruleForm.imageUrl = obj.imgcover
        })
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
      handleSizeChange1(val) {
        this.limit1 = val;
        this.dataInit();
      },
      handleCurrentChange1(val) {
        this.page1 = val;
        this.dataInit();
      },
      handleSizeChange2(val) {
        this.limit2 = val;
        this.getExchangeList();
      },
      handleCurrentChange2(val) {
        this.page2 = val;
        this.getExchangeList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.addruleForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.addIntegralTan = false
            this.editConversion = false
            // this.integralEditTan = false
            done();
          })
          .catch(_ => { });
      },
      ifEveryDayChange(value) {
        if (value == true) {
          this.weekAFew = true
        }
      },
      handleCloseChildren() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.weekAFew = false
            done();
          })
          .catch(_ => { });

      },
      addRule(i) {
        var dateNum = this.dailyClockItData[this.dailyClockItData.length - 1].dateNum
        this.dailyClockItData.push({ dateNum: dateNum + 1, dailyClockItValue: '' })
        // this.$set(this.dailyClockItData, this.dailyClockItData.length, { dateNum: dateNum + 1, dailyClockItValue: '' })
        console.log(this.dailyClockItData);
      },
      delRule(i) {
        if (i == 0) {
          this.$message.error('此项无法删除');
        } else {
          this.dailyClockItData.splice(i, 1)
        }
      },
      addWatch() {
        this.watchStreamData.push('')
        console.log(this.watchStreamData);
      },
      delWatch(i) {
        if (i == 0) {
          this.$message.error('此项无法删除');
        } else {
          this.watchStreamData.splice(i, 1)
        }
      },

      ruleChange(val) {
        console.log(val);
        // switch (val) {
        //   case 'firstLogin':

        //   default:
        //     break;
        // }
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
      onPick1(date) {
        console.log(this.addruleForm.validity);
        this.addruleForm.starttime = date[0];
        this.addruleForm.endtime = date[1];
      },
      onPick2(date) {
        this.editruleForm.starttime = date[0];
        this.editruleForm.endtime = date[1];
      },
      handleTabClick(tab, event) {
        console.log(tab.index);
        switch (tab.index) {
          case '0':
            this.dataInit
          case '1':
            this.getExchangeList()
            break;
          default:
            break;
        }
      },
      exportToExcel1() {
        let et = this.XLSX.utils.table_to_book(document.getElementById('foodtable1')); //此处传入table的DOM节点
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
      printContent1() {
        //判断iframe是否存在，不存在则创建iframe
        var el = document.getElementById("foodtable1");
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
      exportToExcel2() {
        let et = this.XLSX.utils.table_to_book(document.getElementById('foodtable2')); //此处传入table的DOM节点
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
      printContent2() {
        //判断iframe是否存在，不存在则创建iframe
        var el = document.getElementById("foodtable2");
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
      seachReset() {
        this.searchForm.key = ''
        this.searchForm.time = ['', '']
        this.value2='',
        this.searchForm.number = ''
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

  .el-tabs__nav {
    /* margin-left: 19px; */
  }

  .integral .global {
    padding-top: 7px;
  }

  .labelStyle {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    margin-left: 13px;
  }

  .perfectInfo {
    position: relative;
  }

  .perfectInfoItBox {
    display: flex;
    justify-content: center;
    display: -ms-flexbox;
    -ms-flex-pack: center;
    margin-top: -7px;
    margin-bottom: 10px;
  }

  .perfectInfoItBoxLf,
  perfectInfoItBoxRh {
    text-align: center;
  }

  .perfectInfoItBoxRh {
    margin-left: 100px;
  }

  .perfectInfoIt {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
  }

  .perfectInfoDivider {
    position: absolute;
    top: 60px
  }

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

  .dailyClockIt {
    display: flex;
    align-items: center;
    line-height: 40px;
    margin-left: 46px;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
  }

  .dailyClockIt span {
    font-size: 40px;
    font-weight: 400;
  }

  .conversionTop {
    display: flex;
    display: -ms-flexbox;
    justify-content: space-between;
    align-items: center;
  }
</style>