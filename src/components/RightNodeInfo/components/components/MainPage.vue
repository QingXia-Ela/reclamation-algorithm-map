<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header header-text">
                <div>
                    生息演算在线工具
                </div>
                <div style="display: flex;align-items: center;">
                    <a href="https://prts.wiki/w/%E6%B2%99%E6%B4%B2%E9%81%97%E9%97%BB#%E5%85%B3%E5%8D%A1%E4%B8%80%E8%A7%88"
                        style="color: white;margin-right: 20px;" target="_blank">
                        PRTS
                    </a>
                    <el-input class="search-box" v-model="search_input" placeholder="找点什么?">
                        <template #prepend>
                            <el-button icon="Search" />
                        </template>
                    </el-input>
                </div>
            </el-header>
            <el-container style="height: calc(100vh - 60px);">
                <el-aside width="200px" style="border-right: rgb(230 230 230) 1px solid;">
                    <div @click="isMap = true">
                        <div class="menu-item" style="display: flex;padding: 15px 20px;align-items: center;"
                            @click="show_res_list = !show_res_list">
                            <el-icon style="margin-right: 10px;">
                                <Picture />
                            </el-icon>
                            <div>地图查询</div>
                        </div>
                        <div style="display: flex;flex-direction: column;" v-if="show_res_list">
                            <div>
                                <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                    @click="wood_list = !wood_list">
                                    <img :src="wood_logo" class="menu-item-img">
                                    <div>木材</div>
                                </div>
                                <div class="menu-item" style="padding: 12px;" v-for="item in wood_level" :key="item.name"
                                    @click="test_map = item.src" v-if="wood_list">{{
                                        item.name }}</div>
                            </div>
                            <div>
                                <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                    @click="store_list = !store_list">
                                    <img :src="store_logo" class="menu-item-img">
                                    <div>石材</div>
                                </div>
                                <div class="menu-item" style="padding: 12px;" v-for="item in store_level" :key="item.name"
                                    @click="test_map = item.src" v-if="store_list">{{
                                        item.name }}</div>
                            </div>
                            <div>
                                <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                    @click="iron_list = !iron_list">
                                    <img :src="iron_logo" class="menu-item-img">
                                    <div>铁矿石</div>
                                </div>
                                <div class="menu-item" style="padding: 12px;" v-for="item in iron_level" :key="item.name"
                                    @click="test_map = item.src" v-if="iron_list">{{
                                        item.name }}</div>
                            </div>
                            <div>
                                <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                    @click="water_list = !water_list">
                                    <img :src="water_logo" class="menu-item-img">
                                    <div>水源</div>
                                </div>
                                <div class="menu-item" style="padding: 12px;" v-for="item in water_level" :key="item.name"
                                    @click="test_map = item.src" v-if="water_list">{{
                                        item.name }}</div>
                            </div>
                            <div>
                                <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                    @click="other_list = !other_list">
                                    <img :src="que_logo" class="menu-item-img">
                                    <div>其他</div>
                                </div>
                                <div class="menu-item" style="padding: 12px;" v-for="item in other_level" :key="item.name"
                                    @click="test_map = item.src" v-if="other_list">{{
                                        item.name }}</div>
                            </div>
                        </div>
                    </div>
                    <div @click="isMap = false">
                        <div class="menu-item" style="display: flex;padding: 15px 20px;align-items: center;"
                            @click="show_food_list = !show_food_list">
                            <el-icon style="margin-right: 10px;">
                                <DishDot />
                            </el-icon>
                            <div @click="selectedTag = ''">食物查询</div>
                        </div>
                        <div v-if="show_food_list">
                            <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                @click="selectedTag = '攻击力/攻击速度'">攻击力/攻击速度</div>
                            <div class="menu-item" style="display: flex;padding: 20px 20px;"
                                @click="selectedTag = '生命值/防御力'">生命值/防御力</div>
                            <div class="menu-item" style="display: flex;padding: 20px 20px;" @click="selectedTag = '再部署时间'">
                                再部署时间</div>
                            <div class="menu-item" style="display: flex;padding: 20px 20px;" @click="selectedTag = '技力消耗'">
                                技力消耗</div>
                            <div class="menu-item" style="display: flex;padding: 20px 20px;" @click="selectedTag = '其他'">其他
                            </div>
                        </div>
                    </div>
                    <!-- <el-menu :collapse="isCollapse">
                        <el-sub-menu index="1" @click="isMap = true">
                            <template #title>
                                <el-icon>
                                    <Picture />
                                </el-icon>
                                <div v-if="!isCollapse">地图查询</div>
                            </template>
                            <el-sub-menu index="1-1">
                                <template #title>
                                    <img :src="wood_logo" class="menu-item-img">
                                    <div>木材</div>
                                </template>
                                <el-menu-item v-for="item in wood_level" :key="item.name" @click="test_map = item.src"
                                    index="1-1-1">{{
                                        item.name }}</el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="1-2">
                                <template #title>
                                    <img :src="store_logo" class="menu-item-img">
                                    <div>石材</div>
                                </template>
                                <el-menu-item v-for="item in store_level" :key="item.name" @click="test_map = item.src"
                                    index="1-2-1">{{
                                        item.name }}</el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="1-3">
                                <template #title>
                                    <img :src="iron_logo" class="menu-item-img">
                                    <div>铁矿石</div>
                                </template>
                                <el-menu-item v-for="item in iron_level" :key="item.name" @click="test_map = item.src"
                                    index="1-3-1">{{
                                        item.name }}</el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="1-4">
                                <template #title>
                                    <img :src="water_logo" class="menu-item-img">
                                    <div>水源</div>
                                </template>
                                <el-menu-item v-for="item in water_level" :key="item.name" @click="test_map = item.src"
                                    index="1-4-1">{{
                                        item.name }}</el-menu-item>
                            </el-sub-menu>
                            <el-sub-menu index="1-5">
                                <template #title>
                                    <img :src="que_logo" class="menu-item-img">
                                    <div>其他</div>
                                </template>
                                <el-menu-item v-for="item in other_level" :key="item.name" @click="test_map = item.src">{{
                                    item.name }}</el-menu-item>
                            </el-sub-menu>
                        </el-sub-menu>
                        <el-sub-menu index="2" @click="isMap = false;">
                            <template #title>
                                <el-icon>
                                    <DishDot />
                                </el-icon>
                                <div v-if="!isCollapse" @click="selectedTag = ''">食物查询</div>
                            </template>
                            <el-menu-item index="2-1" @click="selectedTag = '攻击力/攻击速度'">攻击力/攻击速度</el-menu-item>
                            <el-menu-item index="2-2" @click="selectedTag = '生命值/防御力'">生命值/防御力</el-menu-item>
                            <el-menu-item index="2-3" @click="selectedTag = '再部署时间'">再部署时间</el-menu-item>
                            <el-menu-item index="2-4" @click="selectedTag = '技力消耗'">技力消耗</el-menu-item>
                            <el-menu-item index="2-5" @click="selectedTag = '其他'">其他</el-menu-item>
                        </el-sub-menu>
                        <el-button @click="ChangeMenuMode" class="el-btn">
                            <el-icon>
                                <Expand />
                            </el-icon>
                        </el-button>
                    </el-menu> -->
                </el-aside>
                <el-main>
                    <div v-if="isMap">
                        <el-image style="width: 75%; height: auto;margin: 0 auto;display: block !important;" :src="test_map"
                            :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="object" :initial-index="1"
                            fit="cover" />
                    </div>
                    <div v-if="!isMap" style="margin: 10px;font-size: 20px;">共计<span style="color: #000;">{{
                        filteredFoods.length }}</span>个</div>
                    <!--调味料-->
                    <div v-if="!isMap" style="display: flex;flex-direction: row;align-items: center;flex-wrap: wrap;">
                        <div v-for="i in Seasoning" :key="i.index"
                            style="display: flex;flex-direction: row;align-items: center;margin: 5px 10px;">
                            <div style="width: 30px;height: 30px;">
                                <img :src="i.seaimg" style="width: 100%;object-fit: cover;">
                            </div>
                            <div>{{ i.seaname }}：</div>
                            <div>{{ i.seades }}</div>
                        </div>
                    </div>
                    <div v-if="!isMap" style="display: flex;flex-wrap: wrap;">
                        <!--食物列表-->
                        <div class="food-item" v-for="i in filteredFoods">
                            <div class="food-img">
                                <img :src="i.foodimg" style="height:80px;">
                                <span style="margin-top: 10px;">{{ i.name }}</span>
                            </div>
                            <div style="width: 200px;display: flex;flex-direction: column;align-items: center;">
                                <div style="display: flex;align-items: center;" v-if="i.mat1 != null">
                                    <div class="food-icon-box">
                                        <img :src="i.mat1" class="food-icon">
                                        <span>{{ i.mat1name }}</span>
                                    </div>
                                    +
                                    <div class="food-icon-box">
                                        <img :src="i.mat2" class="food-icon">
                                        <span>{{ i.mat2name }}</span>
                                    </div>
                                    +
                                    <div class="food-icon-box">
                                        <img :src="i.mat3" class="food-icon">
                                        <span>{{ i.mat3name }}</span>
                                    </div>
                                </div>
                                <div style="display: flex;align-items: center;" v-if="i.mat4 != null">
                                    <div class="food-icon-box">
                                        <img :src="i.mat4" class="food-icon">
                                        <span>{{ i.mat4name }}</span>
                                    </div>
                                    +
                                    <div class="food-icon-box">
                                        <img :src="i.mat5" class="food-icon">
                                        <span>{{ i.mat5name }}</span>
                                    </div>
                                    +
                                    <div class="food-icon-box">
                                        <img :src="i.mat6" class="food-icon">
                                        <span>{{ i.mat6name }}</span>
                                    </div>
                                </div>
                                <div v-if="i.mat1 == null">
                                    没有配方！
                                </div>
                            </div>
                            <div v-html="i.des" style="margin-left: 10px;"></div>
                        </div>
                        <!-- <el-image style="width: 75%; height: auto;margin: 0 auto;display: block !important;"
                            v-for="(item, index) in food" :key="index" :src="item" :zoom-rate="1.2" :max-scale="7"
                            :min-scale="0.2" :preview-src-list="food" :initial-index="0" fit="cover" /> -->
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import wood_logo from '@/assets/imgs/resource/sandbox_1_wood.png'
import store_logo from '@/assets/imgs/resource/sandbox_1_stone.png'
import water_logo from '@/assets/imgs/resource/sandbox_1_water.png'
import iron_logo from '@/assets/imgs/resource/sandbox_1_iron.png'
import que_logo from '@/assets/imgs/resource/sandbox_1_goodsundry.png'
import egg from "@/assets/imgs/food/sandbox_1_egg.png"
import peper from '@/assets/imgs/food/sandbox_1_peper.png'
import sugar from '@/assets/imgs/food/sandbox_1_sugar.png'
import condiment from '@/assets/imgs/food/sandbox_1_condiment.png'
import mushroom from '@/assets/imgs/food/sandbox_1_mushroom.png'
import horn from '@/assets/imgs/food/sandbox_1_horn.png'
// import test_map from '@/assets/imgs/maps/sandbox_1_stage_mappreview_0/sandbox_1_21.png'
import { ref, computed, reactive } from 'vue'

import food_store from '../assets/js/food.js'
const test_map = ref('https://i0.hdslb.com/bfs/article/d695da39707b21eab0f44f481143281b251015631.png')
const object = computed(() => [test_map.value])

const show_res_list = ref(false)
const show_food_list = ref(false)

const wood_list = ref(false)
const store_list = ref(false)
const water_list = ref(false)
const iron_list = ref(false)
const other_list = ref(false)

const isMap = ref(true)
const isCollapse = ref(false)
const search_input = ref('')
const ChangeMenuMode = () => {
    isCollapse.value = !isCollapse.value
}

const wood_level = [
    {
        name: '丰饶灌木林',
        index: 1,
        src: 'https://i0.hdslb.com/bfs/article/d695da39707b21eab0f44f481143281b251015631.png'
    },
    {
        name: '乌胡米什',
        index: 2,
        src: 'https://i0.hdslb.com/bfs/article/97390bdbdff3d80bbcdb6fd8268a7978251015631.png'
    },
    {
        name: '伐木征税',
        index: 3,
        src: 'https://i0.hdslb.com/bfs/article/d51eede14ddb37a19db5071d746a3b1c251015631.png'
    },
    {
        name: '参差林木',
        index: 4,
        src: 'https://i0.hdslb.com/bfs/article/2b6246ddd6d30951de761858cdbc215d251015631.png'
    },
    {
        name: '固守险境',
        index: 5,
        src: 'https://i0.hdslb.com/bfs/article/f9a54fd425498474bf3cccc0ec2f610e251015631.png'
    },
    {
        name: '射程以内',
        index: 6,
        src: 'https://i0.hdslb.com/bfs/article/45f953531577470b77e00c86d0822844251015631.png'
    },
    {
        name: '峰回歧路',
        index: 7,
        src: 'https://i0.hdslb.com/bfs/article/b7abe1a3def9735bcbcd0f0727bb9a93251015631.png'
    },
    {
        name: '工具训练',
        index: 8,
        src: 'https://i0.hdslb.com/bfs/article/b1cfb625eb867eb894b3195bbebf05aa251015631.png'
    },
    {
        name: '布卢塔巴图',
        index: 9,
        src: 'https://i0.hdslb.com/bfs/article/67e2f3c245ab4c8672acdd9324610bef251015631.png'
    },
    {
        name: '林中寻宝',
        index: 10,
        src: 'https://i0.hdslb.com/bfs/article/5a0821b84493130ecc84673ede3d688e251015631.png'
    },
    {
        name: '树林之主',
        index: 11,
        src: 'https://i0.hdslb.com/bfs/article/c48bd5ff4a5c6ffbb2202b29bb9463dc251015631.png'
    },
    {
        name: '聚羽之地',
        index: 12,
        src: 'https://i0.hdslb.com/bfs/article/6a722fd397afb7e15029a8c68c9c9ec7251015631.png'
    },
    {
        name: '采掘训练',
        index: 13,
        src: 'https://i0.hdslb.com/bfs/article/68de086bef11f36fef6522ded0471489251015631.png'
    }
]
const store_level = [
    {
        name: '“金库”',
        index: 1,
        src: 'https://i0.hdslb.com/bfs/article/9e0af60bc674a431f0eef94ad6aa047c251015631.png'
    },
    {
        name: '别塔卜-阿帕卡里',
        index: 2,
        src: 'https://i0.hdslb.com/bfs/article/d077441d7bef42fc55543d0f2602d4f2251015631.png'
    },
    {
        name: '千仞关',
        index: 3,
        src: 'https://i0.hdslb.com/bfs/article/7ff05cb0e83ad3293b3ae9def6b5d33c251015631.png'
    },
    {
        name: '取舍',
        index: 4,
        src: 'https://i0.hdslb.com/bfs/article/f8a8025a288eb2cb85b5994510130f4e251015631.png'
    },
    {
        name: '守卫自然',
        index: 5,
        src: 'https://i0.hdslb.com/bfs/article/f53c2c44b330194aa7b2387772cfc3ac251015631.png'
    },
    {
        name: '峰回歧路',
        index: 6,
        src: 'https://i0.hdslb.com/bfs/article/b7abe1a3def9735bcbcd0f0727bb9a93251015631.png'
    },
    {
        name: '崎岖乱石岗',
        index: 7,
        src: 'https://i0.hdslb.com/bfs/article/2dac181df697219ef9279c3d910dd03d251015631.png'
    },
    {
        name: '矿牢爬行',
        index: 8,
        src: 'https://i0.hdslb.com/bfs/article/d96846a156c7b23f0d52961a50a98661251015631.png'
    },
    {
        name: '试验场',
        index: 9,
        src: 'https://i0.hdslb.com/bfs/article/61d6215d0e949199531adeaf5e4718d6251015631.png'
    },
    {
        name: '遗智还家',
        index: 10,
        src: 'https://i0.hdslb.com/bfs/article/31d25a2d3af00afb59377350c82eaa56251015631.png'
    },
    {
        name: '遭遇战',
        index: 11,
        src: 'https://i0.hdslb.com/bfs/article/56e7104eb0494a8a7c2069a11b8ded4a251015631.png'
    },
    {
        name: '那穆图巴辛',
        index: 12,
        src: 'https://i0.hdslb.com/bfs/article/03f20a0cdd1ee74e326a55fe13ab6087251015631.png'
    },
    {
        name: "部落之争",
        index: 13,
        src: 'https://i0.hdslb.com/bfs/article/6b5115d13b86bc366b93ec3714c3afc4251015631.png'
    }
]
const iron_level = [
    {
        name: '乱石岗',
        index: 1,
        src: 'https://i0.hdslb.com/bfs/article/f9239a9beec3a367c7b3783a2f62171a251015631.png'
    },
    {
        name: '别塔卜-阿帕卡里',
        index: 2,
        src: 'https://i0.hdslb.com/bfs/article/d077441d7bef42fc55543d0f2602d4f2251015631.png'
    },
    {
        name: '十字路口',
        index: 3,
        src: 'https://i0.hdslb.com/bfs/article/634f88e135fc95a51cfc1598cd066aa0251015631.png'
    },
    {
        name: '固守险境',
        index: 4,
        src: 'https://i0.hdslb.com/bfs/article/f9a54fd425498474bf3cccc0ec2f610e251015631.png'
    },
    {
        name: '峰回歧路',
        index: 5,
        src: 'https://i0.hdslb.com/bfs/article/b7abe1a3def9735bcbcd0f0727bb9a93251015631.png'
    },
    {
        name: '清泉之下',
        index: 6,
        src: 'https://i0.hdslb.com/bfs/article/f36b18f5bb0bb273f28b1b8536c48f10251015631.png'
    },
    {
        name: '炎岩关',
        index: 7,
        src: 'https://i0.hdslb.com/bfs/article/4f8a0368d7580da0060e4ba6f467911f251015631.png'
    },
    {
        name: '熔铁之心',
        index: 8,
        src: 'https://i0.hdslb.com/bfs/article/1120ad1c5bf4c4f3175f1585e64d9d10251015631.png'
    },
    {
        name: '矿牢爬行',
        index: 9,
        src: 'https://i0.hdslb.com/bfs/article/9cb9be4c243cd3be200d5a9c9b837aaa251015631.png'
    },
    {
        name: '矿脉守卫',
        index: 10,
        src: 'https://i0.hdslb.com/bfs/article/68bd986f1e07fc859b2889d9801786a7251015631.png'
    },
    {
        name: '翠影关',
        index: 11,
        src: 'https://i0.hdslb.com/bfs/article/9dab486093987ad2aee480a744423fad251015631.png'
    },
    {
        name: '藏宝湾',
        index: 12,
        src: 'https://i0.hdslb.com/bfs/article/350716207639dfe47bcb3cc6ab98d539251015631.png'
    },
    {
        name: '见证所',
        index: 13,
        src: 'https://i0.hdslb.com/bfs/article/0672b628d558ed7ba1ebda4684d043e3251015631.png'
    },
    {
        name: '部落之争',
        index: 14,
        src: 'https://i0.hdslb.com/bfs/article/6b5115d13b86bc366b93ec3714c3afc4251015631.png'
    }
]
const water_level = [
    {
        name: '乌胡米什',
        index: 1,
        src: 'https://i0.hdslb.com/bfs/article/97390bdbdff3d80bbcdb6fd8268a7978251015631.png@1256w_1196h_!web-article-pic.avif'
    },
    {
        name: '乱石岗',
        index: 2,
        src: 'https://i0.hdslb.com/bfs/article/f9239a9beec3a367c7b3783a2f62171a251015631.png@1256w_2120h_!web-article-pic.avif'
    },
    {
        name: '取舍',
        index: 3,
        src: 'https://i0.hdslb.com/bfs/article/f8a8025a288eb2cb85b5994510130f4e251015631.png@1256w_1966h_!web-article-pic.avif'
    },
    {
        name: '固守险境',
        index: 4,
        src: 'https://i0.hdslb.com/bfs/article/f9a54fd425498474bf3cccc0ec2f610e251015631.png@1256w_1390h_!web-article-pic.avif'
    },
    {
        name: '大迁徙',
        index: 5,
        src: 'https://i0.hdslb.com/bfs/article/22aa26e7e27f4c2ff3fb488947215bb7251015631.png@1256w_1186h_!web-article-pic.avif'
    },
    {
        name: '守卫自然',
        index: 6,
        src: 'https://i0.hdslb.com/bfs/article/f53c2c44b330194aa7b2387772cfc3ac251015631.png@1256w_1214h_!web-article-pic.avif'
    },
    {
        name: '射程以内',
        index: 7,
        src: 'https://i0.hdslb.com/bfs/article/45f953531577470b77e00c86d0822844251015631.png@1256w_1196h_!web-article-pic.avif'
    },
    {
        name: '岛中蟹穴',
        index: 8,
        src: 'https://i0.hdslb.com/bfs/article/4e991f5046af8bb92a02737e57234b19251015631.png@1256w_1616h_!web-article-pic.avif'
    },
    {
        name: '岩壳蟹群',
        index: 9,
        src: 'https://i0.hdslb.com/bfs/article/9ff948ff7720b9e79be38c6098d0ad45251015631.png@1256w_1226h_!web-article-pic.avif'
    },
    {
        name: '崎岖乱石岗',
        index: 10,
        src: 'https://i0.hdslb.com/bfs/article/2dac181df697219ef9279c3d910dd03d251015631.png@1256w_1302h_!web-article-pic.avif'
    },
    {
        name: '工具训练',
        index: 11,
        src: 'https://i0.hdslb.com/bfs/article/b1cfb625eb867eb894b3195bbebf05aa251015631.png@1256w_2752h_!web-article-pic.avif'
    },
    {
        name: '布卢塔巴图',
        index: 12,
        src: 'https://i0.hdslb.com/bfs/article/67e2f3c245ab4c8672acdd9324610bef251015631.png@1256w_1630h_!web-article-pic.avif'
    },
    {
        name: '方形竞技场',
        index: 13,
        src: 'https://i0.hdslb.com/bfs/article/b8225cb6acb811bf9f435f242c86d385251015631.png@1256w_1630h_!web-article-pic.avif'
    },
    {
        name: '林中寻宝',
        index: 14,
        src: 'https://i0.hdslb.com/bfs/article/5a0821b84493130ecc84673ede3d688e251015631.png@1256w_1250h_!web-article-pic.avif'
    },
    {
        name: '清泉之下',
        index: 15,
        src: 'https://i0.hdslb.com/bfs/article/f36b18f5bb0bb273f28b1b8536c48f10251015631.png@1256w_1390h_!web-article-pic.avif'
    },
    {
        name: '狩猎训练',
        index: 16,
        src: 'https://i0.hdslb.com/bfs/article/b656bd74e33e425c3276f44eec432619251015631.png@1256w_858h_!web-article-pic.avif'
    },
    {
        name: '直奔深渊',
        index: 17,
        src: 'https://i0.hdslb.com/bfs/article/9a9a4bcc68877f1188e1f7d02f4ff492251015631.png@1256w_1422h_!web-article-pic.avif'
    },
    {
        name: '矿牢爬行',
        index: 18,
        src: 'https://i0.hdslb.com/bfs/article/9cb9be4c243cd3be200d5a9c9b837aaa251015631.png@1256w_2038h_!web-article-pic.avif'
    },
    {
        name: '翠影关',
        index: 19,
        src: 'https://i0.hdslb.com/bfs/article/9dab486093987ad2aee480a744423fad251015631.png@1256w_1264h_!web-article-pic.avif'
    },
    {
        name: '藏宝湾',
        index: 20,
        src: 'https://i0.hdslb.com/bfs/article/350716207639dfe47bcb3cc6ab98d539251015631.png@1256w_1090h_!web-article-pic.avif'
    },
    {
        name: '见证所',
        index: 21,
        src: 'https://i0.hdslb.com/bfs/article/0672b628d558ed7ba1ebda4684d043e3251015631.png@1256w_1408h_!web-article-pic.avif'
    },
    {
        name: '迷失沼滩',
        index: 22,
        src: 'https://i0.hdslb.com/bfs/article/c4b4f0663093d9ccb7e86a01d7dc47ae251015631.png@1256w_1236h_!web-article-pic.avif'
    },
    {
        name: '饮水为饵',
        index: 23,
        src: 'https://i0.hdslb.com/bfs/article/b4fdbaac0cc83df5a549e45c38b4740f251015631.png@1256w_1408h_!web-article-pic.avif'
    },
    {
        name: '驯化',
        index: 24,
        src: 'https://i0.hdslb.com/bfs/article/73178896f3033478b547c2378e231959251015631.png@1256w_1332h_!web-article-pic.avif'
    }
]
const other_level = [
    {
        name: '“迎宾走廊”',
        index: 1,
        src: 'https://i0.hdslb.com/bfs/article/9357131a571f72bb8eb540e065544b4c251015631.png@1256w_1158h_!web-article-pic.avif'
    },
    {
        name: '不尽烈火',
        index: 2,
        src: 'https://i0.hdslb.com/bfs/article/8a0360631363fe2e96877be003f79f04251015631.png@1256w_1394h_!web-article-pic.avif'
    },
    {
        name: '不速之客',
        index: 3,
        src: 'https://i0.hdslb.com/bfs/article/968741560a5abc2665ce638bf1413b09251015631.png@1256w_908h_!web-article-pic.avif'
    },
    {
        name: '丢失的订单',
        index: 4,
        src: 'https://i0.hdslb.com/bfs/article/8d241410b6a18bb0d74bb307ea448409251015631.png@1256w_1068h_!web-article-pic.avif'
    },
    {
        name: '众人会聚之地',
        index: 5,
        src: 'https://i0.hdslb.com/bfs/article/bfce4de6d949a7d121c55a37838a3577251015631.png@1256w_876h_!web-article-pic.avif'
    },
    {
        name: '佣兵的所属',
        index: 6,
        src: 'https://i0.hdslb.com/bfs/article/3671b83ff799c4e64d71bc533131e226251015631.png@1256w_910h_!web-article-pic.avif'
    },
    {
        name: '前进营地',
        index: 7,
        src: 'https://i0.hdslb.com/bfs/article/ff40ec074cb3617ee1046e6760fc6390251015631.png@1256w_1110h_!web-article-pic.avif'
    },
    {
        name: '原始奔腾',
        index: 8,
        src: 'https://i0.hdslb.com/bfs/article/d18efd5f5d05a5a864d3801180e3ad50251015631.png@1256w_1268h_!web-article-pic.avif'
    },
    {
        name: '囚笼',
        index: 9,
        src: 'https://i0.hdslb.com/bfs/article/7cbf5d4cd56a3deedeaa6282022ba0cd251015631.png@1256w_1280h_!web-article-pic.avif'
    },
    {
        name: '大地病征',
        index: 10,
        src: 'https://i0.hdslb.com/bfs/article/e8df147dbc344a7470e08c4e25b15611251015631.png@1256w_1158h_!web-article-pic.avif'
    },
    {
        name: '失落的“长生军”',
        index: 11,
        src: 'https://i0.hdslb.com/bfs/article/78c26af67118236044555be53f6cd027251015631.png@1256w_1126h_!web-article-pic.avif'
    },
    {
        name: '失落的巨翼兽',
        index: 12,
        src: 'https://i0.hdslb.com/bfs/article/9eeb621ea0bf4c39669a92c09d3fcc15251015631.png@1256w_1096h_!web-article-pic.avif'
    },
    {
        name: '夺路而逃',
        index: 13,
        src: 'https://i0.hdslb.com/bfs/article/31fd9006f93bd620deb26b3bb1a891f9251015631.png@1256w_934h_!web-article-pic.avif'
    },
    {
        name: '宿命终结',
        index: 14,
        src: 'https://i0.hdslb.com/bfs/article/6ad711d8cc2005ba6c8d949ac2ff4599251015631.png@1256w_1528h_!web-article-pic.avif'
    },
    {
        name: '寻觅澄亮',
        index: 15,
        src: 'https://i0.hdslb.com/bfs/article/d07cf510d8ce40a57049513282fd4d86251015631.png@1256w_1336h_!web-article-pic.avif'
    },
    {
        name: '寻觅道路',
        index: 16,
        src: 'https://i0.hdslb.com/bfs/article/ecb8da4b121793fbcf12c61d8c4d086b251015631.png@1256w_1182h_!web-article-pic.avif'
    },
    {
        name: '峥嵘迎敌之处',
        index: 17,
        src: 'https://i0.hdslb.com/bfs/article/14c3020c9fa13944fdfb0d7de2bfe6b5251015631.png@1256w_1206h_!web-article-pic.avif'
    },
    {
        name: '崎岖窄路',
        index: 18,
        src: 'https://i0.hdslb.com/bfs/article/ace26c938876e962782ec884abea0df2251015631.png@1256w_1128h_!web-article-pic.avif'
    },
    {
        name: '广袤迎敌之处',
        index: 19,
        src: 'https://i0.hdslb.com/bfs/article/dd61dcff5b5fdd7cc901e168e8c2b24f251015631.png@1256w_1152h_!web-article-pic.avif'
    },
    {
        name: '征税的选择',
        index: 20,
        src: 'https://i0.hdslb.com/bfs/article/139f8ffc8f24ac42ba2d50fd8eefe242251015631.png@1256w_1126h_!web-article-pic.avif'
    },
    {
        name: '惊叫洞穴',
        index: 21,
        src: 'https://i0.hdslb.com/bfs/article/afb51b7f24e10a5a2f4961efca058ed4251015631.png@1256w_1560h_!web-article-pic.avif'
    },
    {
        name: '战争本能',
        index: 22,
        src: 'https://i0.hdslb.com/bfs/article/9746939c7562d798d402146ab6c05dbb251015631.png@1256w_1140h_!web-article-pic.avif'
    },
    {
        name: '战士的视野',
        index: 23,
        src: 'https://i0.hdslb.com/bfs/article/bf6458af4e22010bd44dd4e7c073a4da251015631.png@1256w_1280h_!web-article-pic.avif'
    },
    {
        name: '无形界限',
        index: 24,
        src: 'https://i0.hdslb.com/bfs/article/887e1302154144c434f431b8a40fc44d251015631.png@1256w_2136h_!web-article-pic.avif'
    },
    {
        name: '晶生玲珑',
        index: 25,
        src: 'https://i0.hdslb.com/bfs/article/f4f80940d0b6030c75f1c8c877bc0cfa251015631.png@1256w_1166h_!web-article-pic.avif'
    },
    {
        name: '浅草荒原',
        index: 26,
        src: 'https://i0.hdslb.com/bfs/article/90c6e20ad7e185be91f219fd159c2d79251015631.png@1256w_1368h_!web-article-pic.avif'
    },
    {
        name: '深岩裂谷',
        index: 27,
        src: 'https://i0.hdslb.com/bfs/article/9f8d05996dd14d2f74146d48791ae38b251015631.png@1256w_2100h_!web-article-pic.avif'
    },
    {
        name: '源石虫入侵',
        index: 28,
        src: 'https://i0.hdslb.com/bfs/article/441d81328c0749e6e21f052dd65213b4251015631.png@1256w_1158h_!web-article-pic.avif'
    },
    {
        name: '火圈狂舞',
        index: 29,
        src: 'https://i0.hdslb.com/bfs/article/63b6c899d12b47fddac3c30ccee8ce8a251015631.png@1256w_1832h_!web-article-pic.avif'
    },
    {
        name: '献祭之所',
        index: 30,
        src: 'https://i0.hdslb.com/bfs/article/6916d5e3bb6e85dc30fed59f5706b10b251015631.png@1256w_1606h_!web-article-pic.avif'
    },
    {
        name: '砾沙平原',
        index: 31,
        src: 'https://i0.hdslb.com/bfs/article/43827ee45e8170ca5e64e83825d6d368251015631.png@1256w_1092h_!web-article-pic.avif'
    },
    {
        name: '翠梦遗址',
        index: 32,
        src: 'https://i0.hdslb.com/bfs/article/2f0bf95564df892ccca69bfa8ba669c1251015631.png@1256w_1042h_!web-article-pic.avif'
    },
    {
        name: '苦难河床',
        index: 33,
        src: 'https://i0.hdslb.com/bfs/article/2d74c1bf5d218944ab2459814523c5bf251015631.png@1256w_1116h_!web-article-pic.avif'
    },
    {
        name: '荒弃迎敌之处',
        index: 34,
        src: 'https://i0.hdslb.com/bfs/article/f5e73b4ae0b8c677d5e5505a867e659e251015631.png@1256w_1298h_!web-article-pic.avif'
    },
    {
        name: '被限制的怒火',
        index: 35,
        src: 'https://i0.hdslb.com/bfs/article/4b8f0300d060d8ed499fd9f9ea6f579a251015631.png@1256w_1212h_!web-article-pic.avif'
    },
    {
        name: '风啸峡谷',
        index: 36,
        src: 'https://i0.hdslb.com/bfs/article/31f8c7266df444e7a91a67cad7e540f6251015631.png@1256w_1092h_!web-article-pic.avif'
    }
]

const Seasoning = [
    {
        seaname: '羽兽蛋',
        index: 1,
        seaimg: egg,
        seades: '攻击力+3%'
    },
    {
        seaname: '野红角',
        index: 2,
        seaimg: peper,
        seades: '生命值+3%'
    },
    {
        seaname: '魔甘草',
        index: 3,
        seaimg: sugar,
        seades: '攻击速度+3%'
    },
    {
        seaname: '木屑菌',
        index: 4,
        seaimg: mushroom,
        seades: '防御力+3%'
    },
    {
        seaname: '乳香腺',
        index: 5,
        seaimg: horn,
        seades: '法术抗性+3%'
    },
    {
        seaname: '调味料',
        index: 6,
        seaimg: condiment,
        seades: '一个:延长食物生效时间;两个:极大延长食物生效时间并增强食物效果'
    },
]

let selectedTag = ref(null);

let foodData = reactive(food_store);

let filteredFoods = computed(() => {
    if (!selectedTag.value) {
        return foodData; // 如果没有选定的标签，返回所有食物
    }
    // 如果有选定的标签，只返回与该标签匹配的食物
    return foodData.filter(food => food.tag.includes(selectedTag.value));
});
</script>

<style scoped>
.header-text {
    color: white;
    font-size: 20px;
    font-weight: bold;

}

.header {
    background-image: url("@/assets/imgs/resource/bg4998e9.jpg");
    background-position: center;
    background-size: cover;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-box {
    width: 200px;
    height: 40px;
}
@media screen and (width < 768px) {
    .search-box {
        width: 100px;
    }
    .search-box-icon{
        display: none;
    }
    
}
.menu-item:hover {
    background-color: rgba(215, 231, 237, 0.8);
}

.menu-item-img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-right: 5px;
    border-radius: 50%;
}

.el-menu.el-menu--vertical {
    height: 100% !important;
}

.el-btn {
    margin-top: 10px;
    position: sticky;
    bottom: 20px;
    left: 8px;
}

.food-icon {
    width: 40px;
    height: 40px;
    object-fit: fill;
}

.food-icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.food-img {
    width: 100px;
    height: 100%;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.food-item {
    box-shadow: 0px 0px 10px #0000003d;
    /* border: 1px solid #9c9c9c; */
    width: 500px;
    min-height: 130px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 3px;
    margin: 10px;
}
</style>