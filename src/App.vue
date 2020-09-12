<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  html,
  body,
  #app {
    height: 100%;
  }

  .el-dialog__wrapper {
    &.dialog-fade-enter-active {
      -ms-animation: none;
    }

    &.dialog-fade-leave-active {
      -ms-animation: none;
    }
  }


  * {
    /* font-family: "????"; */
    /* font-size: 16px; */
    border: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .w_150 {
    width: 130px;
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

  .shouTanIt {
    display: flex;
    align-items: flex-start;
    display: -ms-flexbox;
    -ms-flex-align: start;
    font-size: 18px;
    line-height: 40px;
    color: #000;
  }

  .shouTanIt label {
    width: 100px;
  }

  .el-dialog__body {
    padding-top: 0 !important;
  }

  .tabBox {
    border: 1px solid #ddd;
    margin-top: 17px;
    border-bottom: none;
  }

  .inviteTit {
    text-align: right;
    margin-right: 10px;
  }
</style>