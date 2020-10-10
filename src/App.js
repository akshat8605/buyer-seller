import { Slider } from '@material-ui/core';
import React , {Component} from 'react';
import './App.css';
import Login from './Component/login'
import SlideBar from './Component/slider/Slidebar'
import NavBar from './Component/NavBar'
import Buyer from './Component/buyer/buyer'
import Seller from './Component/seller/seller'
import AddService from './Component/addService'
var List=["Home","Chat"]
 class App extends Component {
 	constructor(props) {
		 super(props);
		 this.state={
			 Auth:false,
			 user:{},
			 type:"",
			 slideBar:false,
			 onAdd:false
		 }
	}
	getUser=(user)=>{
		this.setState({user,type:user['type'],Auth:true})
	}
	handleSlideBar=()=>{
		this.setState({slideBar:!this.state.slideBar})
	}
	onSlideSubmit=(text)=>{
		
	  }
	logout=()=>{
		this.setState({user:{},type:'',Auth:false})
	}
	handleAdd=()=>{
		this.setState({onAdd:!this.state.onAdd})
	}
 	render(){
		 const {Auth, slideBar,user,type,onAdd}=this.state;
 	return (
 <div className=''>
	 <Login open={!Auth} getUser={this.getUser}/>
	 <SlideBar token="Hello"  open={slideBar} handleSlideBar={this.handleSlideBar} user={user} List={List} onSlideSubmit={this.onSlideSubmit}/> 
	 <NavBar user={user} logout={this.logout}  handleAdd={this.handleAdd} handleSlideBar={this.handleSlideBar} {...this.props} position="static" Auth={Auth} />
	 {type=='b'?<Buyer user={user}/>:null}
	 {type=='s'?<Seller user={user}/>:null}
	 <AddService open={onAdd} user={user} handleAdd={this.handleAdd}/>
</div>
 		);
}
}
export default App;