<!-- 登录页面 -->
<template>
    <el-container style="font-size: 30px;
                    width: 1650px;
                    height: 990px;
                    background-color: rgb(231, 255, 247);
                    border-radius: 20px;">
        <!-- header -->
        <el-header style="font-size: 24px;">用户注册</el-header>
        <!-- main -->
        <el-main>
            <div style="width: 500px;position: relative; left:500px;top:30px;">
                <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="user.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password">
                        <el-input v-model="againPassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phoneNumber">
                        <el-input v-model="user.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('user')">立即创建</el-button>
                        <el-button @click="resetForm('user')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <nav>
                <router-link to="/">用户登录</router-link>
            </nav>
        </el-main>
        <!-- footer -->
    </el-container>
</template>

<script>

import { registerUser } from '@/api/userManage'

export default {
    name: 'registerVue',
    data() {
        return {

            //用户
            user: {
                id: '',
                username: '',
                password: '',
                gender: '',
                type: '',
                status: '',
                phoneNumber: '',
                email: '',
                image: ''
            },

            againPassword: '',

            //数据校验
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                phoneNumber: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 9, max: 12, message: '长度在 9 到 12 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            },
        }
    },

    methods: {
        //添加用户
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.user.password != this.againPassword) {
                        this.$message({
                            showClose: true,
                            message: "两次密码不一致,请重新输入",
                            type: 'error'
                        });
                        this.againPassword = ''
                    } else {
                        registerUser(this.user).then(
                            response => {
                                //处理响应结果
                                if (response.code === 1) {
                                    this.$message({
                                        showClose: true,
                                        message: '注册成功,请前往登录',
                                        type: 'success'
                                    });
                                } else if (response.code === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: response.msg,
                                        type: 'error'
                                    });
                                    this.againPassword = ''
                                }
                            }
                        )
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}

</script>

<style scoped>
a{
    text-decoration: none;
    font-size: 18px;
}
</style>