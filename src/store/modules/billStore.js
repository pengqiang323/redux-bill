// 编写账单列表相关store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name: 'bill',
    // 数据状态state
    initialState: {
        billList: []
    },
    reducers: {
        // 同步修改方法
        setBillList (state, action){
            state.billList = action.payload
        },
        // 同步添加账单方法
        addBill (state, action){
            state.billList.push(action.payload)
        }
    }
})

// 解构actionCreater函数
const {setBillList,addBill} = billStore.actions

// 编写异步
const getBillList = ()=> {
    return async (dispath) =>{
        // 编写异步请求
        const res = await axios.get("http://localhost:8888/ledger")
        // 触发同步reducer
        dispath(setBillList(res.data))
    }
}

const addBillList = (data)=> {
    return async (dispath) =>{
        console.log(data)
        // 编写异步请求
        const res = await axios.post("http://localhost:8888/ledger",data)
        // 触发同步reducer
        dispath(addBill(data))
    }
}

export {getBillList,addBillList}

// 导出reducer
const reducer = billStore.reducer
export default reducer