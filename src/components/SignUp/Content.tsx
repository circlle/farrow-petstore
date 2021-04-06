import React from "react";
import {
  Button,
  createStyles,
  IconButton,
  InputAdornment,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  CheckCircle,
  CheckCircleOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { api as UserApi } from "@server-api/user";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(6),
    },
    formWrapper: {
      marginTop: theme.spacing(2),
    },
    formItem: {
      width: "100%",
      marginBottom: theme.spacing(3),
    },
    loginButton: {
      width: "100%",
      borderRadius: 10,
    },
    loginHelper: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  })
);
function Content() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const onSignUp = async () => {
    if (password !== confirmedPassword) {
      enqueueSnackbar("passwords do not match");
      return;
    }
    const data = await UserApi.createUser({
      username,
      password,
      email: null,
      avatar: null,
    });
    if (data.type === "CREATE_USER_HASH_FAILED" || data.type === "CREATE_USER_EXIST") {
      enqueueSnackbar(data.message, {variant: 'warning'});
    } else if (data.type === "CREATE_USER_SUCCESS") {
      enqueueSnackbar("sign up succesfully, please sign in", {variant: "success"});
      history.replace(`/login`);
    } else {
      enqueueSnackbar("unkown error when regist", { variant: "error" });
    }
  };
  return (
    <div className={classes.root}>
      <Typography variant={"h6"} gutterBottom>
        Sign Up
      </Typography>
      <Typography variant={"caption"} gutterBottom>
        register a new user
      </Typography>
      <form className={classes.formWrapper} noValidate autoComplete={"off"}>
        <TextField
          className={classes.formItem}
          label={"Username"}
          value={username}
          onChange={({ currentTarget: { value } }) => setUserName(value)}
          placeholder={"enter your username"}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.formItem}
          label={"Password"}
          value={password}
          onChange={({ currentTarget: { value } }) => setPassword(value)}
          placeholder={"enter you password"}
          InputProps={{
            type: showPassword ? "text" : "password",
            startAdornment: (
              <InputAdornment position={"start"}>
                <LockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <TextField
          className={classes.formItem}
          label={"Confirm Password"}
          value={confirmedPassword}
          onChange={({ currentTarget: { value } }) =>
            setConfirmedPassword(value)
          }
          placeholder={"enter you password"}
          InputProps={{
            type: showPassword ? "text" : "password",
            startAdornment: (
              <InputAdornment position={"start"}>
                <CheckCircleOutline />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Button
        className={classes.loginButton}
        color={"primary"}
        variant={"contained"}
        onClick={onSignUp}
      >
        Sign up
      </Button>
      <div className={`${classes.loginHelper}`}>
        <Typography variant={"caption"}>
          Already have an account? <Link color={"primary"}>Sign in</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Content;
