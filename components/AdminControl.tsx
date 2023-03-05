import React from 'react'
import { useContract,useContractWrite ,useContractRead} from '@thirdweb-dev/react'
import { toast } from 'react-hot-toast'
import { StarIcon,CurrencyDollarIcon,ArrowPathIcon,ArrowUturnDownIcon } from '@heroicons/react/24/solid'
import { ethers } from 'ethers'
import { currency } from '@/constants'
type Props = {}

const AdminControl = (props: Props) => {
    const {contract} = useContract(process.env.NEXT_PUBLIC_LOTTERY_ADDRESS)
    const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")
    const { mutateAsync: WithdrawCommission } = useContractWrite(contract, "WithdrawCommission")
    const { mutateAsync: RestartDraw } = useContractWrite(contract, "restartDraw")
    const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")
    const { data:totalCommission } = useContractRead(contract, "operatorTotalCommission")
    const drawWinner = async()=>{
        const notification = toast.loading("Drawing Winner...")
        try
        {
            await DrawWinnerTicket([{}])
            toast.success("Winner Drawn Successfully!",{id:notification})
        }
        catch(e)
        {
            toast.error("Whoops something went wrong!!",{id:notification})
        }
    }
    
    const withdrawCommission = async()=>{
        const notification = toast.loading("Withdrawing Commission...")
        try
        {
            await WithdrawCommission([{}])
            toast.success("Withdrawn Successfully!",{id:notification})
        }
        catch(e)
        {
            toast.error("Whoops something went wrong!!",{id:notification})
        }
    }
    
    const restartDraw = async()=>{
        const notification = toast.loading("Restarting Draw...")
        try
        {
            await RestartDraw([{}])
            toast.success("Draw Restarted!",{id:notification})
        }
        catch(e)
        {
            toast.error("Whoops something went wrong!!",{id:notification})
        }
    }

    const refundAll = async()=>{
        const notification = toast.loading("Refunding...")
        try
        {
            await RefundAll([{}])
            toast.success("Successfully Refunded!",{id:notification})
        }
        catch(e)
        {
            toast.error("Whoops something went wrong!!",{id:notification})
        }
    }

  return (
    <div className='text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border'>
        <h2 className='font-bold'>Admin Controls</h2>
        <p className='mb-5'>Total Commission to be withdrawn:{totalCommission &&
        ethers.utils.formatEther(totalCommission.toString())}{" "}{currency}</p>
        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <button 
            onClick={drawWinner}
            className='admin-button'>
            <StarIcon className='h-6 mx-auto mb-2' />    
            Draw Winner</button>
            <button 
            onClick={withdrawCommission}
            className='admin-button'>
            <CurrencyDollarIcon className='h-6 mx-auto mb-2'/>    
            Withdraw Commission</button>
            <button 
            onClick={restartDraw}
            className='admin-button'>
            <ArrowPathIcon className='h-6 mx-auto mb-2'/>    
            Restart Draw</button>
            <button
            onClick={refundAll}
            className='admin-button'>
            <ArrowUturnDownIcon className='h-6 mx-auto mb-2'/>    
            Refund All</button>
        </div>
    </div>
  )
}

export default AdminControl