<template>
    <div>
        <div class="div1">
            <div>找回密码</div>
            <div v-show="validate">
                <div style="font-size:20px;">身份验证</div>
                <div style="width: 500px;position: relative; left:530px;top:30px;">
                    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="user.username"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phoneNumber">
                            <el-input v-model="user.phoneNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="user.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('user')">验证</el-button>
                            <el-button @click="resetForm('user')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <div v-show="reset">
                <div style="font-size:20px;">重置密码</div>
                <div style="width: 500px;position: relative; left:520px;top:30px;">
                    <el-form :model="user" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="密码">
                            <el-input v-model="user.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input v-model="againPassword" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="resetPassword">确认重置</el-button>
                            <el-button @click="empty">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <nav>
                <router-link to="/">用户登录</router-link>
            </nav>
        </div>

    </div>
</template>

<script>

import { validateUser, resetPassword } from "@/api/userManage";

export default {
    name: 'forgetPassword',
    data() {
        return {

            validate: true,
            reset: false,

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

        //验证用户
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    validateUser(this.user).then(
                        response => {
                            //处理响应结果
                            if (response.code === 1) {
                                this.$message({
                                    showClose: true,
                                    message: '验证成功,请重新设置密码',
                                    type: 'success'
                                });

                                this.user = response.data
                                this.user.password = ''
                                this.validate = false;
                                this.reset = true;
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

        empty(){
            this.againPassword = ''
            this.user.password = ''
        },

        //重置密码
        resetPassword() {
            if (this.user.password == '' || this.user.password == null) {
                this.$message({
                    showClose: true,
                    message: '密码不能为空,请重新输入',
                    type: 'error'
                });
                return;
            }
            if (this.user.password != this.againPassword) {
                this.$message({
                    showClose: true,
                    message: '两次密码不一致,请重新输入',
                    type: 'error'
                });
                this.againPassword = ''
            } else {
                resetPassword(this.user).then(
                    res => {
                        if (res.code == 1) {
                            this.user = ''
                            this.againPassword = ''
                            this.$router.push({ name: 'login' });
                            this.$message({
                                showClose: true,
                                message: '密码重置成功,请重新登陆',
                                type: 'success'
                            });
                        }
                    }
                )
            }

        }
    }
}

</script>

<style scoped>
.div1 {
    font-size: 30px;
    width: 1650px;
    height: 990px;
    background-color: rgb(231, 255, 247);
    border-radius: 20px;
}

a {
    text-decoration: none;
    font-size: 18px;
}
</style>