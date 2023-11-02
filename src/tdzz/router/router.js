const tdzzRouter = [
    //土地整治主页
    {
        path: '/tdzz_main',
        name: 'tdzz_main',
        component: () => import('@/tdzz/pages/main/main.vue'),
        meta: { keepAlive: true },
        children: [
            //首页
            {
                path: '/tdzz_home',
                name: 'tdzz_home',
                component: () => import('@/tdzz/pages/home/home.vue'),
            },
            //项目管理
            {
                path: '/tdzz_xmgl',
                name: 'tdzz_xmgl',
                component: () => import('@/tdzz/pages/workflow/workflow_main.vue'),
                children: [
                    {
                        path: '/tdzz_xmlr',
                        name: 'tdzz_xmlr',
                        component: () => import('@/tdzz/pages/workflow/xmlr/xmlr.vue'),
                    },
                    {
                        path: '/tdzz_xmlr_pcList',
                        name: 'tdzz_xmlr_pcList',
                        component: () => import('@/tdzz/pages/workflow/xmlr/xmlr_pcList.vue'),
                    },
                    {
                        path: '/tdzz_pclr',
                        name: 'tdzz_pclr',
                        component: () => import('@/tdzz/pages/workflow/pclr/pclr.vue'),
                    },
                    {
                        path: '/tdzz_pclr_pcList',
                        name: 'tdzz_pclr_pcList',
                        component: () => import('@/tdzz/pages/workflow/pclr/pclr_pcList.vue'),
                    },
                    {
                        path: '/tdzz_daiban',
                        name: 'tdzz_daiban',
                        component: () => import('@/tdzz/pages/workflow/daiban.vue'),
                    },
                    {
                        path: '/tdzz_yiban',
                        name: 'tdzz_yiban',
                        component: () => import('@/tdzz/pages/workflow/yiban.vue'),
                    },
                    {
                        path: '/tdzz_banjie',
                        name: 'tdzz_banjie',
                        component: () => import('@/tdzz/pages/workflow/banjie.vue'),
                    },
                ],
            },
            //预警监测
            {
                path: '/tdzz_yjjc',
                name: 'tdzz_yjjc',
                component: () => import('@/tdzz/pages/yjjc/yjjc_main.vue'),
                children: [
                    //------------------------监测----------------------------//
                    {
                        path: '/gdlcjc',
                        name: 'gdlcjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/gdlc/gdlcjc.vue'),
                    },
                    {
                        path: '/gdlrjc',
                        name: 'gdlrjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/gdlr/gdlrjc.vue'),
                    },
                    {
                        path: '/ynlcjc',
                        name: 'ynlcjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/ynlc/ynlcjc.vue'),
                    },
                    {
                        path: '/ynlrjc',
                        name: 'ynlrjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/ynlr/ynlrjc.vue'),
                    },
                    {
                        path: '/gdhbzyjc',
                        name: 'gdhbzyjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/gdhbzy/gdhbzyjc.vue'),
                    },
                    {
                        path: '/gdzldbjc',
                        name: 'gdzldbjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/gdzldb/gdzldbjc.vue'),
                    },
                    {
                        path: '/tdzzxmjc',
                        name: 'tdzzxmjc',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_monitor/tzxm/tdzzxmjc.vue'),
                    },
                    //------------------------预警----------------------------//
                    {
                        path: '/tdzzxmyj',
                        name: 'tdzzxmyj',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_warning/tdzzxmyj.vue'),
                    },
                    {
                        path: '/gdlcyj',
                        name: 'gdlcyj',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_warning/gdlcyj.vue'),
                    },
                    {
                        path: '/ynlcyj',
                        name: 'ynlcyj',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_warning/ynlcyj.vue'),
                    },
                    {
                        path: '/sswclyj',
                        name: 'sswclyj',
                        component: () => import('@/tdzz/pages/yjjc/tdzz_warning/sswclyj.vue'),
                    },
                    //------------------------系统维护----------------------------//
                    {
                        path: '/yzsz',
                        name: 'yzsz',
                        component: () => import('@/tdzz/pages/yjjc/yjjc_xtwh/yzsz.vue'),
                    },
                    {
                        path: '/ghrlr',
                        name: 'ghrlr',
                        component: () => import('@/tdzz/pages/yjjc/yjjc_xtwh/ghrlrList.vue'),
                    },
                    {
                        path: '/lnylr',
                        name: 'lnylr',
                        component: () => import('@/tdzz/pages/yjjc/yjjc_xtwh/lnylrList.vue'),
                    },
                ]
            },
            //指标管理
            {
                path: '/tdzz_zbgl',
                name: 'tdzz_zbgl',
                component: () => import('@/tdzz/pages/zbgl/zbgl_main.vue'),
                children: [
                    //------------------------指标库----------------------------//
                    {
                        path: '/zbk_syqk',
                        name: 'zbk_syqk',
                        component: () => import('@/tdzz/pages/zbgl/zbk/zbk_syqk.vue'),
                    },
                    {
                        path: '/zbk_zbmx',
                        name: 'zbk_zbmx',
                        component: () => import('@/tdzz/pages/zbgl/zbk/zbk_zbmx.vue'),
                    },
                    {
                        path: '/zbk_lszbmx',
                        name: 'zbk_lszbmx',
                        component: () => import('@/tdzz/pages/zbgl/zbk/zbk_lszbmx.vue'),
                    },
                    {
                        path: '/zbk_zbkdzd',
                        name: 'zbk_zbkdzd',
                        component: () => import('@/tdzz/pages/zbgl/zbk/zbk_zbkdzd.vue'),
                    },
                    {
                        path: '/zbk_lszbkdzd',
                        name: 'zbk_lszbkdzd',
                        component: () => import('@/tdzz/pages/zbgl/zbk/zbk_lszbkdzd.vue'),
                    },
                    {
                        path: '/zbk_zbkkysyqk',
                        name: 'zbk_zbkkysyqk',
                        component: () => import('@/tdzz/pages/zbgl/zbk/zbk_zbkkysyqk.vue'),
                    },

                    //------------------------指标使用----------------------------//
                    //使用
                    {
                        path: '/zbsy_sytz',
                        name: 'zbsy_sytz',
                        component: () => import('@/tdzz/pages/zbgl/zbsy/zbsy_sytz.vue'),
                    },
                    //补充耕地指标使用情况
                    {
                        path: '/zbsy_bcgdzbsyqk',
                        name: 'zbsy_bcgdzbsyqk',
                        component: () => import('@/tdzz/pages/zbgl/zbsy/zbsy_bcgdzbsyqk.vue'),
                    },
                    //建设项目挂钩指标明细
                    {
                        path: '/zbsy_jsxmggzbmx',
                        name: 'zbsy_jsxmggzbmx',
                        component: () => import('@/tdzz/pages/zbgl/zbsy/zbsy_jsxmggzbmx.vue'),
                    },



                    //------------------------指标调剂----------------------------//
                    //指标还原
                    {
                        path: '/zbtj_zbhy',
                        name: 'zbtj_zbhy',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_zbhy.vue'),
                    },
                    //指标划转
                    {
                        path: '/zbtj_zbhz',
                        name: 'zbtj_zbhz',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_zbhz.vue'),
                    },
                    //指标调整
                    {
                        path: '/zbtj_zbtz',
                        name: 'zbtj_zbtz',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_zbtz.vue'),
                    },
                    //本级指标调剂
                    {
                        path: '/zbtj_bjzbtj',
                        name: 'zbtj_bjzbtj',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_bjzbtj.vue'),
                    },
                    //指标冻结
                    {
                        path: '/zbtj_zbdj',
                        name: 'zbtj_zbdj',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_zbdj.vue'),
                    },
                    //借用指标
                    {
                        path: '/zbtj_jyzb',
                        name: 'zbtj_jyzb',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_jyzb.vue'),
                    },
                    //归还指标
                    {
                        path: '/zbtj_ghzb',
                        name: 'zbtj_ghzb',
                        component: () => import('@/tdzz/pages/zbgl/zbtj/zbtj_ghzb.vue'),
                    },
                ]
            },
            //办件查询
            {
                path: '/tdzz_xtcx',
                name: 'tdzz_xtcx',
                component: () => import('@/tdzz/pages/xtcx/xtcx_main.vue'),
                children: [
                    {
                        path: '/tdzz_xmcx',
                        name: 'tdzz_xmcx',
                        component: () => import('@/tdzz/pages/xtcx/xmcx/xmcx.vue'),
                    },
                    {
                        path: '/tjcx_zbph',
                        name: 'tjcx_zbph',
                        component: () => import('@/tdzz/pages/xtcx/tjcx/tjcx_zbph.vue'),
                    },
                    {
                        path: '/tjcx_hgs',
                        name: 'tjcx_hgs',
                        component: () => import('@/tdzz/pages/xtcx/tjcx/tjcx_hgs.vue'),
                    },
                    {
                        path: '/tjcx_zjgg',
                        name: 'tjcx_zjgg',
                        component: () => import('@/tdzz/pages/xtcx/tjcx/tjcx_zjgg.vue'),
                    },
                    {
                        path: '/tjcx_gkfqd',
                        name: 'tjcx_gkfqd',
                        component: () => import('@/tdzz/pages/xtcx/tjcx/tjcx_gkfqd.vue'),
                    }
                ]
            },
            //图形查看
            {
                path: '/tdzz_txsc',
                name: 'tdzz_txsc',
                component: () => import('@/tdzz/pages/txck/txsc.vue'),
            },
            //系统管理
            {
                path: '/tdzz_xtgl',
                name: 'tdzz_xtgl',
                component: () => import('@/tdzz/pages/xtgl/xtgl_main.vue'),
                children: [
                    {
                        path: '/tdzz_yhgl',
                        name: 'tdzz_yhgl',
                        component: () => import('@/tdzz/pages/xtgl/tdzz_yhgl.vue'),
                    },
                    {
                        path: '/tdzz_yzsz',
                        name: 'tdzz_yzsz',
                        component: () => import('@/tdzz/pages/xtgl/tdzz_yzsz.vue'),
                    },
                    {
                        path: '/tdzz_lydl',
                        name: 'tdzz_lydl',
                        component: () => import('@/tdzz/pages/xtgl/tdzz_lydl/tdzz_lydl.vue'),
                    },
                    {
                        path: '/tdzz_xmyj',
                        name: 'tdzz_xmyj',
                        component: () => import('@/tdzz/pages/xtgl/tdzz_xmyj/tdzz_xmyj.vue'),
                    },
                ]
            },
        ]
    },
    //预警监测流程办理主页
    {
        path: '/yjjc_runtime_main',
        name: 'yjjc_runtime_main',
        component: () => import('@/tdzz/pages/yjjc/runtime/runtime_main.vue'),
        children: [
            //------------------------项目列表----------------------------//
            {
                path: '/gdlcJbxx',
                name: 'gdlcJbxx',
                component: () => import('@/tdzz/pages/yjjc/runtime/gdlcJbxx.vue'),
            },
            {
                path: '/yjjbntJbxx',
                name: 'yjjbntJbxx',
                component: () => import('@/tdzz/pages/yjjc/runtime/yjjbntJbxx.vue'),
            },
            {
                path: '/tdzzxmJbxx',
                name: 'tdzzxmJbxx',
                component: () => import('@/tdzz/pages/yjjc/runtime/tdzzxmJbxx.vue'),
            },
            {
                path: '/zpList',
                name: 'zpList',
                component: () => import('@/tdzz/pages/yjjc/runtime/zpList.vue'),
            },
            {
                path: '/zpDetail',
                name: 'zpDetail',
                component: () => import('@/tdzz/pages/yjjc/runtime/zpDetail.vue'),
            },
            {
                path: '/tbfjList',
                name: 'tbfjList',
                component: () => import('@/tdzz/pages/yjjc/runtime/fjList.vue'),
            },
        ]
    },
    //土地整治流程办理主页
    {
        path: '/tdzz_runtime_main',
        name: 'tdzz_runtime_main',
        component: () => import('@/tdzz/pages/workflow/runtime/runtime_main.vue'),
        children: [
            //------------------------项目列表----------------------------//
            {
                path: '/xmList',
                name: 'xmList',
                component: () => import('@/tdzz/pages/workflow/runtime/xmList.vue'),
            },
            //------------------------土地整治项目----------------------------//
            //占卜平衡立项信息
            {
                path: '/zbph_lxxx',
                name: 'zbph_lxxx',
                component: () => import('@/tdzz/pages/proj/tdxm/zbphLxxx.vue'),
            },
            //占卜平衡实施信息
            {
                path: '/zbph_ssxx',
                name: 'zbph_ssxx',
                component: () => import('@/tdzz/pages/proj/tdxm/zbphSsxx.vue'),
            },
            //占卜平衡验收信息
            {
                path: '/zbph_ysxx',
                name: 'zbph_ysxx',
                component: () => import('@/tdzz/pages/proj/tdxm/zbphYsxx.vue'),
            },
            //旱改水立项信息
            {
                path: '/hgs_lxxx',
                name: 'hgs_lxxx',
                component: () => import('@/tdzz/pages/proj/tdxm/hgsLxxx.vue'),
            },
            //旱改水实施信息
            {
                path: '/hgs_ssxx',
                name: 'hgs_ssxx',
                component: () => import('@/tdzz/pages/proj/tdxm/hgsSsxx.vue'),
            },
            //旱改水立项信息
            {
                path: '/hgs_ysxx',
                name: 'hgs_ysxx',
                component: () => import('@/tdzz/pages/proj/tdxm/hgsYsxx.vue'),
            },
            //城乡建设立项信息
            {
                path: '/zjgg_lxxx',
                name: 'zjgg_lxxx',
                component: () => import('@/tdzz/pages/proj/tdxm/zjggLxxx.vue'),
            },
            //城乡建设实施信息
            {
                path: '/zjgg_ssxx',
                name: 'zjgg_ssxx',
                component: () => import('@/tdzz/pages/proj/tdxm/zjggSsxx.vue'),
            },
            //城乡建设验收信息
            {
                path: '/zjgg_ysxx',
                name: 'zjgg_ysxx',
                component: () => import('@/tdzz/pages/proj/tdxm/zjggYsxx.vue'),
            },
            //工矿废弃地复垦立项信息
            {
                path: '/gkfqd_lxxx',
                name: 'gkfqd_lxxx',
                component: () => import('@/tdzz/pages/proj/tdxm/gkfqdLxxx.vue'),
            },
            //工矿废弃地复垦实施信息
            {
                path: '/gkfqd_ssxx',
                name: 'gkfqd_ssxx',
                component: () => import('@/tdzz/pages/proj/tdxm/gkfqdSsxx.vue'),
            },
            //工矿废弃地复垦验收信息
            {
                path: '/gkfqd_ysxx',
                name: 'gkfqd_ysxx',
                component: () => import('@/tdzz/pages/proj/tdxm/gkfqdYsxx.vue'),
            },
            //------------------------进出平衡项目----------------------------//
            //进出平衡立项信息
            {
                path: '/jcph_lxxx',
                name: 'jcph_lxxx',
                component: () => import('@/tdzz/pages/proj/jcph/jcphLxxx.vue'),
            },
            //进出平衡实施信息
            {
                path: '/jcph_ssxx',
                name: 'jcph_ssxx',
                component: () => import('@/tdzz/pages/proj/jcph/jcphSsxx.vue'),
            },
            //进出平衡验收信息
            {
                path: '/jcph_ysxx',
                name: 'jcph_ysxx',
                component: () => import('@/tdzz/pages/proj/jcph/jcphYsxx.vue'),
            },
            //------------------------生态保护项目----------------------------//
            //生态保护修复立项信息
            {
                path: '/stbh_lxxx',
                name: 'stbh_lxxx',
                component: () => import('@/tdzz/pages/proj/stbh/stbhLxxx.vue'),
            },
            //生态保护修复实施信息
            {
                path: '/stbh_ssxx',
                name: 'stbh_ssxx',
                component: () => import('@/tdzz/pages/proj/stbh/stbhSsxx.vue'),
            },
            //生态保护修复验收信息
            {
                path: '/stbh_ysxx',
                name: 'stbh_ysxx',
                component: () => import('@/tdzz/pages/proj/stbh/stbhYsxx.vue'),
            },
            //------------------------生态修复项目----------------------------//
            //矿山生态修复立项信息
            {
                path: '/ksxf_lxxx',
                name: 'ksxf_lxxx',
                component: () => import('@/tdzz/pages/proj/stxf/ksxfLxxx.vue'),
            },
            //矿山生态修复实施信息
            {
                path: '/ksxf_ssxx',
                name: 'ksxf_ssxx',
                component: () => import('@/tdzz/pages/proj/stxf/ksxfSsxx.vue'),
            },
            //矿山生态修复验收信息
            {
                path: '/ksxf_ysxx',
                name: 'ksxf_ysxx',
                component: () => import('@/tdzz/pages/proj/stxf/ksxfYsxx.vue'),
            },
            //山水林田湖草和生态修复立项信息
            {
                path: '/sslt_lxxx',
                name: 'sslt_lxxx',
                component: () => import('@/tdzz/pages/proj/stxf/ssltLxxx.vue'),
            },
            //山水林田湖草和生态修复实施信息
            {
                path: '/sslt_ssxx',
                name: 'sslt_ssxx',
                component: () => import('@/tdzz/pages/proj/stxf/ssltSsxx.vue'),
            },
            //山水林田湖草和生态修复验收信息
            {
                path: '/sslt_ysxx',
                name: 'sslt_ysxx',
                component: () => import('@/tdzz/pages/proj/stxf/ssltYsxx.vue'),
            },
            //------------------------全域整治项目----------------------------//
            //市级国土空间全域综合整治申报信息
            {
                path: '/qyzz_sbxx',
                name: 'qyzz_sbxx',
                component: () => import('@/tdzz/pages/proj/qyzz/qyzzSbxx.vue'),
            },
            //市级国土空间全域综合整治立项信息
            {
                path: '/qyzz_lxxx',
                name: 'qyzz_lxxx',
                component: () => import('@/tdzz/pages/proj/qyzz/qyzzLxxx.vue'),
            },
            //市级国土空间全域综合整治实施信息
            {
                path: '/qyzz_ssxx',
                name: 'qyzz_ssxx',
                component: () => import('@/tdzz/pages/proj/qyzz/qyzzSsxx.vue'),
            },
            //市级国土空间全域综合整治验收信息
            {
                path: '/qyzz_ysxx',
                name: 'qyzz_ysxx',
                component: () => import('@/tdzz/pages/proj/qyzz/qyzzYsxx.vue'),
            },

            //------------------------后期管护----------------------------//
            {
                path: '/tdzz_hqgh',
                name: 'tdzz_hqgh',
                component: () => import('@/tdzz/pages/proj/hqgh/hqgh.vue'),
            },

            //------------------------审批意见----------------------------//
            {
                path: '/spyjList',
                name: 'spyjList',
                component: () => import('@/tdzz/pages/spyj/spyjList.vue'),
            },
            {
                path: '/spyjListpc',
                name: 'spyjListpc',
                component: () => import('@/tdzz/pages/spyj/spyjListpc.vue'),
            },
            //------------------------坐标----------------------------//
            {
                path: '/xmzbList',
                name: 'xmzbList',
                component: () => import('@/tdzz/pages/plot/xmzbList.vue'),
            },
            //------------------------项目转入坐标----------------------------//
            {
                path: '/xmzrzbList',
                name: 'xmzrzbList',
                component: () => import('@/tdzz/pages/plot/xmzrzbList.vue'),
            },
            //------------------------项目转出坐标----------------------------//
            {
                path: '/xmzczbList',
                name: 'xmzczbList',
                component: () => import('@/tdzz/pages/plot/xmzczbList.vue'),
            },
            //------------------------高标准坐标--------------------------//
            {
                path: '/gbzzbList',
                name: 'gbzzbList',
                component: () => import('@/tdzz/pages/plot/gbzzbList.vue'),
            },
            //------------------------农用地坐标--------------------------//
            {
                path: '/nydzbList',
                name: 'nydzbList',
                component: () => import('@/tdzz/pages/plot/nydzbList.vue'),
            },
            //------------------------耕地坐标----------------------------//
            {
                path: '/gdzbList',
                name: 'gdzbList',
                component: () => import('@/tdzz/pages/plot/gdzbList.vue'),
            },
            //------------------------耕地转入坐标----------------------------//
            {
                path: '/gdzrzbList',
                name: 'gdzrzbList',
                component: () => import('@/tdzz/pages/plot/gdzrzbList.vue'),
            },
            //------------------------确认新增耕地坐标----------------------------//
            {
                path: '/qrGdzbList',
                name: 'qrGdzbList',
                component: () => import('@/tdzz/pages/plot/qrGdzbList.vue'),
            },
            //------------------------确认新增农用地坐标----------------------------//
            {
                path: '/qrNydzbList',
                name: 'qrNydzbList',
                component: () => import('@/tdzz/pages/plot/qrNydzbList.vue'),
            },
            //--------------------------附件------------------------------//
            {
                path: '/attachList',
                name: 'attachList',
                component: () => import('@/tdzz/pages/attach/attachList.vue'),
            },
        ]
    },
]

export default tdzzRouter