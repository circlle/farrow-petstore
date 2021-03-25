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
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { api as UserApi } from "@server-api/user";
import { TOKEN_FILED } from "@client-constant"

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
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onClickLogin = async () => {
    const { data } = await UserApi.login({ username, password });
    switch (data.__typename) {
      case "LOGIN_SUCCESS": {
        Cookies.set(TOKEN_FILED, data.token);
        history.goBack()
        break;
      }
      case "PASSWORD_ERROR":
      case "USER_NOT_FOUND": {
        console.log("login failed", data.message)
        break;
      }
      default:
        break;
    }
  };
  return (
    <div className={classes.root}>
      <Typography variant={"h6"} gutterBottom>
        Login
      </Typography>
      <Typography variant={"caption"} gutterBottom>
        Enter your username and password
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
      </form>
      <Button
        className={classes.loginButton}
        color={"primary"}
        variant={"contained"}
        onClick={onClickLogin}
      >
        Login
      </Button>
      <div className={`${classes.loginHelper}`}>
        <Typography variant={"caption"}>
          Don't have an account? <Link color={"primary"}>Sign up</Link>
        </Typography>
        <Typography variant={"body2"}>
          <Link color={"secondary"}>Forgot password</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Content;
