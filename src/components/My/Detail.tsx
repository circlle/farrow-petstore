import { Button, Typography } from "@material-ui/core";
import { MaskUser } from "@server-api/user";
import React from "react";
import Cookies from "js-cookie";
import { TOKEN_FILED } from "@client-constant";

export type Detailprops = {
  user: MaskUser;
  setUser: (user: MaskUser | null) => void
};

function Detail(props: Detailprops) {
  const signOut = () => {
    Cookies.remove(TOKEN_FILED);
    props.setUser(null)
  };
  return (
    <div>
      <Typography gutterBottom>Hi! {props.user.username}</Typography>
      <Button onClick={signOut} variant="contained" color={"primary"}>
        Sign out
      </Button>
    </div>
  );
}

export default Detail;
