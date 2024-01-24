import React, {Component} from 'react'
import bank from "../bank.png";

class Navbar extends Component {
    // Our React code goes in here!
      
    render() {
        return (
            <nav className='navbar navbar=dark fixed-top shadow p-0' style={{backgroundColor:'black', height:'50px'}}>
                <a className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color:'white'}}>
                    <img src={bank} alt="Bank symbol" width='50' height='30' className='d-inline-block align-top'/>
                    &nbsp; DAPP Yield staking (decentralized banking)
                </a>
                <ul className='navbar-nav px-3'>

                    <li>
                        <small style={{color:'white'}}>ACCOUNT NUMBER: {this.props.account}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

//                     <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
export default Navbar;