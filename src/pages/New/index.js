import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  
  // 收入/支出 的状态
  const [billType,setBillType] = useState("pay") // pay-支出 income-收入
  const [useFor,setUseFor] = useState("") // pay-支出 income-收入

  // 收集金额
  const [money,setMoney]=useState(0)


  //  const moenyChange = (value)=>{
  //     setMoney(value)
  //  }

  // 保存账单
  const saveBill = ()=>{
    const data = {
        type: billType,
        money:billType === 'pay'? -money : +money,
        date: dayjs(date).format('YYYY-MM-DD'),
        useFor:useFor
    }
    dispath(addBillList(data))
  }

  // 控制时间打开关闭
  const [dateVisible,setDateVisible] = useState(false)
  const [date,setDate] = useState()

  const dateConfirm = (value)=>{
    setDate(value)
    setDateVisible(false)
  }

 
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected': '')}
            onClick={()=>setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected': '')}
            shape="rounded"
            onClick={()=>setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={setDateVisible}>{dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '今天':dayjs(date).format('YYYY-MM-DD')}</span>
              {/** 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onCancel={() => setDateVisible(false)}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={setMoney}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/** 数据区域 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={()=> setUseFor(item.type)}

                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New