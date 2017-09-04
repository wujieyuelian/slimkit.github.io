import React, { Component } from 'react';

// React Router.
import withRouter from 'react-router/withRouter';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';

// Material UI
import withStyles from 'material-ui/styles/withStyles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { styles as ToolbarStyles } from 'material-ui/Toolbar/Toolbar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

// Icons
import GitHubIcon from './icons/GitHub';

// Component
import NoMatch from './NoMatch';
import AppMenu from './AppMenu';
import Footer from './Footer';
import AppHome from './containers/AppHome';
// import AppHome from './AppHome';
import Core from './core';

const styles = theme => {

  // Get ToolBar min height.
  const xs = `${theme.breakpoints.up('xs')} and (orientation: landscape)`;
  const sm = theme.breakpoints.up('sm');
  const { root: {
    minHeight: ToolbarMinHeight,
    [xs]: {
      minHeight: ToolbarMinHeightXS,
    },
    [sm]: {
      minHeight: ToolbarMinHeightSM,
    }
  }} = ToolbarStyles(theme);

  return {
    flex: {
      flex: 1
    },
    root: {
      width: '100%',
      marginTop: ToolbarMinHeight,
      [xs]: {
        marginTop: ToolbarMinHeightXS
      },
      [sm]: {
        marginTop: ToolbarMinHeightSM
      }
    },
    homeRoot: {
      marginTop: 0,
      [xs]: { marginTop: 0 },
      [sm]: { marginTop: 0 }
    },
    homeAppBar: {
      boxShadow: 'none',
      backgroundColor: 'transparent'
    }
  };
};

class App extends Component {

  /**
   * Render the component.
   *
   * @return {Node}
   * @author Seven Du <shiweidu@outlook.com>
   */
  render() {

    const { classes } = this.props;

    return (
      <div className={this.getRootClassName()}>
        <AppBar position="fixed" className={this.getAppBarClassName()}>
          <Toolbar>
            <AppMenu />
            <Typography type="title" color="inherit" className={classes.flex} />

            <IconButton
              component="a"
              href="https://github.com/slimkit/thinksns-plus"
              aria-label="访问 ThinkSNS+ 仓库"
              alt="访问 ThinkSNS+ 仓库"
              target="_blank"
            >
              <GitHubIcon color="#fff" />
            </IconButton>

          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/" component={AppHome} />
          <Route path="/core" component={Core} />
          <Route component={NoMatch} />
        </Switch>

        <Footer />

      </div>
    );
  }

  /**
   * Get root class name.
   *
   * @return {String}
   * @author Seven Du <shiweidu@outlook.com>
   */
  getRootClassName() {
    const { classes, match } = this.props;

    if (match.path === '/'  && match.isExact === true) {
      return `${classes.root} ${classes.homeRoot}`;
    }

    return classes.root;
  }

  /**
   * Get app bar component class name.
   *
   * @return {String|void}
   * @author Seven Du <shiweidu@outlook.com>
   */
  getAppBarClassName() {
    const { classes, match } = this.props;

    if (match.path === '/' && match.isExact === true) {
      return classes.homeAppBar;
    }
  }
}

export default withStyles(styles, { name: 'app' }) (
  withRouter(App)
);