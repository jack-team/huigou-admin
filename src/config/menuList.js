const menuList = [
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
                path: '/home/mall/category'
            },
            {
                name: '商品分类',
                path: '/home/mall/manage'
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'dashboard',
        path: `/home/system`,
        children: [
            {
                name: '修改密码',
                path: '/home/system/info'
            }
        ]
    }
];

export default menuList;