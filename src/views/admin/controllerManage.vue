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
            <span style="display: inline-block;margin-right:100px;">300</span>
            <el-button type="text" @click="$router.push({ name: 'producesmanage' });">产品管理</el-button>
        </div>
        <div class="categorys">
            <span style="display: inline-block;margin-right: 100px;font-weight: 800;">分类总数</span>
            <span style="display: inline-block;margin-right:100px;">300</span>
            <el-button type="text" @click="$router.push({ name: 'categorymanage' });">分类管理</el-button>
        </div>

        <div class="date">
            <el-button class="button" style="position: fixed;left:520px;top:80px;" @click="all">全部</el-button>
            <el-button class="button" style="position: fixed;left:795px;top:80px;" @click="week">近一周</el-button>
            <el-button class="button" style="position: fixed;left:1080px;top:80px;" @click="months">近1个月</el-button>
            <el-button class="button" style="position: fixed;left:1365px;top:80px;"
                @click="threeMonths">近3个月</el-button>
        </div>

        <div class="user">
            <span style="display: inline-block;margin-right: 100px;margin-top:20px;font-weight: 800;">用户总数</span>
            <span style="display: inline-block;margin-right:100px;">300</span>
            <el-button type="text" @click="$router.push({ name: 'usermanage' });">用户管理</el-button>
            <div id="user" style="width: 500px;height:400px;"></div>
            <span style="display: inline-block;font-weight: 800;">新增用户</span>
            <div id="addUser" style="width: 500px;height: 350px;"></div>
        </div>

        <div class="orders">
            <span style="display: inline-block;margin-right: 200px;margin-top:20px;font-weight: 800;">订单统计</span>
            <el-button type="text" style="margin-top:20px;"
                @click="$router.push({ name: 'recordsmanage' });">订单管理</el-button><br>
            <div id="orders" style="width:430px;height:430px;position:relative; top:-10px;left:80px;"></div>
        </div>

        <div class="controller">
            <div style="margin-top:20px;font-weight: 800;">用户端控制台</div>
            <el-button class="buttonPlus" style="position: fixed;left:1150px;top:230px;">首页手风琴管理</el-button>
            <el-button class="buttonPlus" style="position: fixed;left:1140px;top:330px;">精品页展示管理</el-button>
            <el-button class="buttonPlus" style="position: fixed;left:1140px;top:430px;">轮播图展示管理</el-button>
        </div>

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
import moment from 'moment';

export default {
    name: 'controllerManage',
    components: {
        firstTop,
    },
    data() {
        //页面数据
        return {
            userCount: '',
            userBCount: '',
            userGCount: '',
            categorysCount: '',
            producesCount: '',
            user: '',
            createTime: '',
            day: '',
        };
    },

    mounted() {

        this.getUser()

        this.countMF()

        this.countAddUser()

        this.countOrders()

        this.countAmount()

        //this.all()
    },

    methods: {


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

        //全部
        all() {
            queryAll('', '').then(
                res => {
                    //
                }
            )
        },

        //一周
        week() {
            let end = new Date();
            let start = new Date();
            end = start - 3600 * 1000 * 24 * 7;
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    //
                }
            )
        },
        //一个月
        months() {
            let end = new Date();
            let start = new Date();
            end = start - 3600 * 1000 * 24 * 30;
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    //
                }
            )
        },
        //3个月
        threeMonths() {
            let end = new Date();
            let start = new Date();
            end = start - 3600 * 1000 * 24 * 90;
            start = moment(start)
            start = start.format('yyyy-MM-DD')
            end = moment(end)
            end = end.format('yyyy-MM-DD')

            queryAll(start, end).then(
                res => {
                    //
                }
            )
        },

        allCount() {
            //
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
                                duration: 3000,
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
                            { value: 1048, name: '男' },
                            { value: 735, name: '女' },
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
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
                            { value: 1048, name: 'All' },
                            { value: 735, name: '已完成' },
                            { value: 580, name: '已取消' },
                            { value: 484, name: '待确认' },
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            };
            // 绘制图表
            chart.setOption(option);
        },
    }
}
</script>

<style scoped>
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
    top: 120px;
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
    top: 120px;
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