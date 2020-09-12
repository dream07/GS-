<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path"
      >
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import pathToRegexp from 'path-to-regexp'

  export default {
    data() {
      return {
        levelList: null,
        pathPath: '',
        pathName: ''
      }
    },
    watch: {
      $route(route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
          return
        }
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        // only show routes with meta.title
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        // console.log(matched);
        const first = matched[0]
        var that = this
        if (this.ismember(first)) {
          // this.ismember(first)
          // console.log(that.pathName);
          // console.log(matched);
          matched = [{ path: that.pathPath, meta: { title: that.pathName } }].concat(matched)
          this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        }
        // if (!this.isintegral(first)) {
        //   matched = [{ path: '/integral', meta: { title: '积分管理' } }].concat(matched)
        // } 
        // this.levelList = matched.filter(item => item.meta && item.meta && item.ment)
        // this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      ismember(route) {
        const name = route && route.name
        // console.log(route);
        if (!name) {
          return false
        }
        if(route.parent.name == undefined || route.parent.name== 'router-name') {
          // console.log('没有上级');
          this.pathPath = ''
          this.pathName = ''
          return true
        } else {
          // console.log('有上级');
          // console.log(route);
          this.pathPath = route.parent.path
          this.pathName = route.parent.name
          return true
        }
        // if (name.trim().toLocaleLowerCase() === 'member'.toLocaleLowerCase()) {
         
        //   return name.trim().toLocaleLowerCase() === 'member'.toLocaleLowerCase()
          
        // } else if (name.trim().toLocaleLowerCase() === 'integral'.toLocaleLowerCase()) {
        //   console.log('相等');
        //   this.pathPath = ''
        //   this.pathName = ''
        //   return name.trim().toLocaleLowerCase() === 'integral'.toLocaleLowerCase()
        // } else if (name.trim().toLocaleLowerCase() === 'memberDetail'.toLocaleLowerCase()) {
        //   this.pathPath = '/member'
        //   this.pathName = '会员管理'
        //   return name.trim().toLocaleLowerCase() === 'memberDetail'.toLocaleLowerCase()
        // }
      },
      // isintegral(route) {
      //   const name = route && route.name
      //   if (!name) {
      //     return false
      //   }
      //   return name.trim().toLocaleLowerCase() === 'integral'.toLocaleLowerCase()
      // },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>