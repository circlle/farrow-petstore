import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { api as UserApi, MaskUser } from "@server-api/user";
import { useSnackbar } from "notistack";
import Detail from "./Detail";

function My() {
  const history = useHistory();
  const [inited, setInited] = useState(false);
  const [user, setUser] = useState<MaskUser | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const onLogin = () => {
    history.push(`/login`);
  };
  useEffect(() => {
    UserApi.getUserInfo({})
      .then((data) => {
        if (data.type === "GET_USER_INFO_FAIL") {
          // enqueueSnackbar(data.message, { variant: "error" });
        } else if (data.type === "GET_USER_INFO_SUCCESS") {
          setUser(data.user);
        } else {
          enqueueSnackbar("fetch user info unkown error: ", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar("fetch user info unkown error: ", { variant: "error" });
      })
      .finally(() => {
        setInited(true);
      });
  }, []);
  if (!inited) return null;
  if (!user)
    return (
      <Button variant={"contained"} color={"primary"} onClick={onLogin}>
        登录
      </Button>
    );
  return <Detail user={user} setUser={setUser} />;
}

export default My;
