'use client'
import styles from '../../styles/styles.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../middleware/middleware'
import AuthService from '../../services/auth.service'
import { useEffect } from 'react';

export default function Header(){
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      }, []);
    return(
        <>
            <header>
            <nav className={`navbar navbar-expand-lg bg-light fixed-top ${styles.navigation}`}>
                <div className={`container ${styles.container}`}>
                    <a className="navbar-brand" href="#"><img src='images/Polygogo_Logo.png' alt=''/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Product
                            </a>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Industries</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Resources</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Customer Support</a>
                        </li>
                        
                        </ul>
                    </div>
                    
                    </div>
                    <div className='d-flex'>
                    {sessionStorage.getItem("auth_token") ? 
                    <button type='button' className={`ms-auto w-auto ${styles.btn} ${styles.btn_secondary}`} onClick={()=>logoutUser()}>
                        <span className='fw-bold'>Logout</span>
                        {/* <img className='ms-2' src="/icons/right-arrow.svg" alt="right-arrow" /> */}
                    </button>
                    :<div className={`ms-auto w-auto`}>
                        <Link className={`${styles.btn} ${styles.btn_secondary}`} 
                        href="/login">
                            <span className='fw-bold'>Login</span>
                        </Link>

                        <Link className={`${styles.btn} ${styles.btn_secondary}`} 
                        href="/register">
                            <span className='fw-bold'>Start a free trial</span>
                        </Link>
                    </div>
          }
                    </div>
                </div>
                </nav>
            </header>
        </>
    )
}