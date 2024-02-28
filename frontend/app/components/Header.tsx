import Image from 'next/image';
import hamburgerIcon from '/hamburger-icon.svg';

export default function Header() {
    return (
        <nav className="header">
            <div className="hamburger-menu">
                <Image src={hamburgerIcon} alt="hamburger-menu" width={64} height={64}/>
                    
                <ul className="dropdown-menu">
                    <li className='dropdown-menu-item'>Get Started</li>
                    <li className='dropdown-menu-item'>Contact Us</li>
                    <li className='dropdown-menu-item'>About Us</li>
                </ul>
            </div>
            <div className="header-title">
                <h1>MuscleMemory</h1>
            </div>
            <div className="account-logo">
                <Image src="" alt="account-logo" height={64} width={64}/>
            </div>
        </nav>
    )
}