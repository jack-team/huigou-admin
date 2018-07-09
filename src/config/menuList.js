export default [
    {
        name: '平台首页',
        icon: 'home',
        path: `/home/index`,
        children: []
    },
    {
        name: '商城管理',
        icon: 'shop',
        path: `/home/mall`,
        children: [
            {
                name: '商品分类',
                path: '/category'
            },
            {
                name: '商品管理',
                path: '/manage'
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'dashboard',
        path: `/home/system`,
        children: [
            {
                name: '用户信息',
                path: '/info'
            },
            {
                name: '员工管理',
                path: '/staff'
            }
        ]
    }
];