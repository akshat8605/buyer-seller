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
    submitSignup=()=>{
        this.setState({Load:true})
     
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:this.state.id,pass:this.state.pass,type:this.state.value,name:this.state.name })
        };
        fetch('http://localhost:8080/signup', requestOptions)
            .then(response => response.json())
            .then(dat =>{
                var data=[]   
                data["name"]= this.state.name  
                data["email"]=this.state.id
            data['save']=this.state.checked
            this.props.getUser(data)
            this.setState({Load:false})

 });     
       

    }
    submitLogin=()=>{
      this.setState({Load:true})
     
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email:this.state.id,pass:this.state.pass })
        };
        fetch('http://localhost:8080/login', requestOptions)
            .then(response => response.json())
            .then(data =>{       
            data['save']=this.state.checked
            this.props.getUser(data)
            this.setState({Load:false})

 });     
       
     
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
    render(){
        const {classes}=this.props;
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
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         {!login?" Log in":"Sign Up"}
        </Typography>
      </DialogTitle>
      
       
        <div className={classes.form}>
        <DialogContent>
     <div className='flex mr-auto ml-auto'> {!login? <RadioGroup row aria-label="type" name="type" value={this.state.value} onChange={this.handleRadioChange}>
          <FormControlLabel
            value="s"
            control={<Radio color="primary" />}
            label="Seller"
            labelPlacement="start"
          />
          <FormControlLabel
            value="b"
            control={<Radio color="secondary" />}
            label="Buyer"
            labelPlacement="start"
          />
         
        </RadioGroup>:null}
        </div>  <TextField
            variant="outlined"
            margin="normal"
            onChange={this.handleChange('id')}
            required
            value={this.state.data}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            onChange={this.handleChange('pass')}
            value={this.state.pass}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         {!login? <TextField
            variant="outlined"
            onChange={this.handleChange('name')}
            value={this.state.name}
            margin="normal"
            required
            fullWidth
            name="Name"
            label="Name"
            type="text"
            autoComplete="Name"
          />:null}
          <FormControlLabel
            control={<Checkbox value={checked} onClick={this.handleCheck} color="primary" />}
            label="Remember me"
          />
          </DialogContent>
          <div className='pa3'>
          {login?<Button
            onClick={this.submitLogin}
            fullWidth
            variant="contained"
            color="primary"
            disabled={Load}
            className={classes.submit}
          > Log in
          </Button>:<Button
            onClick={this.submitSignup}
            fullWidth
            variant="contained"
            color="primary"
            disabled={Load}
            className={classes.submit}
          >Sign Up
          </Button>}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {login?<Link onClick={()=>this.setState({login:false})} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>:<Link onClick={()=>this.setState({login:true})} variant="body2">
                {"Sign Up"}
              </Link>}
            </Grid>
          </Grid>
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