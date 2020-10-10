import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import LinearProgress from '@material-ui/core/LinearProgress';


function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
    
    </Typography>
  );
}

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth:700,
    marginLeft:'auto',
    marginRight:'auto'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {
    state={
      id:'',
      pass:'',
      type:'email',
      checked:false,
      value:"",
      Load:false,
      login:true,
      name:''

    }

    handleChange = name => event => {
      this.setState({[name]:event.target.value})
    }
    handleCheck=()=>{
      this.setState({checked:!this.state.checked})
    }
    handleRadioChange=(event)=>{
      this.setState({value:event.target.value})
    }
    OnAdd=()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ service: this.state.service,
                price:this.state.price,
                name:this.props.user.name,
                id:this.props.user._id })
        };
        fetch('http://localhost:8080/addService', requestOptions)
            .then(response => response.json())
            .then(data =>{ alert(data) ;
                
                this.props.handleAdd()

 });     
       
    }
    render(){
        const {classes,user,handleAdd}=this.props;
        const {checked,Load,login}=this.state;
        return (
    <Dialog
    fullScreen={true}
    open={this.props.open}
    onClose={this.props.handlelogin}
    aria-labelledby="responsive-dialog-title"
  >
  
      <CssBaseline />
     {Load===true? <LinearProgress   variant="query" color="secondary" />
     :null} <div className={classes.paper}>
      <DialogTitle id="responsive-dialog-title">
      Add Service
       
      </DialogTitle>
      
       
        <div className={classes.form}>
        <DialogContent>
     <div className='flex mr-auto ml-auto'>
        </div>  <TextField
            variant="outlined"
            margin="normal"
            onChange={this.handleChange('service')}
            required
            fullWidth
            id="email"
            label="Service"
            name="email"
            autoComplete="Service"
            autoFocus
          />
          <TextField
            variant="outlined"
            onChange={this.handleChange('price')}
            value={this.state.price}
            margin="normal"
            required
            fullWidth
            name="Price"
            label="Price"
            autoComplete="Price"
          />
         
         
          </DialogContent>
          <div className='pa3'>
          <Button
            onClick={this.OnAdd}
            fullWidth
            variant="contained"
            color="primary"
            disabled={Load}
            className={classes.submit}
          > Add
          </Button>
          
          </div>
        </div>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
      </Dialog>
  )}
}
var sign = withStyles(useStyles)(SignIn)
export default withMobileDialog()(sign)