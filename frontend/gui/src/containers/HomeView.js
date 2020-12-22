import React from 'react';
import axios from 'axios';
import CarouselComp from '../components/Home/CarouselComp';
import Statistic from '../components/Home/Statistic';

class HomePage extends React.Component {
    state ={
        accounts:0,
        uploads:0,
    }

    getAccount = () => {
        axios.get('http://127.0.0.1:8000/account/quantity/')
          .then((respond) => {     
              this.setState({accounts: respond.data['accounts-quantity']})         
            })
            .catch((e) => {
              console.log(e)
            });
    }
    getUploads = () => {
        axios.get('http://127.0.0.1:8000/upload/quantity/')
          .then((respond) => {    
              this.setState({uploads: respond.data['uploads-quantity']})         
            })
            .catch((e) => {
              console.log(e)
            });
    }
    print = () => {
        console.log(this.state)
    }
    componentWillMount(){
        this.getAccount();
        this.getUploads();
    }

    render() {
        return (
            <>
            <CarouselComp active={false}/>
            <Statistic onClick={this.print} accounts={this.state.accounts} uploads={this.state.uploads}/>
            </>
        );
    }
}

export default HomePage;