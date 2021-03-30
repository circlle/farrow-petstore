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
import { Delete, Done, ExpandMore } from "@material-ui/icons";
import { Order } from "@server-api/order";
import React, { useState } from "react";

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
      justifyContent: "space-between"
    }
  })
);

export type OrderItemProps = {
  order: Order;
};
function OrderItem({ order }: OrderItemProps) {
  const classes = useStyle();
  const [expanded, setExpanded] = useState(false);
  const { user, pet } = order;

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
      <CardMedia className={classes.media} image={imageUrl} title={pet.name} />
      <CardContent>
        <Typography className={classes.area} variant={"overline"} gutterBottom>
          {pet.description}
          <Status status={order.status} />
        </Typography>
        <Typography variant={"body1"}>${pet.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton>
          <Tooltip title="confirm this order">
            <Done color={"secondary"} />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Tooltip title="confirm this order">
            <Delete color={"secondary"} />
          </Tooltip>
        </IconButton>
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
      return <Chip color="primary" label={"To Confirm"} />
    case "CONFIRMED":
      return <Chip color="secondary" label={"Confirmed"} />
    case "DELETED":
      return <Chip label={"Deleted"} />
    default:
      return <Chip label={'UNKNOWN'} />
  }
}

export default OrderItem;
