import React from "react";

class Home extends React.Component {
  getHome = () => {
    console.log(`in home`);
  };

  logout = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div>
        <h2>Login Successful!</h2>
        <h3>Welcome to Home Page</h3>
        <button className="btn btn-primary" onClick={this.getHome}>
          Home
        </button>
        <button className="btn btn-default" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Home;
