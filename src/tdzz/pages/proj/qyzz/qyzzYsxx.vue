<!--验收阶段基本信息-->
<template>
  <el-tag class="tlw-tag">单位：公顷、万元</el-tag>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ catalog }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    :rules="rules"
    ref="ysform"
    label-width="auto"
    :inline-message="true"
  >
    <div class="flow-form">
      <panel title="验收阶段基本信息">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item label="验收单位" prop="ys.ysdw">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.ysdw"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="验收文号" prop="ys.yswh" :rules="rules.yswh">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.yswh"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item label="验收日期" prop="ys.ysrq">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.ys.ysrq"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="项目验收编号"
              prop="ys.xmbh"
              :rules="rules.xmysbh"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xmbh"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item label="验收组长" prop="ys.yszz">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.yszz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="项目实际投资信息">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际项目总投资"
              prop="ys.tzZtz"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzZtz"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="中央支持资金"
              prop="ys.tzZyzczj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzZyzczj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="地方总投资"
              prop="ys.tzDfztj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzDfztj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="中央分配新增费用"
              prop="ys.tzZyfpXzf"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzZyfpXzf"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="地方留成新增费用"
              prop="ys.tzDflcxzf"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzDflcxzf"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="耕地开垦费用"
              prop="ys.tzGdKkf"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzGdKkf"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="自行补充耕地资金"
              prop="ys.tzZxbcgdzj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzZxbcgdzj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="用于农业土地开发的土地出让收入"
              prop="ys.tzCrj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzCrj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item label="土地复垦费" prop="ys.tzFkf" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzFkf"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="土地复垦义务人投资"
              prop="ys.tzFkywrtz"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzFkywrtz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item label="其他资金" prop="ys.tzQtzj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzQtzj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>

      <panel title="验收新增耕地">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新增耕地平均质量等别"
              prop="ys.xzgdPjzldb"
              :rules="rules.zldb"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdPjzldb"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新增产能指标"
              prop="ys.xzgdCnzb"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdCnzb"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际新增耕地中水田面积"
              prop="ys.xzgdStmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdStmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际可用于占补平衡水田面积"
              prop="ys.xzgdKyyzbphstmj"
              :rules="rules.num"
            >
              <el-input :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际新增耕地中水浇地面积"
              prop="ys.xzgdSjdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdSjdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际可用于占补平衡水浇地面积"
              prop="ys.xzgdKyyzbphsjdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdKyyzbphsjdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际新增耕地中旱地面积"
              prop="ys.xzgdHdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdHdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际可用于占补平衡旱地面积"
              prop="ys.xzgdKyyzbphhdmj"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzgdKyyzbphhdmj"
                :rules="rules.num"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="验收提质改造">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="提质改造面积"
              prop="ys.tzgzMj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzgzMj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="提质改造前平均质量等别"
              prop="ys.tzgzQpjdb"
              :rules="rules.zldb"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzgzQpjdb"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="改造为水田面积"
              prop="ys.tzgzStmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzgzStmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="提质改造后平均质量等别"
              prop="ys.tzgzHpjdb"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzgzHpjdb"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="改造为水浇地面积"
              prop="ys.tzgzSjdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzgzSjdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="提升产能指标"
              prop="ys.tzgzCnzb"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.tzgzCnzb"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="项目实际建设任务信息">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际建设总规模"
              prop="ys.jsgmZmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="整理规模"
              prop="ys.jsgmZlgm"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZlgm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="基本农田整理规模"
              prop="ys.jsgmJbntzlgm"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmJbntzlgm"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="复垦规模"
              prop="ys.jsgmFkgm"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmFkgm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="开发规模"
              prop="ys.jsgmKfgm"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmKfgm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际新增其他农用地面积"
              prop="ys.jsgmXzqtnyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmXzqtnyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="整治后耕地面积"
              prop="ys.jsgmZzhgdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZzhgdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="整治后建设用地所占面积"
              prop="ys.jsgmZzhjsydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZzhjsydmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="整治前建设用地所占面积"
              prop="ys.jsgmZzqjsydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZzqjsydmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际新增耕地面积"
              prop="ys.jsgmXzgdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZhgd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="实际可用于占补平衡面积"
              prop="ys.jsgmKyyzbphmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmKyyzbphmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="灾后恢复耕地面积"
              prop="ys.jsgmZhgd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZhgd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="减少建设用地而增加耕地面积"
              prop="ys.jsgmJsjsydzjgdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmJsjsydzjgdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="中央分配的新增费资金新增耕地面积"
              prop="ys.jsgmZyfpxzfxzgdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmZyfpxzfxzgdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="用于农业土地开发的土地出让收入新增耕地面积"
              prop="ys.jsgmCrjxzgd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmCrjxzgd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="地方留成新增费资金新增耕地面积"
              prop="ys.jsgmDflcxzfxzgd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmDflcxzfxzgd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="土地复垦义务人投资新增耕面积"
              prop="ys.jsgmFkywrtzxzgd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmFkywrtzxzgd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="土地复垦费新增耕地面积"
              prop="ys.jsgmTdfkxzgd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmTdfkxzgd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="其他资金新增耕地面积"
              prop="ys.jsgmQtzjxzgd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsgmQtzjxzgd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="项目工程量完成信息">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="土地平整面积"
              prop="ys.gclTdpz"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclTdpz"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="土方工程量"
              prop="ys.gclTfgcl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclTfgcl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="农田防护林工程量"
              prop="ys.gclNtfh"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclNtfh"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="泵站" prop="ys.gclBz" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclBz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item label="蓄水池" prop="ys.gclXsc" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclXsc"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="农用井" prop="ys.gclNyj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclNyj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="农用桥、涵"
              prop="ys.gclNyq"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclNyq"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="灌、排（渠）、管道"
              prop="ys.gclGd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclGd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="高压输配电线路"
              prop="ys.gclGyspdxl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclGyspdxl"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="低压输电线路"
              prop="ys.gclDyspdxl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclDyspdxl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="田间道路工程量"
              prop="ys.gclTjd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gclTjd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="项目实际成效信息">
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新增和改善农田灌溉面积"
              prop="ys.xzhgsntggmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzhgsntggmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新增和改善农田防涝面积"
              prop="ys.xzhgsntflmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzhgsntflmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新增和改善节水灌溉面积"
              prop="ys.xzhgsjsggmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzhgsjsggmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="水土流失治理面积"
              prop="ys.stlszlmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.stlszlmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="废弃居民点复垦面积"
              prop="ys.fqjmdfkmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.fqjmdfkmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="工矿废弃地复垦面积"
              prop="ys.gkfqdfkmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.gkfqdfkmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="项目区建设前耕地平均质量等级"
              prop="ys.jsqgdpjzldj"
              :rules="rules.zldb"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsqgdpjzldj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="项目区建设后耕地平均质量等级"
              prop="ys.jshgdpjzldj"
              :rules="rules.zldb"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jshgdpjzldj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新增粮食产能"
              prop="ys.xzlscn"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xzlscn"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="农民年人均新增纯收入"
              prop="ys.nmnrjxzcsl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.nmnrjxzcsl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="迁村并点减少的村庄数量"
              prop="ys.jsczsl"
              :rules="rules.intNum"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.jsczsl"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="新建和改建中心村数量"
              prop="ys.zjhgjzxcsl"
              :rules="rules.intNum"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.zjhgjzxcsl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="项目区受益人数"
              prop="ys.xmqsyrs"
              :rules="rules.intNum"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.xmqsyrs"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="土地整治权属管理信息">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item label="权属调整类型" prop="ys.qsglLx">
              <el-radio
                :disabled="disabled"
                v-model="entity.ys.qsglLx"
                label="农村集体土地所有权"
                >农村集体土地所有权</el-radio
              >
              <el-radio
                :disabled="disabled"
                v-model="entity.ys.qsglLx"
                label="土地承包经营权"
                >土地承包经营权</el-radio
              >
              <el-radio
                :disabled="disabled"
                v-model="entity.ys.qsglLx"
                label="建设用地使用权"
                >建设用地使用权(不包括宅基地)</el-radio
              >
              <el-radio
                :disabled="disabled"
                v-model="entity.ys.qsglLx"
                label="宅基地使用权"
                >宅基地使用权</el-radio
              >
              <el-radio
                :disabled="disabled"
                v-model="entity.ys.qsglLx"
                label="土地他项权利"
                >土地他项权利</el-radio
              >
              <el-radio
                :disabled="disabled"
                v-model="entity.ys.qsglLx"
                label="国有土地所有权"
                >国有土地所有权</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="权属调整涉及的土地面积"
              prop="ys.qsglTdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglTdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="权属调整涉及的总面积"
              prop="ys.qsglZmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglZmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="权属调整涉及的土地所有权总面积"
              prop="ys.qsglSuoyqzmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglSuoyqzmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="权属调整涉及的土地使用权总面积"
              prop="ys.qsglSyqzmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglSyqzmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="权属调整涉及的土地比例"
              prop="ys.qsglTdbl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglTdbl"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="土地权属调整比例"
              prop="ys.qsglTzbl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglTzbl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="整治前田块数量"
              prop="ys.qsglZzqtksl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglZzqtksl"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="整治后田块数量"
              prop="ys.qsglZzhtksl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglZzhtksl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="2">
            <el-form-item
              label="田块归并度"
              prop="ys.qsglGbd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglGbd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-form-item label="权属调整实施主体" prop="ys.qsglSszt">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.qsglSszt"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
    </div>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzYs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-qyzz-ys";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
//1. 定义数据

const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: { flowinstid: params.flowinstid },
    ys: { flowinstid: params.flowinstid },
  },
  rules: getRules(),
});
const { businessName, catalog, disabled, entity, rules } = toRefs(data);
const ysform = ref(null);
//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  init(data.flowinstid).then((res) => {
    data.entity = res.data;
  });
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await ysform.value.validate((valid) => {
    flag = valid;
    //2. 自己的逻辑代码
    if (flag) {
      flag = checkValidate(data);
    }
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  data.entity.ys.flowinstid = data.flowinstid;
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity.ys)
      .then((res) => {
        data.entity.ys = res.data;
      })
      .catch((res) => {
        flag = false;
      });
  }
  return flag;
};

//3.入口
onMounted(() => {
  //1.获取详情
  F_init();
  //2.定义监听事件
  bus.on("qyzz_ysxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("qyzz_ysxx_save");
});
</script>



