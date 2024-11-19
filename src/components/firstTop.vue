<template>
    <div>
        <el-header style="border-radius: 5px;">
            <img class="logo" src="../assets/logo.jpg"
                style="width:100px; height:50px; opacity: 1; border-radius: 50px;z-index:-999;" />

            <h3 style="position:fixed; top:-10px; left:570px; font-size:30px; font-weight: 500px; 
            background-color: rgba(64,158, 255,0.5); border-radius: 5px; 
                box-shadow:5px 5px 2px rgba(64, 158, 255,0.9); padding-left:60px;
                padding-right: 60px; padding-top:2px; padding-bottom: 2px;">WEB极客·农产品交易系统管理端</h3>
            
            <span style="position:fixed;
            left:1250px;
            top:25px;">
                <el-statistic ref="statistic" format="HH:mm:ss" :value="deadline4" title="距离明日：" time-indices>
                </el-statistic>
            </span>
            <span style="
            position:fixed;
            left:1475px;
            top:30px;">
                <span class="login">
                    <router-link to="/">重新登陆</router-link>
                </span>
            </span>
        </el-header>

        <nav style="position: fixed; left:100px;top:6px; z-index:999;">
            <router-link to="/admin/controllermanage">仪表盘</router-link>|
            <router-link to="/admin/usermanage">用户管理</router-link>|
            <router-link to="/admin/producesmanage">产品管理</router-link>|
            <router-link to="/admin/categorymanage">分类管理</router-link>|
            <router-link to="/admin/recordsmanage">订单管理</router-link>
        </nav>

        <router-view />
    </div>
</template>

<script>

export default ({
    name: 'firstTop',
    components: {

    },
    data() {
        return {
            deadline4: Date.now() + (new Date().setHours(23, 59, 59) - Date.now()),
        };
    },
    methods: {

    }
});
</script>

<style scoped>
* {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-decoration: none;
}

.login {
    background-color: rgba(209, 230, 252, 0.8);
    display: inline-block;
    border-radius: 5px;
    padding: 4px;
}

.login a {
    color: black;
}

.login:hover {
    background-color: rgb(182, 208, 248);
}

a {
    color: rgb(16, 8, 255);
    font-weight: 300;
    font-size: 18px;
}

nav a:hover {
    color: rgba(79, 87, 251, 0.925);
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