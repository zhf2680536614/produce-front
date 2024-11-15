<!-- 交易市场 -->
<template>
    <div>
        <home-top />

        <!-- 侧边栏 -->
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

        <!-- 分类销量排名 -->
        <span id="top10">TOP10</span><br><br>
        <div id="main" style="width: 100%;height:500px;"></div>

        <!-- 产品秒杀 -->
        <hr style="width: 100%" class="hr">
        <span id="span2">产品秒杀</span><br><br>
        <div>
            <el-card shadow="hover" style="width: 100%;">
                <span style="font-size:24px;">🎉🎉🎉🎉🎉商品降价🎉🎉🎉🎉🎉</span><br><br>
                <div style="width: 100%; display: inline-block;">
                    <span style="font-size:22px;">特价产品实时更新,全场8折,开始拼手速吧！</span><br><br>
                    <span style="font-size:24px;">Seconds:{{
                        secondsPlus1 }}</span>
                </div>
            </el-card>
        </div>

        <div style="position:relative; left:8px; top:20px;" class="producesPlus">
            <el-skeleton :loading="loading" animated :count="3">
                <template>
                    <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in listsPlus"
                        :key="item.id" style="display:inline-block;margin:10px;width:340px;height:440px;">
                        <img :src="item.image" class="image multi-content" style="width:340px;height:340px;" />
                        <div style="padding: 14px;">
                            <span style="position:relative;left:60px;top:0px;">{{ item.name }}</span>
                            <el-tag style="position:relative;left:-100px;top:-10px;"><span
                                    style="text-decoration: line-through;font-size: 18px;">原价: {{ item.unitPrice
                                    }}</span></el-tag>
                            <el-tag type="success" style="position:relative;left:-160px;top:40px;"><span
                                    style="font-size: 18px;">折扣价:
                                    {{ Number(item.unitPrice)
                                        * 0.8
                                    }}</span></el-tag>
                            <div class="bottom card-header">
                                <el-popover placement="right" width="600" trigger="click">
                                    <el-descriptions class="margin-top" title="产品详细" :column="1" border>
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
                                            {{ marketProduces.unitPrice * 0.8 }}
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
                                            <img :src="marketProduces.image" alt="" style="width: 200px; height:200px;">
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
                                    <div>请选择产品重量(kg)</div><br>
                                    <el-input-number v-model="weight" :precision="2" :step="1.0" :min="0.1"
                                        :max="marketProduces.weight"></el-input-number><br><br>
                                    <el-button type="primary" @click="purchasePlus" class="button">购买</el-button>
                                    <el-dialog title="确认订单" :visible.sync="dialogTableVisible3" append-to-body>

                                        <span
                                            style="font-size:22px; position:relative;left:180px;">请及时确认订单，15分钟后将自动取消订单</span><br><br>
                                        <span style="font-size:24px; position:relative;left:360px;">{{ minutes }}:{{
                                            seconds }}</span>
                                        <el-descriptions class="margin-top" title="订单详细" :column="1" border>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-user"></i>
                                                    订单号
                                                </template>
                                                {{ orders.orderNumber }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-mobile-phone"></i>
                                                    商家名称
                                                </template>
                                                {{ orders.merchantName }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-location-outline"></i>
                                                    收货人姓名
                                                </template>
                                                {{ orders.consigneeName }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    收货地址
                                                </template>
                                                {{ orders.addressBookName }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    收货人电话号码
                                                </template>
                                                {{ orders.phoneNumber }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    产品名称
                                                </template>
                                                {{ ordersDetails.produceName }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    产品图片
                                                </template>
                                                <img :src="ordersDetails.image" style="width:100px;height:100px;">
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    重量(kg)
                                                </template>
                                                {{ ordersDetails.produceWeight }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    单价
                                                </template>
                                                {{ ordersDetails.unitPrice * 0.8 }}
                                            </el-descriptions-item>
                                            <el-descriptions-item>
                                                <template slot="label">
                                                    <i class="el-icon-office-building"></i>
                                                    总价
                                                </template>
                                                {{ ordersDetails.amount }}
                                            </el-descriptions-item>
                                        </el-descriptions>
                                        <span>备注</span>
                                        <el-input type="textarea" v-model="orders.remark"></el-input>
                                        <br>
                                        <el-popover placement="left" width="300" trigger="click">
                                            <div v-for="item in user.address" :key="item.id">
                                                <el-tag>Num : {{ item.number }}</el-tag><br>
                                                <hr>
                                                <span>收货人姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                    item.consigneeName }}</span><br>
                                                <hr>
                                                <span>电话号码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                    item.consigneePhoneNumber }}</span><br>
                                                <hr>
                                                <span>收获地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                    item.location }}</span>
                                                <hr>
                                                <br>

                                                <el-button type="text"
                                                    @click="updateAddress(item.id, item.location, item.consigneeName, item.consigneePhoneNumber)">选择该地址</el-button>
                                            </div>
                                            <el-button slot="reference" type="text" class="button">修改收货地址</el-button>
                                        </el-popover>
                                        <br>
                                        <hr>
                                        <br>
                                        <el-button type="primary" class="button"
                                            @click="confirmPurchasePlus(id)">确认购买</el-button>
                                        <el-button type="text" class="button" @click="cancelPurchase">取消订单</el-button>
                                    </el-dialog>
                                    <el-button slot="reference" type="text" class="button"
                                        @click="selectById(item.id)">抢购</el-button>
                                </el-popover>
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
                    <el-select v-model="order" placeholder="排序">
                        <el-option label="默认排序" value="">
                        </el-option>
                        <el-option label="价格排序" value="1">
                        </el-option>
                        <el-option label="销量排序" value="2">
                        </el-option>
                        <el-option label="库存排序" value="3">
                        </el-option>
                    </el-select>
                </el-col>
                <el-button icon="el-icon-caret-top" style="position:absolute;top:0px;left:820px;"
                    @click="sc('1')">从低到高</el-button>
                <el-button icon="el-icon-caret-bottom" style="position:absolute;top:25px;left:810px;"
                    @click="sc('2')">从高到低</el-button>
                <!-- 按钮 -->
                <div style="display:inline-block;position:relative;top:0px;left:10px;">

                    <el-button type="primary" icon="el-icon-search" class="button" @click="selectAll">查找</el-button>
                    <el-badge :value="shoppingCarts.length" style="margin-right: 20px;margin-left:80px;">
                        <el-button size="small" class="button goods" icon="el-icon-s-goods"
                            @click="openGoods">购物车</el-button>
                        <el-dialog title="购物车" :visible.sync="dialogTableGoods" append-to-body style="height:100%;">
                            <!-- 全部结算 -->
                            <el-button type="primary" class="button" @click="purchaseAll">全部结算</el-button>
                            <el-dialog title="确认订单" :visible.sync="dialogTableVisible2" append-to-body>
                                <span
                                    style="font-size:22px; position:relative;left:180px;">请及时确认订单，15分钟后将自动取消订单</span><br><br>
                                <span style="font-size:24px; position:relative;left:360px;">{{ minutes }}:{{
                                    seconds }}</span>
                                <div v-for="item in ordersDetailsShopping" :key="item.id">
                                    <el-descriptions class="margin-top" title="订单详细" :column="2" border>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                产品名称
                                            </template>
                                            {{ item.produceName }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                重量(kg)
                                            </template>
                                            {{ item.produceWeight }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                单价
                                            </template>
                                            {{ item.unitPrice }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                总价
                                            </template>
                                            {{ item.amount }}
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-office-building"></i>
                                                产品图片
                                            </template>
                                            <img :src="item.image" style="width:100px;height:100px;">
                                        </el-descriptions-item>
                                    </el-descriptions>
                                    <br>
                                </div>
                                <br>
                                <hr>
                                <el-descriptions class="margin-top" title="收货地址" :column="1" border>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            收货人姓名
                                        </template>
                                        {{ orders.consigneeName }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building"></i>
                                            收货地址
                                        </template>
                                        {{ orders.addressBookName }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building"></i>
                                            收货人电话号码
                                        </template>
                                        {{ orders.phoneNumber }}
                                    </el-descriptions-item>
                                </el-descriptions>
                                <br>
                                <hr>
                                <el-descriptions class="margin-top" title="总金额" :column="1" border>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            总金额
                                        </template>
                                        {{ allPrice }}
                                    </el-descriptions-item>
                                </el-descriptions>
                                <br>
                                <br>
                                <span
                                    style="font-size:16px;margin-left:150px;color:rgba(0,0,0,0.9);">温馨提示:收获地址信息为默认收货地址信息,如需更改,请到个人中心更改</span>
                                <br>
                                <el-button type="primary" class="button"
                                    @click="confirmPurchaseShoppings">确认购买</el-button>
                                <el-button type="text" class="button" @click="cancelPurchaseAll">一键取消</el-button>
                            </el-dialog>
                            <!-- 清空购物车 -->
                            <el-button type="text" class="button" @click="deleteAllShopping">一键清空</el-button><br><br>
                            <!-- 购物车列表数据展示 -->
                            <span v-show="emptyShow" style="font-size: 28px;margin-left:150px;">购物车为空，快去选择心仪的产品吧！</span>
                            <div v-for="item in shoppingCarts" :key="item.id">
                                <el-descriptions class="margin-top" title="" :column="3" border>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-user"></i>
                                            商品名称
                                        </template>
                                        {{ item.marketProducesName }}
                                    </el-descriptions-item>

                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-location-outline"></i>
                                            单价
                                        </template>
                                        {{ item.unitPrice }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building"></i>
                                            重量
                                        </template>
                                        {{ item.weight }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-office-building"></i>
                                            总价
                                        </template>
                                        {{ item.amount }}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            图片
                                        </template>
                                        <img :src="item.image" alt="" style="width:80px;height:80px;">
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">
                                            <i class="el-icon-mobile-phone"></i>
                                            操作
                                        </template>
                                        <!-- 购物车产品单独购买 -->
                                        <el-button type="text" @click="shoppingCartPurchase(item)">购买</el-button>
                                        <el-button type="text" @click="open(item.id)">删除</el-button>
                                        <el-dialog title="确认订单" :visible.sync="dialogTableVisible1" append-to-body>
                                            <span
                                                style="font-size:22px; position:relative;left:180px;">请及时确认订单，15分钟后将自动取消订单</span><br><br>
                                            <span style="font-size:24px; position:relative;left:360px;">{{ minutes }}:{{
                                                seconds }}</span>
                                            <el-descriptions class="margin-top" title="订单详细" :column="1" border>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-user"></i>
                                                        订单号
                                                    </template>
                                                    {{ orders.orderNumber }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-mobile-phone"></i>
                                                        商家名称
                                                    </template>
                                                    {{ orders.merchantName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-location-outline"></i>
                                                        收货人姓名
                                                    </template>
                                                    {{ orders.consigneeName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        收货地址
                                                    </template>
                                                    {{ orders.addressBookName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        收货人电话号码
                                                    </template>
                                                    {{ orders.phoneNumber }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        产品名称
                                                    </template>
                                                    {{ ordersDetails.produceName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        重量(kg)
                                                    </template>
                                                    {{ ordersDetails.produceWeight }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        单价
                                                    </template>
                                                    {{ ordersDetails.unitPrice }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        总价
                                                    </template>
                                                    {{ ordersDetails.amount }}
                                                </el-descriptions-item>
                                            </el-descriptions>
                                            <span>备注</span>
                                            <el-input type="textarea" v-model="orders.remark"></el-input>
                                            <br>
                                            <el-popover placement="left" width="300" trigger="click">
                                                <div v-for="item in user.address" :key="item.id">
                                                    <el-tag>Num : {{ item.number }}</el-tag><br>
                                                    <hr>
                                                    <span>收货人姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                        item.consigneeName }}</span><br>
                                                    <hr>
                                                    <span>电话号码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                        item.consigneePhoneNumber }}</span><br>
                                                    <hr>
                                                    <span>收获地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                        item.location }}</span>
                                                    <hr>
                                                    <br>
                                                    <el-button type="text"
                                                        @click="updateAddress(item.id, item.location, item.consigneeName, item.consigneePhoneNumber)">选择该地址</el-button><br><br>
                                                </div>
                                                <el-button slot="reference" type="text"
                                                    class="button">修改收货地址</el-button>
                                            </el-popover>
                                            <br>
                                            <hr>
                                            <br>
                                            <el-button type="primary" class="button"
                                                @click="confirmPurchaseShopping(id, item.id)">确认购买</el-button>
                                            <el-button type="text" class="button"
                                                @click="cancelPurchase">取消订单</el-button>
                                        </el-dialog>
                                    </el-descriptions-item>
                                </el-descriptions>
                                <br>
                                <hr>
                                <br>
                            </div>
                        </el-dialog>
                    </el-badge>
                    <!-- 上架产品 -->
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
                                    <el-button type="primary" @click="submitForm('marketProduces')"
                                        class="button">立即创建</el-button>
                                    <el-button type="text" @click="resetForm('marketProduces')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button slot="reference" type="primary" icon="el-icon-plus" class="button"
                            @click="emptyForm">上架产品</el-button>
                    </el-popover>
                </div>

            </el-row>

            <!-- 列表数据为空展示 -->
            <div v-if="ske">
                <el-skeleton :rows="6" animated style="position: relative;top:100px;" />
                <span style="position: relative;top:100px; font-size: larger;">未查询到符合条件的产品！</span>
                <el-skeleton :rows="6" animated style="position: relative;top:100px;" />
            </div>

            <!-- 产品列表数据 -->
            <div style="position:relative; left:8px; top:80px;">

                <el-skeleton :loading="loading" animated :count="3">
                    <template>
                        <el-card :body-style="{ padding: '0px', marginBottom: '1px' }" v-for="item in lists"
                            :key="item.id" style="display:inline-block;margin:10px;width:340px;height:440px;">
                            <img :src="item.image" class="image multi-content" style="width:340px;height:340px;" />
                            <div style="padding: 14px;">
                                <el-tag style="position:relative;left:-60px;top:-15px;">种类: {{ item.category }}</el-tag>
                                <el-tag style="position:relative;left:-120px;top:30px;" type="success">单价: {{
                                    item.unitPrice }}</el-tag>
                                <span style="position:relative;left:-50px;font-weight: 100;font-size:medium">{{
                                    item.name }}</span>
                                <div class="bottom card-header">
                                    <br>
                                    <el-popover placement="right" width="600" trigger="click">
                                        <el-descriptions class="margin-top" title="产品详细" :column="1" border>
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
                                        <div>请选择产品重量(kg)</div><br>
                                        <el-input-number v-model="weight" :precision="2" :step="1.0" :min="0.1"
                                            :max="marketProduces.weight"></el-input-number><br><br>
                                        <el-button type="primary" @click="purchase" class="button">购买</el-button>
                                        <el-dialog title="确认订单" :visible.sync="dialogTableVisible" append-to-body>

                                            <span
                                                style="font-size:22px; position:relative;left:180px;">请及时确认订单，15分钟后将自动取消订单</span><br><br>
                                            <span style="font-size:24px; position:relative;left:360px;">{{ minutes }}:{{
                                                seconds }}</span>
                                            <el-descriptions class="margin-top" title="订单详细" :column="1" border>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-user"></i>
                                                        订单号
                                                    </template>
                                                    {{ orders.orderNumber }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-mobile-phone"></i>
                                                        商家名称
                                                    </template>
                                                    {{ orders.merchantName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-location-outline"></i>
                                                        收货人姓名
                                                    </template>
                                                    {{ orders.consigneeName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        收货地址
                                                    </template>
                                                    {{ orders.addressBookName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        收货人电话号码
                                                    </template>
                                                    {{ orders.phoneNumber }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        产品名称
                                                    </template>
                                                    {{ ordersDetails.produceName }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        产品图片
                                                    </template>
                                                    <img :src="ordersDetails.image" style="width:100px;height:100px;">
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        重量(kg)
                                                    </template>
                                                    {{ ordersDetails.produceWeight }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        单价
                                                    </template>
                                                    {{ ordersDetails.unitPrice }}
                                                </el-descriptions-item>
                                                <el-descriptions-item>
                                                    <template slot="label">
                                                        <i class="el-icon-office-building"></i>
                                                        总价
                                                    </template>
                                                    {{ ordersDetails.amount }}
                                                </el-descriptions-item>
                                            </el-descriptions>
                                            <span>备注</span>
                                            <el-input type="textarea" v-model="orders.remark"></el-input>
                                            <br>
                                            <el-popover placement="left" width="300" trigger="click">
                                                <div v-for="item in user.address" :key="item.id">
                                                    <el-tag>Num : {{ item.number }}</el-tag><br>
                                                    <hr>
                                                    <span>收货人姓名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                        item.consigneeName }}</span><br>
                                                    <hr>
                                                    <span>电话号码:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                        item.consigneePhoneNumber }}</span><br>
                                                    <hr>
                                                    <span>收获地址:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                                        item.location }}</span>
                                                    <hr>
                                                    <br>

                                                    <el-button type="text"
                                                        @click="updateAddress(item.id, item.location, item.consigneeName, item.consigneePhoneNumber)">选择该地址</el-button>
                                                </div>
                                                <el-button slot="reference" type="text"
                                                    class="button">修改收货地址</el-button>
                                            </el-popover>
                                            <br>
                                            <hr>
                                            <br>
                                            <el-button type="primary" class="button"
                                                @click="confirmPurchase(id)">确认购买</el-button>
                                            <el-button type="text" class="button"
                                                @click="cancelPurchase">取消订单</el-button>
                                        </el-dialog>
                                        <el-button type="primary" class="button"
                                            @click="addShoppingCart">加入购物车</el-button>
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
import {
    createMarketProduces, queryAll, getByIdMarketProducesUser,
    createOrders, createOrdersDetails,
    updateUserOrders, getOrdersByIdUser, updateUserOrdersConfirm,
    updateUserOrdersCancel, queryProducesPlus, updateUserOrdersConfirmPlus
} from '@/api/marketProduces';

import { createShoppingCart, queryShoppingCart, deleteShoppingCart } from '@/api/shoppingCart'

import { queryCategory } from '@/api/charts';

import { mapState } from 'vuex';

export default {
    name: 'transMarket',
    components: {
        homeTop
    },
    computed: mapState([
        'user'
    ]),

    data() {

        return {

            //总价
            allPrice: '',
            //购物车
            shoppingCart: {
                id: '',
                userId: '',
                merchantName: '',
                marketProducesId: '',
                marketProducesName: '',
                marketProducesCategory: '',
                unitPrice: '',
                weight: '',
                image: '',
                amount: '',
                remark: '',
                createTime: '',
                updateTime: ''
            },

            emptyShow: false,

            shoppingCarts: [],

            dialogTableGoods: false,

            dialogTableVisible: false,

            dialogTableVisible1: false,

            dialogTableVisible2: false,

            dialogTableVisible3: false,

            weight: '',

            ske: true,

            loading: true,

            lists: [],

            //特价产品
            listsPlus: [],

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

            //订单
            orders: {
                id: '',
                orderNumber: '',
                userId: '',
                username: '',
                merchantId: '',
                merchantName: '',
                addressBookId: '',
                consigneeName: '',
                addressBookName: '',
                phoneNumber: '',
                status: '',
                completeTime: '',
                cancelTime: '',
                cancelReason: '',
                amount: '',
                remark: '',
                createTime: '',
                updateTime: '',
            },

            //订单明细
            ordersDetails: {
                id: '',
                ordersId: '',
                ordersNumber: '',
                produceName: '',
                image: '',
                produceCategory: '',
                produceWeight: '',
                unitPrice: '',
                createTime: '',
                updateTime: ''
            },

            //购物车多订单
            ordersShopping: [],

            //购物车多订单明细
            ordersDetailsShopping: [],

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

            name: '',
            username: '',
            order: '',
            orderKind: '1',

            id: '',

            address: {
                consigneeName: '',
                consigneePhoneNumber: '',
                location: ''
            },

            //倒计时
            minutes: 0,
            seconds: 0,
            timer: null,

            //倒计时plus1
            minutesPlus1: 0,
            secondsPlus1: 0,
            timerPlus1: null,

            i1: null,
        }
    },

    mounted() {

        queryProducesPlus().then(res => {
            this.listsPlus = res.data.list
            //开启订单确认倒计时
            const totalMilliseconds = res.data.date;
            if (res.data.date < 0) {
                this.initCountdownPlus1(60 * 1000);
            }
            this.initCountdownPlus1(totalMilliseconds);
            this.startCountdownPlus1();
        })

        this.getCategory()
        this.selectAll()
        this.queryShopping()

        if (this.user.address.length != null) {
            this.address = this.user.address[0]
        }

        const myChart = echarts.init(document.getElementById('main'));

        var categoryList = []

        var amountList = []



        var option = {
            title: {
                text: '农产品分类总销售额排名TOP10'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: categoryList
            },
            series: [
                {
                    name: '农产品分类总销售额排名TOP10',
                    type: 'bar',
                    data: amountList
                },
            ]
        };

        queryCategory().then(
            res => {
                for (const item of res.data.category) {
                    categoryList.push(item);
                }
                for (const item of res.data.amount) {
                    amountList.push(item);
                }
                // 更新图表选项中的数据
                option.yAxis.data = categoryList;
                option.series[0].data = amountList;
                myChart.setOption(option);
            }
        );

        //更新排名
        function update() {
            // 先清空数组
            categoryList = [];
            amountList = [];
            queryCategory().then(
                res => {
                    for (const item of res.data.category) {
                        categoryList.push(item);
                    }
                    for (const item of res.data.amount) {
                        amountList.push(item);
                    }
                    // 更新图表选项中的数据
                    option.yAxis.data = categoryList;
                    option.series[0].data = amountList;
                    myChart.setOption(option);
                }
            );
        }

        this.i1 = setInterval(function () {
            update();
        }, 10000);

        this.loading = false
    },

    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.timerPlus1) {
            clearInterval(this.timerPlus1);
        }
        if (this.i1) {
            clearInterval(this.i1);
        }
    },

    methods: {

        confirmPurchasePlus(id) {
            this.updateOrders.id = this.orders.id
            this.updateOrders.marketProducesId = id
            if (this.orders.remark != '' && this.orders != null) {
                this.updateOrders.remark = this.orders.remark
            }
            updateUserOrdersConfirmPlus(this.updateOrders).then(res => {

                if (res.code == 1) {
                    this.dialogTableVisible3 = false
                    queryProducesPlus().then(res => {
                        this.listsPlus = res.data.list;
                        // 开启订单确认倒计时
                        const totalMilliseconds = res.data.date;
                        this.initCountdownPlus1(totalMilliseconds);
                        this.isRequestPending = false;
                        this.startCountdownPlus1();
                    });

                    this.$message({
                        showClose: true,
                        message: '购买成功',
                        type: 'success'
                    });
                }
            })
        },

        //购买产品，生成订单及订单明细表
        purchasePlus() {
            if (this.user.address.length == 0) {
                this.$message({
                    showClose: true,
                    message: '您还未添加收货地址，请在个人中心添加后购买',
                    type: 'error'
                });
                return
            }
            this.dialogTableVisible3 = true

            const order = {
                userId: this.user.id,
                username: this.user.username,
                merchantName: this.marketProduces.username,
                merchantId: this.marketProduces.id
            }

            createOrders(order).then(res => {
                this.orders = res.data
                const orderDetails = {
                    produceName: this.marketProduces.name,
                    produceCategory: this.marketProduces.category,
                    unitPrice: this.marketProduces.unitPrice,
                    ordersId: res.data.id,
                    weight: this.weight
                }

                createOrdersDetails(orderDetails).then(res => {
                    this.ordersDetails = res.data
                })
            })

            //开启订单确认倒计时
            const totalMilliseconds = 900 * 1000;
            this.initCountdown(totalMilliseconds);
            this.startCountdown();
        },

        //初始化秒杀产品计时器
        initCountdownPlus1(totalMilliseconds) {
            this.minutesPlus1 = Math.floor(totalMilliseconds / (1000 * 60));
            const remainingAfterMinutes = totalMilliseconds % (1000 * 60);
            this.secondsPlus1 = Math.floor(remainingAfterMinutes / 1000);
        },

        //开启秒杀产品计时器
        startCountdownPlus1() {

            clearInterval(this.timerPlus1);
            const updateCountdown = () => {

                if (this.secondsPlus1 > 0) {
                    this.secondsPlus1--;
                } else {
                    if (this.minutesPlus1 > 0) {
                        this.minutesPlus1--;
                        this.secondsPlus1 = 59;
                    } else {

                        if (this.secondsPlus1 == 0) {
                            clearInterval(this.timerPlus1);
                            this.$notify({
                                title: '秒杀提醒',
                                message: '新一轮抢购开始',
                                type: 'success'
                            });
                            queryProducesPlus().then(res => {
                                this.listsPlus = res.data.list;
                                // 开启订单确认倒计时
                                const totalMilliseconds = res.data.date;
                                if (res.data.date == null || res.data.date < 0) {
                                    this.initCountdownPlus1(60 * 1000);
                                } else {
                                    this.initCountdownPlus1(totalMilliseconds);
                                }
                                this.isRequestPending = false;
                                this.startCountdownPlus1();
                            });
                        }
                    }
                }
            };

            this.timerPlus1 = setInterval(updateCountdown, 1000);
        },

        //初始化订单计时器
        initCountdown(totalMilliseconds) {
            this.minutes = Math.floor(totalMilliseconds / (1000 * 60));
            const remainingAfterMinutes = totalMilliseconds % (1000 * 60);
            this.seconds = Math.floor(remainingAfterMinutes / 1000);
        },

        //开启订单计时器
        startCountdown() {
            clearInterval(this.timer);
            const updateCountdown = () => {
                if (this.seconds > 0) {
                    this.seconds--;
                } else {
                    if (this.minutes > 0) {
                        this.minutes--;
                        this.seconds = 59;
                    } else {
                        clearInterval(this.timer);
                    }
                }
            };
            this.timer = setInterval(updateCountdown, 1000); // 每秒更新一次，与系统秒数更新频率一致
        },

        //购物车一键取消购买
        cancelPurchaseAll() {
            for (const item of this.ordersShopping) {
                this.updateOrders.id = item.id
                updateUserOrdersCancel(this.updateOrders).then(
                    res => {
                        if (res.code == 1) {
                            this.dialogTableVisible = false
                            this.dialogTableVisible1 = false

                        }
                    }
                )
            }
            this.dialogTableVisible2 = false;
            this.$message({
                showClose: true,
                message: '取消成功',
                type: 'success'
            });
        },

        //一键结算确认购买
        confirmPurchaseShoppings() {
            //遍历购物车订单列表批量修改订单状态
            //定义数组用来构造所需参数
            var params = []
            for (let i = 0; i < this.ordersShopping.length; i++) {

                let param = {
                    ordersId: '',
                    marketProducesId: '',
                    shoppingId: ''
                }
                param.ordersId = this.ordersShopping[i].id
                param.marketProducesId = this.shoppingCarts[i].marketProducesId
                param.shoppingId = this.shoppingCarts[i].id

                params.push(param)
            }

            for (const item of params) {

                const i = {
                    id: '',
                    addressBookId: '',
                    consigneeName: '',
                    consigneePhoneNumber: '',
                    addressBookName: '',
                    remark: '',
                    marketProducesId: ''
                }

                i.id = item.ordersId
                i.marketProducesId = item.marketProducesId

                updateUserOrdersConfirm(i).then(res => {
                    if (res.code == 1) {
                        this.selectAll()
                    }
                })
            }

            //清空购物车
            for (var i = 0; i < this.shoppingCarts.length; i++) {
                this.deleteShopping(this.shoppingCarts[i].id)
            }

            this.dialogTableVisible2 = false;
            this.ordersShopping = []
            this.ordersDetailsShopping = []
            this.$message({
                showClose: true,
                message: '购买成功',
                type: 'success'
            });

        },

        //一键结算
        purchaseAll() {

            if (this.user.address.length == 0) {
                this.$message({
                    showClose: true,
                    message: '您还未添加收货地址，请在个人中心添加后购买',
                    type: 'error'
                });
                return
            }

            this.ordersShopping = []
            this.ordersDetailsShopping = []
            this.dialogTableVisible2 = true
            this.allPrice = ''

            // 获取购物车中的所有数据
            if (this.shoppingCarts.length != 0) {
                // 遍历购物车数据，依次生成订单和订单明细
                for (const item of this.shoppingCarts) {

                    const order = {
                        userId: this.user.id,
                        username: this.user.username,
                        merchantName: item.merchantName,
                        merchantId: item.marketProducesId
                    };

                    createOrders(order).then(res => {
                        this.orders = res.data;
                        // 将生成的订单加入到购物车订单列表中
                        this.ordersShopping.push(this.orders)

                        const orderDetails = {
                            produceName: item.marketProducesName,
                            produceCategory: item.marketProducesCategory,
                            unitPrice: item.unitPrice,
                            ordersId: res.data.id,
                            weight: item.weight
                        };

                        createOrdersDetails(orderDetails).then(res => {
                            this.ordersDetails = res.data;
                            // 将订单明细加入购物车订单明细列表中
                            this.ordersDetailsShopping.push(this.ordersDetails)

                            this.allPrice = Number(this.allPrice) + Number(this.ordersDetails.amount)
                        });
                    });

                }

                //开启订单确认倒计时
                const totalMilliseconds = 900 * 1000;
                this.initCountdown(totalMilliseconds);
                this.startCountdown();

            } else {
                this.dialogTableVisible2 = false;
                this.$message({
                    type: 'info',
                    message: '购物车为空！无法结算'
                });
            }
        },

        //购物车购买
        shoppingCartPurchase(item) {
            if (this.user.address.length == 0) {
                this.$message({
                    showClose: true,
                    message: '您还未添加收货地址，请在个人中心添加后购买',
                    type: 'error'
                });
                return
            }

            //创建订单
            this.dialogTableVisible1 = true

            const order = {
                userId: this.user.id,
                username: this.user.username,
                merchantName: item.merchantName,
                merchantId: this.marketProduces.id
            }

            createOrders(order).then(res => {
                this.orders = res.data

                const orderDetails = {
                    produceName: item.marketProducesName,
                    produceCategory: item.marketProducesCategory,
                    unitPrice: item.unitPrice,
                    ordersId: res.data.id,
                    weight: item.weight
                }

                createOrdersDetails(orderDetails).then(res => {
                    this.ordersDetails = res.data
                })

                this.id = item.marketProducesId
            })

            //开启订单确认倒计时
            const totalMilliseconds = 900 * 1000;
            this.initCountdown(totalMilliseconds);
            this.startCountdown();
        },

        //购物车确认购买
        confirmPurchaseShopping(id, shoppingId) {
            this.updateOrders.id = this.orders.id
            this.updateOrders.marketProducesId = id
            if (this.orders.remark != '' && this.orders != null) {
                this.updateOrders.remark = this.orders.remark
            }
            updateUserOrdersConfirm(this.updateOrders).then(res => {
                if (res.code == 1) {
                    this.dialogTableVisible1 = false
                    this.selectAll()
                    //删除购物车数据
                    this.deleteShopping(shoppingId)

                    this.$message({
                        showClose: true,
                        message: '购买成功',
                        type: 'success'
                    });
                }
            })
        },

        //删除购物车数据
        deleteShopping(shoppingId) {
            deleteShoppingCart(shoppingId).then(res => {
                if (res.code == 1) {
                    //查询查询购物车
                    this.queryShopping()
                }
            })
        },

        //清空购物车
        deleteAllShopping() {
            if (this.shoppingCarts.length != 0) {

                this.$confirm('此操作将永久清空购物车, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i = 0; i < this.shoppingCarts.length; i++) {
                        this.deleteShopping(this.shoppingCarts[i].id)
                    }
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

            } else {
                this.$message({
                    type: 'info',
                    message: '购物车为空！无法清空'
                });
            }

        },

        open(id) {
            this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteShopping(id)

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

        //打开购物车
        openGoods() {
            this.dialogTableGoods = true
            this.queryShopping()
        },

        //查询用户购物车
        queryShopping() {
            //获取该用户的购物车数据
            queryShoppingCart(this.user.id).then(
                res => {
                    if (res) {
                        this.shoppingCarts = res.data
                        if (this.shoppingCarts.length == 0) {
                            this.emptyShow = true
                        } else {
                            this.emptyShow = false
                        }
                    } else {
                        //
                    }
                }
            )
        },

        //添加到购物车
        addShoppingCart() {
            console.log("添加到购物车");
            //构造参数
            this.shoppingCart.userId = this.user.id
            this.shoppingCart.merchantName = this.marketProduces.username
            this.shoppingCart.marketProducesId = this.marketProduces.id
            this.shoppingCart.marketProducesName = this.marketProduces.name
            this.shoppingCart.marketProducesCategory = this.marketProduces.category
            this.shoppingCart.unitPrice = this.marketProduces.unitPrice
            this.shoppingCart.weight = this.weight
            this.shoppingCart.image = this.marketProduces.image

            createShoppingCart(this.shoppingCart).then(
                response => {
                    //处理响应结果
                    if (response.code === 1) {
                        this.weight = 0.1
                        this.selectAll()
                        this.queryShopping()
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
        },

        //购买产品，生成订单及订单明细表
        purchase() {
            if (this.user.address.length == 0) {
                this.$message({
                    showClose: true,
                    message: '您还未添加收货地址，请在个人中心添加后购买',
                    type: 'error'
                });
                return
            }
            this.dialogTableVisible = true

            const order = {
                userId: this.user.id,
                username: this.user.username,
                merchantName: this.marketProduces.username,
                merchantId: this.marketProduces.id
            }

            createOrders(order).then(res => {
                this.orders = res.data
                const orderDetails = {
                    produceName: this.marketProduces.name,
                    produceCategory: this.marketProduces.category,
                    unitPrice: this.marketProduces.unitPrice,
                    ordersId: res.data.id,
                    weight: this.weight
                }

                createOrdersDetails(orderDetails).then(res => {
                    this.ordersDetails = res.data
                })
            })

            //开启订单确认倒计时
            const totalMilliseconds = 900 * 1000;
            this.initCountdown(totalMilliseconds);
            this.startCountdown();
        },

        //修改收货地址
        updateAddress(addressBookId, addressBookName, consigneeName, consigneePhoneNumber) {
            //准备数据
            this.updateOrders.id = this.orders.id
            this.updateOrders.addressBookId = addressBookId
            this.updateOrders.addressBookName = addressBookName
            this.updateOrders.consigneeName = consigneeName
            this.updateOrders.consigneePhoneNumber = consigneePhoneNumber

            updateUserOrders(this.updateOrders).then(res => {
                if (res.code == 1) {
                    this.getOrders(this.orders.id)
                    this.$message({
                        showClose: true,
                        message: '收货地址修改成功',
                        type: 'success'
                    });
                }
            })
        },

        //根据id查询订单
        getOrders(id) {
            getOrdersByIdUser(id).then(
                data => {
                    this.orders = data.data
                }
            )
        },

        //确认购买
        confirmPurchase(id) {
            this.updateOrders.id = this.orders.id
            this.updateOrders.marketProducesId = id
            if (this.orders.remark != '' && this.orders != null) {
                this.updateOrders.remark = this.orders.remark
            }
            updateUserOrdersConfirm(this.updateOrders).then(res => {
                if (res.code == 1) {
                    this.dialogTableVisible = false
                    this.selectAll()

                    this.$message({
                        showClose: true,
                        message: '购买成功',
                        type: 'success'
                    });
                }
            })
        },

        //取消购买
        cancelPurchase() {
            this.updateOrders.id = this.orders.id
            updateUserOrdersCancel(this.updateOrders).then(
                res => {
                    if (res.code == 1) {

                        if (this.dialogTableVisible == true) {
                            this.dialogTableVisible = false
                        }

                        if (this.dialogTableVisible1 == true) {
                            this.dialogTableVisible1 = false
                        }

                        if (this.dialogTableVisible3 == true) {
                            this.dialogTableVisible3 = false
                        }

                        this.$message({
                            showClose: true,
                            message: '取消成功',
                            type: 'success'
                        });
                    }
                }
            )
        },

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

        scrollToDiv(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },

        handleAvatarSuccess(res) {
            this.marketProduces.image = res.data;
        },

        //上传图片时校验
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }
    }
}
</script>

<style scoped>
.producesPlus {
    transition: all 1s ease;
}

.goods {
    font-size: 18px;
    background-color: aliceblue;
}

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