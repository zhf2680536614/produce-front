<!-- 登录页面 -->
<template>
    <el-container>
        <div style="background-size:cover;">
            <img id="loginpng" src="../assets/login.jpeg" style="width:2000px; opacity: 0.6;">
        </div>
        <!-- header -->
        <el-header style="position:fixed; top:30px; left:530px;">
            <img class="logo" src="../assets/logo.png" style="width:80px; height:80px; border-radius: 50%;" />
            <h1>
                <h2>
                    [&nbsp;&nbsp;&nbsp;WEB极客·农产品交易系统&nbsp;&nbsp;&nbsp;]
                </h2>
                <h4>
                    绿色农产汇聚处 健康生活新起点
                </h4>
            </h1>
        </el-header>
        <!-- main -->
        <el-main>

            <transition name="el-fade-in-linear">
                <div v-show="showUserLogin" class="transition-box">
                    <div>
                        <div id="userlogin">
                            <h3>用户登录</h3>
                            <el-form :model="user" :rules="rules" ref="user">
                                <el-form-item label="账号" prop="username">
                                    <el-input v-model="user.username" />
                                </el-form-item>

                                <el-form-item label="密码" prop="password">
                                    <el-input v-model="user.password" show-password />
                                </el-form-item>

                                <el-button @click="userlogin('user')">Login</el-button>

                                <div style="margin-top:20px;">
                                    <router-link to="/register">没有账号？注册一个</router-link> |
                                    <router-link to="/forgetpassword">忘记密码</router-link>
                                </div>
                            </el-form>
                        </div>

                        <div style="position:fixed; top:259px;left:840px;">
                            <img src="../assets/userlogin.jpeg"
                                style="width: 200px; height:335px; border-radius: 10px;">
                        </div>

                        <div id="userAside" @click="userClick">
                            <h3>管理员登录</h3>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="el-fade-in-linear">
                <div v-show="showAdminLogin" class="transition-box">
                    <div>
                        <div id="adminlogin">
                            <h3>管理员登录</h3>
                            <el-form :model="admin" :rules="rules" ref="admin">
                                <el-form-item label="账号" prop="username">
                                    <el-input v-model="admin.username" />
                                </el-form-item>

                                <el-form-item label="密码" prop="password">
                                    <el-input v-model="admin.password" show-password />
                                </el-form-item>

                                <el-button @click="adminlogin('admin')">Login</el-button>
                            </el-form>
                        </div>

                        <div id="adminAside" @click="adminClick">
                            <h3>用户登录</h3>
                        </div>

                        <div style="position:fixed; top:259px;left:560px;">
                            <img src="../assets/adminlogin.jpeg"
                                style="width: 200px; height:335px; border-radius: 10px;">
                        </div>
                    </div>
                </div>
            </transition>

        </el-main>
    </el-container>
</template>

<script>
import { loginUser, loginAdmin } from '@/api/loginRegister'

export default {
    name: 'loginVue',
    data() {
        return {
            user: {
                username: 'atey',
                password: '160814'
            },
            admin: {
                username: 'atey',
                password: '160814'
            },
            showUserLogin: true,
            showAdminLogin: false,
            //数据校验
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            }
        }
    },

    methods: {
        userlogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    loginUser(this.user).then(response => {
                        //处理响应结果
                        if (response) {
                            if (response.code === 1) {
                                localStorage.setItem('token', response.data.token)
                                localStorage.setItem('id', response.data.id)
                                this.$router.push({ name: 'homepage' });
                            } else if (response.code === 0) {
                                this.$message({
                                    type: 'error',
                                    message: response.msg
                                })
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: "后台服务未启动"
                            })
                        }
                    })

                } else {
                    this.$message({
                        type: 'error',
                        message: '请输入账号和密码！'
                    })
                    return false;
                }
            });
        },

        adminlogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    loginAdmin(this.admin).then(response => {
                        //处理响应结果
                        if (response) {
                            if (response.code === 1) {
                                localStorage.setItem('token', response.data.token)
                                localStorage.setItem('id', response.data.id)
                                this.$router.push({ name: 'controllermanage' });
                            } else if (response.code === 0) {
                                this.$message({
                                    type: 'error',
                                    message: response.msg
                                })
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: "后台服务未启动"
                            })
                        }
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '请输入账号和密码！'
                    })
                    return false;
                }
            });
        },
        userClick() {
            this.showUserLogin = false
            this.showAdminLogin = true
        },
        adminClick() {
            this.showAdminLogin = false
            this.showUserLogin = true
        }

    }
}
</script>

<style scoped>
@keyframes wave {
    0% {
        top: -1800px;
        left: -100px;
    }

    10% {
        top: -1700px;
        left: -20px;
    }

    20% {
        top: -1600px;
        left: -100px;
    }

    30% {
        top: -1500px;
        left: -20px;
    }

    40% {
        top: -1400px;
        left: -100px;
    }

    50% {
        top: -1300px;
        left: -20px;
    }

    60% {
        top: -1400px;
        left: -100px;
    }

    70% {
        top: -1500px;
        left: -20px;
    }

    80% {
        top: -1600px;
        left: -100px;
    }

    90% {
        top: -1700px;
        left: -20px;
    }

    100% {
        top: -1800px;
        left: -100px;
    }
}

#loginpng {
    position: fixed;
    left: -100px;
    top: -1800px;
    animation: wave 30s linear infinite;
}


a {
    text-decoration: none;
}

a:hover {
    color: rgb(97, 88, 88)
}

#userAside:hover {
    background-color: rgba(215, 234, 251, 0.8);
}

#adminAside:hover {
    background-color: rgba(215, 234, 251, 0.8);
}

h3 {
    margin-top: 25px;
}

#userlogin {
    width: 250px;
    height: 400px;
    position: fixed;
    top: 260px;
    left: 110px;
    margin-left: 450px;
    background-color: rgba(214, 236, 255, 0.6);
    box-shadow: 5px 5px 3px rgba(120, 187, 255, 0.6);
    border-radius: 5px;
    padding: 10px;
}

#adminlogin {
    width: 250px;
    height: 400px;
    position: fixed;
    top: 260px;
    left: 770px;
    margin-right: 450px;
    background-color: rgba(214, 236, 255, 0.6);
    box-shadow: -5px 5px 3px rgba(120, 187, 255, 0.6);
    border-radius: 5px;
    padding: 10px;
}

#userAside {
    position: fixed;
    left: 840px;
    top: 600px;
    background-color: rgba(214, 236, 255, 0.6);
    box-shadow: 5px 5px 3px rgba(120, 187, 255, 0.7);
    width: 200px;
    height: 80px;
    border-radius: 5px 20px 20px 5px;
}

#adminAside {
    position: fixed;
    left: 560px;
    top: 600px;
    background-color: rgba(214, 236, 255, 0.6);
    box-shadow: -5px 5px 3px rgba(120, 187, 255, 0.7);
    width: 200px;
    height: 80px;
    border-radius: 20px 5px 5px 20px;
}
</style>