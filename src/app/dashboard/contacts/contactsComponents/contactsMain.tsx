'use client';
import react, {useState, useEffect}  from 'react';
import dstyles from '../../../../styles/dashboard/dstyles.module.scss';
import apiData from '../user';
import RoundCheckbox from '@/app/commonComponents/RoundCheckbox/RoundCheckbox';
import userData from '../user';
import TableOption from '@/app/commonComponents/TableOption/TableOption';

export default function ContactsMain() {
    const [tableData, setTableData]=useState<any | null>(null);

    useEffect(()=>{
        setTableData(apiData?.data);
    },[])

    return (
        <>
            <section className={`${dstyles.table_main}`}>
                <div className={`${dstyles.table_top}`}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div>
                                <input type='text' placeholder='Search' className={`form-control ${dstyles.search_field}`}/>
                            </div>
                        </div>
                        <div className='col-md-6 text-end'>
                            <button className={`me-2 ${dstyles.btn_secondry} ${dstyles.btn}`}>Upload Contact</button>
                            <button className={`${dstyles.btn_primary} ${dstyles.btn}`}>Add Contact</button>
                        </div>
                    </div>
                </div>
                <table className="table ">
                    <thead className={`${dstyles.tab_head}`}>
                        <tr>
                            <th><RoundCheckbox checked={true} onChange={()=>{}}/></th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    { tableData &&
                        tableData.map((item,index)=>
                            <tbody>
                                <tr key={index}>
                                    <td><RoundCheckbox checked={true}  onChange={()=>{}}/></td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td><ul className={`${dstyles.list_dis}`}>{item.tag && item.tag.map((data,index)=>
                                         
                                         <li key={index}>{data.name}</li>
                                     
                                    )}</ul>
                                       
                                    </td>
                                    <td>{item.created}</td>
                                    <td><TableOption/></td>
                                </tr>
                            </tbody>
                        )
                        
                        }
                        <tr>
                            <td></td>
                        </tr>
                        </table>
                   
            </section>
        </>
    )
}