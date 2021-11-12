import React from 'react';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDetails from './Dishdetail';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
    }
  }
 

  render(){
    const HomePage = () =>{
      console.log("homeeee")
      return <Home dish = {this.props.dishes.filter((dish)=> dish.featured)[0]}
      promotion = {this.props.promotions.filter((promotion)=> promotion.featured)[0]}
      leader = {this.props.leaders.filter((leader)=> leader.featured)[0]}
      />
    } 

    const DishWithId = ({match}) => {
      console.log("match")
      return(
          <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

  return <div className="App">
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route path="/menu" component= {() => <Menu dishes={this.props.dishes} />}/>
        <Route path="/contactus" component= {Contact}/>
        <Route path="/aboutus" component= {() => <About leaders={this.props.leaders} />}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
</div>
}}

export default withRouter(connect(mapStateToProps)(Main));