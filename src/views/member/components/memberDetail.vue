<template>
  <div
    v-loading="loading"
    class="commomBox memberDetail"
  >
    <el-dialog
      title="查看"
      :visible.sync="collectTan"
      width="30%"
      top="10vh"
    >
      <div class="shouTanBox">
        <div class="shouTanIt">
          id：<span style="font-family: PingFang SC">{{ editVideoForm.number }}</span>
        </div>
        <div class="shouTanIt">
          <label for="">视频名称：</label>{{ editVideoForm.name }}
        </div>
        <div class="shouTanIt">
          <label for="">视频简介：</label>{{ editVideoForm.content }}
        </div>
        <div class="shouTanIt">
          <label for="">年级：</label>{{ editVideoForm.gradename==''?'无':editVideoForm.gradename }}
        </div>
        <div class="shouTanIt">
          <label for="">封面图片：</label><img
            :src="editVideoForm.imgcover"
            alt=""
            style="width: 110px;margin-bottom: 20px;"
          >
        </div>
        <div class="shouTanIt">
          <label for="">详情图片：</label>
          <img
            v-for="(item,index) in editVideoForm.imgdetails"
            :src="item"
            alt=""
            style="width: 12.66%;height:70px ;margin-bottom: 15px;margin-right: 5px;"
          >
        </div>
        <div class="shouTanIt">
          <label for="">售价：</label>{{ editVideoForm.price }}元/节
        </div>
        <div class="shouTanIt">
          <label for="">活动：</label>
          <el-checkbox
            :value="true"
            disabled
          >
            {{ editVideoForm.category==0?'限时免费':'积分兑换' }}
          </el-checkbox>
        </div>
        <div class="shouTanIt">
          <label for="">视频：</label><video
            :src="editVideoForm.url_rtmp"
            class=""
            style="width: 200px;"
            controls="controls"
          />
        </div>
      </div>
    </el-dialog>
    <div class="memberDetailTop">
      <div class="memberDetailTop1">
        <el-avatar
          :size="100"
          :src="memberDetailTop.circleUrl"
        />
        <div class="memberUserName">
          {{ memberDetailTop.nickname }}<i
            v-if="memberDetailTop.sex==0"
            class="el-icon-male"
            style="color: #409EFF;"
          /><i
            v-if="memberDetailTop.sex==1"
            class="el-icon-female"
            style="color: #FFC0CB;"
          />
        </div>
        <div class="memberUserTel">
          {{ memberDetailTop.tel }}
        </div>
      </div>
      <div class="memberDetailTop2">
        <div>用户名：{{ memberDetailTop.nickname }}</div>
        <div>姓名：{{ memberDetailTop.realname==''?'无':memberDetailTop.realname }}</div>
        <div>性别：{{ memberDetailTop.sex==0?'男':(memberDetailTop.sex==-1?'未选择':'女') }}</div>
        <div>电话：{{ memberDetailTop.tel }}</div>
      </div>
      <div class="memberDetailTop2">
        <div>年级：{{ memberDetailTop.grade==0?'无':memberDetailTop.gradename }}</div>
        <div>生日：{{ memberDetailTop.birthday==0?'无':memberDetailTop.birthday }}</div>
        <div>学校：{{ memberDetailTop.school==''?'无':memberDetailTop.school }}</div>
        <div>地址：{{ memberDetailTop.address==''?'无':memberDetailTop.address }}</div>
      </div>
    </div>
    <div class="memberDetailBot">
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          label="积分记录"
          name="first"
        >
          <div class="inviteTit">
            累计获得{{ getIntegral }}积分，已使用{{ useIntegral }}，剩余{{ residueIntegral }}积分
          </div>
          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />积分记录
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
                :data="tableData1"
                style="width: 100%"
                :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
              >
                <el-table-column
                  label="类型"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.type }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="积分"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.num }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="时间"
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
          label="收藏列表"
          name="second"
        >
          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />收藏列表
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
                :data="tableData2"
                style="width: 100%"
                :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
              >
                <el-table-column
                  label="课程名称"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="课程类型"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.enable==0?'直播':'点播' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="收藏时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.addtime }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleShow(scope.row.vid)"
                    >
                      查看
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
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
              />
            </div>
          </div>
          <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane
          label="邀请记录"
          name="third"
        >
          <div class="inviteTit">
            成功邀请到{{ totalShare }}个人
          </div>
          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />邀请记录
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
                      @click="exportToExcel3"
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
                      @click="printContent3"
                    />
                  </el-tooltip>
                </div>
              </div>
              <el-table
                id="foodtable3"
                :data="tableData3"
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
                  label="是否完善资料"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.zl==1?'是':'否' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="是否观看视频"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.sp==1?'是':'否' }}</span>
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
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleUserInfo(scope.row.mid)"
                    >
                      查看完整资料
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
                @size-change="handleSizeChange3"
                @current-change="handleCurrentChange3"
              />
            </div>
          </div>
          <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane
          label="观看记录"
          name="fourth"
        >
          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />观看记录
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
                      @click="exportToExcel4"
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
                      @click="printContent4"
                    />
                  </el-tooltip>
                </div>
              </div>
              <el-table
                id="foodtable4"
                :data="tableData4"
                style="width: 100%"
                :header-cell-style="{background:'#f5f8f9',color:'#5f6e82'}"
              >
                <el-table-column
                  label="课程编号/id"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.number }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="课程名称"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="课程类型"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.enable==0?'直播':'点播' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="总时长/已观看"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.lengthtime+' / '+scope.row.watchtime }}</span>
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
                @size-change="handleSizeChange4"
                @current-change="handleCurrentChange4"
              />
            </div>
          </div>
          <!-- </div> -->
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
                activeName: 'first',
                getIntegral: 0,
                useIntegral: 0,
                residueIntegral: 0,
                totalShare: 0,
                page1: 1,
                limit1: 10,
                page2: 1,
                limit2: 10,
                page3: 1,
                limit3: 10,
                page4: 1,
                limit4: 10,
                total: 0,
                loading: true,
                editVideoForm: {
                    name: '',
                    grade: '',
                    content: '',
                    imgdetails: '',
                    imgcover: '',
                    url_rtmp: '',
                    price: '',
                    category: ''
                },
                memberDetailTop: {
                    circleUrl: "",
                    nickname: '',
                    realname: '',
                    school: '',
                    sex: -1,
                    tel: '',
                    address: '',
                    grade: '',
                    gradename: '',
                    birthday: '',
                    img: ''
                },
                collectTan: false,
                tableData1: [],
                tableData2: [],
                tableData3: [],
                tableData4: []
            }
        },
        created() {
            this.token = this.$Cookies.get('Admin-Token');
            this.globId = this.$route.query.globId;
            this.dataInit()
            this.getIntegralList()
        },
        methods: {
            dataInit() {
                this.loading = true;
                this.$axios.post('/admin/index/getMemberForm', {
                    token: this.token,
                    mid: this.globId,
                }, response => {
                    console.log(response);
                    // this.total = response.data.count;
                    // this.tableData = response.data.list;
                    this.memberDetailTop.nickname = response.data.list.nickname
                    this.memberDetailTop.realname = response.data.list.realname
                    this.memberDetailTop.birthday = response.data.list.birthday
                    this.memberDetailTop.school = response.data.list.school
                    this.memberDetailTop.sex = response.data.list.sex
                    this.memberDetailTop.tel = response.data.list.tel
                    this.memberDetailTop.address = response.data.list.address
                    this.memberDetailTop.grade = response.data.list.grade
                    this.memberDetailTop.gradename = response.data.list.gradename
                    this.memberDetailTop.img = response.data.list.img
                    this.memberDetailTop.circleUrl = response.data.list.img
                    console.log(this.memberDetailTop);
                    this.loading = false;
                })
            },
            getIntegralList() {
                this.$axios.post('/admin/index/getIntegralList', {
                    token: this.token,
                    mid: this.globId,
                    limit: this.limit1,
                    page: this.page1,
                }, response => {
                    console.log(response);
                    this.tableData1 = response.list
                    this.total = response.count;
                    this.useIntegral = response.member.integral_used
                    this.residueIntegral = response.member.integral_total
                    this.getIntegral = response.member.integral_total + response.member.integral_used
                    this.loading = false;
                })
            },
            getCollectList() {
                this.$axios.post('/admin/index/getCollectList', {
                    token: this.token,
                    mid: this.globId,
                    limit: this.limit2,
                    page: this.page2,
                }, response => {
                    console.log(response);
                    this.tableData2 = response.list
                    this.total = response.count;
                    this.loading = false;
                })
            },
            getInviteList() {
                this.$axios.post('/admin/index/getInviteList', {
                    token: this.token,
                    mid: this.globId,
                    limit: this.limit3,
                    page: this.page3,
                }, response => {
                    console.log(response);
                    this.tableData3 = response.list
                    this.totalShare = response.count
                    this.total = response.count;
                    this.loading = false;
                })
            },
            getWatchList() {
                this.$axios.post('/admin/index/getWatchList', {
                    token: this.token,
                    mid: this.globId,
                    limit: this.limit4,
                    page: this.page4,
                }, response => {
                    console.log(response);
                    this.tableData4 = response.list
                    this.total = response.count;
                    this.loading = false;
                })
            },
            //    switch有问题会执行两个
            handleTabClick(tab, event) {
                console.log(tab.index);
                if (tab.index == '0') {
                    this.getIntegralList()
                } else if (tab.index == '1') {
                    this.getCollectList()
                } else if (tab.index == '2') {
                    this.getInviteList()
                } else if (tab.index == '3') {
                    this.getWatchList()
                }

            },
            handleShow(vid) {
                this.collectTan = true
                this.id = vid
                this.$axios.post('/admin/Center/getVideoForm', {
                    token: this.token,
                    id: vid
                }, response => {
                    console.log(response);
                    this.editVideoForm.number = response.data.number,
                        this.editVideoForm.name = response.data.name,
                        this.editVideoForm.gradename = response.data.gradename,
                        this.editVideoForm.content = response.data.content,
                        this.editVideoForm.imgdetails = response.data.imgdetails,
                        this.editVideoForm.imgcover = response.data.imgcover,
                        this.editVideoForm.url_rtmp = response.data.url_rtmp,
                        this.editVideoForm.price = response.data.price,
                        this.editVideoForm.category = response.data.category
                })
            },
            handleUserInfo(mid) {
                this.globId = mid;
                this.dataInit();
                this.getInviteList()
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
            exportToExcel3() {
                let et = this.XLSX.utils.table_to_book(document.getElementById('foodtable3')); //此处传入table的DOM节点
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
            exportToExcel4() {
                let et = this.XLSX.utils.table_to_book(document.getElementById('foodtable4')); //此处传入table的DOM节点
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
            printContent3() {
                //判断iframe是否存在，不存在则创建iframe
                var el = document.getElementById("foodtable3");
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
            printContent4() {
                //判断iframe是否存在，不存在则创建iframe
                var el = document.getElementById("foodtable4");
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
            handleSizeChange1(val) {
                this.limit1 = val;
                this.getIntegralList();
            },
            handleCurrentChange1(val) {
                this.page1 = val;
                this.getIntegralList();
            },
            handleSizeChange2(val) {
                this.limit2 = val;
                this.getIntegralList2();
            },
            handleCurrentChange2(val) {
                this.page2 = val;
                this.getIntegralList2();
            },
            handleSizeChange3(val) {
                this.limit3 = val;
                this.getIntegralList3();
            },
            handleCurrentChange3(val) {
                this.page3 = val;
                this.getIntegralList3();
            },
            handleSizeChange4(val) {
                this.limit4 = val;
                this.getIntegralList4();
            },
            handleCurrentChange4(val) {
                this.page4 = val;
                this.getIntegralList4();
            },
        }
    }
</script>

<style>
    .commomBox {
        padding: 30px;
        min-height: 91vh;
        background-color: #F0F2F5;
    }

    .memberDetailTop {
        display: flex;
        align-items: center;
        display: -ms-flexbox;
        -ms-flex-align: center;
        width: 100%;
        height: 260px;
        background-color: #fff;
        padding-left: 70px;
    }

    .memberDetailTop1 {
        text-align: center;
    }

    .memberUserName {
        text-align: center;
        margin: 10px 0;
    }

    .memberDetailTop2,
    .memberDetailTop3 {
        margin-left: 200px;
        line-height: 50px;
    }

    .memberDetailBot {
        padding: 20px 30px;
        margin-top: 30px;
        background-color: #fff;
        height: 480px;
        overflow-y: scroll;
    }

    .w_150 {
        width: 130px;
    }
</style>