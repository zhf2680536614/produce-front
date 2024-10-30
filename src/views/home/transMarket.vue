<!-- 交易市场 -->
<template>
    <div>
        <home-top />
        <el-container style="position: fixed; left:8px; right: 8px; top:60px;">
            <!-- 展示列表 -->
            <el-main>
                <el-row :gutter="30" style="position:fixed; left:30px;">
                    <el-col :span="4"><el-input v-model="applename" placeholder="名称"></el-input></el-col>
                    <el-col :span="4"><el-input v-model="appleuser" placeholder="商家"></el-input></el-col>
                    <!-- 下拉列表 -->
                    <el-col :span="4">
                        <el-select v-model="appleselect" placeholder="商品种类">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <!-- 时间选择器 -->
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <div class="block">
                                <el-date-picker v-model="appledate" type="datetimerange" :picker-options="pickerOptions"
                                    range-separator="至" start-placeholder="上架启始日期" end-placeholder="上架结束日期"
                                    align="right">
                                </el-date-picker>
                            </div>
                        </div>
                    </el-col>
                    <!-- 按钮 -->
                    <div style="display:inline-block; margin-left: 50px;">
                        <el-button type="primary" icon="el-icon-search" class="chazhao">查找</el-button>
                        <el-button type="primary" icon="el-icon-goods">购物车</el-button>
                        <el-button type="primary" icon="el-icon-goods">上架产品</el-button>
                    </div>

                </el-row>

                <!-- 商品列表数据 -->
                <el-table :data="tableData" style="margin-top: 10px;font-size: 16px; font-weight: 200;
                position: fixed; top:120px;">
                    <el-table-column prop="name" label="名称" width="180">
                    </el-table-column>
                    <el-table-column prop="kind" label="种类" width="180">
                    </el-table-column>
                    <el-table-column label="图片" width="230">
                        <template slot-scope="scope">
                            <div>
                                <img :src="scope.row.image" width="60" height="40" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="weight" label="重量(g)" width="150">
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="150">
                    </el-table-column>
                    <el-table-column prop="address" label="生产地" width="230">
                    </el-table-column>
                    <el-table-column prop="user" label="商家" width="120">
                    </el-table-column>
                    <el-table-column prop="date" label="上架日期" width="150">
                    </el-table-column>
                    <!-- 查看详细 -->
                    <el-table-column prop="name" label="查看详细" width="100">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="600" trigger="click">
                                <div class="popover">
                                    <span>{{ scope.row.name }}</span>
                                    <el-divider content-position="left"><span>名称</span></el-divider>
                                    <span>{{ scope.row.address }}</span>
                                    <el-divider content-position="left"><span>产地</span></el-divider>
                                    <span>
                                        <div>
                                            <img :src="scope.row.image" width="300" height="auto" />
                                        </div>
                                    </span>
                                    <el-divider content-position="left"><span>图片</span></el-divider>
                                    <span>{{ scope.row.info }}</span>
                                    <el-divider content-position="left"><span>详细介绍</span></el-divider>
                                    <span>{{ scope.row.price }}</span>
                                    <el-divider content-position="left"><span>单价</span></el-divider>
                                    <span>{{ scope.row.weight }}</span>
                                    <el-divider content-position="left"><span>重量</span></el-divider>
                                </div>
                                <el-button slot="reference" type="primary" icon="el-icon-more-outline"></el-button>
                            </el-popover>
                        </template>

                    </el-table-column>
                    <!-- 加入购物车 -->
                    <el-table-column prop="name" label="加入购物车" width="100">
                        <el-popover placement="right" width="450" trigger="click">
                            <div class="popover">
                                <span>商品名称</span>
                                <el-divider content-position="left">商品名称</el-divider>
                                <span>商品种类</span>
                                <el-divider content-position="left">商品种类</el-divider>
                                <span>重量(g)</span>
                                <el-divider content-position="left">重量(g)</el-divider>
                                <span>单价</span>
                                <el-divider content-position="left">单价</el-divider>
                                <span>总价</span>
                                <el-divider content-position="left">总价</el-divider>
                                <el-button type="primary" icon="el-icon-goods"></el-button>
                            </div>
                            <el-button slot="reference" type="primary" icon="el-icon-plus"></el-button>
                        </el-popover>
                    </el-table-column>
                </el-table>
                <!-- 分页查询 -->
                <div class="block" style="position:fixed; top:900px; left:550px">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage4" :page-sizes="[5, 10, 20]" :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper" :total=total>
                    </el-pagination>
                </div>
            </el-main>
        </el-container>
    </div>

</template>

<script>
import homeTop from '@/components/homeTop.vue';
export default {
    name: 'transMarket',
    components: {
        //公共组件侧边栏注册
        homeTop
    },
    data() {
        //页面数据
        const item = {
            name: '苹果',
            address: '重庆市巴南区',
            image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            weight: '300',
            kind: '水果',
            price: '15',
            user: 'atey',
            date: '2016-05-02',
            info: "苹果（Apple），是最常见的水果之一。 苹果树属于蔷薇科，落叶乔木，叶椭圆形，有锯齿。 其果实球形，味甜，口感爽脆，且富含丰富的营养，是世界四大水果之冠。 苹果通常为红色，不过也有黄色和绿色。 苹果是一种低热量食物，每100克只产生60千卡热量。"
        };

        return {

            activeIndex: '1',
            activeIndex2: '1',

            // 列表展示数据
            tableData: Array(10).fill(item),
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
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            appledate: '',

            //下拉列表数据
            options: [{
                value: '选项1',
                label: '水果'
            }, {
                value: '选项2',
                label: '豆制品'
            }, {
                value: '选项3',
                label: '小麦'
            }, {
                value: '选项4',
                label: '大米'
            }, {
                value: '选项5',
                label: '肉类'
            }],
            appleselect: '',
            applename: '',
            appleuser: '',
            //分页查询
            //总数
            total: 20,

            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        }
    },

    methods: {
        printMessage(message) {
            console.log(message);

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped></style>