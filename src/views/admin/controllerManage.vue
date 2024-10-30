<!-- 分类管理 -->
<template>
    <div style="position: fixed;
    z-index: 10;
    left:5px;
    top:70px;">
        <first-top />
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
import firstTop from '@/components/firstTop.vue';
import * as echarts from 'echarts';

export default {
    name: 'controllerManage',
    components: {
        firstTop
    },
    data() {
        //页面数据
        return {

        };
    },

    mounted() {
        const myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });
    },

    methods: {

    }
}
</script>
<style scoped></style>