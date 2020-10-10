import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card'
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
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id:user._id})
};
if (tileData.length<1){
fetch('http://localhost:8080/getOrder', requestOptions)
    .then(response => response.json())
    .then(data =>{       
    setData(data)
});     }
  return (
    <div className={`${classes.root} buyer`}>
    
        {tileData.map((tile) => (
         <Card item={tile}/>
        ))}
      
    </div>
  );
}