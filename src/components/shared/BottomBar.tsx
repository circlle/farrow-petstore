import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  CategoryOutlined,
  PersonOutlined,
  ReorderOutlined,
  ShoppingCartOutlined,
  StarOutlineOutlined,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { AppBar, makeStyles, Paper, Tab, Tabs } from "@material-ui/core";

export type TabConfig = {
  path: string;
  icon: OverridableComponent<any>;
  label: string;
};
const TabConfigList: TabConfig[] = [
  { path: "/", icon: StarOutlineOutlined, label: "Home" },
  { path: "/order", icon: ReorderOutlined /*ShoppingCartOutlined*/, label: "Order" },
  { path: "/my", icon: PersonOutlined, label: "Mine" },
];
const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
}));

function BottomBar() {
  const classes = useStyles();
  const location = useLocation();
  const [indicator, setIndicator] = useState(location.pathname);

  const inTabs = TabConfigList.some(
    (config) => config.path === location.pathname
  );
  if (!inTabs) return null;

  return (
    <AppBar position={"fixed"} color={"primary"} className={classes.appBar}>
      <Paper square className={classes.root}>
        <Tabs
          value={indicator}
          onChange={(_, newValue) => setIndicator(newValue)}
          variant={"fullWidth"}
          indicatorColor={"secondary"}
          textColor={"secondary"}
        >
          {TabConfigList.map((tabConfig) => {
            return (
              <Tab
                key={tabConfig.path}
                value={tabConfig.path}
                component={Link}
                to={tabConfig.path}
                icon={<tabConfig.icon />}
                label={tabConfig.label}
              />
            );
          })}
        </Tabs>
      </Paper>
    </AppBar>
  );
}

export default BottomBar;
