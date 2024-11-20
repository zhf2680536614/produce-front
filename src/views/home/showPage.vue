<!-- 产品展示 -->
<template>

    <div>
        <home-top />

        <div style="z-index:10;position:fixed;left:20px;top:230px;" class="aside">
            <button @click="scrollToDiv('top')">回到顶部</button>
            <br>
            <br>
            <button @click="scrollToDiv('center')">精品展示</button>
            <br>
            <br>
            <button @click="scrollToDiv('footer')">产品展示</button>
        </div>

        <!-- 轮播图 -->
        <hr class="hr" style="width: 100%" id="top">
        <el-carousel :interval="4000" type="card" height="300px" id="carousel">
            <el-carousel-item v-for="item in imgs" :key="item.id">
                <img :src="item.image" width="100%">
            </el-carousel-item>
        </el-carousel>
        <hr class="hr" style="width: 100%" id="center">
        <span class="span">精品展示</span>

        <div style="position:relative; left:8px; top:20px;" id="div1">
            <div class="container">
                <img :src="imgs1[0].image" alt="" class="card1" style="--i:-4" />
                <img :src="imgs1[1].image" alt="" class="card1" style="--i:-3" />
                <img :src="imgs1[2].image" alt="" class="card1" style="--i:-2" />
                <img :src="imgs1[3].image" alt="" class="card1" style="--i:-1" />
                <img :src="imgs1[4].image" alt="" class="card1" style="--i:0" />
                <img :src="imgs1[5].image" alt="" class="card1" style="--i:1" />
                <img :src="imgs1[6].image" alt="" class="card1" style="--i:2" />
                <img :src="imgs1[7].image" alt="" class="card1" style="--i:3" />
                <img :src="imgs1[8].image" alt="" class="card1" style="--i:4" />
            </div>
        </div>

        <hr class="hr" style="width: 100%" id="footer">
        <span class="span">产品展示</span>

        <div style="position:relative; left:8px; top:20px;" id="div2">

            <el-skeleton :loading="loading" animated :count="3">
                <template>
                    <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in lists" :key="item.id"
                        style="display:inline-block;margin:10px;width:350px;height:450px;">
                        <img :src="item.image" class="image multi-content" style="width:350px;height:350px;" />
                        <div>
                            <div style="display: inline-block;"> <el-tag style="width:80px;">{{
                                processCategory(item.category)
                                    }}</el-tag>
                            </div><br>
                            <div
                                style="margin-top:5px;margin-bottom:5px;display:inline-block;font-weight: 100;font-size:18px;">
                                <span>{{
                                    item.name
                                    }}</span>
                            </div>

                            <div class="bottom card-header">
                                <el-popover placement="right" width="900" trigger="click">
                                    <el-descriptions class="margin-top" title="产品详细" :column="1" border>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-user"></i>
                                                名称
                                            </template>
                                            {{ produces.name }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-mobile-phone"></i>
                                                分类
                                            </template>
                                            {{ processCategory(produces.category) }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-location-outline"></i>
                                                产地
                                            </template>
                                            {{ produces.origin }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-tickets"></i>
                                                图片
                                            </template>
                                            <img :src="produces.image" alt="" style="width: 200px; height:200px;">
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                产品描述
                                            </template>
                                            {{ produces.description }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                生长环境
                                            </template>
                                            {{ produces.shelfLife }}
                                        </el-descriptions-item>

                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                成长习性
                                            </template>
                                            {{ produces.growthCycle }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                生长周期
                                            </template>
                                            {{ produces.growthTime }}
                                        </el-descriptions-item>
                                    </el-descriptions>
                                    <el-button slot="reference" type="primary" class="button"
                                        @click="selectById(item.id)">查看详细</el-button>
                                </el-popover>
                            </div>
                        </div>
                    </el-card>
                </template>
            </el-skeleton>

        </div>


    </div>
</template>

<script>
import homeTop from '@/components/homeTop.vue';
import { queryAll, getByIdProducesUser } from '@/api/produces';
import { queryCategoryUser } from '@/api/category';
import { getCycleUser, getBoutiqueUser } from '@/api/static';

export default {
    components: {
        homeTop
    },
    name: 'showPage',
    data() {
        return {

            imgs: '',

            imgs1: '',

            tabPosition: 'left',

            loading: true,

            lists: [],

            produces: {
                id: '',
                name: '',
                category: '',
                origin: '',
                image: '',
                description: '',
                growthTime: '',
                growthCycle: '',
                shelfLife: ''
            },

            categorys: '',
            count: 0
        }
    },

    mounted() {
        this.getCategory()
        this.loading = false
        this.selectAll()
        this.categorys = this.$store.state.categorys

        getCycleUser().then(
            res => {
                this.imgs = res.data
            }
        )

        getBoutiqueUser().then(
            res => {
                this.imgs1 = res.data
            }
        )
    },

    methods: {

        load() {
            this.count += 2
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

        //转换分类
        processCategory(number) {
            for (var i = 0; i < this.categorys.length; i++) {
                if (number === this.categorys[i].id) {
                    number = this.categorys[i].name
                }
            }
            return number
        },

        scrollToDiv(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },

        //查询所有产品
        selectAll() {
            queryAll()
                .then(response => {
                    this.lists = response.data
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        //根据id查询产品
        selectById(id) {
            getByIdProducesUser(id).then(
                data => {
                    this.id = id
                    this.produces = data.data
                }
            )
        },
    }
}

</script>

<style scoped>
.hr {
    margin-top: 80px;
    margin-bottom: 20px;
}

.span {
    display: block;
    font-size: 30px;
    background-color: rgba(216, 255, 208,0.6);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 300px;
    height: 60px;
    padding-top: 10px;
    margin-left: 650px;
    margin-bottom: 10px;
    font-weight: 600;
}

.button {
    width: 100px;
    height: 20px;
    background-color: rgba(210, 255, 222, 0.9);
    border: none;
    color: #333;
}

.button:hover{
    background-color: rgba(180, 255, 200, 0.9);
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

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

@keyframes change2 {
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0.9;
    }

    50% {
        opacity: 0.8;
    }

    75% {
        opacity: 0.9;
    }

    100% {
        opacity: 1;
    }
}

@keyframes image {
    0% {
        transition: .5s;
    }

    50% {
        transform: rotate(calc(var(--i)*5deg)) translate(calc(var(--i)*110px), -50px);
    }

    100% {
        transition: .5s;
    }
}

#div1 {
    background-color: rgb(237, 255, 249);
    display: flex;
    height: 100vw;
    height: 60vh;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    animation: change2 5s linear infinite;
    border-radius: 5px;
}

#div2 {
    border-radius: 5px;
}

.container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .card1 {
    position: absolute;
    width: 435px;
    height: 244.5px;
    background-color: aquamarine;
    background-size: cover;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: aliceblue;
    border: 2px solid rgba(0, 0, 0, 0.1);
    transition: .5s;
    transform-origin: 50% 100%;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
    animation: image 0.8s linear;
    transform: rotate(calc(var(--i)*5deg)) translate(calc(var(--i)*110px), -50px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, .25);
    color: rgba(0, 0, 0, 0.25);
}

.container:active .card1:not(:active) {
    background-color: #333;
    opacity: 0.5;
}

.container .card1:active {
    translate: calc(var(--i)*20px)-50px;
    z-index: 999;
    scale: 1.2;
}
</style>