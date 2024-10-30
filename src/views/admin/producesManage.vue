<!-- 农产品管理 -->
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
                <el-col :span="4"><el-input v-model="origin" placeholder="产地"></el-input></el-col>
                <el-col :span="4">

                    <el-select v-model="category" placeholder="请选择分类">
                        <el-option v-for="itme in categorys" :key="itme.id" :label="itme.name" :value="itme.id">
                        </el-option>
                    </el-select>

                </el-col>

                <!-- 时间选择器 -->
                <el-col :span="6">
                    <div class="block">
                        <el-date-picker v-model="timeRange" type="datetimerange" :picker-options="pickerOptions"
                            range-separator="至" start-placeholder="创建开始日期" end-placeholder="创建结束日期" align="right">
                        </el-date-picker>
                    </div>
                </el-col>
                <!-- 按钮 -->
                <div style="position:fixed;top:100px;left:1300px;">
                    <!-- 检索 -->
                    <el-button type="primary" icon="el-icon-search" @click="pageByCondition">查找</el-button>
                    <!-- 增加产品 -->
                    <el-popover placement="right" width="600" trigger="click">
                        <div class="popover">
                            <el-form :model="produces" :rules="rules" ref="produces" label-width="100px"
                                class="demo-ruleForm">
                                <el-form-item label="名称" prop="name">
                                    <el-input v-model="produces.name"></el-input>
                                </el-form-item>
                                <el-form-item label="分类" prop="category">
                                    <el-select v-model="produces.category" placeholder="请选择种类">
                                        <el-option v-for="item in categorys" :key="item.id" :label="item.name"
                                            :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="状态" prop="status">
                                    <el-select v-model="produces.status" placeholder="请选择状态">
                                        <el-option label="启用" value="1"></el-option>
                                        <el-option label="禁用" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="产地" prop="origin">
                                    <el-input v-model="produces.origin"></el-input>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-upload class="avatar-uploader" action="http://localhost:8081/upload"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="produces.image" :src="produces.image" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="产品描述" prop="description">
                                    <el-input type="textarea" v-model="produces.description"></el-input>
                                </el-form-item>
                                <el-form-item label="生长环境" prop="growthCycle">
                                    <el-input type="textarea" v-model="produces.growthCycle"></el-input>
                                </el-form-item>
                                <el-form-item label="生长习性" prop="shelfLife">
                                    <el-input type="textarea" v-model="produces.shelfLife"></el-input>
                                </el-form-item>
                                <el-form-item label="生长周期" prop="growthTime">
                                    <el-input v-model="produces.growthTime"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('produces')">立即创建</el-button>
                                    <el-button @click="resetForm('produces')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button slot="reference" type="primary" icon="el-icon-circle-plus" style="margin-left:50px"
                            @click="emptyForm">
                            添加产品
                        </el-button>
                    </el-popover>
                </div>
            </el-row>

            <!-- 商品列表数据 -->
            <el-table stripe :data="tableData"
                style="position:fixed; left:30px;top:160px; font-size: medium;opacity:0.9;">
                <el-table-column prop="name" label="名称" width="190">
                </el-table-column>
                <el-table-column prop="category" label="分类" width="190">
                    <template slot-scope="scope">
                        {{ processCategory(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="origin" label="产地" width="240">
                </el-table-column>
                <el-table-column label="图片" width="150">
                    <template slot-scope="scope">
                        <div>
                            <img :src="scope.row.image" width="60" height="50" style="border-radius: 5px;" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="growthTime" label="生长周期" width="200">
                </el-table-column>
                <el-table-column prop="status" label="产品状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1" style="color: green;">•</span>
                        <span v-if="scope.row.status === 2" style="color: red;">•</span>
                        {{ scope.row.status == 1 ? '启用' : '禁用' }}
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后操作日期" width="200">
                </el-table-column>
                <!-- 详细 -->
                <el-table-column label="详细" width="100">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="600" trigger="click">
                            <div class="popover">
                                <el-divider content-position="left"><span>名称</span></el-divider>
                                <span>{{ scope.row.name }}</span>
                                <el-divider content-position="left"><span>分类</span></el-divider>
                                <span>
                                    {{ processCategory(scope.row.category) }}
                                </span>
                                <el-divider content-position="left"><span>产地</span></el-divider>
                                <span>{{ scope.row.origin }}</span>
                                <el-divider content-position="left"><span>图片</span></el-divider>
                                <span>
                                    <div>
                                        <img :src="scope.row.image" width="300" height="auto" />
                                    </div>
                                </span>
                                <el-divider content-position="left"><span>产品描述</span></el-divider>
                                <span>{{ scope.row.description }}</span>
                                <el-divider content-position="left"><span>生长环境</span></el-divider>
                                <span>{{ scope.row.growthCycle }}</span>
                                <el-divider content-position="left"><span>生长习性</span></el-divider>
                                <span>{{ scope.row.shelfLife }}</span>
                                <el-divider content-position="left"><span>生长周期</span></el-divider>
                                <span>{{ scope.row.growthTime }}</span>
                            </div>
                            <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <!-- 修改产品 -->
                <el-table-column label="修改" width="100">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="600" trigger="click">
                            <div class="popover">
                                <el-form :model="produces" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="名称" prop="name">
                                        <el-input v-model="produces.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="分类" prop="category">
                                        <el-select v-model="produces.category" placeholder="请选择分类">
                                            <el-option v-for="itme in categorys" :key="itme.id" :label="itme.name"
                                                :value="itme.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="产地" prop="origin">
                                        <el-input v-model="produces.origin"></el-input>
                                    </el-form-item>
                                    <el-form-item label="状态" prop="status">
                                        <el-select v-model="produces.status" placeholder="请选择状态">
                                            <el-option label="启用" value="1"></el-option>
                                            <el-option label="禁用" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="图片">
                                        <el-upload class="avatar-uploader" action="http://localhost:8081/upload"
                                            :show-file-list="false" :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="produces.image" :src="produces.image" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="产品描述">
                                        <el-input type="textarea" v-model="produces.description"></el-input>
                                    </el-form-item>
                                    <el-form-item label="生长环境" prop="growthCycle">
                                        <el-input type="textarea" v-model="produces.growthCycle"></el-input>
                                    </el-form-item>
                                    <el-form-item label="生长习性" prop="">
                                        <el-input type="textarea" v-model="produces.shelfLife"></el-input>
                                    </el-form-item>
                                    <el-form-item label="生长周期" prop="growthTime">
                                        <el-input v-model="produces.growthTime"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="update('produces')">立即修改</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-button slot="reference" type="text" icon="el-icon-s-tools"
                                @click="selectById(scope.row.id)">
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <!-- 删除产品 -->
                <el-table-column label="删除" width="100">
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

import { queryCategory } from '@/api/category';
import { createProduces, deleteProduces, getByIdProduces, updateProduces } from '@/api/produces';
import firstTop from '@/components/firstTop.vue';
import moment from 'moment';
import { pageQuery } from '@/api/produces';

export default {
    name: 'goodsManage',
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
            origin: '',
            category: '',
            categorys: '',
            timeRange: '',
            startTime: null,
            endTime: null,

            //添加产品&修改产品
            produces: {
                id: '',
                name: '',
                category: '',
                origin: '',
                image: '',
                description: '',
                status: '',
                growthTime: '',
                growthCycle: '',
                shelfLife: ''
            },

            //数据校验
            rules: {
                name: [
                    { required: true, message: '产品名称', trigger: 'blur' },
                    { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
                ],
                origin: [
                    { required: true, message: '请输入产地', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入产品描述', trigger: 'blur' },
                    { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
                ],
                growthCycle: [
                    { required: true, message: '请输入生长环境', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
                shelfLife: [
                    { required: true, message: '请输入生长习性', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
                growthTime: [
                    { required: true, message: '请输入生长周期', trigger: 'blur' },
                    { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
                ],

            },

            id: ''
        };
    },

    mounted() {
        this.pageNo = 1
        this.pageSize = 9
        this.page()
        this.getCategory()
    },

    methods: {
        //转换分类
        processCategory(number) {
            for (var i = 0; i < this.categorys.length; i++) {
                if (number === this.categorys[i].id) {
                    number = this.categorys[i].name
                }
            }
            return number
        },

        //切换页面
        handleCurrentChange(val) {

            this.pageNo = val

            this.page()
        },

        emptyForm() {
            this.produces.id = ''
            this.produces.name = ''
            this.produces.origin = ''
            this.produces.category = ''
            this.produces.status = ''
            this.produces.image = ''
            this.produces.description = ''
            this.produces.growthCycle = ''
            this.produces.growthTime = ''
            this.produces.shelfLife = ''
        },

        //修改产品
        update() {

            if (this.produces.status == '启用') {
                this.produces.status = 1
            }

            if (this.produces.status == '禁用') {
                this.produces.status = 2
            }

            for (var i = 0; i < this.categorys.length; i++) {
                if (this.produces.category == this.categorys[i].name) {
                    this.produces.category = this.categorys[i].id
                }
            }

            updateProduces(this.produces).then(
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
                        this.produces.status === 1 ? (this.produces.status = '启用') : (this.produces.status = '禁用')
                        for (var i = 0; i < this.categorys.length; i++) {
                            if (this.produces.category === this.categorys[i].id) {
                                this.produces.category = this.categorys[i].name
                            }
                        }
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
            getByIdProduces(id).then(
                data => {
                    this.id = id
                    this.produces = data.data
                    this.produces.status === 1 ? (this.produces.status = '启用') : (this.produces.status = '禁用')
                    for (var i = 0; i < this.categorys.length; i++) {
                        if (this.produces.category === this.categorys[i].id) {
                            this.produces.category = this.categorys[i].name
                        }
                    }
                }
            )
        },

        //检索
        pageByCondition() {
            this.pageNo = 1;
            this.page();
        },

        //产品分页查询数据
        page() {

            if (this.timeRange != null) {
                if (this.timeRange[0] != null && this.timeRange[1] != null) {
                    const startMoment = moment(this.timeRange[0])
                    const endMoment = moment(this.timeRange[1])
                    this.startTime = startMoment.format('yyyy-MM-DD HH:mm:ss')
                    this.endTime = endMoment.format('yyyy-MM-DD HH:mm:ss')
                }
            }

            pageQuery(this.pageNo, this.pageSize, this.name, this.origin, this.category, this.startTime, this.endTime)
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

        //添加产品
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createProduces(this.produces).then(
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

        //删除产品
        open(id) {
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteProduces(id).then(
                    response => {
                        if (response.code == 1) {
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

        //查询分类
        getCategory() {
            queryCategory().then(
                response => {
                    //处理响应结果
                    if (response.code === 1) {
                        this.categorys = response.data
                    } else if (response.code === 0) {
                        this.$message({
                            showClose: true,
                            message: '查询失败',
                            type: 'error'
                        });
                    }
                }
            )
        },

        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
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