import React, { Component } from "react";
import axios from 'axios';
//// axios needs to be a dependency on node_modules
import StoreFront from "./Components/StoreFront/StoreFront";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import NavBar from "./Components/NavBar/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      showCart: false
   } ;
  }
  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/products/")
      .then(response => {
        console.log(response)
        this.setState({
          products: response.data
        });
      });
  }


  ///// BIND ALL THE METHODS IN THE CLASS INSTANCE

  addToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item]
    })
  }
  removeFromCart = (index)=> {
    let cartCopy = this.state.cart.slice();
    cartCopy.splice(index, 1);
    this.setState({
      cart: cartCopy
    });
  }
  navigate = (location)=> {
    if (location === "cart") {
      this.setState({
        showCart: true
      })
    } else {
      this.setState({
        showCart: false
      })
    }
  }
  render() {
    const { products, cart, showCart } = this.state;
    return (
      <div className="App">
        <NavBar navigate={this.navigate} />
        <div className="main-container">
          {showCart ? (
            <ShoppingCart cart={cart} removeFromCart={this.removeFromCart} />
          ) : (
            <StoreFront cart={cart} products={products} addToCart={this.addToCart} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
