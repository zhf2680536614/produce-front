<!-- 分类管理 -->
<template>
    <div style="position: fixed;
    z-index: 10;
    left:5px;
    top:70px;">
        <first-top />
        <el-main>
            <!-- 检索栏 -->
            <el-row :gutter="30" style="position:fixed; left:30px; top:100px;width: 100%;">
                <el-col :span="4"><el-input v-model="name" placeholder="名称"></el-input></el-col>
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
                    <!-- 增加分类 -->
                    <el-popover placement="right" width="400" trigger="click">
                        <div class="popover">
                            <el-form :model="category" :rules="rules" ref="category" label-width="100px"
                                class="demo-ruleForm">
                                <el-form-item label="名称" prop="name">
                                    <el-input v-model="category.name"></el-input>
                                </el-form-item>
                                <el-form-item label="状态" prop="status">
                                    <el-select v-model="category.status" placeholder="请选择状态">
                                        <el-option label="启用" value="1"></el-option>
                                        <el-option label="禁用" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('category')">立即创建</el-button>
                                    <el-button @click="resetForm('category')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button slot="reference" type="primary" icon="el-icon-circle-plus" style="margin-left:300px;"
                            @click="emptyForm">
                            添加分类
                        </el-button>
                    </el-popover>
                </div>
            </el-row>

            <!-- 商品列表数据 -->
            <el-table stripe :data="tableData" style="position:fixed; left:30px;top:160px; font-size: medium;opacity:0.9;">
                <el-table-column prop="name" label="名称" width="300">
                </el-table-column>
                <el-table-column prop="status" label="分类状态" width="300">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1" style="color: green;">•</span>
                        <span v-if="scope.row.status === 2" style="color: red;">•</span>
                        {{ scope.row.status == 1 ? '启用' : '禁用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="300">
                </el-table-column>
                <el-table-column prop="updateTime" label="最后操作日期" width="300">
                </el-table-column>

                <!-- 修改分类 -->
                <el-table-column label="修改" width="200">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="400" trigger="click">
                            <div class="popover">
                                <el-form :model="category" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="名称" prop="name">
                                        <el-input v-model="category.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="status">
                                        <el-select v-model="category.status" placeholder="请选择状态">
                                            <el-option label="启用" value="1"></el-option>
                                            <el-option label="禁用" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item>
                                        <el-button type="primary" @click="update('category')">立即修改</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-button slot="reference" type="text" icon="el-icon-s-tools"
                                @click="selectById(scope.row.id)">
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <!-- 删除分类 -->
                <el-table-column label="删除" width="200">
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
import moment from 'moment';
import firstTop from '@/components/firstTop.vue';
import { createCategory, deleteCategory, getByIdCategory, pageQuery, updatecategory } from '@/api/category';
export default {
    name: 'categoryManage',
    components: {
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
            name: '',
            timeRange: '',
            startTime: null,
            endTime: null,

            //修改用户
            category: {
                id: '',
                name: '',
                status: '',
                createTime: '',
                updateTime: ''
            },

            //数据校验
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            },

            id: ''
        };
    },

    mounted() {
        //页面渲染完成后分页查询获取数据
        this.pageNo = 1
        this.pageSize = 11
        this.page()
    },

    methods: {
        //修改分类
        update() {

            if (this.category.status == '启用') {
                this.category.status = 1
            }

            if (this.category.status == '禁用') {
                this.category.status = 2
            }

            updatecategory(this.category).then(
                response => {
                    //处理响应结果
                    if (response.code === 1) {
                        this.emptyForm

                        this.page()

                        this.selectById(this.id)

                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        })

                    } else if (response.code === 0) {
                        this.category.status === 1 ? (this.category.status = '启用') : (this.category.status = '禁用')
                        
                        this.$message({
                            showClose: true,
                            message: response.msg,
                            type: 'error'
                        });
                    }
                }
            )
        },

        //根据id查询分类
        selectById(id) {
            getByIdCategory(id).then(
                data => {
                    this.id = id
                    this.category = data.data
                    this.category.status === 1 ? (this.category.status = '启用') : (this.category.status = '禁用')
                }
            )
        },

        emptyForm() {
            this.category.id = ''
            this.category.name = ''
            this.category.status = ''
        },

        //添加分类
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createCategory(this.category).then(
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

        //分类分页查询数据
        page() {

            if (this.timeRange != null) {
                if (this.timeRange[0] != null && this.timeRange[1] != null) {
                    const startMoment = moment(this.timeRange[0])
                    const endMoment = moment(this.timeRange[1])
                    this.startTime = startMoment.format('yyyy-MM-DD HH:mm:ss')
                    this.endTime = endMoment.format('yyyy-MM-DD HH:mm:ss')
                }
            }

            pageQuery(this.pageNo, this.pageSize, this.name, this.startTime, this.endTime)
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

        //删除分类
        open(id) {
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteCategory(id).then(
                    response => {
                        if (response.code == 1) {
                            this.page()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else if(response.code == 0){
                            this.$message({
                                type: 'error',
                                message: response.msg
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

        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        //切换页面
        handleCurrentChange(val) {

            this.pageNo = val

            this.page()
        },
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