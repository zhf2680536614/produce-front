<!-- 订单管理 -->
<template>
    <div style="position: fixed;
    z-index: 10;
    left:5px;
    top:70px;">
        <first-top />
        <el-main>
            <!-- 检索栏 -->
            <el-row :gutter="30" style="position:fixed; left:30px; top:100px;width: 100%;">
                <el-col :span="4"><el-input v-model="username" placeholder="用户名"></el-input></el-col>
                <el-col :span="4"><el-input v-model="phoneNumber" placeholder="电话号码"></el-input></el-col>
                <el-col :span="4">

                    <el-select v-model="status" placeholder="请选择状态">
                        <el-option label="全部订单" value="">
                        </el-option>
                        <el-option label="已完成" value="1">
                        </el-option>
                        <el-option label="已取消" value="3">
                        </el-option>
                        <el-option label="待确认" value="2">
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
                <div style="position:fixed;top:100px;left:1350px;">
                    <!-- 检索 -->
                    <el-button type="primary" icon="el-icon-search" @click="pageByCondition">查找</el-button>
                </div>
            </el-row>

            <!-- 订单列表数据 -->
            <el-table stripe :data="tableData" style="position:fixed; left:30px;top:160px; font-size: medium;">
                <el-table-column prop="orderNumber" label="订单号" width="400">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1" style="color: green;">已完成</span>
                        <span v-if="scope.row.status === 2" style="color: blue;">待确认</span>
                        <span v-if="scope.row.status === 3" style="color: red;">已取消</span>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="merchantName" label="商家名称" width="150">
                </el-table-column>
                <el-table-column prop="consigneeName" label="收货人姓名" width="180">
                </el-table-column>
                <el-table-column prop="addressBookName" label="收货地址" width="280">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="电话号码" width="180">
                </el-table-column>

                <!-- 详细 -->
                <el-table-column label="订单明细" width="100">
                    <template slot-scope="scope">
                        <el-popover placement="right" width="600" trigger="click">
                            <div class="popover">
                                <el-descriptions class="margin-top" title="订单明细" :column="1" border>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            产品名称
                                        </template>
                                        {{ ordersDetails.produceName }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            产品分类
                                        </template>
                                        {{ ordersDetails.produceCategory }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            产品图片
                                        </template>
                                        <img :src="ordersDetails.image" style="width:300px;height: 300px;">
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            产品重量
                                        </template>
                                        {{ ordersDetails.produceWeight }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building"></i>
                                            产品单价
                                        </template>
                                        {{ ordersDetails.unitPrice }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building"></i>
                                            总价
                                        </template>
                                        {{ ordersDetails.amount }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            创建时间
                                        </template>
                                        {{ scope.row.createTime }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            完成时间
                                        </template>
                                        {{ scope.row.completeTime == null ? 'null' : scope.row.completeTime }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            取消时间
                                        </template>
                                        {{ scope.row.cancelTime == null ? 'null' : scope.row.cancelTime }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            备注
                                        </template>
                                        {{ scope.row.remark == null ? 'null' : scope.row.remark }}
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <el-button slot="reference" type="text" icon="el-icon-more"
                                @click="selectById(scope.row.id)"></el-button>
                        </el-popover>
                    </template>

                </el-table-column>
            </el-table>
            <!-- 分页查询 -->
            <div class="block" style="position:fixed; top:950px; left:600px">
                <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
                    layout="total, prev, pager, next, jumper" :total=total>
                </el-pagination>
            </div>
        </el-main>
    </div>
</template>
<script>
import { pageQuery } from '@/api/orders';
import { getById } from '@/api/ordersDetails';
import moment from 'moment';
import firstTop from '@/components/firstTop.vue';
export default {
    name: 'recordsManage',
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
            ordersDetails: {
                produceName: '',
                produceCategory: '',
                produceWeight: '',
                unitPrice: '',
                amount: '',
                image: ''
            },
            //总数
            total: null,
            PageNo: 1,
            pageSize: null,
            //分页条件
            username: '',
            phoneNumber: '',
            status: '',
            timeRange: '',
            startTime: null,
            endTime: null,

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

        //根据id查询订单明细
        selectById(id) {
            getById(id).then(
                data => {
                    this.id = id
                    this.ordersDetails = data.data
                }
            )
        },

        //订单分页查询数据
        page() {

            if (this.timeRange != null) {
                if (this.timeRange[0] != null && this.timeRange[1] != null) {
                    const startMoment = moment(this.timeRange[0])
                    const endMoment = moment(this.timeRange[1])
                    this.startTime = startMoment.format('yyyy-MM-DD HH:mm:ss')
                    this.endTime = endMoment.format('yyyy-MM-DD HH:mm:ss')
                }
            }

            pageQuery(this.pageNo, this.pageSize, this.username, this.phoneNumber, this.status, this.startTime, this.endTime)
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