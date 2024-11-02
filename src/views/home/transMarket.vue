<!-- 交易市场 -->
<template>
    <div>
        <home-top />

        <div style="z-index:10;position:fixed;left:20px;top:230px;" class="aside">
            <button @click="scrollToDiv('top10')">回到顶部</button>
            <br>
            <br>
            <button @click="scrollToDiv('span2')">产品秒杀</button>
            <br>
            <br>
            <button @click="scrollToDiv('span3')">产品交易</button>
        </div>
        <hr style="width: 100%" class="hr">
        <!-- 产品销量排名 -->
        <span id="top10">TOP10</span>
        <div id="main" style="width: 100%;height:500px;"></div>

        <!-- 产品秒杀 -->
        <hr style="width: 100%" class="hr">
        <span id="span2">产品秒杀</span>
        <div>
            <el-card shadow="hover" style="width: 100%;" v-if="wait">
                <div style="width: 100%; display: inline-block; ">
                    <el-statistic :value="deadline1" time-indices title="🎉🎉🎉🎉🎉商品降价🎉🎉🎉🎉🎉" @finish="hilarity1">
                        <template slot="suffix">
                            抢购即将开始,产品秒杀专区全场8折
                        </template>
                    </el-statistic>
                </div>
            </el-card>
            <el-card shadow="hover" style="width: 100%;" v-if="start">
                <div style="width: 100%; display: inline-block; ">
                    <el-statistic :value="deadline2" time-indices title="🎉🎉🎉🎉🎉商品降价🎉🎉🎉🎉🎉" @finish="hilarity2">
                        <template slot="suffix">
                            抢购开始！开始拼手速吧
                        </template>
                    </el-statistic>
                </div>
            </el-card>
        </div>
        <div style="position:relative; left:8px; top:80px;">

            <el-skeleton style="" :loading="loading" animated :count="3">
                <template>
                    <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in listsPlus"
                        :key="item.name" style="display:inline-block;margin:10px;width:340px;height:400px;">
                        <img :src="item.image" class="image multi-content" style="width:340px;height:300px;" />
                        <div style="padding: 14px;">
                            <span>{{ item.name }}</span>
                            <div class="bottom card-header">
                                <span class="time">{{ currentDate }}</span>
                                <el-button type="text" class="button">操作按钮</el-button>
                            </div>
                        </div>
                    </el-card>
                </template>
            </el-skeleton>

        </div>

        <!-- 产品交易 -->
        <hr style="width: 100%" class="hr">
        <span id="span3">产品交易</span>

        <div>
            <el-row :gutter="20" style="position:relative;left:110px;top:40px;">
                <el-col :span="3"><el-input v-model="name" placeholder="名称"></el-input></el-col>
                <el-col :span="3"><el-input v-model="username" placeholder="商家"></el-input></el-col>
                <!-- 下拉列表 -->
                <el-col :span="3">
                    <el-select v-model="category" placeholder="请选择分类">
                        <el-option label="全部" value="">
                        </el-option>
                        <el-option v-for="itme in categorys" :key="itme.id" :label="itme.name" :value="itme.id">
                        </el-option>
                    </el-select>
                </el-col>
                <!-- 排序 -->
                <el-col :span="3">
                    <el-select v-model="order" placeholder="默认排序">
                        <el-option label="默认排序" value="" change="selectAll">
                        </el-option>
                        <el-option label="价格排序" value="1">
                        </el-option>
                        <el-option label="销量排序" value="2">
                        </el-option>
                        <el-option label="库存排序" value="3">
                        </el-option>
                    </el-select>
                </el-col>
                <el-button icon="el-icon-caret-top" style="position:relative;top:-10px;left:-300px;"
                    @click="sc('1')"></el-button>
                <el-button icon="el-icon-caret-bottom" style="position:relative;top:10px;left:-325px;"
                    @click="sc('2')"></el-button>
                <!-- 按钮 -->
                <div style="display:inline-block;position:relative;top:0px;left:90px;">

                    <el-button type="primary" icon="el-icon-search" class="button" @click="selectAll">查找</el-button>

                    <el-popover placement="right" width="400" trigger="click">
                        <div class="popover">
                            <el-form :model="marketProduces" :rules="rules" ref="marketProduces" label-width="100px"
                                class="demo-ruleForm">
                                <el-form-item label="名称" prop="name">
                                    <el-input v-model="marketProduces.name"></el-input>
                                </el-form-item><br>
                                <el-form-item label="分类" prop="category">
                                    <el-select v-model="marketProduces.category" placeholder="请选择种类">
                                        <el-option v-for="item in categorys" :key="item.id" :label="item.name"
                                            :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item><br>
                                <el-form-item label="产地" prop="origin">
                                    <el-input v-model="marketProduces.origin"></el-input>
                                </el-form-item><br>
                                <el-form-item label="状态" prop="status">
                                    <el-select v-model="marketProduces.status" placeholder="请选择状态">
                                        <el-option label="启用" value="1"></el-option>
                                        <el-option label="禁用" value="2"></el-option>
                                    </el-select>
                                </el-form-item><br>
                                <el-form-item label="单价" prop="unitPrice">
                                    <el-input-number v-model="marketProduces.unitPrice" :precision="2" :step="1.0"
                                        :min="0.1" :max="999999"></el-input-number>
                                </el-form-item><br>
                                <el-form-item label="重量(kg)" prop="weight">
                                    <el-input-number v-model="marketProduces.weight" :precision="2" :step="10.0"
                                        :min="0.1" :max="9999999"></el-input-number>
                                </el-form-item><br>
                                <el-form-item label="图片">
                                    <el-upload class="avatar-uploader" action="http://localhost:8081/upload"
                                        :show-file-list="false" :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload" style="padding:30px;">
                                        <img v-if="marketProduces.image" :src="marketProduces.image" class="avatar"
                                            style="width:200px;height: 200px;">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item><br>
                                <el-form-item label="产品描述" prop="description">
                                    <el-input type="textarea" v-model="marketProduces.description"></el-input>
                                </el-form-item><br>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('marketProduces')">立即创建</el-button>
                                    <el-button type="primary" @click="resetForm('marketProduces')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button slot="reference" type="primary" icon="el-icon-plus" class="button"
                            @click="emptyForm">上架产品</el-button>
                    </el-popover>
                </div>

            </el-row>

            <div v-if="ske">
                <el-skeleton :rows="6" animated style="position: relative;top:100px;" />
                <sapn style="position: relative;top:100px; font-size: larger;">未查询到符合条件的产品！</sapn>
                <el-skeleton :rows="6" animated style="position: relative;top:100px;" />
            </div>

            <!-- 产品列表数据 -->
            <div style="position:relative; left:8px; top:80px;">

                <el-skeleton :loading="loading" animated :count="3">
                    <template>
                        <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in lists"
                            :key="item.id" style="display:inline-block;margin:10px;width:340px;height:400px;">
                            <img :src="item.image" class="image multi-content" style="width:340px;height:300px;" />
                            <div style="padding: 14px;">
                                <el-tag style="position:relative;left:-60px;top:-15px;">种类: {{ item.category }}</el-tag>
                                <el-tag style="position:relative;left:-120px;top:30px;" type="success">单价: {{
                                    item.unitPrice }}</el-tag>
                                <span style="position:relative;left:-50px;font-weight: 100;font-size:medium">{{
                                    item.name }}</span>
                                <div class="bottom card-header">
                                    <br>
                                    <el-popover placement="right" width="600" trigger="click">

                                        <el-descriptions class="margin-top" title="产品详细" :column="1" :size="size"
                                            border>

                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-user"></i>
                                                    名称
                                                </template>
                                                {{ marketProduces.name }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-mobile-phone"></i>
                                                    分类
                                                </template>
                                                {{ marketProduces.category }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-location-outline"></i>
                                                    产地
                                                </template>
                                                {{ marketProduces.origin }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    商家
                                                </template>
                                                {{ marketProduces.username }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    单价
                                                </template>
                                                {{ marketProduces.unitPrice }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    库存(kg)
                                                </template>
                                                {{ marketProduces.weight }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-tickets"></i>
                                                    图片
                                                </template>
                                                <img :src="marketProduces.image" alt=""
                                                    style="width: 200px; height:200px;">
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    产品描述
                                                </template>
                                                {{ marketProduces.description }}
                                            </el-descriptions-item>
                                        </el-descriptions><br>
                                        <hr><br>
                                        <div style="font-size:16px;font-weight: 700;">
                                            购买产品
                                        </div><br>
                                        <el-input-number v-model="weight" :precision="2" :step="1.0"
                                        :min="0.1" :max="marketProduces.weight"></el-input-number><br><br>
                                        <el-button type="primary" class="button">购买</el-button>
                                        <el-button type="primary" class="button">加入购物车</el-button>
                                        <el-button slot="reference" type="text" class="button"
                                            @click="selectById(item.id)">查看详细</el-button>
                                    </el-popover>
                                </div>
                            </div>
                        </el-card>
                    </template>
                </el-skeleton>

            </div>

        </div>

    </div>

</template>

<script>
import homeTop from '@/components/homeTop.vue';
import * as echarts from 'echarts';
import { queryCategoryUser } from '@/api/category'
import { createMarketProduces, queryAll, getByIdMarketProducesUser } from '@/api/marketProduces';

export default {
    name: 'transMarket',
    components: {
        homeTop
    },
    data() {

        return {

            weight:'',
            
            ske: true,

            loading: true,

            lists: [],

            listsPlus: [
                {
                    image:
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    name: '鹿',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    name: '马',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    name: '山狮',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    name: '鹿',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    name: '马',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    name: '山狮',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    name: '鹿',
                },
                {
                    image:
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    name: '马',
                },
            ],

            category: '',
            categorys: '',

            //上架产品
            marketProduces: {
                id: '',
                name: '',
                category: '',
                origin: '',
                image: '',
                status: '',
                weight: '',
                unitPrice: '',
                description: '',
                userId: '',
                username: '',
                createTime: ''
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
            },

            name: '',
            username: '',
            order: '',
            orderKind: '1',

            //秒杀产品
            wait: true,
            start: false,
            deadline1: Date.now() + 1000 * 60 * 60 * 0.1,
            deadline2: Date.now() + 1000 * 60 * 60 * 0.1,
        }
    },

    mounted() {

        const myChart = echarts.init(document.getElementById('main'));

        var data = [];
        for (let i = 0; i < 5; ++i) {
            data.push(Math.round(Math.random() * 200));
        }
        var option = {
            xAxis: {
                max: 'dataMax'
            },
            yAxis: {
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                inverse: true,
                animationDuration: 3000,
                animationDurationUpdate: 3000,
                max: 10 // only the largest 3 bars will be displayed
            },
            series: [
                {
                    realtimeSort: true,
                    name: '销售额排名TOP',
                    type: 'bar',
                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }
                }
            ],
            legend: {
                show: true
            },
            animationDuration: 300,
            animationDurationUpdate: 300,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        }

        myChart.setOption(option);

        function update() {
            var data = option.series[0].data;
            for (var i = 0; i < data.length; ++i) {
                if (Math.random() > 0.9) {
                    data[i] += Math.round(Math.random() * 200);
                } else {
                    data[i] += Math.round(Math.random() * 200);
                }
            }
            myChart.setOption(option);
        }

        setInterval(function () {
            update();
        }, 3000);

        this.loading = false

        this.getCategory()
        this.selectAll()
    },

    methods: {
        //清空表单
        emptyForm() {
            this.marketProduces.id = ''
            this.marketProduces.name = ''
            this.marketProduces.origin = ''
            this.marketProduces.category = ''
            this.marketProduces.status = ''
            this.marketProduces.image = ''
            this.marketProduces.description = ''
            this.marketProduces.unitPrice = ''
            this.marketProduces.userId = ''
            this.marketProduces.username = ''
            this.marketProduces.createTime = ''
            this.marketProduces.weight = ''
        },

        //升序降序
        sc(kind) {
            this.orderKind = kind;
            this.selectAll();
        },

        //查询上架产品
        selectAll() {
            const condition = {
                "name": this.name,
                "username": this.username,
                "category": this.category,
                "order": this.order,
                "orderKind": this.orderKind
            }
            queryAll(condition)
                .then(response => {
                    this.lists = response.data
                    if (this.lists.length == 0) {
                        this.ske = true
                    } else {
                        this.ske = false
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        //根据id查询上架产品
        selectById(id) {
            getByIdMarketProducesUser(id).then(
                data => {
                    this.weight = ''
                    this.id = id
                    this.marketProduces = data.data
                }
            )
        },

        //添加产品
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.marketProduces.userId = localStorage.getItem("id")
                    createMarketProduces(this.marketProduces).then(
                        response => {
                            //处理响应结果
                            if (response.code === 1) {
                                this.selectAll()
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

        //查询分类
        getCategory() {
            queryCategoryUser().then(
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

        //秒杀产品
        hilarity1() {
            this.deadline2 = Date.now() + 1000 * 60 * 60 * 0.01
            this.wait = false
            this.start = true
            const h = this.$createElement;
            this.$notify({
                title: '秒杀提醒',
                message: h('i', { style: 'color: teal' }, '抢购开始！')
            });
        },

        hilarity2() {
            this.deadline1 = Date.now() + 1000 * 60 * 60 * 0.01
            this.wait = true
            this.start = false
            const h = this.$createElement;
            this.$notify({
                title: '秒杀提醒',
                message: h('i', { style: 'color: teal' }, '抢购结束，期待下一轮吧！')
            });
        },

        scrollToDiv(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}
</script>

<style scoped>
.button {
    margin-right: 5px;
    width: 90px;
    height: 40px;
}

.hr {
    margin-top: 80px;
    margin-bottom: 20px;
}

#top10,
#span2,
#span3 {
    font-size: 40px;
    background-color: rgb(200, 255, 237);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 200px;
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.aside button {
    border: none;
    width: 20px;
    height: 180px;
    font-size: 20px;
    font-weight: 100;
    background-color: rgba(12, 13, 12, 0.1);
    border-radius: 10px;
    transition: all 0.9s ease;
}

.aside button:hover {
    background-color: rgba(12, 13, 12, 0.2);
}
</style>