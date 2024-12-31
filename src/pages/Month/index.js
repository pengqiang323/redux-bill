import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DayBill/inde'

const Month = () => {
  // 按月分组账单数据,（useMemo二次处理）
  const billList = useSelector(state => state.bill.billList)

  // 控制弹框的打开/关闭
  const [dateVisible,setDateVisible] = useState(false)
  // 当前选择月的帐单list
  const [currentMonthList,setMonthList] = useState([])
  // 当前选择月
  const [currentdate,setCurrentDate] = useState(() =>{
    return dayjs(new Date()).format('YYYY-MM')
  })


  // useMemo，当billList产生变化时，才进行计算，具有缓存的效果
  const monthGroup = useMemo(()=>{
    // return 出去计算之后的值
    return _.groupBy(billList,(item => dayjs(item.date).format('YYYY-MM')))
  },[billList])

  // 将当前选择的帐单数据，进行计算，获取 支出 /  收入  /  结余的合计结果，页面将结果渲染出来
  const monthResult = useMemo(()=>{
    console.log("aa")
    // 支出 /  收入  /  结余
    const pay = currentMonthList.filter(item => item.type==='pay').reduce((a, c) => a + c.money,0)
    const income = currentMonthList.filter(item => item.type==='income').reduce((a, c) => a + c.money,0)
    return {
      pay,
      income,
      total: pay+income
    }
  },[currentMonthList])

  // 初始化的时候，将当前月的统计数据显示出来
  useEffect( ()=>{
    if(monthGroup[currentdate]){
      setMonthList(monthGroup[currentdate])
    }
  },[monthGroup])

  // 确认回调
  const onConfirm = (date) =>{

    // 设置弹框关闭
    setDateVisible(false)

    // 获取当前选择的月份，格式化成YYYY-MM，渲染到页面中。
    const formatDate = dayjs(date).format('YYYY-MM')
    setCurrentDate(formatDate)

    // 到分组后的monthGroup中，将当前选择月份作为Key，获取该月份的帐单数据
    setMonthList(monthGroup[formatDate])
  }

    // 当前月按照日分组
    const dayGroup = useMemo(()=>{
      // return 出去计算之后的值
      const groupData = _.groupBy(currentMonthList,(item => dayjs(item.date).format('YYYY-MM-DD')))
      const keys = Object.keys(groupData)
      return {
        groupData,
        keys
      }
    },[currentMonthList])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentdate} 月账单
            </span>
            <span className={classNames('arrow',dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>

        {/** 单日列表渲染 */}
        {
          dayGroup.keys.map(key =>{
            return <DailyBill date={key} billList={dayGroup.groupData[key]} />
          })
        }
       
      </div>
    </div >
  )
}

export default Month