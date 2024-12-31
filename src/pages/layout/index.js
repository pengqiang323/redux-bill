import { TabBar } from 'antd-mobile'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBillList} from '@/store/modules/billStore'
import './index.scss'
import {
    BillOutline,
    AddCircleOutline,
    CalculatorOutline
} from 'antd-mobile-icons'

const tabs = [
    {
        key: '/month',
        title: '月度账单',
        icon: <BillOutline />,
    },{
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },{
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />,
    },
]

const Layout = ()=> {

    // 异步获取账单列表
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])

    // 切换菜单
    const switchRoute = (path) =>{
        navigate(path)
    }
    
    return (
        <div className='layout'>
            <div className='container'>
                <Outlet />
            </div>
            <div className='footer'>
                <TabBar onChange={switchRoute}>
                    {tabs.map(item =>(
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}> </TabBar.Item>    
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout