import React, { useEffect, useState } from 'react'
import { PersonalInfo } from '../models/PersonalInfo'
import './table.css'
interface Props{
    personalInfos:PersonalInfo[]
    setPersonalInfos:React.Dispatch<React.SetStateAction<PersonalInfo[]>>
}
const Table : React.FC<Props> = ({personalInfos,setPersonalInfos}) => {
    const [orderBy,setOrderBy] = useState<string>("ASC");
    const [bool,setBool] = useState<boolean>(false);
    const [currentPage,setCurrentPage] = useState<number>(0);
    const [maxPage,setMaxPage] = useState<number>(Math.floor(personalInfos.length/5));
    const [currentInfos,setCurrentInfos] = useState<PersonalInfo[]>(personalInfos)

    useEffect(()=>{
        setMaxPage(Math.floor(personalInfos.length/5))
        const newinfos = personalInfos.slice(currentPage*5,currentPage*5+5);
        setCurrentInfos(newinfos);
    },[personalInfos])

    console.log(currentInfos);
    console.log(maxPage);
    const removeEntry = (name:string):void =>{
        personalInfos = personalInfos.filter((info:PersonalInfo)=>{
            return info.name !== name
        })
        setPersonalInfos(personalInfos);
    }
    const increasePage =():void=>{
        if(currentPage>=maxPage){
            setCurrentPage(maxPage);
            return;
        }
        setCurrentPage(currentPage+1);
    }
    const decreasePage = ():void=>{
        if(currentPage <=0){
            setCurrentPage(0)
            return
        }
        setCurrentPage(currentPage-1);
    }
    const order = ():void=>{
        setPersonalInfos(personalInfos.reverse())
        setBool(!bool);
        if(bool){
            setOrderBy("ASC")
            return;
        }
        setOrderBy("DESC")
    }
    return (
    <div className='table-div'>
        <h3>Last Entries</h3>
        <div className='order-by'>
            <button className='btn btn-primary' onClick={()=>order()}>Order by</button>
            <label htmlFor="">{orderBy}</label>
        </div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Email</th>
                <th scope="col">Content</th>
                <th scope="col">Remove</th>
                <th>
                    <div className='pageination'>
                        Page:
                        <button className='btn btn-dark' onClick={()=>decreasePage()}><i className="fa-solid fa-arrow-left"></i></button>
                        <p>{currentPage+1}</p>
                        <button className='btn btn-dark'><i className="fa-solid fa-arrow-right" onClick={()=>increasePage()}></i></button>
                    </div>
                </th>
                </tr>
            </thead>
            <tbody>
                {currentInfos.map((info:PersonalInfo,index:number)=>{
                    return(
                        <tr>
                            <th scope='row'>{index+1}</th>
                            <td>{info.name}</td>
                            <td>{info.email}</td>
                            <td >{info.content}</td>
                            <td><button className='btn btn-secondary' onClick={()=>removeEntry(info.name)}>Remove</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Table