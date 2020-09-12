<template>
  <div class="member-container">
    <el-dialog
      title="新建视频"
      :visible.sync="addVideoTan"
      width="30%"
      :before-close="handleClose"
      top="10vh"
    >
      <el-form
        ref="addVideoForm"
        :model="addVideoForm"
        :rules="addVideoRule"
        label-width="93px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="直播间名称"
          prop="name"
        >
          <el-input
            v-model="addVideoForm.name"
            placeholder="请输入直播间名称"
          />
        </el-form-item>
        <el-form-item
          label="直播间简介"
          prop="content"
        >
          <el-input
            v-model="addVideoForm.content"
            placeholder="请输入直播间简介"
          />
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
              v-for="item in options"
              :key="item.id"
              :label="item.gradename"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item
          label="直播名称"
          prop="streamname"
        >
          <el-input
            v-model="addVideoForm.streamname"
            placeholder="请输入数字加字母结合的名称"
          />
        </el-form-item>
        <el-form-item
          label="直播分类"
          prop="appname"
        >
          <el-input
            v-model="addVideoForm.appname"
            placeholder="请输入数字加字母结合的名称"
          />
        </el-form-item>
        <!-- <div style="display: -ms-flexbox;display: flex;"> -->
        <!-- <el-form-item label="封面图片" prop="imgcover" style="margin-bottom: 15px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess1">
              <img v-if="addVideoForm.imgcover" :src="addVideoForm.imgcover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图片" prop="imgdetails" style="margin-bottom: 15px;margin-left: 10px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess2">
              <img v-if="addVideoForm.imgdetails" :src="addVideoForm.imgdetails" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->

        <el-form-item
          label="封面图片"
          prop="imgcover"
          style="margin-bottom: 20px;"
        >
          <el-upload
            class="upload-demo"
            style="width: 69%;"
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
            style="width: 69%;"
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
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
              <img v-if="addVideoForm.imgdetails" :src="addVideoForm.imgdetails" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
        </el-form-item>
        <!-- </div> -->
        <el-form-item
          label="可转点播"
          prop="change"
        >
          <el-radio-group v-model="addVideoForm.change">
            <el-radio :label="1">
              是
            </el-radio>
            <el-radio :label="0">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="startStream">
          <el-form-item
            label="开播时间"
            prop="livetime"
            style="width: 50%;"
          >
            <el-date-picker
              v-model="addVideoForm.livetime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item
            label="下播时间"
            prop="livetimeend"
            style="width: 50%;"
          >
            <el-date-picker
              v-model="addVideoForm.livetimeend"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-form-item>
        </div>

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
        label-width="93px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="直播间名称"
          prop="name"
        >
          <el-input
            v-model="editVideoForm.name"
            placeholder="请输入直播间名称"
          />
        </el-form-item>
        <el-form-item
          label="直播间简介"
          prop="content"
        >
          <el-input
            v-model="editVideoForm.content"
            placeholder="请输入直播间简介"
          />
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
              v-for="item in options"
              :key="item.id"
              :label="item.gradename"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item
          label="直播名称"
          prop="streamname"
        >
          <el-input
            v-model="editVideoForm.streamname"
            placeholder="请输入数字加字母结合的名称"
          />
        </el-form-item>
        <el-form-item
          label="直播分类"
          prop="appname"
        >
          <el-input
            v-model="editVideoForm.appname"
            placeholder="请输入数字加字母结合的名称"
          />
        </el-form-item>
        <!-- <div style="display: -ms-flexbox;display: flex;"> -->
        <!-- <el-form-item label="封面图片" prop="imgcover" style="margin-bottom: 15px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess1">
              <img v-if="editVideoForm.imgcover" :src="editVideoForm.imgcover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图片" prop="imgdetails" style="margin-bottom: 15px;margin-left: 10px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess2">
              <img v-if="editVideoForm.imgdetails" :src="editVideoForm.imgdetails" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->
        <el-form-item
          label="封面图片"
          prop="imgcover"
          style="margin-bottom: 20px;"
        >
          <el-upload
            class="upload-demo"
            style="width: 69%;"
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
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
              <img v-if="addVideoForm.imgcover" :src="addVideoForm.imgcover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
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
        </el-form-item>
        <el-form-item
          label="详情图片"
          prop="imgdetails"
          style="margin-bottom: 20px"
        >
          <el-upload
            class="upload-demo"
            style="width: 69%;"
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
        <!-- </div> -->
        <el-form-item
          label="可转点播"
          prop="change"
        >
          <el-radio-group v-model="editVideoForm.change">
            <el-radio :label="1">
              是
            </el-radio>
            <el-radio :label="0">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="startStream">
          <el-form-item
            label="开播时间"
            prop="livetime"
            style="width: 50%;"
          >
            <el-date-picker
              v-model="editVideoForm.livetime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item
            label="下播时间"
            prop="livetimeend"
            style="width: 50%;"
          >
            <el-date-picker
              v-model="editVideoForm.livetimeend"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
            />
          </el-form-item>
        </div>

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
      <el-form
        ref="editVideoForm"
        :model="editVideoForm"
        label-width="93px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="直播间名称"
          prop="name"
        >
          <el-input
            v-model="editVideoForm.name"
            placeholder="请输入直播间名称"
            disabled="disabled"
          />
        </el-form-item>
        <el-form-item
          label="直播间简介"
          prop="name"
        >
          <el-input
            v-model="editVideoForm.content"
            placeholder="请输入直播间简介"
            disabled="disabled"
          />
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grade"
        >
          <el-select
            v-model="editVideoForm.grade"
            placeholder="请选择年级"
            style="width:100%"
            disabled="disabled"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.gradename"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="直播名称"
          prop="streamname"
        >
          <el-input
            v-model="editVideoForm.streamname"
            disabled="disabled"
            placeholder="请输入数字加字母结合的名称"
          />
        </el-form-item>
        <el-form-item
          label="直播分类"
          prop="appname"
        >
          <el-input
            v-model="editVideoForm.appname"
            disabled="disabled"
            placeholder="请输入数字加字母结合的名称"
          />
        </el-form-item>
        <!-- <div style="display: -ms-flexbox;display: flex;">
          <el-form-item label="封面图片" prop="region" style="margin-bottom: 15px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
              disabled="disabled">
              <img v-if="editVideoForm.imgcover" :src="editVideoForm.imgcover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图片" prop="region" style="margin-bottom: 15px;margin-left: 10px;">
            <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
              disabled="disabled">
              <img v-if="editVideoForm.imgcover" :src="editVideoForm.imgdetails" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div> -->
        <el-form-item
          label="封面图片"
          prop="imgcover"
          style="margin-bottom: 20px;"
        >
          <el-upload
            class="upload-demo"
            disabled="disabled"
            style="width: 69%;"
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
              disabled="disabled"
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
          <!-- <el-upload class="avatar-uploader" action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
              <img v-if="addVideoForm.imgcover" :src="addVideoForm.imgcover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
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
        </el-form-item>
        <el-form-item
          label="详情图片"
          prop="imgdetails"
          style="margin-bottom: 20px"
        >
          <el-upload
            class="upload-demo"
            disabled="disabled"
            style="width: 69%;"
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
              disabled="disabled"
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
        <el-form-item
          label="可转点播"
          prop="change"
        >
          <el-radio-group
            v-model="editVideoForm.change"
            disabled="disabled"
          >
            <el-radio :label="1">
              是
            </el-radio>
            <el-radio :label="0">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="视频" prop="resource">
          <video src="https://www.gsjyvip.com/public/static/video/%E6%B7%98%E5%AE%9D%E8%A7%86%E9%A2%91.mp4" class=""
            style="width: 200px;" controls="controls"></video>
        </el-form-item> -->
        <div class="startStream">
          <el-form-item
            label="开播时间"
            prop="desc"
            style="width: 50%;"
          >
            <el-date-picker
              v-model="editVideoForm.livetime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
              disabled="disabled"
            />
          </el-form-item>
          <el-form-item
            label="下播时间"
            prop="desc"
            style="width: 50%;"
          >
            <el-date-picker
              v-model="editVideoForm.livetimeend"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%;"
              disabled="disabled"
            />
          </el-form-item>
        </div>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('editVideoForm')">立即创建</el-button>
          <el-button @click="resetForm('editVideoForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
    </el-dialog>
    <div class="global">
      <div class="globalTop">
        <div class="seachBox">
          <el-input
            v-model="searchForm.key"
            placeholder="请输入直播间名称"
            style="width: 200px;"
          />
          <el-date-picker
            v-model="searchForm.time"
            align="right"
            style="margin-left: 20px;"
            type="date"
            placeholder="更新时间"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
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
          创建直播间
        </el-button>
      </div>
      <div class="foodBotBox">
        <div class="foodrecordTable">
          <div class="moreHandle">
            <p class="title">
              <i class="el-icon-tickets" />直播间列表
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
            max-height="430"
          >
            <el-table-column
              label="序号"
              align="center"
              type="index"
            />
            <el-table-column
              label="直播间名称"
              align="center"
              width="100px"
              fixed
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="直播间简介"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.content }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="直播封面图"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                <img
                  :src="scope.row.imgcover"
                  alt=""
                  style="width: 50px;height: 50px;"
                >
              </template>
            </el-table-column>
            <el-table-column
              label="收藏数"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.collect }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="报名数"
              align="center"
              sortable
              width="100px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.people }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否可转点播"
              align="center"
              width="120px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.change==0?'否':'是' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="直播状态"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.type==0">未开始</span>
                <span v-if="scope.row.type==1">已开播</span>
                <span v-if="scope.row.type==2">已结束</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开播时间"
              align="center"
              sortable
              width="100px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.livetime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="下播时间"
              align="center"
              sortable
              width="100px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.livetimeend }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
              sortable
              width="100px"
            > 
              <template slot-scope="scope">
                <span>{{ scope.row.addtime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="直播地址"
              align="center"
              width="300px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.url_push }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
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
                <el-popconfirm
                  v-if="scope.row.type!==1"
                  confirm-button-text="确定"
                  cancel-button-text="再想想"
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定开播？"
                  @onConfirm="handleDelete(scope.row.id,scope.$index)"
                >
                  <el-button
                    slot="reference"
                    style="margin: 0 0 7px 10px;"
                    size="mini"
                  >
                    开播
                  </el-button>
                </el-popconfirm>
                <el-button
                  size="mini"
                  style="margin: 0 0 7px 10px;"
                  @click="handleDetail(scope.row.id)"
                >
                  查看
                </el-button>
                <el-button
                  size="mini"
                  style="margin-bottom: 7px;"
                  @click="handleEdit(scope.row.id)"
                >
                  编辑
                </el-button>
                <el-popconfirm
                  v-if="scope.row.type==1"
                  confirm-button-text="确定"
                  cancel-button-text="再想想"
                  icon="el-icon-info"
                  icon-color="red"
                  title="未到下播时间，确定要下播？"
                  @onConfirm="handleDelete(scope.row.id,scope.$index)"
                >
                  <el-button
                    slot="reference"
                    style="margin-left: 10px;"
                    size="mini"
                    type="danger"
                    :class="[scope.row.specialoffer==true ? 'putaway' : '']"
                  >
                    下播
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


  export default {
    data() {
      return {
        currentRole: 'adminmember',
        page: 1,
        limit: 10,
        total: 0,
        id: '',
        imgVisible: false,
        dialogImageUrl: '',
        addVideoTan: false,
        editVideoTan: false,
        collectTan: false,
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
          imgdetails: '',
          imgcover: '',
          url_rtmp: '',
          change: '',
          streamname: '',
          livetime: '',
          livetimeend: '',
          appname: ''
        },
        editVideoForm: {
          name: '',
          grade: '',
          content: '',
          imgdetails: '',
          imgcover: '',
          url_rtmp: '',
          change: '',
          streamname: '',
          livetime: '',
          livetimeend: '',
          appname: ''
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
          appname: [
            { required: true, message: '请输入直播名称', trigger: 'blur' }
          ],
          change: [
            { required: true, message: '请选择是否可转点播', trigger: 'change' }
          ],
          streamname: [
            { required: true, message: '请输入直播地址', trigger: 'blur' }
          ],
          livetime: [
            { required: true, message: '请输入开播时间', trigger: 'blur' }
          ],
          livetimeend: [
            { required: true, message: '请输入下播时间', trigger: 'blur' }
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
          appname: [
            { required: true, message: '请输入直播名称', trigger: 'blur' }
          ],
          change: [
            { required: true, message: '请选择是否可转点播', trigger: 'change' }
          ],
          streamname: [
            { required: true, message: '请输入直播地址', trigger: 'blur' }
          ],
          livetime: [
            { required: true, message: '请输入开播时间', trigger: 'blur' }
          ],
          livetimeend: [
            { required: true, message: '请输入下播时间', trigger: 'blur' }
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
        tableData: []

      }
    },

    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editormember'
      // }
      this.token = this.$Cookies.get('Admin-Token');
      this.$axios.post('/admin/main/getGradeList', {
        token: this.token,
        limit: 1000,
        page: 1
      }, response => {
        console.log(response);
        this.options = response.list
      })
      this.dataInit()
    },
    // computed: {
    //   //Uploader实例
    //   uploader() {
    //     return this.$refs.uploader.uploader;
    //   }
    // },
    methods: {
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
      dataInit() {
        this.loading = true;
        this.$axios.post('/admin/Center/getLiveList', {
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
            this.$axios.post('/admin/Center/getLiveAdd', {
              token: this.token,
              name: this.addVideoForm.name,
              grade: this.addVideoForm.grade,
              content: this.addVideoForm.content,
              imgdetails: this.addVideoForm.imgdetails,
              imgcover: this.addVideoForm.imgcover,
              change: this.addVideoForm.change,
              appname: this.addVideoForm.appname,
              streamname: this.addVideoForm.streamname,
              livetime: this.addVideoForm.livetime,
              livetimeend: this.addVideoForm.livetimeend
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
            this.$axios.post('/admin/Center/getLiveEdit', {
              token: this.token,
              id: this.id,
              name: this.editVideoForm.name,
              grade: this.editVideoForm.grade,
              content: this.editVideoForm.content,
              imgdetails: this.editVideoForm.imgdetails,
              imgcover: this.editVideoForm.imgcover,
              change: this.editVideoForm.change,
              appname: this.editVideoForm.appname,
              streamname: this.editVideoForm.streamname,
              livetime: this.editVideoForm.livetime,
              livetimeend: this.editVideoForm.livetimeend
            }, response => {
              this.$refs[editVideoForm].resetFields();
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
      enableSwitch(id) {
        this.$axios.post('/admin/center/getLiveType', {
          token: this.token,
          id: id,
        }, response => {

        })
      },
      handlePreview(file) {
        console.log(file);
        this.imgVisible = true
        this.dialogImageUrl = file.url
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
        this.fileList3 = [];
        this.fileList4 = [];
        this.collectTan = true
        this.id = id
        this.$axios.post('/admin/Center/getLiveForm', {
          token: this.token,
          id: id
        }, response => {
          this.editVideoForm.name = response.data.name,
            this.editVideoForm.grade = response.data.grade
          this.editVideoForm.content = response.data.content
          this.editVideoForm.imgdetails = response.data.imgdetails
          this.editVideoForm.imgcover = response.data.imgcover
          this.editVideoForm.change = response.data.change
          this.editVideoForm.streamname = response.data.streamname
          this.editVideoForm.livetime = response.data.livetime
          this.editVideoForm.livetimeend = response.data.livetimeend
          this.editVideoForm.appname = response.data.appname
          for (var i = 0; i < response.data.imgdetails.length; i++) {
            var disLength1 = response.data.imgdetails[i].length;
            if (disLength1 == 63) {
              console.log(response.data.imgdetails[i].substring(disLength1 - 17, disLength1));
              this.fileList4.push({ name: response.data.imgdetails[i].substring(disLength1 - 17, disLength1), url: response.data.imgdetails[i] });
            } else {
              this.fileList4.push({ name: response.data.imgdetails[i].substring(disLength1 - 18, disLength1), url: response.data.imgdetails[i] });
            }
          }
          var disLength2 = response.data.imgcover.length;
          console.log(disLength2);
          if (disLength2 == 63) {
            this.fileList3.push({ name: response.data.imgcover.substring(disLength2 - 17, disLength2), url: response.data.imgcover });
          } else {
            this.fileList3.push({ name: response.data.imgcover.substring(disLength2 - 18, disLength2), url: response.data.imgcover });
          }
        })
      },
      handleEdit(id) {
        this.fileList3 = [];
        this.fileList4 = [];
        this.editVideoTan = true
        this.id = id
        this.$axios.post('/admin/Center/getLiveForm', {
          token: this.token,
          id: id
        }, response => {
          this.editVideoForm.name = response.data.name
          this.editVideoForm.grade = response.data.grade
          this.editVideoForm.content = response.data.content
          this.editVideoForm.imgdetails = response.data.imgdetails
          this.editVideoForm.imgcover = response.data.imgcover
          this.editVideoForm.change = response.data.change
          this.editVideoForm.streamname = response.data.streamname
          this.editVideoForm.livetime = response.data.livetime
          this.editVideoForm.livetimeend = response.data.livetimeend
          this.editVideoForm.appname = response.data.appname
          for (var i = 0; i < response.data.imgdetails.length; i++) {
            var disLength1 = response.data.imgdetails[i].length;
            if (disLength1 == 63) {
              console.log(response.data.imgdetails[i].substring(disLength1 - 17, disLength1));
              this.fileList4.push({ name: response.data.imgdetails[i].substring(disLength1 - 17, disLength1), url: response.data.imgdetails[i] });
            } else {
              this.fileList4.push({ name: response.data.imgdetails[i].substring(disLength1 - 18, disLength1), url: response.data.imgdetails[i] });
            }
          }
          var disLength2 = response.data.imgcover.length;
          console.log(disLength2);
          if (disLength2 == 63) {
            this.fileList3.push({ name: response.data.imgcover.substring(disLength2 - 17, disLength2), url: response.data.imgcover });
          } else {
            this.fileList3.push({ name: response.data.imgcover.substring(disLength2 - 18, disLength2), url: response.data.imgcover });
          }
        })
      },
      handleDelete(id, index) {
        this.$axios.post('/admin/center/getLiveStatus', {
          token: this.token,
          id: id,
        }, response => {
          console.log(response);
          this.dataInit()
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success'
            });
            this.dataInit()
          } else {
            this.$message.error(response.msg)
          }
        })
      },

      handleAvatarSuccess1(res, file) {
        // console.log(res);
        // console.log(file);
        this.addVideoForm.imgcover = res.url
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
          this.editVideoForm.imgdetails = [];
          for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].response) {
              this.editVideoForm.imgdetails.push(fileList[i].response.url)
            } else {
              this.editVideoForm.imgdetails.push(fileList[i].url)
            }
          }
          return;
        } else {
          this.$message.error('上传文件后缀不允许')
          this.fileList4 = []
        }

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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
      },
      handleSizeChange(val) {
        this.limit = val;
        this.dataInit();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.dataInit();
      },
      onPick(val) {
        console.log(val);
      },
      seachReset() {
        this.searchForm.key = ''
        this.searchForm.time = ''
        this.dataInit()
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

  .startStream {
    display: flex;
    display: -ms-flexbox;
  }

  .startStream .el-input--suffix .el-input__inner {
    padding-right: 20px;
  }
</style>