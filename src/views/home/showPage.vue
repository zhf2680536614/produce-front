<!-- 产品展示 -->
<template>

    <div>
        <home-top />

        <div style="z-index:10;position:fixed;left:20px;top:230px;" class="aside">
            <button @click="scrollToDiv('carousel')">回到顶部</button>
            <br>
            <br>
            <button @click="scrollToDiv('h1')">精品展示</button>
            <br>
            <br>
            <button @click="scrollToDiv('div2')">产品展示</button>
        </div>

        <!-- 轮播图 -->
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in imgs" :key="item">
                <img :src="item" width="100%">
            </el-carousel-item>
        </el-carousel>
        <h1 id="h1" style="z-index:10;position:relative;">
            精品展示
        </h1>
        <div id="div1">
            <div class="container">
                <img src="../../assets/home1.jpg" alt="" class="card1" style="--i:-4" />
                <img src="../../assets/home2.jpg" alt="" class="card1" style="--i:-3" />
                <img src="../../assets/home3.jpg" alt="" class="card1" style="--i:-2" />
                <img src="../../assets/home1.jpg" alt="" class="card1" style="--i:-1" />
                <img src="../../assets/home2.jpg" alt="" class="card1" style="--i:0" />
                <img src="../../assets/home3.jpg" alt="" class="card1" style="--i:1" />
                <img src="../../assets/home1.jpg" alt="" class="card1" style="--i:2" />
                <img src="../../assets/home2.jpg" alt="" class="card1" style="--i:3" />
                <img src="../../assets/home3.jpg" alt="" class="card1" style="--i:4" />
            </div>
        </div>

        <div id="div2">
            <h1>产品展示</h1>
            <div v-for="index in 48" :key="index" style="display:inline-block;margin: 10px;">
                <el-card shadow="hover" class="card" style="background-color: rgba(0,0,0,0.1);">
                    <div style="background-image: url('https://th.bing.com/th/id/R.e636e5f9ae0388421d048d93ecfbc5b8?rik=XWWt54hFT3Pknw&pid=ImgRaw&r=0');
                    background-size: cover; width:200px;height:200px;border-radius: 5px;"></div>
                    <h3 style="margin-top: 20px;margin-bottom: 20px;">柿子{{ index }}</h3>
                    <div>
                        <el-popover placement="right" width="600" trigger="click">
                            <div class="popover">
                                <span>名称</span>
                                <el-divider content-position="left">名称</el-divider>
                                <span>种类</span>
                                <el-divider content-position="left">种类</el-divider>
                                <span>生产地</span>
                                <span>
                                    <div>
                                        <img src="https://th.bing.com/th/id/R.e636e5f9ae0388421d048d93ecfbc5b8?rik=XWWt54hFT3Pknw&pid=ImgRaw&r=0"
                                            width="300" height="auto" />
                                    </div>
                                </span>
                                <el-divider content-position="left"><span>图片</span></el-divider>
                                <el-divider content-position="left">生产地</el-divider>
                                <span>详细介绍</span>
                                <el-divider content-position="left">详细介绍</el-divider>
                                <span>生活习性</span>
                                <el-divider content-position="left">生活习性</el-divider>
                            </div>
                            <el-button slot="reference" type="text">查看详细</el-button>
                        </el-popover>
                    </div>
                </el-card>
            </div>
        </div>


    </div>
</template>

<script>
import homeTop from '@/components/homeTop.vue';
export default {
    components: {
        homeTop
    },
    name: 'showPage',
    data() {
        return {
            imgs: ['https://th.bing.com/th/id/R.e636e5f9ae0388421d048d93ecfbc5b8?rik=XWWt54hFT3Pknw&pid=ImgRaw&r=0',
                'https://th.bing.com/th/id/R.e636e5f9ae0388421d048d93ecfbc5b8?rik=XWWt54hFT3Pknw&pid=ImgRaw&r=1',
                'https://th.bing.com/th/id/R.e636e5f9ae0388421d048d93ecfbc5b8?rik=XWWt54hFT3Pknw&pid=ImgRaw&r=2'
            ],
            tabPosition: 'left'
        }
    },
    methods: {
        scrollToDiv(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
    }
}

</script>

<style scoped>
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
    background-image: radial-gradient(ellipse farthest-corner at 0 0, rgb(176, 255, 173), rgb(255, 255, 186));
    display: flex;
    height: 610px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    animation: change2 5s linear infinite;
    border-radius: 5px;
}

#div2 {
    background-image: radial-gradient(ellipse farthest-corner at 0 0, rgb(176, 255, 173), rgb(255, 255, 186));
    animation: change2 5s linear infinite;
    border-radius: 5px;
    margin-top: 10px;
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
}

.container:hover .card1 {
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