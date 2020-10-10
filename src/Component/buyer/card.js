import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    minWidth:250,
    margin:'10px'
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({item,onBuy}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.service}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.service}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
           {item.name}
          </Typography>
          
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        
        <Typography variant="body2" color="textSecondary" component="p">
          PRICE : {item.price}
          </Typography>
          <Button size="small" color="primary" onClick={()=>{onBuy(item)}}>
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
