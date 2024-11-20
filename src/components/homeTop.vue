<template>
    <div>

        <div id="hometop"></div>

        <img class="logo" src="../assets/logo.jpg" style="width:100px; height:50px; opacity: 1; border-radius: 50px;" />
        <nav id="centernav">
            <span class="routerspan">
                <router-link to="/home/homepage">商城首页</router-link></span>
            <span class="routerspan">
                <router-link to="/home/showpage">产品展示</router-link></span>
            <span class="routerspan">
                <router-link to="/home/transmarket">交易市场</router-link></span>
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
                        <el-dropdown-item icon="el-icon-user">
                            <el-popover placement="right" width="400" trigger="click">
                                <el-descriptions class="margin-top" title="个人中心" :column="1" border>

                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            用户名
                                        </template>
                                        <el-input v-model="user.username"></el-input>
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            性别
                                        </template>
                                        <el-input v-model="user.gender"></el-input>
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            电话号码
                                        </template>
                                        <el-input v-model="user.phoneNumber"></el-input>
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-tickets"></i>
                                            头像
                                        </template>
                                        <el-upload class="avatar-uploader" action="http://localhost:8081/upload"
                                            :show-file-list="false" :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="user.image" :src="user.image" class="avatar"
                                                style="width:200px;height:200px;">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-descriptions-item>

                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building">
                                            </i>
                                            邮箱
                                        </template>
                                        <el-input v-model="user.email"></el-input>
                                    </el-descriptions-item>

                                </el-descriptions>
                                <el-popover placement="left" width="400" trigger="click">
                                    <el-descriptions class="margin-top" title="收货地址" :column="1" border>

                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                收货地址
                                            </template>

                                            <div v-for="item in user.address" :key="item.id">
                                                <el-tag>Num : {{ item.number }}</el-tag>
                                                <el-input v-model="item.consigneeName"></el-input>
                                                <el-input v-model="item.consigneePhoneNumber"></el-input>
                                                <el-input v-model="item.location"></el-input>
                                                默认地址<el-switch v-model="item.isDefault" active-color="#13ce66"
                                                    inactive-color="#ff4949"
                                                    @change="updateAddress(item.id, item.consigneeName, item.consigneePhoneNumber, item.location, item.isDefault)">
                                                </el-switch>
                                                <el-button type="text" style="margin-left:80px;"
                                                    @click="updateAddress(item.id, item.consigneeName, item.consigneePhoneNumber, item.location, item.isDefault)">保存修改</el-button>
                                                <el-button type="text" style="margin-left:30px;"
                                                    @click="deleteAddress(item.id)">删除</el-button>
                                                <hr>
                                            </div>
                                            <el-button type="text" @click="dialogFormVisible = true">添加收货地址</el-button>
                                            <el-dialog title="添加收货地址" :visible.sync="dialogFormVisible" append-to-body
                                                lock-scroll>
                                                <el-form :model="address" :rules="rules" ref="address"
                                                    label-width="100px" class="demo-ruleForm">
                                                    <el-form-item label="收货人姓名" prop="consigneeName">
                                                        <el-input v-model="address.consigneeName"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="电话号码" prop="consigneePhoneNumber">
                                                        <el-input v-model="address.consigneePhoneNumber"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="收获地址" prop="location">
                                                        <el-input v-model="address.location" autocomplete="off">
                                                        </el-input>
                                                    </el-form-item>
                                                </el-form>
                                                <div slot="footer" class="dialog-footer">
                                                    <el-button type="text"
                                                        @click="dialogFormVisible = false">取消</el-button>
                                                    <el-button type="text" @click="submitForm('address')">确定</el-button>
                                                </div>
                                            </el-dialog>
                                        </el-descriptions-item>
                                    </el-descriptions>
                                    <el-button slot="reference" type="text" class="button">收货地址</el-button>
                                </el-popover>
                                <el-button type="text" class="button" style="margin-left:100px;"
                                    @click="updateUser">保存修改</el-button>
                                <el-button slot="reference" type="text" style="font-size:18px;font-weight:200;"
                                    @click="selectById">个人中心</el-button>
                            </el-popover>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-refresh"><router-link
                                to="/">重新登陆</router-link></el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus-outline"><router-link
                                to="/register">注册</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>

    </div>


</template>

<script>
import { getByIdUserUser, updateUserUser, updateUserAddress, deleteUserAddress } from '@/api/userManage';
import { createAddress } from '@/api/address';
import { mapMutations } from 'vuex';

export default {

    name: 'homeTop',

    data() {
        return {
            addressIndex: 0,
            drawer: false,
            dialogFormVisible: false,
            user: {
                id: '',
                username: '',
                password: '',
                gender: '',
                phoneNumber: '',
                email: '',
                image: '',
                address: []
            },

            address: {
                id: "",
                userId: '',
                location: '',
                consigneeName: '',
                consigneePhoneNumber: '',
            },

            rules: {
                consigneeName: [
                    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                    { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                ],
                consigneePhoneNumber: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { min: 9, max: 12, message: '长度在 9 到 12 个字符', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请输入收货地址', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
            },
        }
    },

    mounted() {
        this.selectById();
    },



    methods: {
        //删除收货地址
        deleteAddress(id) {
            this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUserAddress(id).then(
                    response => {
                        //处理响应结果
                        if (response.code === 1) {

                            this.selectById()

                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            })

                        } else if (response.code === 0) {

                            this.$message({
                                showClose: true,
                                message: response.msg,
                                type: 'error'
                            });
                            this.selectById()
                        }
                    }
                )
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //修改用户收货地址
        updateAddress(id, consigneeName, consigneePhoneNumber, location, isDefault) {
            console.log("修改地址");

            if (isDefault == true) {
                isDefault = 1
            } else {
                isDefault = 2
            }

            const address = {
                id: id,
                userId: this.user.id,
                location: location,
                consigneeName: consigneeName,
                consigneePhoneNumber: consigneePhoneNumber,
                isDefault: isDefault
            }

            updateUserAddress(address).then(
                response => {
                    //处理响应结果
                    if (response.code === 1) {

                        this.selectById()

                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        })

                    } else if (response.code === 0) {

                        this.$message({
                            showClose: true,
                            message: response.msg,
                            type: 'error'
                        });
                        this.selectById()
                    }
                }
            )
        },

        //修改用户
        updateUser() {

            if (this.user.gender == '男') {
                this.user.gender = 1
            }

            if (this.user.gender == '女') {
                this.user.gender = 2
            }

            updateUserUser(this.user).then(
                response => {
                    //处理响应结果
                    if (response.code === 1) {

                        this.selectById()

                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        })

                    } else if (response.code === 0) {
                        this.user.gender === 1 ? (this.user.gender = '男') : (this.user.gender = '女');
                        this.$message({
                            showClose: true,
                            message: response.msg,
                            type: 'error'
                        });
                    }
                }
            )
        },

        ...mapMutations(['setUser']),

        //根据id查询用户
        selectById() {
            this.user.id = localStorage.getItem("id")
            getByIdUserUser(this.user.id).then(
                data => {
                    this.user = data.data
                    this.user.gender == 1 ? this.user.gender = "男" : this.user.gender = "女"
                    this.setUser(this.user);
                }
            )

        },

        //文件上传成功后返回URL
        handleAvatarSuccess(res) {
            this.user.image = res.data;
        },

        //新增收货地址
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.address.userId = this.user.id
                    createAddress(this.address).then(
                        response => {
                            //处理响应结果
                            if (response.code === 1) {
                                this.dialogFormVisible = false;
                                this.selectById()
                                this.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                            } else if (response.code === 0) {
                                this.$message({
                                    showClose: true,
                                    message: response.msg,
                                    type: 'error'
                                });
                            }
                        }
                    )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //上传图片时校验
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }
    }
}


</script>

<style scoped>
#hometop {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -999;
}

.button {
    margin-right: 5px;
    width: 90px;
    height: 40px;
}

button {
    color: rgba(27, 145, 255, 0.9);
}

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
    width: 45vw;
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