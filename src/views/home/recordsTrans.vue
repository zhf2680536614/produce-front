<!-- 交易信息 -->
<template>

  <div>
    <homeTop />
    <div style="position:relative; left:0px; top:60px;width: 1640px;">
      <el-tabs type="border-card">
        <!-- 上架产品管理 -->
        <el-tab-pane label="上架产品管理">
          <!-- 查询条件 -->
          <el-row :gutter="30">
            <el-col :span="4"><el-input v-model="marketProducesName" placeholder="产品名称"></el-input></el-col>
            <el-col :span="4">
              <el-select v-model="marketProducesStatus" placeholder="请选择上架产品状态">
                <el-option label="全部产品" value="">
                </el-option>
                <el-option label="上架中" value="1">
                </el-option>
                <el-option label="已下架" value="2">
                </el-option>
              </el-select>

            </el-col>
            <!-- 时间选择器 -->
            <el-col :span="6">
              <div class="block">
                <el-date-picker v-model="timeRange1" type="datetimerange" :picker-options="pickerOptions"
                  range-separator="至" start-placeholder="创建开始日期" end-placeholder="创建结束日期" align="right">
                </el-date-picker>
              </div>
            </el-col>
            <!-- 按钮 -->
            <div>
              <!-- 检索 -->
              <el-button type="primary" icon="el-icon-search" @click="pageByConditionMarket">查找</el-button>
            </div>
          </el-row><br>


          <!-- 数据展示 -->
          <div v-if="ske2">
            <el-skeleton :rows="5" animated />
            <el-skeleton :rows="5" animated />
            <sapn style="font-size: larger;">未查询到符合条件的上架产品！</sapn>
            <el-skeleton :rows="5" animated />
            <el-skeleton :rows="5" animated />
          </div>

          <!-- 订单列表数据 -->
          <div v-for="item in marketProduces" :key="item.id">
            <img :src="item.image" style="width: 110px; height: 110px;display: inline-block;margin-right: 10px;">
            <el-descriptions :column="4" border style="display: inline-block;width: 1450px;">
              <el-descriptions-item label="创建时间"><span style="display: inline-block;width: 10vw;">{{ item.createTime
                  }}</span></el-descriptions-item>
              <el-descriptions-item label="产品名称"><span style="display: inline-block;width: 10vw;">{{ item.name
                  }}</span></el-descriptions-item>
              <el-descriptions-item label="产品分类"><span style="display: inline-block;width: 10vw;">
                  {{ processCategory(item.category) }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="单价"><span style="display: inline-block;width: 10vw;">
                  {{ item.unitPrice }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="库存(kg)">{{ (item.weight).toFixed(2) }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <span v-if="item.status === 1" style="color: green;">上架中</span>
                <span v-if="item.status === 2" style="color: blue;">已下架</span>
              </el-descriptions-item>
              <el-descriptions-item label="操作">
                <el-button v-show="item.status == 2" type="primary" style="margin-left:0px;margin-right:50px;"
                  @click="updateMarketPs(item.id, 1, null)">上架产品</el-button>
                <el-button v-show="item.status == 1" type="text" style="margin-left:0px;margin-right:50px;"
                  @click="updateMarketPs(item.id, 2, null)">下架产品</el-button>

                <el-popover placement="right" width="400" trigger="click">
                  <div class="popover">
                    <el-input-number style="margin-right:50px;" v-model="weight" :precision="2" :step="10" :min="1"
                      :max="999999"></el-input-number>
                    <el-button type="primary" @click="updateMarketPs(item.id, null, weight)">确认增加</el-button>
                  </div>
                  <el-button slot="reference" type="text" style="margin-right:50px;"
                    @click="weight = 1">增加库存</el-button>
                </el-popover>
                <el-button type="text" @click="openMarket(item.id)">删除产品</el-button>
              </el-descriptions-item>
            </el-descriptions>
            <br><br>
            <hr><br>
          </div>

          <!-- 分页查询 -->
          <div class="block" style="position: fixed; top:965px; left:600px;">
            <el-pagination @current-change="handleCurrentChange1" :page-size="pageSize1"
              layout="total, prev, pager, next, jumper" :total=total1>
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 我的订单 -->
        <el-tab-pane label="我的订单">
          <!-- 查询条件 -->
          <el-row :gutter="30">
            <el-col :span="4"><el-input v-model="producesName" placeholder="产品名称"></el-input></el-col>
            <el-col :span="4"><el-input v-model="merchantName" placeholder="商家名称"></el-input></el-col>
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
            <div>
              <!-- 检索 -->
              <el-button type="primary" icon="el-icon-search" @click="pageByCondition">查找</el-button>
            </div>
          </el-row><br>

          <!-- 数据展示 -->
          <div v-if="ske1">
            <el-skeleton :rows="5" animated />
            <el-skeleton :rows="5" animated />
            <sapn style="font-size: larger;">未查询到符合条件的订单！</sapn>
            <el-skeleton :rows="5" animated />
            <el-skeleton :rows="5" animated />
          </div>

          <!-- 订单列表数据 -->
          <div v-for="item in tableData" :key="item.id">
            <img :src="item.image" style="width: 140px; height: 140px;display: inline-block;margin-right: 10px;">
            <el-descriptions :column="4" border style="display: inline-block;width: 1450px;height:150px;">
              <el-descriptions-item label="创建时间"><span style="display: inline-block;width: 10vw;">{{ item.createTime
                  }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="订单号"><span style="display: inline-block;width: 18vw;">{{ item.orderNumber
                  }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="产品名称"><span style="display: inline-block;width: 10vw;">{{ item.produceName
                  }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="单价"><span style="display: inline-  block;width: 3vw;">{{ item.unitPrice
                  }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="重量">{{ item.produceWeight }}</el-descriptions-item>
              <el-descriptions-item label="总价">{{ item.amount }}</el-descriptions-item>
              <el-descriptions-item label="收货人姓名">{{ item.consigneeName }}</el-descriptions-item>
              <el-descriptions-item label="电话号码">{{ item.phoneNumber }}</el-descriptions-item>
              <el-descriptions-item label="收货地址">{{ item.addressBookName }}</el-descriptions-item>
              <el-descriptions-item label="状态">
                <span v-if="item.status === 1" style="color: green;">已完成</span>
                <span v-if="item.status === 2" style="color: blue;">待确认</span>
                <span v-if="item.status === 3" style="color: red;">已取消</span>
              </el-descriptions-item>
              <el-descriptions-item label="操作">
                <el-button v-show="item.status == 2" type="primary" style="margin-left:50px;margin-right:50px;"
                  @click="confirmPurchase(item)">确认购买</el-button>
                <el-button v-show="item.status == 2" type="text" style="margin-right:50px;"
                  @click="cancelPurchase(item)">取消订单</el-button>
                <el-button type="text" @click="open(item)">删除</el-button>
              </el-descriptions-item>
            </el-descriptions>
            <br>
            <hr><br>
          </div>

          <!-- 分页查询 -->
          <div class="block" style="position: fixed; top:960px; left:600px;">
            <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
              layout="total, prev, pager, next, jumper" :total=total>
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>



  </div>
</template>

<script>
import { pageQueryUser } from '@/api/orders';
import moment from 'moment';
import homeTop from '@/components/homeTop.vue';
import {
  updateUserOrdersConfirm, updateUserOrdersCancel,
  pageQueryMarket, updateMarketProduces, deleteMarketProduces
} from '@/api/marketProduces'
import { deleteOrdersUser } from '@/api/orders'
import { queryCategoryUser } from '@/api/category';

export default {
  name: 'recordsTrans',
  components: {
    homeTop
  },
  data() {
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

      //总数
      total: null,
      PageNo: 1,
      pageSize: null,
      //分页条件
      producesName: '',
      merchantName: '',
      status: '',
      timeRange: '',
      startTime: null,
      endTime: null,

      id: '',

      //修改订单
      updateOrders: {
        id: '',
        addressBookId: '',
        consigneeName: '',
        consigneePhoneNumber: '',
        addressBookName: '',
        remark: '',
        marketProducesId: ''
      },

      //上架产品查询条件
      timeRange1: '',
      startTime1: null,
      endTime1: null,
      marketProducesStatus: '',

      marketProduces: null,
      marketProducesName: '',
      total1: null,
      PageNo1: 1,
      pageSize1: null,


      weight: '',
      updateMarket: {
        id: '',
        status: '',
        weight: ''
      },

      ske1: false,
      ske2: false,
      categorys: '',

    }
  },

  mounted() {
    this.pageNo1 = 1
    this.pageSize1 = 5
    this.pageMarketProduces()
    this.pageNo = 1
    this.pageSize = 4
    this.pageOrders()
    this.getCategory()
  },

  methods: {

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
        if (number == this.categorys[i].id) {
          number = this.categorys[i].name
        }
      }
      return number
    },

    //删除订单数据
    deleteMarket(id) {
      deleteMarketProduces(id).then(res => {
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.pageMarketProduces()
        } else if (res.code == 0) {
          this.$message({
            type: 'error',
            message: res.msg
          });
        }
      })
    },

    openMarket(id) {
      this.$confirm('此操作将永久删除该上架产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMarket(id)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //更新上架产品
    updateMarketPs(id, status, weight) {
      //构造参数
      if (status != null) {
        this.updateMarket.status = status
      }
      if (weight != null) {
        this.updateMarket.weight = weight
      }
      this.updateMarket.id = id
      updateMarketProduces(this.updateMarket)
        .then(res => {
          if (res.code == 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });

            this.pageMarketProduces()

            this.updateMarket.status = null
            this.updateMarket.weight = null
          } else if (res.code == 0) {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        })
    },

    //上架产品分页查询数据
    pageMarketProduces() {

      if (this.timeRange1 != null) {
        if (this.timeRange1[0] != null && this.timeRange1[1] != null) {
          const startMoment = moment(this.timeRange1[0])
          const endMoment = moment(this.timeRange1[1])
          this.startTime1 = startMoment.format('yyyy-MM-DD HH:mm:ss')
          this.endTime1 = endMoment.format('yyyy-MM-DD HH:mm:ss')
        }
      }

      const id = localStorage.getItem('id')

      pageQueryMarket(id, this.pageNo1, this.pageSize1, this.marketProducesName, this.marketProducesStatus, this.startTime1, this.endTime1)
        .then(response => {
          this.total1 = response.data.total
          this.marketProduces = response.data.list
          if (this.marketProduces.length == 0) {
            this.ske2 = true;
          } else {
            this.ske2 = false;
          }

          this.startTime1 = ''
          this.endTime1 = ''
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    //删除订单数据
    deleteOrders(item) {
      deleteOrdersUser(item.id).then(res => {
        if (res.code == 1) {
          this.pageOrders()
        }
      })
    },

    open(item) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOrders(item)

        this.$message({
          type: 'success',
          message: '删除成功!'
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    //确认购买
    confirmPurchase(item) {
      this.updateOrders.id = item.id
      this.updateOrders.marketProducesId = item.marketProducesId
      if (item.remark != '' && item.remark != null) {
        this.updateOrders.remark = item.remark
      }
      updateUserOrdersConfirm(this.updateOrders).then(res => {
        if (res.code == 1) {

          this.$message({
            showClose: true,
            message: '购买成功',
            type: 'success'
          });

          this.pageOrders()

        }
      })
    },

    //取消购买
    cancelPurchase(item) {
      this.updateOrders.id = item.id
      updateUserOrdersCancel(this.updateOrders).then(
        res => {
          if (res.code == 1) {

            this.$message({
              showClose: true,
              message: '取消成功',
              type: 'success'
            });

            this.pageOrders()
          }
        }
      )
    },

    //订单分页查询数据
    pageOrders() {

      if (this.timeRange != null) {
        if (this.timeRange[0] != null && this.timeRange[1] != null) {
          const startMoment = moment(this.timeRange[0])
          const endMoment = moment(this.timeRange[1])
          this.startTime = startMoment.format('yyyy-MM-DD HH:mm:ss')
          this.endTime = endMoment.format('yyyy-MM-DD HH:mm:ss')
        }
      }
      const id = localStorage.getItem('id')
      pageQueryUser(id, this.pageNo, this.pageSize, this.producesName, this.merchantName, this.status, this.startTime, this.endTime)
        .then(response => {
          this.total = response.data.total
          this.tableData = response.data.userOrdersTotals
          if (this.tableData.length == 0) {
            this.ske1 = true;
          } else {
            this.ske1 = false;
          }

          this.startTime = ''
          this.endTime = ''
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    //我的订单检索
    pageByCondition() {
      this.pageNo = 1;
      this.pageOrders();
    },

    //上架产品检索
    pageByConditionMarket() {
      this.pageNo = 1;
      this.pageMarketProduces();
    },

    //我的订单切换页面
    handleCurrentChange(val) {

      this.pageNo = val

      this.pageOrders()
    },

    //上架产品切换页面
    handleCurrentChange1(val) {
      this.pageNo1 = val

      this.pageMarketProduces()
    }
  }
}
</script>

<style scoped>
i {
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
  width: 80px;
  ;
}
</style>