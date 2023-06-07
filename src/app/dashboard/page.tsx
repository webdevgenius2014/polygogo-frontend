'use client';
import dstyles from '../../styles/dashboard/dstyles.module.scss'
const Dashboard=()=>{
    return (    
        <div className={dstyles.page_container}>
            <div className='h-100 text-center pt-5'>
                <h1>Welcome to the Polygogo Dashboard.</h1> 
            </div>
        </div>
    );
}
export default Dashboard;