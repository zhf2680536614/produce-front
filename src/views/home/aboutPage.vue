<!-- 关于我们 -->
<template>
  <div style="height:800px;">
    <homeTop />

    <div class="index">

    </div>

    <div class="divGreen1">
      <div style="font-size:60px;font-weight: 700;">
        绿色农产汇聚处
      </div>
      <div style="font-size:16px;font-weight: 500;">
        A gathering place for green agricultural products.
      </div>

    </div>
    <div class="divGreen2">
      <div style="font-size:60px;font-weight: 700;">
        健康生活新起点
      </div>
      <div style="font-size:16px;font-weight: 500;">
        A new starting point for a healthy life.
      </div>
    </div>

    <img class="img1" src="../../assets/print.jpg" alt="">
    <div class="div1">关于我们</div>
    <div class="div2">
      <div>about us</div>
      <hr>
      <div style="margin-left:200px;margin-right:200px;">
        农产品交易系统是一个专门为农产品买卖而设计的综合性数字化平台，它为农产品产业链中的各个环节提供了便捷、高效的交易环境，
        其也是一款革新性的数字化解决方案，旨在优化农产品交易流程、提升交易效率并增强市场透明度。
      </div>
    </div>

    <img class="footer" src="../../assets/print.jpeg" alt="">
    <img class="footer" src="../../assets/print.jpeg" alt="">
    <img class="footer" src="../../assets/print.jpeg" alt="">
    <img class="footer" src="../../assets/print.jpeg" alt="">

    <div class="footerfont1">
      <div class="footerfonta">2024</div>
      <div style="position:relative;left:55px;top:-27px;color:rgb(255, 255, 255);">年</div>
      <div class="footerfontb">系统创立</div>
    </div>
    <div class="footerfont2">
      <div class="footerfonta">20</div>
      <div style="position:relative;left:35px;top:-27px;color:rgb(255, 255, 255);">+</div>
      <div class="footerfontb">服务用户</div>
    </div>
    <div class="footerfont3">
      <div class="footerfonta">40</div>
      <div style="position:relative;left:35px;top:-27px;color:rgb(255, 255, 255);">+</div>
      <div class="footerfontb">产品展示</div>
    </div>
    <div class="footerfont4">
      <div class="footerfonta">100</div>
      <div style="position:relative;left:35px;top:-27px;color:rgb(255, 255, 255);">+</div>
      <div class="footerfontb">订单数量</div>
    </div>
  </div>


</template>

<script>
import homeTop from '@/components/homeTop.vue';
import { mapState } from 'vuex';
export default {
  components: {
    homeTop
  },
  computed: mapState([
    'user'
  ]),
  name: 'aboutPage',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.index {
  position: fixed;
  width: 98vw;
  height: 1000px;
  z-index: -999;
  background-color: rgb(243, 255, 241);
}

.footerfont1 {
  position: relative;
  left: -425px;
  top: -315px;
  z-index: 999;
}

.footerfont2 {
  position: relative;
  left: -170px;
  top: -395px;
  z-index: 999;
}

.footerfont3 {
  position: relative;
  left: 80px;
  top: -480px;
  z-index: 999;
}

.footerfont4 {
  position: relative;
  left: 330px;
  top: -560px;
  z-index: 999;
}

.footerfonta {
  font-size: 36px;
  font-weight: 600;
  color: rgb(255, 255, 255);
}

.footerfontb {
  font-size: 16px;
  font-weight: 400;
  color: rgb(255, 255, 255);
}

.footer {
  opacity: 1;
  margin-right: 100px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  top:-200px;
}

.img1 {
  width: 98vw;
  height: 69vh;
  position: relative;
  opacity: 0.9;
  border-radius: 10px;
  top: -200px;
  left: 0px;
}

.div1 {
  font-size: 40px;
  font-weight: 700;
  color: rgb(54, 163, 54);
  position: relative;
  top: -200px;
}

.div2 {
  position: relative;
  top: -200px;
}

.divGreen1 {
  position: relative;
  left: -350px;
  top: 270px;
  z-index: 999;
  color: rgba(255, 255, 255, 0.9);
}

.divGreen2 {
  position: relative;
  left: 320px;
  top: 170px;
  z-index: 999;
  color: rgba(255, 255, 255, 0.9);
}
</style>
