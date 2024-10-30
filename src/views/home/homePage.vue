<!-- 商城首页 -->
<template>

    <div>
        <home-top />
        <div class="trapezoid">
            <h1 style="position: fixed; left:90px;top:130px; font-size: 150px;" id="hh1">
                Welcome
            </h1>
            <h1 style="position: fixed; left:90px;top:330px;font-size: 70px;" id="hh2">
                WEB极客·农产品交易系统
            </h1>
            <h1 style="position: fixed; left:90px;top:490px;font-size: 40px;" id="hh3">
                ------绿色农产汇聚处 健康生活新起点
            </h1>
        </div>

        <div class="trapezoid2">
            <el-button class="button" @click="show">Explore More</el-button>
        </div>

        <div id="body">
            <div class="gallery">
                <figure class="card1">
                    <img src="../../assets/home4.jpeg" alt="1">
                </figure>
                <figure class="card1">
                    <img src="../../assets/home5.jpeg" alt="1">
                </figure>
                <figure class="card1">
                    <img src="../../assets/home6.jpeg" alt="1">
                </figure>
                <figure class="card1">
                    <img src="../../assets/home7.jpeg" alt="1">
                </figure>
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
    name: 'homePage',
    methods: {
        show() {
            this.$router.push({ name: 'showpage' });
        }
    }
}

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#hh1 {
    color:#3d6442;
    transition: all 0.9s ease;
    opacity: 0.9;
}

#hh2 {
    color:#3d6442;
    transition: all 0.9s ease;
    opacity: 0.9;
}

#hh3 {
    color:#4f6c53;
    transition: all 0.9s ease;
    opacity: 0.9;
}

#hh1:hover{
    color:#7aac80;
}

#hh2:hover{
    color:#7aac80;
}

#hh3:hover{
    color:#7aac80;
}

.button {
    font-size: 40px;
    position: fixed;
    left: 1230px;
    top: 320px;
    width: 300px;
    height: 80px;
    border-radius: 30em;
    border: none;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
    background-image: linear-gradient(to right, #98ffb9 0%, #fff98d 100%);
}

button:hover{
    color: rgba(50, 146, 255, 0.8);
}

.button::before {
    content: '';
    width: 0px;
    height: 80px;
    border-radius: 30em;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right, #00ff51 0%, #f9f047 100%);
    transition: .5s ease;
    display: block;
    z-index: -1;
}

.button:hover::before {
    width: 300px;
}

#body {
    position: fixed;
    left: 900px;
    top: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.gallery {
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 40rem;
    animation: change 2s linear;
    opacity: 0.9;
}

.card1 {
    position: relative;
    left: 0;
    width: 4rem;
    border-radius: 5rem;
    height: 31rem;
    overflow: hidden;
    box-shadow: 5px 5px 12px rgba(176, 178, 178, 0.6);
    flex: .6;
    transition: all 0.9s ease;
}

.card1 img {
    position: relative;
    height: 130%;
}

.card1:hover {
    flex: 1.8 1.8 0;
    cursor: pointer;
    border-radius: 1rem;
    animation: change1 1s linear;
}

.trapezoid {
    z-index: -1;
    position: fixed;
    left: 10px;
    top: 10px;
    width: 1630px;
    height: 1000px;
    padding-bottom: 0;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
    animation: wave 0.8s linear;
}

.trapezoid::before {
    border-radius: 5px;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(ellipse farthest-corner at 0 0, rgb(104, 255, 99), rgb(255, 255, 123));
    animation: change2 5s linear infinite;
    opacity: 0.8;
}

.trapezoid2 {
    z-index: -1;
    position: fixed;
    left: 20px;
    top: 20px;
    width: 1630px;
    height: 1000px;
    padding-bottom: 0;
    clip-path: polygon(100% 100%, 100% 0, 100% 0, 0 100%);
    animation: wave2 0.8s linear;
}

.trapezoid2::before {
    border-radius: 5px;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(ellipse farthest-corner at 0 0, rgb(255, 255, 123), rgb(104, 255, 99));
    animation: change2 5s linear infinite;
    opacity: 0.8;
}

@keyframes change {
    0% {
        opacity: 0.2;
    }

    25% {
        opacity: 0.4;
    }

    50% {
        opacity: 0.6;
    }

    75% {
        opacity: 0.8;
    }

    100% {
        opacity: 1;
    }
}

@keyframes change2 {
    0% {
        opacity: 0.8;
    }

    25% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.2;
    }

    75% {
        opacity: 0.5;
    }

    100% {
        opacity: 0.8;
    }
}

@keyframes change1 {
    0% {
        flex: 0.6 1.8 0;
    }

    50% {
        flex: 1.2 1.8 0;
    }

    100% {
        flex: 1.8 1.8 0;
    }
}

@keyframes wave {
    0% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 33%);
        opacity: 0.33;
    }

    50% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 66%);
        opacity: 0.66;
    }

    100% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
        opacity: 1;
    }
}

@keyframes wave2 {
    0% {
        clip-path: polygon(100% 100%, 100% 30%, 30% 100%, 0 100%);
        opacity: 0.33;
    }

    50% {
        clip-path: polygon(100% 100%, 100% 15%, 15% 100%, 0 100%);
        opacity: 0.66;
    }

    100% {
        clip-path: polygon(100% 100%, 100% 0, 0 100%, 0 100%);
        opacity: 1;
    }
}
</style>