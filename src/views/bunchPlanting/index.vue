<template>
  <div class="member-container">
    <el-dialog
      title="新建视频"
      :visible.sync="addVideoTan"
      width="30%"
      :before-close="handleClose"
      top="5vh"
    >
      <el-form
        ref="addVideoForm"
        :model="addVideoForm"
        :rules="addVideoRule"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="视频名称"
          prop="name"
        >
          <el-input v-model="addVideoForm.name" />
        </el-form-item>
        <el-form-item
          label="视频简介"
          prop="content"
        >
          <el-input v-model="addVideoForm.content" />
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grade"
        >
          <el-select
            v-model="addVideoForm.grade"
            placeholder="请选择年级"
            style="width:100%"
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.gradename"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- <div style="display: -ms-flexbox;display: flex;"> -->
        <el-form-item
          label="封面图片"
          prop="imgcover"
          style="margin-bottom: 20px;"
        >
          <el-upload
            class="upload-demo"
            style="width: 66%;"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove1"
            :file-list="fileList1"
            list-type="picture"
            :on-success="handleSuccess1"
            :limit="1"
          >
            <el-button
              size="small"
              type="primary"
            >
              点击上传
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
              style="margin-top: 5px;line-height: 22px;"
            >
              点击上传图片（格式支持PNG、JPG、JPEG）
            </div>
          </el-upload>
          <el-dialog
            :visible.sync="imgVisible"
            append-to-body
            width="25%"
          >
            <img
              width="100%"
              :src="dialogImageUrl"
              alt=""
            >
          </el-dialog>
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="addVideoForm.imgcover" :src="addVideoForm.imgcover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>
        <el-form-item
          label="详情图片"
          prop="imgdetails"
          style="margin-bottom: 20px"
        >
          <el-upload
            class="upload-demo"
            style="width: 66%;"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove2"
            :file-list="fileList2"
            list-type="picture"
            :on-success="handleSuccess2"
            :multiple="true"
          >
            <el-button
              size="small"
              type="primary"
            >
              点击上传
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
              style="margin-top: 5px;line-height: 22px;"
            >
              点击上传图片,最多六张（格式支持PNG、JPG、JPEG）
            </div>
          </el-upload>
          <el-dialog
            :visible.sync="imgVisible"
            append-to-body
            width="25%"
          >
            <img
              width="100%"
              :src="dialogImageUrl"
              alt=""
            >
          </el-dialog>
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
            <img v-if="addVideoForm.imgdetails" :src="addVideoForm.imgdetails" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>
        <!-- </div> -->
        <el-form-item
          label="售价"
          prop="price"
        >
          <el-input
            v-model="addVideoForm.price"
            style="width: 65%;"
          /> 元/节
        </el-form-item>
        <el-form-item
          label="活动"
          prop="category"
        >
          <el-radio-group v-model="addVideoForm.category">
            <el-radio label="0">
              限时免费
            </el-radio>
            <el-radio label="1">
              积分兑换
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="视频地址"
          prop="url_rtmp"
        >
          <el-input v-model="addVideoForm.url_rtmp" />
          <uploader
            ref="uploader"
            :options="options"
            :file-status-text="statusText"
            class="uploader-example"
            @file-complete="fileComplete"
            @complete="complete"
            @file-success="onFileSuccess"
          >
            <uploader-unsupport />
            <!-- <uploader-drop> -->
            <!-- <p>Drop files here to upload or</p> -->
            <el-button
              type="primary"
              size="small"
              style="padding: 0;"
            >
              <uploader-btn style="width: 100%;height: 100%;">
                上传视频
              </uploader-btn>
            </el-button>

            <!-- <uploader-btn :attrs="attrs">select images</uploader-btn> -->
            <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
            <!-- </uploader-drop> -->
            <uploader-list />
          </uploader>
          <!-- <uploader :options="options" :file-status-text="statusText" class="uploader-example" ref="uploader"
            @file-complete="fileComplete" @complete="complete" @file-success="onFileSuccess"></uploader> -->
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
          @click="addVideoFormSure('addVideoForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="editVideoTan"
      width="30%"
      :before-close="handleClose"
      top="5vh"
    >
      <el-form
        ref="editVideoForm"
        :model="editVideoForm"
        :rules="editVideoRule"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="视频名称"
          prop="name"
        >
          <el-input v-model="editVideoForm.name" />
        </el-form-item>
        <el-form-item
          label="视频简介"
          prop="content"
        >
          <el-input v-model="editVideoForm.content" />
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grade"
        >
          <el-select
            v-model="editVideoForm.grade"
            placeholder="请选择年级"
            style="width:100%"
          >
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.gradename"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="封面图片"
          prop="imgcover"
          style="margin-bottom: 20px;"
        >
          <el-upload
            class="upload-demo"
            style="width: 66%;"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove3"
            :file-list="fileList3"
            list-type="picture"
            :on-success="handleSuccess3"
            :limit="1"
          >
            <el-button
              size="small"
              type="primary"
            >
              点击上传
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
              style="margin-top: 5px;line-height: 22px;"
            >
              点击上传图片（格式支持PNG、JPG、JPEG）
            </div>
          </el-upload>
          <el-dialog
            :visible.sync="imgVisible"
            append-to-body
            width="25%"
          >
            <img
              width="100%"
              :src="dialogImageUrl"
              alt=""
            >
          </el-dialog>
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
            <img v-if="addVideoForm.imgcover" :src="addVideoForm.imgcover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>
        <el-form-item
          label="详情图片"
          prop="imgdetails"
          style="margin-bottom: 20px"
        >
          <el-upload
            class="upload-demo"
            style="width: 66%;"
            action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove4"
            :file-list="fileList4"
            list-type="picture"
            :on-success="handleSuccess4"
            :multiple="true"
          >
            <el-button
              size="small"
              type="primary"
            >
              点击上传
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
              style="margin-top: 5px;line-height: 22px;"
            >
              点击上传图片,最多六张（格式支持PNG、JPG、JPEG）
            </div>
          </el-upload>
          <el-dialog
            :visible.sync="imgVisible"
            append-to-body
            width="25%"
          >
            <img
              width="100%"
              :src="dialogImageUrl"
              alt=""
            >
          </el-dialog>
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
            :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
            <img v-if="addVideoForm.imgdetails" :src="addVideoForm.imgdetails" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>
        <!-- <div style="display: -ms-flexbox;display: flex;">
          <el-form-item label="封面图片" prop="imgcover" style="margin-bottom: 20px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
              <img v-if="editVideoForm.imgcover" :src="editVideoForm.imgcover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图片" prop="imgdetails" style="margin-bottom: 20px;margin-left: 20px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
              <img v-if="editVideoForm.imgdetails" :src="editVideoForm.imgdetails" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div> -->
        <el-form-item
          label="售价"
          prop="price"
        >
          <el-input
            v-model="editVideoForm.price"
            style="width: 65%;"
          /> 元/节
        </el-form-item>
        <el-form-item
          label="活动"
          prop="category"
        >
          <el-radio-group v-model="editVideoForm.category">
            <el-radio :label="0">
              限时免费
            </el-radio>
            <el-radio :label="1">
              积分兑换
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="视频地址"
          prop="url_rtmp"
        >
          <el-input v-model="editVideoForm.url_rtmp" />
          <uploader
            ref="uploader1"
            :options="options"
            :file-status-text="statusText"
            class="uploader-example"
            @file-complete="fileComplete2"
            @complete="complete2"
            @file-success="onFileSuccess2"
          >
            <uploader-unsupport />
            <!-- <uploader-drop> -->
            <!-- <p>Drop files here to upload or</p> -->
            <el-button
              type="primary"
              size="small"
              style="padding: 0;"
            >
              <uploader-btn style="width: 100%;height: 100%;">
                上传视频
              </uploader-btn>
            </el-button>

            <!-- <uploader-btn :attrs="attrs">select images</uploader-btn> -->
            <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
            <!-- </uploader-drop> -->
            <uploader-list />
          </uploader>
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
          @click="editVideoFormSure('editVideoForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="查看"
      :visible.sync="collectTan"
      width="30%"
      top="10vh"
    >
      <div class="shouTanBox">
        <div class="shouTanIt">
          ID：<span style="font-family: PingFang SC">{{ editVideoForm.number }}</span>
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
    <div class="global">
      <div class="globalTop">
        <div class="seachBox">
          <el-input
            v-model="searchForm.key"
            placeholder="请输入视频名称"
            style="width: 200px;"
          />
          <el-date-picker
            v-model="value2"
            align="right"
            style="margin-left: 20px;"
            unlink-panels
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="onPick"
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
        <el-button
          type="primary"
          icon="el-icon-folder-add"
          size="medium"
          @click="addVideoTan=true"
        >
          新建视频
        </el-button>
      </div>
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />点播列表
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
              label="ID"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <span>{{ scope.row.number }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="视频名称"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="分类"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.gradename }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.updatetime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="视频地址"
              align="center"
              width="230px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.url_rtmp }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="视频点播次数"
              align="center"
              sortable
              width="130px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.people }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="视频收藏次数"
              align="center"
              sortable
              width="130px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.collect }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="视频浏览次数"
              align="center"
              sortable
              width="130px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.watch }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  style="margin-left: 10px;"
                  @click="handleDetail(scope.row.id)"
                >
                  查看
                </el-button>
                <el-button
                  size="mini"
                  style="margin-top: 10px;"
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
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  export default {
    data() {
      return {
        options: {
          target: 'https://total.gsjyvip.com/admin/server/updateBigFile', // '//jsonplaceholder.typicode.com/posts/',
          testChunks: false,
        },
        attrs: {
          accept: 'image/*'
        },
        statusText: {
          success: '成功了',
          error: '出错了',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        },
        currentRole: 'adminmember',
        page: 1,
        limit: 10,
        total: 0,
        addVideoTan: false,
        editVideoTan: false,
        collectTan: false,
        imgVisible: false,
        dialogImageUrl: '',
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        imageUrl: '',
        searchForm: {
          key: '',
          time: ''
        },
        addVideoForm: {
          name: '',
          grade: '',
          content: '',
          imgdetails: [],
          imgcover: '',
          url_rtmp: '',
          price: '',
          category: ''
        },
        editVideoForm: {
          name: '',
          grade: '',
          content: '',
          imgdetails: [],
          imgcover: '',
          url_rtmp: '',
          price: '',
          category: ''
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
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
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
        addVideoRule: {
          name: [
            { required: true, message: '请输入视频名称', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请选择视频简介', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          imgcover: [
            { required: true, message: '请上传封面图片', trigger: 'change' }
          ],
          imgdetails: [
            { required: true, message: '请上传详情图片', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择活动类型', trigger: 'change' }
          ],
          url_rtmp: [
            { required: true, message: '请输入视频地址', trigger: 'blur' }
          ]
        },
        editVideoRule: {
          name: [
            { required: true, message: '请输入视频名称', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请选择视频简介', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          imgcover: [
            { required: true, message: '请上传封面图片', trigger: 'change' }
          ],
          imgdetails: [
            { required: true, message: '请上传详情图片', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择活动类型', trigger: 'change' }
          ],
          url_rtmp: [
            { required: true, message: '请输入视频地址', trigger: 'blur' }
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
        options1: [],
        value: '',
        id: '',
        tableData: [],

      }
    },
    computed: {
      //Uploader实例
      uploader() {
        return this.$refs.uploader.uploader;
      },
      uploader1() {
        return this.$refs.uploader1.uploader;
      }
    },
    created() {
      this.token = this.$Cookies.get('Admin-Token');
      this.$axios.post('/admin/main/getGradeList', {
        token: this.token,
        limit: 1000,
        page: 1
      }, response => {
        console.log(response);
        this.options1 = response.list
      })
      this.dataInit()
    },
    methods: {
      onFileSuccess(rootFile, file, response, chunk) {
        let resp = JSON.parse(response);
        var that = this
        if (resp.code === 0 && resp.merge === false) {
          that.addVideoForm.url_rtmp = resp.url
          console.log('上传成功，不需要合并');
        } else {
          axios.post('https://total.gsjyvip.com/admin/server/updateBigFile?action=merge', {
            filename: file.name,
            identifier: file.uniqueIdentifier,
            totalSize: file.size,
            totalChunks: rootFile.chunks.length
          }).then(function (res) {
            console.log(res.data.url);
            that.addVideoForm.url_rtmp = res.data.url
            console.log(that.addVideoForm.url_rtmp);
            if (res.code === 0) {
              console.log('上传成功')
            } else {
              console.log(res.message);
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      onFileSuccess2(rootFile, file, response, chunk) {
        var that = this
        let resp = JSON.parse(response);
        if (resp.code === 0 && resp.merge === false) {
          that.editVideoForm.url_rtmp = resp.url
          console.log('上传成功，不需要合并');
        } else {
          // console.log(chunk);
          axios.post('https://total.gsjyvip.com/admin/server/updateBigFile?action=merge', {
            filename: file.name,
            identifier: file.uniqueIdentifier,
            totalSize: file.size,
            totalChunks: rootFile.chunks.length
          }).then(function (res) {
            console.log(res.data.url);
            that.editVideoForm.url_rtmp = res.data.url
            console.log(that.editVideoForm.url_rtmp);
            if (res.code === 0) {
              console.log('上传成功')
            } else {
              console.log(res.message);
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      complete() {
        console.log('complete', arguments)
      },
      fileComplete() {
        console.log('file complete', arguments)
      },
      complete2() {
        console.log('complete', arguments)
      },
      fileComplete2() {
        console.log('file complete', arguments)
      },
      handleRemove1(file, fileList) {
        for (var i = 0; i < fileList.length; i++) {
          this.addVideoForm.imgcover = fileList[i].url
        }
      },
      handleRemove2(file, fileList) {
        this.addVideoForm.imgdetails = [];
        for (var i = 0; i < fileList.length; i++) {
          this.addVideoForm.imgdetails.push(fileList[i].url)
        }
      },
      handleRemove3(file, fileList) {
        console.log(fileList);
        for (var i = 0; i < fileList.length; i++) {
          this.editVideoForm.imgcover = fileList[i].url
        }
      },
      handleRemove4(file, fileList) {
        console.log(fileList);
        this.editVideoForm.imgdetails = [];
        for (var i = 0; i < fileList.length; i++) {
          this.editVideoForm.imgdetails.push(fileList[i].url)
        }
      },
      handlePreview(file) {
        console.log(file);
        this.imgVisible = true
        this.dialogImageUrl = file.url
      },
      dataInit() {
        this.loading = true;
        this.$axios.post('/admin/Center/getVodList', {
          token: this.token,
          name: this.searchForm.key,
          time: this.searchForm.time,
          limit: this.limit,
          page: this.page
        }, response => {
          console.log(response);
          this.total = response.count;
          this.tableData = response.list;
          this.loading = false;
        })
      },
      addVideoFormSure(addVideoForm) {
        
        console.log(this.addVideoForm.category);
        this.$refs[addVideoForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/Center/getVodAdd', {
              token: this.token,
              name: this.addVideoForm.name,
              grade: this.addVideoForm.grade,
              content: this.addVideoForm.content,
              imgdetails: this.addVideoForm.imgdetails,
              imgcover: this.addVideoForm.imgcover,
              url_rtmp: this.addVideoForm.url_rtmp,
              price: this.addVideoForm.price,
              category: this.addVideoForm.category
            }, response => {
              this.$refs[addVideoForm].resetFields();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.addVideoTan = false;
                this.$refs[addVideoForm].resetFields();
                this.addVideoForm.url_rtmp=''
                this.fileList1 = []
                this.fileList2 = []
                this.uploader.cancel();
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
      },
      editVideoFormSure(editVideoForm) {
        this.$refs[editVideoForm].validate((valid) => {
          if (valid) {
            this.$axios.post('/admin/Center/getVodEdit', {
              token: this.token,
              id: this.id,
              name: this.editVideoForm.name,
              grade: this.editVideoForm.grade,
              content: this.editVideoForm.content,
              imgdetails: this.editVideoForm.imgdetails,
              imgcover: this.editVideoForm.imgcover,
              url_rtmp: this.editVideoForm.url_rtmp,
              price: this.editVideoForm.price,
              category: this.editVideoForm.category
            }, response => {
              this.$refs[editVideoForm].resetFields();
              this.uploader1.cancel();
              console.log(response);
              if (response.code == 0) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  type: 'success'
                });
                this.editVideoTan = false;
                
                this.dataInit()
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        })
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

      handleDetail(id) {
        this.collectTan = true
        this.id = id
        this.$axios.post('/admin/Center/getVideoForm', {
          token: this.token,
          id: id
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
      handleEdit(id) {
        this.fileList3 = [];
        this.fileList4 = [];
        this.editVideoTan = true
        this.id = id
        this.$axios.post('/admin/Center/getVideoForm', {
          token: this.token,
          id: id
        }, response => {
          console.log(response);
          this.editVideoForm.name = response.data.name;
          this.editVideoForm.grade = response.data.grade;
          this.editVideoForm.content = response.data.content;
          for (var i = 0; i < response.data.imgdetails.length; i++) {
            var disLength1 = response.data.imgdetails[i].length;
            if (disLength1 == 63) {
              console.log(response.data.imgdetails[i].substring(disLength1 - 17, disLength1));
              this.fileList4.push({ name: response.data.imgdetails[i].substring(disLength1 - 17, disLength1), url: response.data.imgdetails[i] });
            } else {
              this.fileList4.push({ name: response.data.imgdetails[i].substring(disLength1 - 18, disLength1), url: response.data.imgdetails[i] });
            }
          }
          console.log(this.fileList4);
          this.editVideoForm.imgdetails = response.data.imgdetails;
          this.editVideoForm.imgcover = response.data.imgcover;
          // console.log(response.data.imgcover.substring(60,18));
          var disLength2 = response.data.imgcover.length;
          console.log(disLength2);
          if (disLength2 == 63) {
            this.fileList3.push({ name: response.data.imgcover.substring(disLength2 - 17, disLength2), url: response.data.imgcover });
          } else {
            this.fileList3.push({ name: response.data.imgcover.substring(disLength2 - 18, disLength2), url: response.data.imgcover });
          }
          this.editVideoForm.url_rtmp = response.data.url_rtmp;
          this.editVideoForm.price = response.data.price;
          this.editVideoForm.category = response.data.category
        })
      },
      handleDelete(id, index) {
        this.$axios.post('/admin/Center/getVideoDel', {
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
            this.fileList3 = [];
            this.fileList4 = [];
            this.addVideoTan = false
            this.editVideoTan = false
            done();
          })
          .catch(_ => { });
      },
      handleAvatarSuccess1(res, file) {
        // console.log(res);
        // console.log(file);
        this.addVideoForm.imgcover = res.url
      },
      beforeAvatarUpload1(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
      },
      handleAvatarSuccess2(res, file) {
        this.addVideoForm.imgdetails = res.url
      },
      handleAvatarSuccess3(res, file) {
        this.editVideoForm.imgcover = res.url
      },
      handleAvatarSuccess4(res, file) {
        this.editVideoForm.imgdetails = res.url
      },
      beforeAvatarUpload2(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
      },
      handleSizeChange(val) {
        this.limit = val;
        this.dataInit();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.dataInit();
      },
      handleSuccess1(response, file, fileList) {
        console.log(response);
        console.log(file);
        console.log(fileList);
        if (file.raw.type == "image/png" || file.raw.type == "image/jpeg") {
          this.addVideoForm.imgcover = response.url
        } else {
          this.$message.error('上传文件后缀不允许')
          this.fileList1 = []
          return;
        }

      },
      handleSuccess2(response, file, fileList) {
        console.log(response);
        console.log(file);
        console.log(fileList);
        if (file.raw.type == "image/png" || file.raw.type == "image/jpeg") {
          this.addVideoForm.imgdetails = [];
          for (var i = 0; i < fileList.length; i++) {
            this.addVideoForm.imgdetails.push(fileList[i].response.url)
          }
          return;
        } else {
          this.$message.error('上传文件后缀不允许')
          this.fileList2 = []
        }

      },
      handleSuccess3(response, file, fileList) {
        console.log(response);
        console.log(file);
        console.log(fileList);
        if (file.raw.type == "image/png" || file.raw.type == "image/jpeg") {
          this.editVideoForm.imgcover = response.url
        } else {
          this.$message.error('上传文件后缀不允许')
          this.fileList3 = []
        }
        
        return;
      },
      handleSuccess4(response, file, fileList) {
        console.log(response);
        console.log(file);
        console.log(fileList);
        if (file.raw.type == "image/png" || file.raw.type == "image/jpeg") {
          this.editVideoForm.imgcover = response.url
        } else {
          this.$message.error('上传文件后缀不允许')
          this.fileList4 = []
        }
        this.editVideoForm.imgdetails = [];
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].response) {
            this.editVideoForm.imgdetails.push(fileList[i].response.url)
          } else {
            this.editVideoForm.imgdetails.push(fileList[i].url)
          }

        }
        return;
      },
      onPick(date) {
        console.log(date);
        var d = new Date(date);
        this.searchForm.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        // console.log(this.searchForm.time);
      },
      seachReset() {
        this.searchForm.key = ''
        this.value2 = ''
        this.searchForm.time = ''
        this.dataInit()
      }
    },
  }
</script>

<style>
  .avatar-uploader {
    height: 134px;
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

  .uploader-example {
    width: 100%;
    /* padding: 15px; */
    margin: 10px auto 0;
    font-size: 12px;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, .4); */
  }

  .uploader-example .uploader-btn {
    margin-right: 4px;
  }

  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .uploader-drop p {
    display: none;
  }

  .uploader-btn {
    display: inline-block !important;
    width: 84px !important;
    height: 32px !important;
    line-height: 32px !important;
    margin: 0 !important;
    /* display: unset !important; */
    padding: 0 !important;
    font-size: 100%;
    /* line-height: 1.4; */
    color: #fff !important;
    /* border: 1px solid #666; */
    cursor: unset;
    border-radius: unset;
    background: transparent !important;
    outline: none !important;
    border: none !important;
    font-weight: 400 !important;
  }

  .uploader-btn:hover {
    background-color: unset !important;
  }
</style>