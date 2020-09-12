<template>
  <div class="member-container integral">
    <el-dialog
      title="添加规则"
      :visible.sync="addIntegralTan"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        ref="addIntegralForm"
        :model="addIntegralForm"
        :rules="addRuleIntegral"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="选择规则"
          prop="enable"
        >
          <el-select
            v-model="addIntegralForm.enable"
            placeholder="请选择规则"
            style="width: 100%;"
            @change="ruleChange"
          >
            <el-option
              label="首次登录"
              :value="2"
            />
            <el-option
              label="完善资料"
              :value="3"
            />
            <el-option
              label="每日打卡"
              :value="4"
            />
            <el-option
              label="分享至其他平台"
              :value="5"
            />
            <el-option
              label="观看直播"
              :value="6"
            />
            <el-option
              label="打卡额外奖励"
              :value="7"
            />
          </el-select>
        </el-form-item>

        <div
          v-if="firstLogin"
          class="firstLogin"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="addIntegralForm.daytype!==0"
              v-model="addIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="addIntegralForm.daytype==0"
              :value="addIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="首次注册登录，可获"
            prop="num"
            label-width="150px"
            style="margin-left: 0px;"
          >
            <el-input
              v-model="addIntegralForm.num"
              placeholder=""
              style="width: 100px"
            /><span
              class="labelStyle"
            >积分</span>
          </el-form-item>
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="addIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="perfectInfo"
          class="perfectInfo"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="addIntegralForm.daytype!==0"
              v-model="addIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="addIntegralForm.daytype==0"
              :value="addIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-divider class="perfectInfoDivider" />
          <div class="perfectInfoItBox">
            <div class="perfectInfoItBoxLf">
              <div class="perfectInfoIt">
                字段名称
              </div>
              <div class="perfectInfoIt">
                姓名
              </div>
              <div class="perfectInfoIt">
                性别
              </div>
              <div class="perfectInfoIt">
                生日
              </div>
              <div class="perfectInfoIt">
                年级
              </div>
              <div class="perfectInfoIt">
                学校
              </div>
              <div class="perfectInfoIt">
                地址
              </div>
            </div>
            <div class="perfectInfoItBoxRh">
              <div class="perfectInfoIt">
                积分规则
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="addIntegralForm.completeInfo[0].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="addIntegralForm.completeInfo[1].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="addIntegralForm.completeInfo[2].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="addIntegralForm.completeInfo[3].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="addIntegralForm.completeInfo[4].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="addIntegralForm.completeInfo[5].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
            </div>
          </div>

          <!-- <el-form-item label="首次注册登录，可获" prop="num" label-width="150px" style="margin-left: 0px;">
            <el-input v-model="addIntegralForm.num" placeholder="" style="width: 100px"></el-input><span
              class="labelStyle">积分</span>
          </el-form-item> -->
          <el-form-item
            label="规则状态"
            prop="delivery"
          >
            <el-switch
              v-model="addIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="shareOther"
          class="shareOther"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="addIntegralForm.daytype!==0"
              v-model="addIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="addIntegralForm.daytype==0"
              :value="addIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="分享话术"
            prop="sharecontent"
          >
            <el-input
              v-model="addIntegralForm.sharecontent"
              placeholder="请输入分享话术"
            />
          </el-form-item>
          <el-form-item
            label="活动封面"
            prop="shareimg"
          >
            <el-upload
              class="avatar-uploader"
              action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload1"
            >
              <img
                v-if="addIntegralForm.shareimg"
                :src="addIntegralForm.shareimg"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </el-form-item>

          <el-form-item
            label="邀请成功，可获"
            label-width="122px"
            style="margin-left: 0px;"
            prop="num"
          >
            <el-input
              v-model="addIntegralForm.num"
              placeholder=""
              style="width: 100px"
            /><span
              class="labelStyle"
            >积分</span>
          </el-form-item>
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="addIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="category"
          >
            <el-radio-group v-model="addIntegralForm.category1">
              <el-radio :label="-1">
                不限次数
              </el-radio>
              <el-radio :label="1">
                限制<el-input
                  v-model="addIntegralForm.category2"
                  placeholder=""
                  style="width: 100px;margin-left: 20px;"
                  :disabled="addIntegralForm.category1=='-1'?true:false"
                />
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div
          v-if="dailyClock"
          class="dailyClock"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="addIntegralForm.daytype!==0"
              v-model="addIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="addIntegralForm.daytype==0"
              :value="addIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <div
            v-for="(item,i) in addIntegralForm.dailyClockItData"
            :key="i"
            class="dailyClockIt"
          >
            打卡第{{ item.name }}日，可获得
            <el-input
              v-model="item.num"
              style="width: 70px;margin: 0 10px;"
              size="mini"
              oninput="this.value= this.value.match(/\d+(\.\d{0,9})?/) ? this.value.match(/\d+(\.\d{0,9})?/)[0] : ''"
            /> 积分
            <i
              class="el-icon-circle-plus"
              style="font-size: 26px;color: #409EFF;cursor: pointer;margin: 0 5px 0 10px;"
              @click="addRule(i)"
            />
            <i
              class="el-icon-remove"
              style="font-size: 26px;color: #F56C6C;cursor: pointer;"
              @click="delRule(i)"
            />
          </div>
          <el-form-item
            prop="cycle"
            label-width="0px"
            style="margin:5px 0 0px 46px;"
          >
            <div
              class="dailyClockIt"
              style="margin: 0 0-7px 0;"
            >
              <el-input
                v-model="addIntegralForm.cycle"
                style="width: 70px;margin-right: 10px;"
                size="mini"
                oninput="this.value= this.value.match(/\d+(\.\d{0,9})?/) ? this.value.match(/\d+(\.\d{0,9})?/)[0] : ''"
              />
              天为一个周期，{{ addIntegralForm.cycle==''?'X':addIntegralForm.cycle }}日重新开始
            </div>
          </el-form-item>
          <el-divider />
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="addIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="watchStream"
          class="watchStream"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="addIntegralForm.daytype!==0"
              v-model="addIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="addIntegralForm.daytype==0"
              :value="addIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="时间限制"
            style="margin-bottom: 15px;"
          >
            <el-form-item prop="cycle1">
              <el-radio
                v-model="addIntegralForm.cycle1"
                :label="0"
              >
                每日
              </el-radio>
              <el-radio
                v-model="addIntegralForm.cycle1"
                :label="1"
              >
                时间范围
              </el-radio>
              <el-time-picker
                v-model="addIntegralForm.cycle2"
                is-range
                style="width: 100%;"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                :disabled="addIntegralForm.cycle1=='0'?true:false"
                format="HH:mm"
                value-format="HH:mm"
                @change="onPick1"
              />
              <!-- <el-input v-if="addIntegralForm.licenseendtime=='-1'" :value="addIntegralForm.licenseendtime=='-1'?'长期':''"
                @focus="yongjiuFocus"></el-input> -->
            </el-form-item>
          </el-form-item>
          <div
            v-for="(item,i) in addIntegralForm.watchStreamData"
            :key="i"
            class="dailyClockIt"
          >
            观看时长：
            <el-input
              v-model="item.name"
              style="width: 70px;margin-right: 10px;"
              size="mini"
            />
            分钟，可获得
            <el-input
              v-model="item.num"
              style="width: 70px;margin: 0 10px;"
              size="mini"
            /> 积分
            <i
              class="el-icon-circle-plus"
              style="font-size: 26px;color: #409EFF;cursor: pointer;margin: 0 5px 0 10px;"
              @click="addWatch(i)"
            />
            <i
              class="el-icon-remove"
              style="font-size: 26px;color: #F56C6C;cursor: pointer;"
              @click="delWatch(i)"
            />
          </div>

          <el-divider />
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="addIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="clockInReward"
          class="clockInReward"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="addIntegralForm.daytype!==0"
              v-model="addIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="addIntegralForm.daytype==0"
              :value="addIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="打卡时间"
            style="margin-bottom: 15px;"
            prop="cycle3"
            class="setHeight"
          >
            <el-radio-group v-model="addIntegralForm.cycle3">
              <el-radio :label="0">
                每天
              </el-radio>
              <div
                style="display: inline-block;"
                @click="weekClick"
              >
                <el-radio :label="1">
                  每周
                </el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="奖励积分"
            style="margin-bottom: 15px;"
            prop="num"
          >
            <el-input
              v-model="addIntegralForm.num"
              placeholder=""
              style="width: 100px;margin-right: 10px;"
            />
            积分
          </el-form-item>
          <el-divider />
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="addIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('addIntegralForm')">立即创建</el-button>
          <el-button @click="resetForm('addIntegralForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="addIntegralFormSure('addIntegralForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加时间（可重复选择）"
      :visible.sync="weekAFew"
      width="30.5%"
      :before-close="handleCloseChildren"
    >
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        全选
      </el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group
        v-model="addIntegralForm.checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="city in cities"
          :key="city.name"
          :label="city"
        >
          {{ city.label }}
        </el-checkbox>
      </el-checkbox-group>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCloseChildren">取 消</el-button>
        <el-button
          type="primary"
          @click="weekAFew = false"
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

    <el-dialog
      title="编辑规则"
      :visible.sync="editIntegralTan"
      width="30%"
      :before-close="handleClose"
      top="10vh"
    >
      <el-form
        ref="editIntegralForm"
        :model="editIntegralForm"
        :rules="editRuleIntegral"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="选择规则"
          prop="enable"
        >
          <el-select
            v-model="editIntegralForm.enable"
            placeholder="请选择规则"
            style="width: 100%;"
            @change="ruleChange"
          >
            <el-option
              label="首次登陆"
              :value="2"
            />
            <el-option
              label="完善资料"
              :value="3"
            />
            <el-option
              label="每日打卡"
              :value="4"
            />
            <el-option
              label="分享至其他平台"
              :value="5"
            />
            <el-option
              label="观看直播"
              :value="6"
            />
            <el-option
              label="打卡额外奖励"
              :value="7"
            />
          </el-select>
        </el-form-item>

        <div
          v-if="firstLogin"
          class="firstLogin"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="editIntegralForm.daytype!==0"
              v-model="editIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="editIntegralForm.daytype==0"
              :value="editIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="首次注册登录，可获"
            prop="num"
            label-width="150px"
            style="margin-left: 0px;"
          >
            <el-input
              v-model="editIntegralForm.num"
              placeholder=""
              style="width: 100px"
            /><span
              class="labelStyle"
            >积分</span>
          </el-form-item>
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="editIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="perfectInfo"
          class="perfectInfo"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="editIntegralForm.daytype!==0"
              v-model="editIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="editIntegralForm.daytype==0"
              :value="editIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-divider class="perfectInfoDivider" />
          <div class="perfectInfoItBox">
            <div class="perfectInfoItBoxLf">
              <div class="perfectInfoIt">
                字段名称
              </div>
              <div class="perfectInfoIt">
                姓名
              </div>
              <div class="perfectInfoIt">
                性别
              </div>
              <div class="perfectInfoIt">
                生日
              </div>
              <div class="perfectInfoIt">
                年级
              </div>
              <div class="perfectInfoIt">
                学校
              </div>
              <div class="perfectInfoIt">
                地址
              </div>
            </div>
            <div class="perfectInfoItBoxRh">
              <div class="perfectInfoIt">
                积分规则
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="editIntegralForm.completeInfo[0].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="editIntegralForm.completeInfo[1].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="editIntegralForm.completeInfo[2].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="editIntegralForm.completeInfo[3].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="editIntegralForm.completeInfo[4].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
              <div class="perfectInfoIt">
                可获得
                <el-input
                  v-model="editIntegralForm.completeInfo[5].num"
                  placeholder=""
                  style="width: 70px"
                  size="mini"
                />
                积分
              </div>
            </div>
          </div>

          <!-- <el-form-item label="首次注册登录，可获" prop="num" label-width="150px" style="margin-left: 0px;">
            <el-input v-model="editIntegralForm.num" placeholder="" style="width: 100px"></el-input><span
              class="labelStyle">积分</span>
          </el-form-item> -->
          <el-form-item
            label="规则状态"
            prop="delivery"
          >
            <el-switch
              v-model="editIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="addIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="addIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="addIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="shareOther"
          class="shareOther"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="editIntegralForm.daytype!==0"
              v-model="editIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="editIntegralForm.daytype==0"
              :value="editIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="分享话术"
            prop="sharecontent"
          >
            <el-input
              v-model="editIntegralForm.sharecontent"
              placeholder="请输入分享话术"
            />
          </el-form-item>
          <el-form-item
            label="活动封面"
            prop="shareimg"
          >
            <el-upload
              class="avatar-uploader"
              action="https://total.gsjyvip.com/admin/Server/upDataImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload2"
            >
              <img
                v-if="editIntegralForm.shareimg"
                :src="editIntegralForm.shareimg"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </el-form-item>

          <el-form-item
            label="邀请成功，可获"
            label-width="122px"
            style="margin-left: 0px;"
            prop="num"
          >
            <el-input
              v-model="editIntegralForm.num"
              placeholder=""
              style="width: 100px"
            /><span
              class="labelStyle"
            >积分</span>
          </el-form-item>
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="editIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="category"
          >
            <el-radio-group v-model="editIntegralForm.category1">
              <el-radio :label="-1">
                不限次数
              </el-radio>
              <el-radio :label="1">
                限制<el-input
                  v-model="editIntegralForm.category2"
                  placeholder=""
                  style="width: 100px;margin-left: 20px;"
                  :disabled="editIntegralForm.category1==-1?true:false"
                />
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div
          v-if="dailyClock"
          class="dailyClock"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="editIntegralForm.daytype!==0"
              v-model="editIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="editIntegralForm.daytype==0"
              :value="editIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <div
            v-for="(item,i) in editIntegralForm.dailyClockItData"
            :key="i"
            class="dailyClockIt"
          >
            打卡第{{ item.name }}日，可获得
            <el-input
              v-model="item.num"
              style="width: 70px;margin: 0 10px;"
              size="mini"
              oninput="this.value= this.value.match(/\d+(\.\d{0,9})?/) ? this.value.match(/\d+(\.\d{0,9})?/)[0] : ''"
            /> 积分
            <i
              class="el-icon-circle-plus"
              style="font-size: 26px;color: #409EFF;cursor: pointer;margin: 0 5px 0 10px;"
              @click="editAddRule(i)"
            />
            <i
              class="el-icon-remove"
              style="font-size: 26px;color: #F56C6C;cursor: pointer;"
              @click="editDelRule(i)"
            />
          </div>
          <el-form-item
            prop="cycle"
            label-width="0px"
            style="margin:5px 0 0px 46px;"
          >
            <div
              class="dailyClockIt"
              style="margin: 0 0-7px 0;"
            >
              <el-input
                v-model="editIntegralForm.cycle"
                style="width: 70px;margin-right: 10px;"
                size="mini"
                oninput="this.value= this.value.match(/\d+(\.\d{0,9})?/) ? this.value.match(/\d+(\.\d{0,9})?/)[0] : ''"
              />
              天为一个周期，{{ editIntegralForm.cycle==''?'X':editIntegralForm.cycle }}日重新开始
            </div>
          </el-form-item>
          <el-divider />
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="editIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="editIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="editIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="editIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="watchStream"
          class="watchStream"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="editIntegralForm.daytype!==0"
              v-model="editIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="editIntegralForm.daytype==0"
              :value="editIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="时间限制"
            style="margin-bottom: 15px;"
          >
            <el-form-item prop="cycle1">
              <el-radio
                v-model="editIntegralForm.cycle1"
                :label="0"
              >
                每日
              </el-radio>
              <el-radio
                v-model="editIntegralForm.cycle1"
                :label="1"
              >
                时间范围
              </el-radio>
              <el-time-picker
                v-model="editIntegralForm.cycle2"
                is-range
                style="width: 100%;"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                :disabled="editIntegralForm.cycle1=='0'?true:false"
                format="HH:mm"
                value-format="HH:mm"
                @change="onPick2"
              />
              <!-- <el-input v-if="editIntegralForm.licenseendtime=='-1'" :value="editIntegralForm.licenseendtime=='-1'?'长期':''"
                @focus="yongjiuFocus"></el-input> -->
            </el-form-item>
          </el-form-item>
          <div
            v-for="(item,i) in editIntegralForm.watchStreamData"
            :key="i"
            class="dailyClockIt"
          >
            观看时长：
            <el-input
              v-model="item.name"
              style="width: 70px;margin-right: 10px;"
              size="mini"
            />
            分钟，可获得
            <el-input
              v-model="item.num"
              style="width: 70px;margin: 0 10px;"
              size="mini"
            /> 积分
            <i
              class="el-icon-circle-plus"
              style="font-size: 26px;color: #409EFF;cursor: pointer;margin: 0 5px 0 10px;"
              @click="addEditWatch(i)"
            />
            <i
              class="el-icon-remove"
              style="font-size: 26px;color: #F56C6C;cursor: pointer;"
              @click="delEditWatch(i)"
            />
          </div>

          <el-divider />
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="editIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="editIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="editIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="editIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <div
          v-if="clockInReward"
          class="clockInReward"
        >
          <el-form-item
            label="有效期"
            prop="starttime"
          >
            <el-date-picker
              v-if="editIntegralForm.daytype!==0"
              v-model="editIntegralForm.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              @change="onPick"
            />
            <el-input
              v-if="editIntegralForm.daytype==0"
              :value="editIntegralForm.daytype==0?'长期':''"
              @focus="changqiFocus"
            />
          </el-form-item>
          <el-form-item
            label="打卡时间"
            style="margin-bottom: 15px;"
            prop="cycle3"
            class="setHeight"
          >
            <el-radio-group v-model="editIntegralForm.cycle3">
              <el-radio :label="0">
                每天
              </el-radio>
              <div
                style="display: inline-block;"
                @click="editWeekClick"
              >
                <el-radio :label="1">
                  每周
                </el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="奖励积分"
            style="margin-bottom: 15px;"
            prop="num"
          >
            <el-input
              v-model="editIntegralForm.num"
              placeholder=""
              style="width: 100px;margin-right: 10px;"
            />
            积分
          </el-form-item>
          <el-divider />
          <el-form-item
            label="规则状态"
            prop="type"
          >
            <el-switch
              v-model="editIntegralForm.type"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            label="每日上限"
            prop="resource"
          >
            <span>1次</span>
            <!-- <el-radio-group v-model="editIntegralForm.resource">
              <el-radio :label="0">不限次数</el-radio>
              <el-radio :label="1">限制<el-input v-model="editIntegralForm.name" placeholder=""
                  style="width: 100px;margin-left: 20px;" :disabled="editIntegralForm.resource=='0'?true:false"></el-input>
              </el-radio>
            </el-radio-group> -->
          </el-form-item>
        </div>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('editIntegralForm')">立即创建</el-button>
          <el-button @click="resetForm('editIntegralForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="editIntegralFormSure('editIntegralForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加时间（可重复选择）"
      :visible.sync="editweekAFew"
      width="30.5%"
      :before-close="handleCloseChildren"
    >
      <el-checkbox
        v-model="editcheckAll"
        :indeterminate="editisIndeterminate"
        @change="edithandleCheckAllChange"
      >
        全选
      </el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group
        v-model="editIntegralForm.checkedCities"
        @change="edithandleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="city in cities"
          :key="city.name"
          :label="city.name"
        >
          {{ city.label }}
        </el-checkbox>
      </el-checkbox-group>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCloseChildren">取 消</el-button>
        <el-button
          type="primary"
          @click="editweekAFew = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <div class="global">
      <el-tabs
        v-model="activeName"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          label="积分明细"
          name="first"
        >
          <div class="seachBox">
            <!-- <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker> -->
            <el-select
              v-model="searchForm.getintegral"
              placeholder="积分明细"
              @change="dataInit"
            >
              <el-option
                label="全部"
                value="-1"
              />
              <el-option
                label="获得积分"
                value="1"
              />
              <el-option
                label="消耗积分"
                value="0"
              />
            </el-select>
            <el-select
              v-model="searchForm.grade"
              style="margin-left: 20px;"
              placeholder="年级"
              @change="dataInit"
            >
              <el-option
                label="全部"
                value="-1"
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
                  <i class="el-icon-tickets" />积分明细
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
                  label="序号"
                  align="center"
                  type="index"
                  width="70px"
                />
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
                  label="类型"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="积分"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.set==1?'+'+scope.row.num:'-'+scope.row.num }}</span>
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
              <!-- </div> -->
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
        </el-tab-pane>
        <el-tab-pane
          label="积分设定"
          name="second"
        >
          <el-button
            type="primary"
            icon="el-icon-folder-add"
            size="mini"
            style="margin: 7px 0 -10px 0;"
            @click="addIntegralTan=true"
          >
            添加规则
          </el-button>
          <!-- <div class="tabBox"> -->
          <div class="foodBotBox">
            <div class="foodrecordTable">
              <div class="moreHandle">
                <p class="title">
                  <i class="el-icon-tickets" />积分设定
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
                  label="任务名称"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.enable==2">首次注册</span>
                    <span v-if="scope.row.enable==3">完善资料</span>
                    <span v-if="scope.row.enable==4">每日打卡</span>
                    <span v-if="scope.row.enable==5">分享至其它平台</span>
                    <span v-if="scope.row.enable==6">观看直播</span>
                    <span v-if="scope.row.enable==7">累计打卡额外奖励</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="获得积分"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.num }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="每日上限"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.category==-1?'不限':scope.row.category }}</span>
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
                  label="任务有效期"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.daytype==0?'长期':'自定义' }}</span>
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
                      @click="integralEdit(scope.row.id)"
                    >
                      编辑
                    </el-button>
                    <el-popconfirm
                      confirm-button-text="确定"
                      cancel-button-text="再想想"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定删除该规则"
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
              <!-- </div> -->
              <!-- <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="1"
                :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                :total="total" style="margin: 10px 0 10px 10px;">
              </el-pagination> -->
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  const cityOptions = [
    {
      label: '周一',
      name: '1',
      num: '0'
    },
    {
      label: '周二',
      name: '2',
      num: '0'
    },
    {
      label: '周三',
      name: '3',
      num: '0'
    },
    {
      label: '周四',
      name: '4',
      num: '0'
    },
    {
      label: '周五',
      name: '5',
      num: '0'
    },
    {
      label: '周六',
      name: '6',
      num: '0'
    },
    {
      label: '周日',
      name: '7',
      num: '0'
    }
  ];
  export default {
    data() {
      let self = this;
      var checkTime = (rule, value, callback) => {
        console.log(value);
        if (value == '' && self.addIntegralForm.daytype !== 1 && self.editIntegralForm.daytype !== 0) {
          if (self.addIntegralForm.time.length !== 0) {
            self.addIntegralForm.daytype == 1
            callback();
          } else {
            return callback(new Error('请选择有效期'));
          }
        } else if (value == null) {
          return callback(new Error('请选择有效期'));
        } else {
          callback();
        }
      };
      var checkCategory = (rule, value, callback) => {
        console.log(value);
        console.log(self.addIntegralForm.category1);
        console.log(self.addIntegralForm.category2);
        if (self.addIntegralForm.category1 == '') {
          return callback(new Error('请选择每日上限'));
        } else if (self.addIntegralForm.category1 == 1 && self.addIntegralForm.category2 == '') {
          return callback(new Error('请输入上限次数'));
        } else {
          callback();
        }
      };
      var checkcycle2 = (rule, value, callback) => {
        console.log(value);
        if (self.addIntegralForm.cycle1 == ''&& self.addIntegralForm.cycle1 !==0) {
          return callback(new Error('请选择时间限制'));
        } else if (self.addIntegralForm.cycle1 == 1 && self.addIntegralForm.cycle2 == '') {
          return callback(new Error('请选择时间范围'));
        } else {
          callback();
        }
      };
      var checkcycle3 = (rule, value, callback) => {
        console.log(value);
        console.log(self.addIntegralForm.cycle3);
        if (self.addIntegralForm.cycle3 == '' && self.addIntegralForm.cycle3 !== 0) {

          return callback(new Error('请选择打卡时间'));
        } else if (self.addIntegralForm.cycle3 == 1 && self.addIntegralForm.checkedCities.length == 0) {
          return callback(new Error('请选择时每周打卡时间'));
        } else {
          callback();
        }
      };
      var editcheckTime = (rule, value, callback) => {
        console.log(value);
        if (value == '' && self.editIntegralForm.daytype !== 1 && self.editIntegralForm.daytype !== 0) {
          if (self.editIntegralForm.time.length !== 0) {
            self.editIntegralForm.daytype == 1
            callback();
          } else {
            return callback(new Error('请选择有效期'));
          }

        } else if (value == null) {
          return callback(new Error('请选择有效期'));
        } else {
          callback();
        }
      };
      var editcheckCategory = (rule, value, callback) => {
        console.log(value);
        console.log(self.editIntegralForm.category1);
        console.log(self.editIntegralForm.category2);
        if (self.editIntegralForm.category1 == '') {
          return callback(new Error('请选择每日上限'));
        } else if (self.editIntegralForm.category1 == 1 && self.editIntegralForm.category2 == '') {
          return callback(new Error('请输入上限次数'));
        } else {
          callback();
        }
      };
      var editcheckcycle2 = (rule, value, callback) => {
        console.log(value);
        if (self.editIntegralForm.cycle1 == ''&& self.editIntegralForm.cycle1 !==0) {
          return callback(new Error('请选择时间限制'));
        } else if (self.editIntegralForm.cycle1 == 1 && self.editIntegralForm.cycle2 == '') {
          return callback(new Error('请选择时间范围'));
        } else {
          callback();
        }
      };
      var editcheckcycle3 = (rule, value, callback) => {
        console.log(value);
        console.log(self.editIntegralForm.cycle3);
        if (self.editIntegralForm.cycle3 == '' && self.editIntegralForm.cycle3 !== 0) {

          return callback(new Error('请选择打卡时间'));
        } else if (self.editIntegralForm.cycle3 == 1 && self.editIntegralForm.checkedCities.length == 0) {
          return callback(new Error('请选择时每周打卡时间'));
        } else {
          callback();
        }
      };
      return {
        currentRole: 'adminmember',
        activeName: 'first',
        searchForm: {
          key: '',
          getintegral: '',
          grade: ''
        },
        addIntegralForm: {
          enable: 2,
          time: '',
          num: '',
          type: 1,
          category: '',
          category1: '',
          category2: '',
          daytype: 5,
          starttime: '',
          endtime: '',
          details: '',
          completeInfo: [
            {
              "name": "realname",  //姓名
              "num": ''
            },
            {
              "name": "sex",  //性别
              "num": ''
            },
            {
              "name": "birthday",  //生日
              "num": ''
            },
            {
              "name": "grade",  //年级
              "num": ''
            },
            {
              "name": "school",  // 学校
              "num": ''
            },
            {
              "name": "address",  //地址
              "num": ''
            }
          ],
          dailyClockItData: [
            {
              name: 1,
              num: ''
            }
          ],
          watchStreamData: [
            {
              name: "",  //时间（分钟）
              num: ''
            }
          ],
          checkWeek: [
            {
              name: '1',
              num: ''
            },
            {
              name: '2',
              num: ''
            },
            {
              name: '3',
              num: ''
            },
            {
              name: '4',
              num: ''
            },
            {
              name: '5',
              num: ''
            },
            {
              name: '6',
              num: ''
            },
            {
              name: '7',
              num: ''
            }
          ],
          checkedCities: [],
          cycle: '',
          cycle1: '',
          cycle2: '',
          cycle3: '',
          shareimg: '',
          sharecontent: ''
        },
        editIntegralForm: {
          enable: '2',
          time: '',
          num: '',
          type: 1,
          category: '',
          category1: '',
          category2: '',
          daytype: '',
          starttime: '',
          endtime: '',
          details: '',
          completeInfo: [
            {
              "name": "realname",  //姓名
              "num": ''
            },
            {
              "name": "sex",  //性别
              "num": ''
            },
            {
              "name": "birthday",  //生日
              "num": ''
            },
            {
              "name": "grade",  //年级
              "num": ''
            },
            {
              "name": "school",  // 学校
              "num": ''
            },
            {
              "name": "address",  //地址
              "num": ''
            }
          ],
          dailyClockItData: [
            {
              name: 1,
              num: ''
            }
          ],
          watchStreamData: [
            {
              name: "",  //时间（分钟）
              num: ''
            }
          ],
          checkWeek: [
            {
              name: '1',
              num: ''
            },
            {
              name: '2',
              num: ''
            },
            {
              name: '3',
              num: ''
            },
            {
              name: '4',
              num: ''
            },
            {
              name: '5',
              num: ''
            },
            {
              name: '6',
              num: ''
            },
            {
              name: '7',
              num: ''
            }
          ],
          checkedCities: [],
          cycle: '',
          cycle1: '',
          cycle2: '',
          cycle3: '',
          shareimg: '',
          sharecontent: ''
        },
        loading: true,
        page1: 1,
        limit1: 10,
        page2: 1,
        limit2: 10,
        total: 0,
        addIntegralTan: false,
        editIntegralTan: false,
        integralDetail: '',
        imageUrl: '',
        watchStreamRadio: '1',
        ifEveryDay: false,
        weekAFew: false,
        editweekAFew: false,
        checkAll: false,
        editcheckAll: false,
        cities: cityOptions,
        isIndeterminate: true,
        editisIndeterminate: true,
        firstLogin: true,
        perfectInfo: false,
        dailyClock: false,
        shareOther: false,
        watchStream: false,
        clockInReward: false,
        id: '',
        pickerOptions: {
          shortcuts: [{
            text: '长期',
            onClick(picker) {
              picker.$emit('pick', ['', '']);
              self.addIntegralForm.daytype = 0;
              self.editIntegralForm.daytype = 0;
            }
          }]
        },
        value1: '',
        value2: '',
        keyword: '',
        options: [],
        value: '',
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

        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]

        },
        addRuleIntegral: {
          enable: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          starttime: [
            { required: true, validator: checkTime, trigger: 'change' },
            { required: true, validator: checkTime, trigger: 'blur' },
          ],
          shareimg: [
            { required: true, message: '请上传活动封面', trigger: 'change' },
          ],
          num: [
            { required: true, message: '请输入获得积分', trigger: 'blur' },
          ],
          category: [
            { required: true, validator: checkCategory, trigger: 'change' },
          ],
          details: [
            { required: true, message: '请输入获得积分', trigger: 'blur' },
          ],
          cycle: [
            { required: true, message: '此项不能为空', trigger: 'blur' },
          ],
          cycle1: [
            { required: true, validator: checkcycle2, trigger: 'change' },
          ],
          cycle3: [
            { required: true, validator: checkcycle3, trigger: 'change' },
          ],
          details: [
            { required: true, message: '信息未完善', trigger: 'blur' },
          ],
          sharecontent: [
            { required: true, message: '分享内容不能为空', trigger: 'blur' },
          ]
        },
        editRuleIntegral: {
          enable: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          starttime: [
            { required: true, validator: editcheckTime, trigger: 'change' },
            { required: true, validator: editcheckTime, trigger: 'blur' },
          ],
          shareimg: [
            { required: true, message: '请上传活动封面', trigger: 'change' },
          ],
          num: [
            { required: true, message: '请输入获得积分', trigger: 'blur' },
          ],
          category: [
            { required: true, validator: editcheckCategory, trigger: 'change' },
          ],
          details: [
            { required: true, message: '请输入获得积分', trigger: 'blur' },
          ],
          cycle: [
            { required: true, message: '此项不能为空', trigger: 'blur' },
          ],
          cycle1: [
            { required: true, validator: editcheckcycle2, trigger: 'change' },
          ],
          cycle3: [
            { required: true, validator: editcheckcycle3, trigger: 'change' },
          ],
          details: [
            { required: true, message: '信息未完善', trigger: 'blur' },
          ],
          sharecontent: [
            { required: true, message: '分享内容不能为空', trigger: 'blur' },
          ]
        },
      }
    },

    created() {
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'editormember'
      // }
      this.token = this.$Cookies.get('Admin-Token');
      this.dataInit()
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
      addIntegralFormSure(addIntegralForm) {
        console.log(this.addIntegralForm.daytype);
        console.log(this.addIntegralForm.time);
        this.$refs[addIntegralForm].validate((valid) => {
          if (valid) {
            switch (this.addIntegralForm.enable) {
              case 2:
                this.$axios.post('/admin/Account/getIntegralAdd', {
                  token: this.token,
                  enable: this.addIntegralForm.enable,
                  daytype: this.addIntegralForm.daytype,
                  num: this.addIntegralForm.num,
                  starttime: this.addIntegralForm.starttime,
                  endtime: this.addIntegralForm.endtime,
                  type: this.addIntegralForm.type,
                  category: 1,
                }, response => {
                  // this.$refs[addIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.addIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 3:
                this.$axios.post('/admin/Account/getIntegralAdd', {
                  token: this.token,
                  enable: this.addIntegralForm.enable,
                  daytype: this.addIntegralForm.daytype,
                  num: 0,
                  starttime: this.addIntegralForm.starttime,
                  endtime: this.addIntegralForm.endtime,
                  type: this.addIntegralForm.type,
                  category: 1,
                  details: this.addIntegralForm.completeInfo,
                }, response => {
                  // this.$refs[addIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.addIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 4:
                this.$axios.post('/admin/Account/getIntegralAdd', {
                  token: this.token,
                  enable: this.addIntegralForm.enable,
                  num: 0,
                  daytype: this.addIntegralForm.daytype,
                  cycle: this.addIntegralForm.cycle,
                  starttime: this.addIntegralForm.starttime,
                  endtime: this.addIntegralForm.endtime,
                  type: this.addIntegralForm.type,
                  details: this.addIntegralForm.dailyClockItData,
                  category: 1,
                }, response => {
                  // this.$refs[addIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.addIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 5:
                this.$axios.post('/admin/Account/getIntegralAdd', {
                  token: this.token,
                  enable: this.addIntegralForm.enable,
                  num: this.addIntegralForm.num,
                  daytype: this.addIntegralForm.daytype,
                  shareimg: this.addIntegralForm.shareimg,
                  sharecontent: this.addIntegralForm.sharecontent,
                  starttime: this.addIntegralForm.starttime,
                  endtime: this.addIntegralForm.endtime,
                  type: this.addIntegralForm.type,
                  category: this.addIntegralForm.category1 == '-1' ? '-1' : this.addIntegralForm.category2,
                }, response => {
                  // this.$refs[addIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.addIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 6:
                this.$axios.post('/admin/Account/getIntegralAdd', {
                  token: this.token,
                  enable: this.addIntegralForm.enable,
                  daytype: this.addIntegralForm.daytype,
                  cycle: this.addIntegralForm.cycle1,
                  shareimg: this.addIntegralForm.shareimg,
                  sharecontent: this.addIntegralForm.sharecontent,
                  starttime: this.addIntegralForm.starttime,
                  endtime: this.addIntegralForm.endtime,
                  type: this.addIntegralForm.type,
                  details: this.addIntegralForm.watchStreamData,
                  category: 1,
                }, response => {
                  // this.$refs[addIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.addIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 7:
                this.$axios.post('/admin/Account/getIntegralAdd', {
                  token: this.token,
                  enable: this.addIntegralForm.enable,
                  daytype: this.addIntegralForm.daytype,
                  num: this.addIntegralForm.num,
                  cycle: this.addIntegralForm.cycle3,
                  details: this.addIntegralForm.checkedCities,
                  starttime: this.addIntegralForm.starttime,
                  endtime: this.addIntegralForm.endtime,
                  type: this.addIntegralForm.type,
                  category: 1,
                }, response => {
                  // this.$refs[addIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.addIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              default:
                break;
            }

          }
        })
      },
      editIntegralFormSure(editIntegralForm) {
        console.log(this.editIntegralForm.daytype);
        console.log(this.editIntegralForm.time);
        this.$refs[editIntegralForm].validate((valid) => {
          if (valid) {
            switch (this.editIntegralForm.enable) {
              case 2:
                this.$axios.post('/admin/Account/getIntegralEdit', {
                  token: this.token,
                  id: this.id,
                  enable: this.editIntegralForm.enable,
                  daytype: this.editIntegralForm.daytype,
                  num: this.editIntegralForm.num,
                  starttime: this.editIntegralForm.starttime,
                  endtime: this.editIntegralForm.endtime,
                  type: this.editIntegralForm.type,
                  category: 1,
                }, response => {
                  // this.$refs[editIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.editIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 3:
                this.$axios.post('/admin/Account/getIntegralEdit', {
                  token: this.token,
                  id: this.id,
                  enable: this.editIntegralForm.enable,
                  daytype: this.editIntegralForm.daytype,
                  num: 0,
                  starttime: this.editIntegralForm.starttime,
                  endtime: this.editIntegralForm.endtime,
                  type: this.editIntegralForm.type,
                  category: 1,
                  details: this.editIntegralForm.completeInfo,
                }, response => {
                  // this.$refs[editIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.editIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 4:
                this.$axios.post('/admin/Account/getIntegralEdit', {
                  token: this.token,
                  enable: this.editIntegralForm.enable,
                  id: this.id,
                  num: 0,
                  daytype: this.editIntegralForm.daytype,
                  cycle: this.editIntegralForm.cycle,
                  starttime: this.editIntegralForm.starttime,
                  endtime: this.editIntegralForm.endtime,
                  type: this.editIntegralForm.type,
                  details: this.editIntegralForm.dailyClockItData,
                  category: 1,
                }, response => {
                  // this.$refs[editIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.editIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 5:
                this.$axios.post('/admin/Account/getIntegralEdit', {
                  token: this.token,
                  enable: this.editIntegralForm.enable,
                  id: this.id,
                  num: this.editIntegralForm.num,
                  daytype: this.editIntegralForm.daytype,
                  shareimg: this.editIntegralForm.shareimg,
                  sharecontent: this.editIntegralForm.sharecontent,
                  starttime: this.editIntegralForm.starttime,
                  endtime: this.editIntegralForm.endtime,
                  type: this.editIntegralForm.type,
                  category: this.editIntegralForm.category1 == '-1' ? '-1' : this.editIntegralForm.category2,
                }, response => {
                  // this.$refs[editIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.editIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 6:
                this.$axios.post('/admin/Account/getIntegralEdit', {
                  token: this.token,
                  id: this.id,
                  num: 0,
                  enable: this.editIntegralForm.enable,
                  daytype: this.editIntegralForm.daytype,
                  cycle: this.editIntegralForm.cycle1,
                  shareimg: this.editIntegralForm.shareimg,
                  sharecontent: this.editIntegralForm.sharecontent,
                  starttime: this.editIntegralForm.starttime,
                  endtime: this.editIntegralForm.endtime,
                  type: this.editIntegralForm.type,
                  details: this.editIntegralForm.watchStreamData,
                  category: 1
                }, response => {
                  // this.$refs[editIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.editIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              case 7:
                var weeked = this.editIntegralForm.checkedCities
                console.log(weeked);
                var newweeked = []
                for (var i = 0; i < weeked.length; i++) {
                  newweeked.push(cityOptions[Number(weeked[i]) - 1])
                }
                console.log(newweeked);
                this.$axios.post('/admin/Account/getIntegralEdit', {
                  token: this.token,
                  id: this.id,
                  enable: this.editIntegralForm.enable,
                  daytype: this.editIntegralForm.daytype,
                  num: this.editIntegralForm.num,
                  cycle: this.editIntegralForm.cycle3,
                  details: newweeked,
                  starttime: this.editIntegralForm.starttime,
                  endtime: this.editIntegralForm.endtime,
                  type: this.editIntegralForm.type,
                  category: 1
                }, response => {
                  // this.$refs[editIntegralForm].resetFields();
                  console.log(response);
                  if (response.code == 0) {
                    this.$notify({
                      title: '成功',
                      message: response.msg,
                      type: 'success'
                    });
                    this.editIntegralTan = false;
                    this.getMemberIntegral()
                  } else {
                    this.$message.error(response.msg);
                  }
                })
                break;
              default:
                break;
            }

          }
        })
      },
      integralEdit(id) {
        this.id = id
        this.editIntegralTan = true
        this.$axios.post('/admin/Account/getIntegralForm', {
          token: this.token,
          id: this.id,
        }, response => {
          this.editIntegralForm.enable = response.list.enable;
          console.log(response);
          switch (response.list.enable) {
            case 2:
              this.firstLogin = true
              this.perfectInfo = false
              this.dailyClock = false
              this.shareOther = false
              this.watchStream = false
              this.clockInReward = false
              this.editIntegralForm.daytype = response.list.daytype
              this.editIntegralForm.num = response.list.num
              this.editIntegralForm.starttime = response.list.starttime
              this.editIntegralForm.endtime = response.list.endtime
              this.editIntegralForm.type = response.list.type
              if (response.list.daytype == 1) {
                this.editIntegralForm.time = [response.list.starttime, response.list.endtime]
              }
              if (response.list.category == -1) {
                this.editIntegralForm.category1 = -1
              } else {
                this.editIntegralForm.category1 = 1
                this.editIntegralForm.category2 = response.list.category
              }
              break;
            case 3:
              this.firstLogin = false
              this.perfectInfo = true
              this.dailyClock = false
              this.shareOther = false
              this.watchStream = false
              this.clockInReward = false
              this.editIntegralForm.daytype = response.list.daytype
              this.editIntegralForm.num = response.list.num
              this.editIntegralForm.starttime = response.list.starttime
              this.editIntegralForm.endtime = response.list.endtime
              this.editIntegralForm.type = response.list.type
              if (response.list.daytype == 1) {
                this.editIntegralForm.time = [response.list.starttime, response.list.endtime]
              }

              if (response.list.category == -1) {
                this.editIntegralForm.category1 = -1
              } else {
                this.editIntegralForm.category1 = 1
                this.editIntegralForm.category2 = response.list.category
              }
              if (response.list.details.length !== 0) {
                this.editIntegralForm.completeInfo = response.list.details
              }


              break;
            case 4:
              this.firstLogin = false
              this.perfectInfo = false
              this.dailyClock = true
              this.shareOther = false
              this.watchStream = false
              this.clockInReward = false
              this.editIntegralForm.daytype = response.list.daytype
              this.editIntegralForm.num = response.list.num
              this.editIntegralForm.starttime = response.list.starttime
              this.editIntegralForm.endtime = response.list.endtime
              this.editIntegralForm.type = response.list.type
              if (response.list.daytype == 1) {
                this.editIntegralForm.time = [response.list.starttime, response.list.endtime]
              }
              if (response.list.category == -1) {
                this.editIntegralForm.category1 = -1
              } else {
                this.editIntegralForm.category1 = 1
                this.editIntegralForm.category2 = response.list.category
              }
              this.editIntegralForm.cycle = response.list.cycle
              if (response.list.details.length !== 0) {
                this.editIntegralForm.dailyClockItData = response.list.details
              }


              break;
            case 5:
              this.firstLogin = false
              this.perfectInfo = false
              this.dailyClock = false
              this.shareOther = true
              this.watchStream = false
              this.clockInReward = false
              this.editIntegralForm.daytype = response.list.daytype
              this.editIntegralForm.num = response.list.num
              this.editIntegralForm.starttime = response.list.starttime
              this.editIntegralForm.sharecontent = response.list.sharecontent
              this.editIntegralForm.endtime = response.list.endtime
              this.editIntegralForm.type = response.list.type
              if (response.list.daytype == 1) {
                this.editIntegralForm.time = [response.list.starttime, response.list.endtime]
              }
              if (response.list.category == -1) {
                this.editIntegralForm.category1 = -1
              } else {
                this.editIntegralForm.category1 = 1
                this.editIntegralForm.category2 = response.list.category
              }
              this.editIntegralForm.cycle = response.list.cycle

              this.editIntegralForm.shareimg = response.list.shareimg

              break;
            case 6:
              this.firstLogin = false
              this.perfectInfo = false
              this.dailyClock = false
              this.shareOther = false
              this.watchStream = true
              this.editIntegralForm.daytype = response.list.daytype
              this.clockInReward = false
              if (response.list.daytype == 1) {
                this.editIntegralForm.time = [response.list.starttime, response.list.endtime]
              }
              this.editIntegralForm.num = response.list.num
              this.editIntegralForm.starttime = response.list.starttime
              this.editIntegralForm.endtime = response.list.endtime
              this.editIntegralForm.type = response.list.type
              this.editIntegralForm.category = response.list.category
              this.editIntegralForm.cycle1 = response.list.cycle
              this.editIntegralForm.shareimg = response.list.shareimg
              this.editIntegralForm.sharecontent = response.list.sharecontent
              this.editIntegralForm.cycle2 = [response.list.shareimg, response.list.sharecontent]
              if (response.list.details.length !== 0) {
                this.editIntegralForm.watchStreamData = response.list.details
              }

              this.editIntegralForm.shareimg = response.list.shareimg
              this.editIntegralForm.sharecontent = response.list.sharecontent
              break;
            case 7:
              this.firstLogin = false
              this.perfectInfo = false
              this.dailyClock = false
              this.shareOther = false
              this.watchStream = false
              this.clockInReward = true
              this.editIntegralForm.daytype = response.list.daytype
              if (response.list.daytype == 1) {
                this.editIntegralForm.time = [response.list.starttime, response.list.endtime]
              }
              this.editIntegralForm.num = response.list.num
              this.editIntegralForm.cycle3 = response.list.cycle
              if (response.list.details.length !== 0) {
                console.log('111');
                this.editIntegralForm.checkedCities = []
                for (var i = 0; i < response.list.details.length; i++) {
                  this.editIntegralForm.checkedCities.push(response.list.details[i].name);
                }


              }
              this.editIntegralForm.starttime = response.list.starttime
              this.editIntegralForm.endtime = response.list.endtime
              this.editIntegralForm.type = response.list.type
              break;

            default:
              break;
          }
        })

      },
      weekClick() {
        console.log('111');
        this.weekAFew = true
      },
      beforeAvatarUpload1(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG||!isPNG) {
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

        if (!isJPG||!isPNG) {
          this.$message.error('上传文件后缀不允许');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      editWeekClick() {
        console.log('111');
        this.editweekAFew = true
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

      dataInit() {
        this.loading = true
        this.$axios.post('/admin/Account/getMemberIntegral', {
          token: this.token,
          name: this.searchForm.key,
          grade: this.searchForm.grade == '' ? '-1' : this.searchForm.grade,
          type: this.searchForm.getintegral == '' ? '-1' : this.searchForm.getintegral,
          limit: this.limit1,
          page: this.page1,
        }, response => {
          console.log(response);
          this.tableData1 = response.list
          this.total = response.count;
          this.loading = false;
        })
      },
      getMemberIntegral() {
        this.$axios.post('/admin/Account/getIntegralList', {
          token: this.token,
          limit: this.limit2,
          page: this.page2,
        }, response => {

          console.log(response);
          this.tableData2 = response.list
          this.total = 6;
          this.loading = false;
        })
      },
      addSure(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {

          }
        })

      },
      handleTabClick(tab, event) {
        console.log(tab.index);
        switch (tab.index) {
          case '0':
            this.dataInit
          case '1':
            this.getMemberIntegral()
            break;
          default:
            break;
        }
      },
      enableSwitch(id) {
        this.$axios.post('/admin/Account/getIntegralType', {
          token: this.token,
          id: id,
        }, response => {
          // this.$notify({
          //   title: '成功',
          //   message: '这是一条成功的提示消息',
          //   type: 'success'
          // });
        })
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
        this.getMemberIntegral();
      },
      handleCurrentChange2(val) {
        this.page2 = val;
        this.getMemberIntegral();
      },
      handleEdit(index, row) {
        this.$router.push({ path: '/memberDetail' })
      },
      handleDelete(id, index) {
        this.$axios.post('/admin/Account/getIntegralDel', {
          token: this.token,
          id: id,
        }, response => {
          if (response.code == 0) {
            this.$notify({
              title: '成功',
              message: response.msg,
              type: 'success'
            });
            this.tableData2.splice(index, 1)
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      seachReset() {
        this.searchForm.key = ''
        this.searchForm.getintegral = ''
        this.searchForm.grade = ''
        this.dataInit()
      },
      addIntegral() {

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
        this.addIntegralForm.shareimg = res.url;
      },
      
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.addIntegralTan = false
            this.editIntegralTan = false
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
            this.editweekAFew = false
            done();
          })
          .catch(_ => { });

      },
      addRule(i) {
        var name = Number(this.addIntegralForm.dailyClockItData[this.addIntegralForm.dailyClockItData.length - 1].name)
        this.addIntegralForm.dailyClockItData.push({ name: name + 1, num: '' })
        // this.$set(this.addIntegralForm.dailyClockItData, this.addIntegralForm.dailyClockItData.length, { name: name + 1, num: '' })
        console.log(this.addIntegralForm.dailyClockItData);
      },
      delRule(i) {
        if (i == 0) {
          this.$message.error('此项无法删除');
        } else {
          this.addIntegralForm.dailyClockItData.splice(i, 1)
        }
      },
      editAddRule(i) {
        var name = Number(this.editIntegralForm.dailyClockItData[this.editIntegralForm.dailyClockItData.length - 1].name)
        this.editIntegralForm.dailyClockItData.push({ name: name + 1, num: '' })
        // this.$set(this.editIntegralForm.dailyClockItData, this.editIntegralForm.dailyClockItData.length, { name: name + 1, num: '' })
        console.log(this.editIntegralForm.dailyClockItData);
      },
      editDelRule(i) {
        if (i == 0) {
          this.$message.error('此项无法删除');
        } else {
          this.editIntegralForm.dailyClockItData.splice(i, 1)
        }
      },
      addWatch() {
        this.addIntegralForm.watchStreamData.push({ name: '', num: '' })
        // console.log(this.addIntegralForm.watchStreamData);
      },
      addEditWatch() {
        this.editIntegralForm.watchStreamData.push({ name: '', num: '' })
        // console.log(this.addIntegralForm.watchStreamData);
      },
      delWatch(i) {
        if (i == 0) {
          this.$message.error('此项无法删除');
        } else {
          this.addIntegralForm.watchStreamData.splice(i, 1)
        }
      },
      delEditWatch(i) {
        if (i == 0) {
          this.$message.error('此项无法删除');
        } else {
          this.editIntegralForm.watchStreamData.splice(i, 1)
        }
      },
      handleCheckAllChange(val) {
        console.log(val);
        this.addIntegralForm.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        // console.log(this.isIndeterminate);
      },
      edithandleCheckAllChange(val) {
        if (val==true) {
          for (var i = 0; i < cityOptions.length; i++) {
            this.editIntegralForm.checkedCities.push(cityOptions[i].name)
          }
        } else {
          this.editIntegralForm.checkedCities = []
        }
        console.log(this.editIntegralForm.checkedCities);
        this.editisIndeterminate = false;
      },
      edithandleCheckedCitiesChange(value) {
        console.log(value);
        let checkedCount = value.length;
        this.editcheckAll = checkedCount === this.cities.length;
        this.editisIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        // console.log(this.isIndeterminate);
      },
      changqiFocus() {
        console.log('54654');
        this.addIntegralForm.daytype = 3
        console.log(this.addIntegralForm.daytype);
        this.editIntegralForm.daytype = 3
      },
      onPick(date) {
        console.log(date);
        this.addIntegralForm.starttime = date[0]
        this.addIntegralForm.endtime = date[1]
        this.editIntegralForm.starttime = date[0]
        this.editIntegralForm.endtime = date[1]
        this.addIntegralForm.daytype = 1
        this.editIntegralForm.daytype = 1
      },
      onPick1(date) {
        console.log(date);
        this.addIntegralForm.shareimg = date[0]
        this.addIntegralForm.sharecontent = date[1]
      },
      onPick2(date) {
        console.log(date);
        this.editIntegralForm.shareimg = date[0]
        this.editIntegralForm.sharecontent = date[1]
      },
      ruleChange(val) {
        console.log(val);
        // this.$refs['addIntegralForm'].resetFields();
        switch (val) {
          case 2:
            this.firstLogin = true
            this.perfectInfo = false
            this.dailyClock = false
            this.shareOther = false
            this.watchStream = false
            this.clockInReward = false
            break;
          case 3:
            this.firstLogin = false
            this.perfectInfo = true
            this.dailyClock = false
            this.shareOther = false
            this.watchStream = false
            this.clockInReward = false
            break;
          case 4:
            this.firstLogin = false
            this.perfectInfo = false
            this.dailyClock = true
            this.shareOther = false
            this.watchStream = false
            this.clockInReward = false
            break;
          case 5:
            this.firstLogin = false
            this.perfectInfo = false
            this.dailyClock = false
            this.shareOther = true
            this.watchStream = false
            this.clockInReward = false
            break;
          case 6:
            this.firstLogin = false
            this.perfectInfo = false
            this.dailyClock = false
            this.shareOther = false
            this.watchStream = true
            this.clockInReward = false
            break;
          case 7:
            this.firstLogin = false
            this.perfectInfo = false
            this.dailyClock = false
            this.shareOther = false
            this.watchStream = false
            this.clockInReward = true
            break;
          default:
            break;
        }
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

  .avatar-uploader {
    height: 134px;
  }

  .setHeight .el-form-item__content {
    height: 29px;
  }
</style>