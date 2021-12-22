import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MintView from "../MintView";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    padding: 10
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  spacing: value => value ** 2,
}));

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography>Web3 Test</Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Route exact path="/" component={MintView} />
        </Router>
      </Box>
    </Box>
  );
};

export default App;
