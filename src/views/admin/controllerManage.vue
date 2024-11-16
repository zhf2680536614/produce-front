<!-- 分类管理 -->
<template>
    <div style="position: fixed;
    z-index: 10;
    left:5px;
    top:70px;">
        <first-top />
        <div class="welcome">
            <div id="welcome" style="width: 500px; height: 50px;">
            </div>
            <h4>自{{ createTime }}您已经陪伴我们{{ day }}个工作日</h4>
        </div>

        <div class="produces">
            <span style="display: inline-block;margin-right: 100px;font-weight: 800;">产品总数</span>
            <span style="display: inline-block;margin-right:100px;">{{ produceAmount }}</span>
            <el-button type="text" @click="$router.push({ name: 'producesmanage' });">产品管理</el-button>
        </div>

        <div class="categorys">
            <span style="display: inline-block;margin-right: 100px;font-weight: 800;">分类总数</span>
            <span style="display: inline-block;margin-right:100px;">{{ categoryAmount }}</span>
            <el-button type="text" @click="$router.push({ name: 'categorymanage' });">分类管理</el-button>
        </div>

        <div class="date">
            <el-button class="button" :class="{ fouce: 1 == fouce }" style="position: fixed;left:520px;top:130px;"
                @click="all">全部</el-button>
            <el-button class="button" :class="{ fouce: 2 == fouce }" style="position: fixed;left:795px;top:130px;"
                @click="week">近一周</el-button>
            <el-button class="button" :class="{ fouce: 3 == fouce }" style="position: fixed;left:1080px;top:130px;"
                @click="months">近1个月</el-button>
            <el-button class="button" :class="{ fouce: 4 == fouce }" style="position: fixed;left:1365px;top:130px;"
                @click="threeMonths">近3个月</el-button>
        </div>

        <div class="user">
            <span style="display: inline-block;margin-right: 100px;margin-top:20px;font-weight: 800;">用户总数</span>
            <span style="display: inline-block;margin-right:100px;">{{ userAmount }}</span>
            <el-button type="text" @click="$router.push({ name: 'usermanage' });">用户管理</el-button>
            <div id="user" style="width: 500px;height:400px;"></div>
            <span style="display: inline-block;font-weight: 800;">新增用户</span>
            <div id="addUser" style="width: 500px;height: 350px;"></div>
        </div>

        <div class="orders">
            <span style="display: inline-block;margin-right: 100px;margin-top:20px;font-weight: 800;">订单统计</span>
            <span style="display: inline-block;margin-right:100px;">{{ allOrders }}</span>
            <el-button type="text" style="margin-top:20px;"
                @click="$router.push({ name: 'recordsmanage' });">订单管理</el-button><br>
            <div id="orders" style="width:430px;height:430px;position:relative; top:-10px;left:80px;"></div>
        </div>

        <div class="controller">
            <div style="margin-top:20px;font-weight: 800;">用户端控制台</div>
            <el-button class="buttonPlus" style="position: fixed;left:1150px;top:230px;"
                @click="manage1">首页手风琴管理</el-button>
            <el-button class="buttonPlus" style="position: fixed;left:1140px;top:330px;"
                @click="manage3">精品页展示管理</el-button>
            <el-button class="buttonPlus" style="position: fixed;left:1140px;top:430px;"
                @click="manage2">轮播图展示管理</el-button>
        </div>

        <el-dialog title="首页手风琴管理" :visible.sync="dialogTable1" append-to-body style="height:100%;">
            <div v-for="(item, index) in imgs1" :key="index.id" style="display: inline-block;">
                <el-upload class="avatar-uploader" action="http://localhost:8081/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
                    <div>第{{ index + 1 }}张</div>
                    <img v-if="item" :src="item.image" class="avatar" style="width: 350px; height:300px;margin: 10px;"
                        @click="id = item.id">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-dialog>

        <el-dialog title="轮播图管理" :visible.sync="dialogTable2" append-to-body style="height:100%;">
            <div v-for="(item, index) in imgs2" :key="index.id" style="display: inline-block;">
                <el-upload class="avatar-uploader" action="http://localhost:8081/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
                    <div>第{{ index + 1 }}张</div>
                    <img v-if="item" :src="item.image" class="avatar" style="width: 350px; height:300px;margin: 10px;"
                        @click="id = item.id">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-dialog>

        <el-dialog title="精品展示管理" :visible.sync="dialogTable3" append-to-body style="height:100%;">
            <div v-for="(item, index) in imgs3" :key="index.id" style="display: inline-block;">
                <el-upload class="avatar-uploader" action="http://localhost:8081/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                    <div>第{{ index + 1 }}张</div>
                    <img v-if="item" :src="item.image" class="avatar" style="width: 350px; height:300px;margin: 10px;"
                        @click="id = item.id">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-dialog>

        <div class="amount">
            <span style="display: inline-block;margin-top:20px;font-weight: 800;">销售额统计</span>
            <div id="amount" style="width:1120px;height:370px;"></div>
        </div>
    </div>
</template>

<script>

import firstTop from '@/components/firstTop.vue';
import * as echarts from 'echarts';
import { queryAll } from '@/api/charts';
import { getByIdUser } from '@/api/userManage';
import { updateAccordion, getAccordionAdmin, updateBoutique, getBoutiqueAdmin, updateCycle, getCycleAdmin } from '@/api/static'
import moment from 'moment';

export default {
    name: 'controllerManage',

    components: {
        firstTop,
    },

    data() {
        //页面数据
        return {
            user: '',
            createTime: '',
            day: '',

            //统计数据
            userAmount: '',
            categoryAmount: '',
            produceAmount: '',
            chartBGList: '',
            chartAddUser: '',
            ordersList: '',
            chartAmount: '',

            allOrders: '',

            fouce: '',


            dialogTable1: false,
            dialogTable2: false,
            dialogTable3: false,

            imgs1: '',
            imgs2: '',
            imgs3: '',


            id: ''

        };
    },

    mounted() {
        this.all()
    },

    methods: {

        manage1() {
            this.dialogTable1 = true
            getAccordionAdmin().then(
                res => {
                    this.imgs1 = res.data
                }
            )
        },

        manage2() {
            this.dialogTable2 = true
            getCycleAdmin().then(
                res => {
                    this.imgs2 = res.data
                }
            )
        },

        manage3() {
            this.dialogTable3 = true
            getBoutiqueAdmin().then(
                res => {
                    this.imgs3 = res.data
                }
            )
        },

        //获取用户信息
        getUser() {
            getByIdUser(localStorage.getItem('id')).then(
                res => {
                    this.user = res.data
                    this.welcome()
                    if (this.user.createTime != null) {

                        const endMoment = moment(this.user.createTime)

                        this.createTime = endMoment.format('yyyy-MM-DD')

                        const cr = Date.parse(this.createTime);

                        const now = Date.now();

                        this.day = Math.floor((now - cr) / 1000 / 60 / 60 / 24)
                    }
                }
            )
        },

        common(res) {
            this.userAmount = res.data.userAmount
            this.categoryAmount = res.data.categoryAmount
            this.produceAmount = res.data.produceAmount
            this.chartBGList = res.data.chartBGList
            this.chartAddUser = res.data.chartAddUser
            this.ordersList = res.data.ordersList
            this.chartAmount = res.data.chartAmount

            for (const item of this.ordersList) {
                if (item.status == 0) {
                    this.allOrders = item.count
                }
            }

            this.getUser()

            this.countMF()

            this.countAddUser()

            this.countOrders()

            this.countAmount()
        },

        //全部
        all() {
            this.fouce = 1
            let end = new Date();
            let start = new Date(0);
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    this.common(res)
                }
            )
        },

        //一周
        week() {
            this.fouce = 2
            let end = new Date();
            let start = new Date();
            start = start - 3600 * 1000 * 24 * 7;
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    this.common(res)
                }
            )
        },
        //一个月
        months() {
            this.fouce = 3
            let end = new Date();
            let start = new Date();
            start = start - 3600 * 1000 * 24 * 30;
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    this.common(res)
                }
            )
        },
        //3个月
        threeMonths() {
            this.fouce = 4
            let end = new Date();
            let start = new Date();
            start = start - 3600 * 1000 * 24 * 90;
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    this.common(res)
                }
            )
        },

        welcome() {
            const chart = echarts.init(document.getElementById('welcome'));
            const option = {
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: 'center',
                            top: 'center',
                            style: {
                                text: 'Welcome ' + this.user.username,
                                fontSize: 40,
                                fontWeight: 'bold',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#000',
                                lineWidth: 1
                            },
                            keyframeAnimation: {
                                duration: 2000,
                                loop: false,
                                keyframes: [
                                    {
                                        percent: 0.7,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        }
                                    },
                                    {
                                        // Stop for a while.
                                        percent: 0.8,
                                        style: {
                                            fill: 'transparent'
                                        }
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            fill: 'black'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            // 绘制图表
            chart.setOption(option);
        },

        //统计男女数量
        countMF() {
            const user = echarts.init(document.getElementById('user'));

            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        itemStyle: {
                            borderRadius: 10
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: this.chartBGList[0].count, name: '男' },
                            { value: this.chartBGList[1].count, name: '女' },
                        ]
                    }
                ]
            };
            // 绘制图表
            user.setOption(option);
        },

        //统计新增用户数
        countAddUser() {
            const chart = echarts.init(document.getElementById('addUser'));

            const option = {
                title: {
                    text: '新增用户'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.chartAddUser.dateList
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Number',
                        type: 'line',
                        stack: 'Total',
                        data: this.chartAddUser.value
                    }
                ]
            };
            // 绘制图表
            chart.setOption(option);
        },

        //统计订单
        countOrders() {
            const chart = echarts.init(document.getElementById('orders'));

            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        itemStyle: {
                            borderRadius: 10
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: this.ordersList[0].count, name: '已完成' },
                            { value: this.ordersList[1].count, name: '待确认' },
                            { value: this.ordersList[2].count, name: '已取消' },
                            { value: this.ordersList[3].count, name: 'All' },
                        ]
                    }
                ]
            };
            // 绘制图表
            chart.setOption(option);
        },

        //统计销售额
        countAmount() {
            const chart = echarts.init(document.getElementById('amount'));

            const option = {
                title: {
                    text: '销售额统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.chartAmount.dataList
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Number',
                        type: 'line',
                        stack: 'Total',
                        data: this.chartAmount.value
                    }
                ]
            };
            // 绘制图表
            chart.setOption(option);
        },

        handleAvatarSuccess1(res) {
            const item = {
                id: this.id,
                image: res.data
            }
            updateAccordion(item).then(
                res => {
                    if (res.code == 1) {
                        getAccordionAdmin().then(
                            res => {
                                this.imgs1 = res.data
                            }
                        )
                    }
                }
            )
        },

        handleAvatarSuccess2(res) {
            const item = {
                id: this.id,
                image: res.data
            }
            updateCycle(item).then(
                res => {
                    if (res.code == 1) {
                        getCycleAdmin().then(
                            res => {
                                this.imgs2 = res.data
                            }
                        )
                    }
                }
            )
        },

        handleAvatarSuccess3(res) {
            const item = {
                id: this.id,
                image: res.data
            }
            updateBoutique(item).then(
                res => {
                    if (res.code == 1) {
                        getBoutiqueAdmin().then(
                            res => {
                                this.imgs3 = res.data
                            }
                        )
                    }
                }
            )
        },

        //上传图片时校验
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        }
    }
}
</script>

<style scoped>
.fouce {
    background-color: #c3ddff;
    box-shadow: 3px 3px 2px #d0d0d0;
}

.buttonPlus:hover {
    color: rgba(50, 146, 255, 0.8);
}

.buttonPlus::before {
    content: '';
    width: 0px;
    height: 100px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #a2cbff 0%, #b4aaff 100%);
    transition: .5s ease;
    display: block;
    z-index: -1;
}

.buttonPlus:hover::before {
    width: 500px;
}

.buttonPlus {
    background-color: rgba(240, 248, 255, 0.8);
    width: 450px;
    height: 90px;
    font-size: larger;
    margin-top: 20px;
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
    background-image: linear-gradient(to right, #c0dbff 0%, #c7c0fd 100%);
}

.button {
    width: 270px;
    height: 30px;
    font-size: larger;
    cursor: pointer;
}

* {
    margin: 0px;
    padding: 0px;
}

.welcome {
    background-color: rgba(245, 250, 255, 0.8);
    width: 500px;
    height: 80px;
    position: fixed;
    top: 80px;
    left: 10px;
    border-radius: 5px;
    z-index: -1;
}

.produces {
    background-color: rgba(245, 250, 255, 0.9);
    width: 555px;
    height: 35px;
    position: fixed;
    top: 80px;
    left: 520px;
    border-radius: 5px;
    font-size: 20px;
    padding-top: 5px;
}

.categorys {
    background-color: rgba(245, 250, 255, 0.9);
    width: 555px;
    height: 35px;
    position: fixed;
    top: 80px;
    left: 1090px;
    border-radius: 5px;
    font-size: 20px;
    padding-top: 5px;
}

.user {
    background-color: rgba(245, 250, 255, 0.8);
    width: 500px;
    height: 840px;
    position: fixed;
    top: 170px;
    left: 10px;
    border-radius: 5px;
    font-size: 20px;
}

.orders {
    background-color: rgba(245, 250, 255, 0.8);
    width: 555px;
    height: 415px;
    position: fixed;
    top: 170px;
    left: 520px;
    border-radius: 5px;
    font-size: 20px;
}

.controller {
    background-color: rgba(245, 250, 255, 0.8);
    width: 555px;
    height: 415px;
    position: fixed;
    top: 170px;
    left: 1090px;
    border-radius: 5px;
    font-size: 20px;
}

.amount {
    background-color: rgba(245, 250, 255, 0.8);
    width: 1125px;
    height: 415px;
    position: fixed;
    top: 595px;
    left: 520px;
    border-radius: 5px;
    font-size: 20px;
}
</style>