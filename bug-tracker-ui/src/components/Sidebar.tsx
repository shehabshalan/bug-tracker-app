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
  AccountCircle,
} from "@mui/icons-material";
import { Container, Divider } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";
const drawerWidth = 240;

const ADMIN_PAGES = [
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
    name: "Members",
    path: "/members",
    icon: <Settings />,
  },
];

const USER_PAGES = [
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
];

function Sidebar() {
  const { logout, getUserRole, user } = useAuthContext();

  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageHeader, setPageHeader] = useState("Dashboard");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageHeader = () => {
    const path = location.pathname;
    const pageAdmin = ADMIN_PAGES.find((page) => page.path === path);
    if (pageAdmin) {
      setPageHeader(pageAdmin.name);
    }
    const pagesUser = USER_PAGES.find((page) => page.path === path);
    if (pagesUser) {
      setPageHeader(pagesUser.name);
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
          <ListItemIcon>
            <AccountCircle color="secondary" fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h6" color="secondary">
                {JSON.parse(user as string).name}
              </Typography>
            }
          />
        </ListItemButton>
        <Divider />

        {getUserRole() === "admin" ? (
          <List component="div" disablePadding>
            {ADMIN_PAGES.map((page) => (
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
        ) : (
          <List component="div" disablePadding>
            {USER_PAGES.map((page) => (
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
        )}
      </List>
    </div>
  );

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

export default Sidebar;
