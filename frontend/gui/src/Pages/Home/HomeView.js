import React from "react";
import axios from "axios";
// import {Divider} from 'antd';
import MyCarousel from "../../Containers/Carousel/MyCarousel.js";
import StatisticTable from "../../Components/Tables/StatisticTable";

class HomePage extends React.Component {
  state = {
    accounts: 0,
    uploads: 0,
  };

  getAccount = () => {
    axios
      .get("http://127.0.0.1:8000/account/quantity/")
      .then((respond) => {
        this.setState({ accounts: respond.data["accounts-quantity"] });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getUploads = () => {
    axios
      .get("http://127.0.0.1:8000/upload/quantity/")
      .then((respond) => {
        this.setState({ uploads: respond.data["uploads-quantity"] });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  print = () => {
    console.log(this.state);
  };
  componentWillMount() {
    this.getAccount();
    this.getUploads();
  }

  render() {
    return (
      <>
        <MyCarousel active={true} />
        <StatisticTable
          onClick={this.print}
          accounts={this.state.accounts}
          uploads={this.state.uploads}
        />
      </>
    );
  }
}

export default HomePage;
