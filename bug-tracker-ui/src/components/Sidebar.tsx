import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Settings,
  BugReport,
  AccountTree,
} from "@mui/icons-material";
import { Container } from "@mui/material";
const drawerWidth = 240;

const pages = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Dashboard />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <AccountTree />,
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: <BugReport />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings />,
  },
];

function Sidebar({ window }: { window: any }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageHeader, setPageHeader] = useState("Dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageHeader = () => {
    const path = location.pathname;
    const page = pages.find((page) => page.path === path);
    if (page) {
      setPageHeader(page.name);
    }
  };

  useEffect(() => {
    handlePageHeader();
  }, [location.pathname]);

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <List>
        <ListItemButton>
          {/* <ListItemIcon>
            <Dashboard />
          </ListItemIcon> */}
          <ListItemText primary="LOGO" />
        </ListItemButton>
        <List component="div" disablePadding>
          {pages.map((page) => (
            <div key={page.name}>
              <Link
                to={page.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setPageHeader(page.name)}>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageHeader}
          </Typography>

          <Box>
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          width: { sm: "100%" },
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
