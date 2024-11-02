<template>
    <div>

        <img class="logo" src="../assets/logo.png" width="50" height="50" />
        <nav id="centernav">
            <span class="routerspan">
                <router-link to="/home/homepage">商城首页</router-link></span>
            <span class="routerspan">
                <router-link to="/home/showpage">产品展示</router-link></span>
            <span class="routerspan">
                <router-link to="/home/transmarket">交易市场</router-link></span>
            <span class="routerspan">
                <router-link to="/home/todaynews">今日要闻</router-link></span>
            <span class="routerspan">
                <router-link to="/home/recordstrans">交易信息</router-link></span>
            <span class="routerspan">
                <router-link to="/home/about">关于我们</router-link></span>
        </nav>


        <el-row class="block-col-2">
            <el-col :span="12">
                <el-dropdown>
                    <span class="el-dropdown-link" style="font-size:19px; font-weight: 100;">
                        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user"><router-link to="/"
                                class="loginExit">个人中心</router-link></el-dropdown-item>
                        <el-dropdown-item icon="el-icon-refresh"><router-link to="/"
                                class="loginExit">重新登陆</router-link></el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus-outline"><router-link to="/"
                                class="loginExit">注册</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>


</template>

<script>

export default {
    name: 'homeTop',
    components: {

    },
    data() {
        return {
            drawer: false,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}

#centernav {
    background-color: rgba(234, 248, 255, 0.9);
    border-radius: 8px;
    position: absolute;
    left: 380px;
    top: 10px;
    height: 0px;
    width: 800px;
    z-index: 100;
    padding-top: 10px;
}

.block-col-2 {
    position: absolute;
    left: 1480px;
    top: 20px;
    margin-right: 40px;
    z-index: 100;
    width: 200px;
    padding-top: 0px;
    padding-bottom: 40px;
}

button.person {
    background-color: rgba(254, 255, 253, 0);
    border: none;
    color: rgba(0, 0, 0, 0.9);
    font-size: 15px;
}

.routerspan {
    margin-left: 30px;
    margin-right: 30px;
}

a {
    color: rgba(13, 13, 13, 0.9);
    font-weight: 300;
    text-decoration: none;
    font-size: 18px;
}

.logo {
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 10;
}
</style>