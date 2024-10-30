<template>
    <div>
        <el-header>
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
            <nav id="rightnav">

                <el-popover placement="right" width="600" trigger="click">
                    <div class="popover">
                        <span>用户名</span>
                        <el-divider content-position="left"><span>用户名</span></el-divider>
                        <span>头像</span>
                        <el-divider content-position="left"><span>头像</span></el-divider>
                        <span>详细介绍</span>
                        <el-divider content-position="left"><span>详细介绍</span></el-divider>
                        <span>电话号码</span>
                        <el-divider content-position="left"><span>电话号码</span></el-divider>
                        <span>收货地址</span>
                        <el-divider content-position="left"><span>收货地址</span></el-divider>
                    </div>
                    <el-button slot="reference" type="primary" icon="el-icon-user-solid" class="person">个人中心</el-button>
                </el-popover>
                <span class="login">
                    <router-link to="/" class="loginExit">重新登陆</router-link>
                </span>

            </nav>
        </el-header>
    </div>
</template>

<script>

export default {
    name: 'homeTop',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
a.loginExit {
    color: black;
}

#centernav {
    background-color: rgba(252, 254, 255, 0.9);
    border-radius: 8px;
    position: fixed;
    left: 400px;
    top: -5px;
    height: 0px;
    padding-bottom: -10px;
    padding-top: 10px;
    margin-top: 28px;
    z-index: 100;
}

#rightnav {
    justify-content: center;
    background-color: rgba(252, 254, 255, 0.9);
    border-radius: 8px;
    position: fixed;
    left: 1330px;
    top: -5px;
    margin-right: 40px;
    height: 18px;
    padding-top: 5px;
    padding-bottom: 20px;
    margin-top: 28px;
    z-index: 100;
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
    margin-top: 10px;
}

a {
    color: rgba(13, 13, 13, 0.9);
    font-weight: 300;
    text-decoration: none;
    font-size: 18px;
}

.logo {
    margin-top: 10px;
    border-radius: 50%;
    position: fixed;
    left: 20px;
    top: 5px;
    z-index: 10;
}
</style>