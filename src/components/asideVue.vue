<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>我是买家</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <router-link to="./about">关于我们</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-1">商品展示</el-menu-item>
                    <el-menu-item index="1-2">购买记录</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>我是商家</template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">我要上架</el-menu-item>
                    <el-menu-item index="2-2">上架记录</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>管理员</template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">用户管理</el-menu-item>
                    <el-menu-item index="2-2">分类管理</el-menu-item>
                    <el-menu-item index="2-2">订单管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script lang="ts">

export default({
    name: 'AsideVue',
    props: {
        msg: String,
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>