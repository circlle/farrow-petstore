import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
  Collapse,
  Tooltip,
  Chip,
} from "@material-ui/core";
import { Delete, DeleteForever, Done, ExpandMore } from "@material-ui/icons";
import { Order, api as OrderApi } from "@server-api/order";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import type { Action } from "./index";

const useStyle = makeStyles((theme) =>
  createStyles({
    root: { marginTop: theme.spacing(2) },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    cardActions: {
      marginTop: 0,
      paddingTop: 0,
    },
    area: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export type OrderItemProps = {
  order: Order;
  dispatch: React.Dispatch<Action>;
};
function OrderItem({ order, dispatch }: OrderItemProps) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, pet } = order;

  const confirmOrder = async () => {
    if (loading) return;
    try {
      setLoading(true)
      const data = await OrderApi.confirmOrder({ orderId: order.id });
      if (data.type === "CONFIRM_ORDER_FAILED") {
        enqueueSnackbar(data.message, { variant: "warning" });
      } else if (data.type === "CONRIRM_ORDER_SUCCESS") {
        dispatch({ type: "UPDATE_ONE_ORDER", payload: data.order });
        enqueueSnackbar("order confirmed", { variant: "success" });
      } else {
        enqueueSnackbar("unkonwn error", { variant: "error" });
      } 
    } catch (error) {
      enqueueSnackbar("uncatch network error", { variant: "error" });
    }
    setLoading(false)
  };
  const deleteOrder = async () => {
    if (loading) return;
    try {
      setLoading(true)
      const data = await OrderApi.deleteOrder({ orderId: order.id });
      if (data.type === "DELETE_ORDER_FAILED") {
        enqueueSnackbar(data.message, { variant: "warning" });
      } else if (data.type === "DELETE_ORDER_SUCCESS") {
        dispatch({ type: "UPDATE_ONE_ORDER", payload: data.order });
        enqueueSnackbar("order deleted", { variant: "success" });
      } else {
        enqueueSnackbar("unkonwn error", { variant: "error" });
      } 
    } catch (error) {
      enqueueSnackbar("uncatch network error", { variant: "error" });
    }
    setLoading(false)
  };
  const deleteOrderForever = async () => {
    if (loading) return;
    try {
      setLoading(true)
      const data = await OrderApi.deleteOrderForever({ orderId: order.id });
      if (data.type === "DELETE_ORDER_FOREVER_FAILED") {
        enqueueSnackbar(data.message, { variant: "warning" });
      } else if (data.type === "DELETE_ORDER_FOREVER_SUCCESS") {
        dispatch({ type: "DELETE_ONE_ORDER", payload: order.id });
        enqueueSnackbar("order deleted forever", { variant: "success" });
      } else {
        enqueueSnackbar("unkonwn error", { variant: "error" });
      } 
    } catch (error) {
      enqueueSnackbar("uncatch network error", { variant: "error" });
    }
    setLoading(false)
  };

  // todo select a default pet image
  const imageUrl = pet.photos[0]?.url || "default";
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {pet.category?.name?.slice(0, 1) || "P"}
          </Avatar>
        }
        title={pet.name}
        subheader={order.shipDate}
      />
      {order.status !== "DELETED" && (
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={pet.name}
        />
      )}
      <CardContent>
        <Typography className={classes.area} variant={"overline"} gutterBottom>
          {pet.description}
          <Status status={order.status} />
        </Typography>
        <Typography variant={"body1"}>${pet.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        {!(order.status === "CONFIRMED" || order.status === "DELETED") && (
          <IconButton onClick={confirmOrder}>
            <Done color={"secondary"} />
          </IconButton>
        )}
        {order.status !== "DELETED" && (
          <IconButton onClick={deleteOrder}>
            <Delete color={"secondary"} />
          </IconButton>
        )}
        {order.status === "DELETED" && (
          <IconButton onClick={deleteOrderForever}>
            <DeleteForever color={"secondary"} />
          </IconButton>
        )}
        <IconButton
          className={`${classes.expand} ${
            expanded ? classes.expandOpen : undefined
          }`}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Typography variant="body1">Order Date: {order.shipDate}</Typography>
          <Typography variant="body1">User Name: {user.username}</Typography>
          <Typography variant="body1">Baby Name: {pet.name}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function Status(props: { status: Order["status"] }) {
  switch (props.status) {
    case "NEW":
      return <Chip color="primary" label={"To Confirm"} />;
    case "CONFIRMED":
      return <Chip color="secondary" label={"Confirmed"} />;
    case "DELETED":
      return <Chip label={"Deleted"} />;
    default:
      return <Chip label={"UNKNOWN"} />;
  }
}

export default OrderItem;
