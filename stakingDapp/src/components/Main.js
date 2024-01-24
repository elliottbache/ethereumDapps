import React, {Component} from 'react'
import bank from "../bank.png";
import tether from '../tether.png';
import Airdrop from './Airdrop';
import "../styles.css";

class Main extends Component {
      
    render() {
        return (
            <div id='content' className='mt-3'>
                <table className='table table-center'>
                    <thead>
                        <tr>
                            <th scope='col' style={{color:'black'}}>Staking Balance</th>
                            <th scope='col' style={{color:'black'}}>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{color:'black'}}>{window.web3.utils.fromWei(this.props.stakingBalance, 'ether')} USDT</td>
                            <td style={{color:'black'}}>{window.web3.utils.fromWei(this.props.rwdBalance, 'ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card table-center mt-3'>
                    <form 
                    onSubmit={(event) => {
                        event.preventDefault();
                        let amount;
                        amount = this.input.value.toString();
                        amount = window.web3.utils.toWei(amount, 'ether');
                        this.props.stakeTokens(amount);
                    }}
                    className='' >
                        <div style={{borderSpacing:'0 1em' }}>
                            <label style={{marginLeft:'15px',float:'left'}}>
                                <b>Stake Tokens</b>
                            </label>
                            <span style={{marginRight:'8px',float:'right'}}>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance,'ether')}
                            </span>
                            <div className='input-group mb-4' >
                                <input
                                ref={(input)=>{this.input = input}}
                                type='text'
                                placeholder='0'
                                required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img alt='tether' src={tether} height='32'/>
                                        &nbsp;&nbsp;&nbsp;USDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg w-100'>DEPOSIT</button>
                        </div>
                    </form>
                    <div style={{width:'498px' }}>
                        <button 
                        onClick={(event) => {
                            event.preventDefault(this.props.unstakeTokens());
                        }}

                        className='btn btn-primary btn-lg w-100 mt-3'>
                            WITHDRAW
                        </button>

                    </div>
                    <div className='card-body text-center' style={{color:'blue'}}>
                        AIRDROP <Airdrop 
                        stakingBalance={this.props.stakingBalance}
                        issueSenderTokens={this.props.issueSenderTokens}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;