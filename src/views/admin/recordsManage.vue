<!-- 订单管理 -->
<template>
    <div style="position: fixed;
    z-index: 10;
    left:5px;
    top:70px;">
    <first-top/>
        <el-main>
            <!-- 检索栏 -->
            <el-row :gutter="30" style="position:fixed; left:30px; top:100px;width: 100%;">
                <el-col :span="4"><el-input v-model="username" placeholder="用户名"></el-input></el-col>
                <el-col :span="4"><el-input v-model="phoneNumber" placeholder="电话号码"></el-input></el-col>
                <!-- 时间选择器 -->
                <el-col :span="6">
                    <div class="block">
                        <el-date-picker v-model="timeRange" type="datetimerange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="创建开始日期" end-placeholder="创建结束日期" align="right">
                        </el-date-picker>
                    </div>
                </el-col>
                <!-- 按钮 -->
                <div style="position:fixed;top:100px;left:1050px;">
                    <!-- 检索 -->
                    <el-button type="primary" icon="el-icon-search" @click="pageByCondition">查找</el-button>
                    <!-- 增加用户 -->
                    <el-popover placement="right" width="400" trigger="click">
                        <div class="popover">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                class="demo-ruleForm">
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="ruleForm.username"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="password">
                                    <el-input v-model="ruleForm.password"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="gender">
                                    <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                                        <el-option label="男" value="1"></el-option>
                                        <el-option label="女" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="权限" prop="type">
                                    <el-select v-model="ruleForm.type" placeholder="请选择权限">
                                        <el-option label="普通用户" value="1"></el-option>
                                        <el-option label="管理员" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态" prop="status">
                                    <el-select v-model="ruleForm.status" placeholder="请选择状态">
                                        <el-option label="启用" value="1"></el-option>
                                        <el-option label="禁用" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="头像">
                                    <el-upload class="avatar-uploader" action="http://localhost:8081/upload"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item label="电话号码" prop="phoneNumber">
                                    <el-input v-model="ruleForm.phoneNumber"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button slot="reference" type="primary" icon="el-icon-circle-plus"
                            style="margin-left:300px;">
                            添加用户
                        </el-button>
                    </el-popover>
                </div>
            </el-row>

            <!-- 商品列表数据 -->
            <el-table stripe :data="tableData" style="position:fixed; left:30px;top:160px; font-size: medium;">
                <el-table-column prop="username" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="电话号码" width="180">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="100">
                    <template slot-scope="scope">
                        {{ scope.row.gender == 1 ? '男' : '女' }}
                    </template>
                </el-table-column>
                <el-table-column label="头像" width="150">
                    <template slot-scope="scope">
                        <div>
                            <img :src="scope.row.image" width="60" height="50" style="border-radius: 5px;" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="270">
                </el-table-column>
                <el-table-column prop="status" label="账号状态" width="140">
                    <template slot-scope="scope">
                        {{ scope.row.status == 1 ? '启用' : '禁用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="账号权限" width="140">
                    <template slot-scope="scope">
                        {{ scope.row.type == 1 ? '普通用户' : '管理员' }}
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后操作日期" width="220">
                </el-table-column>

                <!-- 修改用户 -->
                <el-table-column label="修改" width="120">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="400" trigger="click">
                            <div class="popover">
                                <el-form :model="user" ref="user" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="用户名" prop="username">
                                        <el-input v-model="user.username"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="password">
                                        <el-input v-model="user.password"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" prop="gender">
                                        <el-select v-model="user.gender" placeholder="请选择性别">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="权限" prop="type">
                                        <el-select v-model="user.type" placeholder="请选择权限">
                                            <el-option label="普通用户" value="1"></el-option>
                                            <el-option label="管理员" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="status">
                                        <el-select v-model="user.status" placeholder="请选择状态">
                                            <el-option label="启用" value="1"></el-option>
                                            <el-option label="禁用" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="头像">
                                        <el-upload class="avatar-uploader" action="http://localhost:8081/upload"
                                            :show-file-list="false" :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="user.image" :src="user.image" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>

                                    <el-form-item label="电话号码" prop="phoneNumber">
                                        <el-input v-model="user.phoneNumber"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input v-model="user.email"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="update('user')">立即修改</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-button slot="reference" type="text" icon="el-icon-s-tools"
                                @click="selectById(scope.row.id)">
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <!-- 删除用户 -->
                <el-table-column label="删除" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" @click="open(scope.row.id)" icon="el-icon-delete-solid"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页查询 -->
            <div class="block" style="position:fixed; top:950px; left:600px">
                <el-pagination @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize"
                    layout="total, prev, pager, next, jumper" :total=total>
                </el-pagination>
            </div>
        </el-main>
    </div>
</template>
<script>
import { pageQuery, createUser, deleteUser, getByIdUser, updateUser } from '@/api/userManage';
import moment from 'moment';
import firstTop from '@/components/firstTop.vue';
export default {
    name: 'recordsManage',
    components:{
        firstTop
    },
    data() {
        //页面数据
        return {
            // 时间选择器
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },


            //分页查询
            // 列表展示数据
            tableData: null,
            //总数
            total: null,
            PageNo: 1,
            pageSize: null,
            //分页条件
            username: '',
            phoneNumber: '',
            timeRange: '',
            startTime: null,
            endTime: null,

            //修改用户
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

            //添加用户
            ruleForm: {
                username: '',
                password: '',
                gender: '',
                type: '',
                status: '',
                phoneNumber: '',
                email: '',
                image: ''
            },

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
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一种权限', trigger: 'change' }
                ],
                gender: [
                    { type: 'array', required: true, message: '请至少选择一种性别', trigger: 'change' }
                ],
                status: [
                    { type: 'array', required: true, message: '请至少选择一种状态', trigger: 'change' }
                ]
            },

            id: ''
        };
    },

    mounted() {
        //页面渲染完成后分页查询获取数据
        this.pageNo = 1
        this.pageSize = 9
        this.page()
    },

    methods: {
        //修改用户
        update() {

            if (this.user.status == '启用') {
                this.user.status = 1
            }

            if (this.user.status == '禁用') {
                this.user.status = 2
            }

            if (this.user.gender == '男') {
                this.user.gender = 1
            }

            if (this.user.gender == '女') {
                this.user.gender = 2
            }

            if (this.user.type == '普通用户') {
                this.user.type = 1
            }

            if (this.user.type == '管理员') {
                this.user.type = 2
            }

            updateUser(this.user).then(
                response => {
                    //处理响应结果
                    if (response.code === 1) {
                        this.user.id = ''
                        this.user.username = ''
                        this.user.password = ''
                        this.user.gender = ''
                        this.user.type = ''
                        this.user.status = ''
                        this.user.phoneNumber = ''
                        this.user.email = ''
                        this.user.image = ''

                        this.page()

                        this.selectById(this.id)

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
                    }
                }
            )
        },

        //根据id查询用户
        selectById(id) {
            getByIdUser(id).then(
                data => {
                    this.id = id
                    this.user = data.data
                    this.user.status === 1 ? (this.user.status = '启用') : (this.user.status = '禁用');
                    this.user.gender === 1 ? (this.user.gender = '男') : (this.user.gender = '女');
                    this.user.type === 1 ? (this.user.type = '普通用户') : (this.user.type = '管理员');
                }
            )
        },

        //删除员工
        open(id) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUser(id).then(
                    data => {
                        if (data.code == 1) {
                            this.page()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
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

        //员工分页查询数据
        page() {

            if (this.timeRange != null) {
                if (this.timeRange[0] != null && this.timeRange[1] != null) {
                    const startMoment = moment(this.timeRange[0])
                    const endMoment = moment(this.timeRange[1])
                    this.startTime = startMoment.format('yyyy-MM-DD HH:mm:ss')
                    this.endTime = endMoment.format('yyyy-MM-DD HH:mm:ss')
                }
            }

            pageQuery(this.pageNo, this.pageSize, this.username, this.phoneNumber, this.startTime, this.endTime)
                .then(response => {
                    this.total = response.data.total
                    this.tableData = response.data.list
                    this.startTime = ''
                    this.endTime = ''
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        //检索
        pageByCondition() {
            this.pageNo = 1;
            this.page();
        },

        //切换页面
        handleCurrentChange(val) {

            this.pageNo = val

            this.page()
        },

        //添加用户
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createUser(this.ruleForm).then(
                        response => {
                            //处理响应结果
                            if (response.code === 1) {
                                this.page()
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

        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl);
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
.demo-ruleForm {
    margin: 0px;
    background-color: rgba(157, 224, 255, 0.5);
    box-shadow: 20px 20px 30px rgb(211, 249, 253)
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
</style>