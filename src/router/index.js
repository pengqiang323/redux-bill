// 创建路由实例 绑定path element
import Layout from '@/pages/layout'
import Month from '@/pages/Month'
import New from '@/pages/New'
import Year from '@/pages/Year'
import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month />
            },{
                path: '/year',
                element: <Year />
            }
        ]
    },{
        path: '/new',
        element: <New />
    },

])

export default router