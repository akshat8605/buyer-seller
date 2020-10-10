import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card'
import './buyer.css'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const tileData = [
   {
      img: 'https://material-ui.com/static/images/grid-list/breakfast.jpg',
      title: 'Image',
      author: 'author',
    },
    {
        img: 'https://material-ui.com/static/images/grid-list/breakfast.jpg',
        title: 'Image',
        author: 'author',
      },{
        img: 'https://material-ui.com/static/images/grid-list/breakfast.jpg',
        title: 'Image',
        author: 'author',
      }
    
  ];
 
export default function TitlebarGridList({user}) {
  const classes = useStyles();
  const [tileData,setData] = useState([]);
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};
if (tileData.length<1){
fetch('http://localhost:8080/service', requestOptions)
    .then(response => response.json())
    .then(data =>{       
    setData(data)
});     }
const onBuy=(item)=>{
  console.log(item)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({service: item.service, price:item.price,name:user.name,sId:item.id,cId:user._id})
};
fetch('http://localhost:8080/addOrder', requestOptions)
    .then(response => response.json())
    .then(data =>{       
    alert(data)
});     
}

  return (
    <div className={`${classes.root} buyer`}>
        {tileData.map((tile) => (
         <Card item={tile} onBuy={onBuy}/>
        ))}
      
    </div>
  );
}