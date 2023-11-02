const lyRouter = [
    //林业资源主页
    {
        path: '/ly_main',
        name: 'ly_main',
        component: () => import('@/ly/pages/main/main.vue'),
        meta: { keepAlive: true },
        children: [
            //首页
            {
                path: '/ly_home',
                name: 'ly_home',
                component: () => import('@/ly/pages/home/home.vue'),
            },
            //审批事项
            {
                path: '/ly_spsx',
                name: 'ly_spsx',
                component: () => import('@/ly/pages/workflow/workflow_main.vue'),
                children: [
                    {
                        path: '/ly_niban',
                        name: 'ly_niban',
                        component: () => import('@/ly/pages/workflow/niban.vue'),
                    },
                    //项目使用林地
                    {
                        path: '/xmsyld_List',
                        name: 'xmsyld_List',
                        component: () => import('@/ly/pages/proj/xmsyld_List.vue'),
                    },
                    //植物检疫
                    {
                        path: '/zwjy_List',
                        name: 'zwjy_List',
                        component: () => import('@/ly/pages/proj/zwjy_List.vue'),
                    },
                    {
                        path: '/ly_daiban',
                        name: 'ly_daiban',
                        component: () => import('@/ly/pages/workflow/daiban.vue'),
                    },
                    {
                        path: '/ly_yiban',
                        name: 'ly_yiban',
                        component: () => import('@/ly/pages/workflow/yiban.vue'),
                    },
                    {
                        path: '/ly_banjie',
                        name: 'ly_banjie',
                        component: () => import('@/ly/pages/workflow/banjie.vue'),
                    },
                    {
                        path: '/xmsyldTj_List',
                        name: 'xmsyldTj_List',
                        component: () => import('@/ly/pages/xtwh/xmsyldTj_List.vue'),
                    },
                    {
                        path: '/xtwh_cf',
                        name: 'xtwh_cf',
                        component: () => import('@/ly/pages/xtwh/xtwh_cf.vue'),
                    },
                    {
                        path: '/xtcx_sdzyzs',
                        name: 'xtcx_sdzyzs',
                        component: () => import('@/ly/pages/xtcx/xtcx_sdzyzs.vue'),
                    },
                    {
                        path: '/xtcx_gyl',
                        name: 'xtcx_gyl',
                        component: () => import('@/ly/pages/xtcx/xtcx_gyl.vue'),
                    },
                    {
                        path: '/xtcx_cf',
                        name: 'xtcx_cf',
                        component: () => import('@/ly/pages/xtcx/xtcx_cf.vue'),
                    },
                    {
                        path: '/xtcx_rgfy',
                        name: 'xtcx_rgfy',
                        component: () => import('@/ly/pages/xtcx/xtcx_rgfy.vue'),
                    },
                    {
                        path: '/xtcx_jyly',
                        name: 'xtcx_jyly',
                        component: () => import('@/ly/pages/xtcx/xtcx_jyly.vue'),
                    },
                    {
                        path: '/xtcx_ywlb',
                        name: 'xtcx_ywlb',
                        component: () => import('@/ly/pages/xtcx/xtcx_ywlb.vue'),
                    },
                    {
                        path: '/xtcx_jylyba',
                        name: 'xtcx_jylyba',
                        component: () => import('@/ly/pages/xtcx/xtcx_jylyba.vue'),
                    },
                    {
                        path: '/xtcx_ywlbba',
                        name: 'xtcx_ywlbba',
                        component: () => import('@/ly/pages/xtcx/xtcx_ywlbba.vue'),
                    },
                    {
                        path: '/xtcx_xmsyldsp',
                        name: 'xtcx_xmsyldsp',
                        component: () => import('@/ly/pages/xtcx/xtcx_xmsyldsp.vue'),
                    },
                    {
                        path: '/xtcx_zwjy',
                        name: 'xtcx_zwjy',
                        component: () => import('@/ly/pages/xtcx/xtcx_zwjy.vue'),
                    },
                    {
                        path: '/hqgh_sdzyzs',
                        name: 'hqgh_sdzyzs',
                        component: () => import('@/ly/pages/hqgh/hqgh_sdzyzs.vue'),
                    },
                    {
                        path: '/hqgh_gyl',
                        name: 'hqgh_gyl',
                        component: () => import('@/ly/pages/hqgh/hqgh_gyl.vue'),
                    },
                    {
                        path: '/hqgh_cf',
                        name: 'hqgh_cf',
                        component: () => import('@/ly/pages/hqgh/hqgh_cf.vue'),
                    },
                    {
                        path: '/hqgh_rgfy',
                        name: 'hqgh_rgfy',
                        component: () => import('@/ly/pages/hqgh/hqgh_rgfy.vue'),
                    },
                    {
                        path: '/hqgh_jyly',
                        name: 'hqgh_jyly',
                        component: () => import('@/ly/pages/hqgh/hqgh_jyly.vue'),
                    },
                    {
                        path: '/hqgh_ywlb',
                        name: 'hqgh_ywlb',
                        component: () => import('@/ly/pages/hqgh/hqgh_ywlb.vue'),
                    },
                    {
                        path: '/hqgh_jylyba',
                        name: 'hqgh_jylyba',
                        component: () => import('@/ly/pages/hqgh/hqgh_jylyba.vue'),
                    },
                    {
                        path: '/hqgh_ywlbba',
                        name: 'hqgh_ywlbba',
                        component: () => import('@/ly/pages/hqgh/hqgh_ywlbba.vue'),
                    },
                    {
                        path: '/hqgh_xmsyldsp',
                        name: 'hqgh_xmsyldsp',
                        component: () => import('@/ly/pages/hqgh/hqgh_xmsyldsp.vue'),
                    },
                    {
                        path: '/hqgh_main',
                        name: 'hqgh_main',
                        component: () => import('@/ly/pages/hqgh/hqgh_main.vue'),
                    },
                ],

            },
            //系统查询
            // {
            //     path: '/ly_xtcx',
            //     name: 'ly_xtcx',
            //     component: () => import('@/ly/pages/xtcx/xtcx_main.vue'),
            //     children: [
            //         {
            //             path: '/xtcx_sdzyzs',
            //             name: 'xtcx_sdzyzs',
            //             component: () => import('@/ly/pages/xtcx/xtcx_sdzyzs.vue'),
            //         },
            //         {
            //             path: '/xtcx_gyl',
            //             name: 'xtcx_gyl',
            //             component: () => import('@/ly/pages/xtcx/xtcx_gyl.vue'),
            //         },
            //         {
            //             path: '/xtcx_cf',
            //             name: 'xtcx_cf',
            //             component: () => import('@/ly/pages/xtcx/xtcx_cf.vue'),
            //         },
            //         {
            //             path: '/xtcx_rgfy',
            //             name: 'xtcx_rgfy',
            //             component: () => import('@/ly/pages/xtcx/xtcx_rgfy.vue'),
            //         },
            //         {
            //             path: '/xtcx_jyly',
            //             name: 'xtcx_jyly',
            //             component: () => import('@/ly/pages/xtcx/xtcx_jyly.vue'),
            //         },
            //         {
            //             path: '/xtcx_ywlb',
            //             name: 'xtcx_ywlb',
            //             component: () => import('@/ly/pages/xtcx/xtcx_ywlb.vue'),
            //         },
            //         {
            //             path: '/xtcx_jylyba',
            //             name: 'xtcx_jylyba',
            //             component: () => import('@/ly/pages/xtcx/xtcx_jylyba.vue'),
            //         },
            //         {
            //             path: '/xtcx_ywlbba',
            //             name: 'xtcx_ywlbba',
            //             component: () => import('@/ly/pages/xtcx/xtcx_ywlbba.vue'),
            //         },
            //         {
            //             path: '/xtcx_xmsyldsp',
            //             name: 'xtcx_xmsyldsp',
            //             component: () => import('@/ly/pages/xtcx/xtcx_xmsyldsp.vue'),
            //         },
            //     ]
            // },
            //图形查看
            {
                path: '/ly_txsc',
                name: 'ly_txsc',
                component: () => import('@/ly/pages/txck/txsc.vue'),
            },
        ]
    },
    //林业审批【【流程办理主页
    {
        path: '/ly_runtime_main',
        name: 'ly_runtime_main',
        component: () => import('@/ly/pages/workflow/runtime/runtime_main.vue'),
        children: [
            //------------------------林业资源项目----------------------------//
            //湿地占用征收
            {
                path: '/sdzyzs',
                name: 'sdzyzs',
                component: () => import('@/ly/pages/proj/sdzyzs.vue'),
            },
            //生态公益林调整
            {
                path: '/gyl',
                name: 'gyl',
                component: () => import('@/ly/pages/proj/gyl.vue'),
            },
            //林木采伐许可审批
            {
                path: '/cf',
                name: 'cf',
                component: () => import('@/ly/pages/proj/cf.vue'),
            },
            //野生动物人工繁育审批事项
            {
                path: '/rgfy',
                name: 'rgfy',
                component: () => import('@/ly/pages/proj/rgfy.vue'),
            },
            //野生动物经营利用审批事项
            {
                path: '/jyly',
                name: 'jyly',
                component: () => import('@/ly/pages/proj/jyly.vue'),
            },
            //野生动物野外猎捕审批
            {
                path: '/ywlb',
                name: 'ywlb',
                component: () => import('@/ly/pages/proj/ywlb.vue'),
            },
            //野生动物省以上经营利用备案
            {
                path: '/jylyba',
                name: 'jylyba',
                component: () => import('@/ly/pages/proj/jylyba.vue'),
            },
            //野生动物省以上野外猎捕备案
            {
                path: '/ywlbba',
                name: 'ywlbba',
                component: () => import('@/ly/pages/proj/ywlbba.vue'),
            },
            //项目使用林地
            {
                path: '/xmsyld',
                name: 'xmsyld',
                component: () => import('@/ly/pages/proj/xmsyld.vue'),
            },
            //植物检疫
            {
                path: '/zwjy',
                name: 'zwjy',
                component: () => import('@/ly/pages/proj/zwjy.vue'),
            },
        ]
    },
]

export default lyRouter