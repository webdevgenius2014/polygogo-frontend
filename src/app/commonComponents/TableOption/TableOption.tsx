'use client';
import '../TableOption/tableoption.scss';

export default function TableOption(){
    return(
        <>
            <div className="dropdown">
                <button className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#"><div><img src='/icons/Contact-book.svg'/></div>View profile</a></li>
                    <li><a className="dropdown-item" href="#"><div><img src='/icons/Chat_Circle.svg'/></div>Send Message</a></li>
                    <li><a className="dropdown-item" href="#"><div><img src='/icons/dollar-circle.svg'/></div>Request Payment</a></li>
                    <li><a className="dropdown-item" href="#"><div><img src='/icons/tags.svg'/></div>Edit Tags</a></li>
                    <li><a className="dropdown-item" href="#"><div><img src='/icons/trash.svg'/></div>Delete</a></li>
                </ul>
            </div>
        </>
    )
}