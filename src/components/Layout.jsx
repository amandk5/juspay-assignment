import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
  Input,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  KeyboardArrowRight,
  ExpandLess,
  ExpandMore,
  FolderOutlined,
  AccountCircleOutlined,
  StarBorderOutlined,
  HistoryOutlined,
  ViewModuleOutlined,
  SchoolOutlined,
  ArticleOutlined,
  PeopleOutlined,
  CorporateFareOutlined,
  SocialDistanceOutlined,
  ShoppingCart,
  StarOutline,
  Sunny,
  NotificationsNoneOutlined,
  ViewSidebarOutlined,
  SunnySnowing,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import Path from "./Path";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchBar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/themeSlice";

const drawerWidth = 240;

// Helper for ListItemButton with selection and navigation
const NavListItem = ({
  icon,
  text,
  to,
  selected,
  onClick,
  sx = {},
  primaryTypographyProps = {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        onClick={onClick || (to ? () => navigate(to) : undefined)}
        sx={{
          py: 0.5,
          pl: 1,
          borderLeft: selected ? "3px solid #1976d2" : "none",
          bgcolor: selected ? "rgba(25, 118, 210, 0.08)" : "transparent",
          ...sx,
        }}
      >
        <ListItemIcon sx={{ minWidth: 24 }}>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: "13px",
            color: selected ? "#1976d2" : "text.primary",
            ...primaryTypographyProps,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

// Helper for rendering a list of items
const RenderList = ({ items, theme }) => (
  <List dense sx={{ py: 0.5, color: theme === "light" ? "black" : "white" }}>
    {items.map((item, idx) =>
      item.type === "divider" ? (
        <Divider key={idx} />
      ) : (
        <NavListItem key={idx} {...item} />
      )
    )}
  </List>
);

// Helper for collapsible section
const CollapsibleSection = ({
  open,
  handleToggle,
  icon,
  label,
  children,
  sx = {},
  theme,
}) => (
  <>
    <ListItem
      disablePadding
      // sx={{ color: theme == "light" ? "black" : "white" }}
    >
      <ListItemButton onClick={handleToggle} sx={{ py: 0.5, pl: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 20 }}>
          {open ? (
            <ExpandLess fontSize="small" />
          ) : (
            <ExpandMore fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ fontSize: "13px", fontWeight: 500 }}
        />
      </ListItemButton>
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding dense sx={sx}>
        {children}
      </List>
    </Collapse>
  </>
);

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(true);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.themes);
  const [isLight, setIsLight] = useState(theme === "light");
  console.log("Current theme:", theme);

  // Data for sections
  const favoritesList = [
    {
      icon: (
        <Box
          sx={{
            width: 4,
            height: 4,
            bgcolor: "text.secondary",
            borderRadius: "50%",
          }}
        />
      ),
      text: "Overview",
    },
    {
      icon: (
        <Box
          sx={{
            width: 4,
            height: 4,
            bgcolor: "text.secondary",
            borderRadius: "50%",
          }}
        />
      ),
      text: "Projects",
    },
  ];

  const dashboardsList = [
    {
      icon: <DashboardIcon fontSize="small" />,
      text: "Dashboard",
      to: "/dashboard",
      selected: location.pathname === "/dashboard" || location.pathname === "/",
      sx: { pl: 4 },
    },
    {
      icon: <ShoppingCart fontSize="small" />,
      text: "eCommerce",
      sx: { pl: 4 },
    },
    {
      icon: <FolderOutlined fontSize="small" />,
      text: "Projects",
      sx: { pl: 4 },
    },
    {
      icon: <SchoolOutlined fontSize="small" />,
      text: "Online Courses",
      sx: { pl: 4 },
    },
  ];

  const pagesCollapsibleList = [
    {
      icon: <ViewModuleOutlined fontSize="small" />,
      text: "Overview",
      sx: { pl: 4 },
    },
    {
      icon: <FolderOutlined fontSize="small" />,
      text: "Projects",
      sx: { pl: 4 },
    },
    {
      icon: <ArticleOutlined fontSize="small" />,
      text: "Campaigns",
      sx: { pl: 4 },
    },
    {
      icon: <ArticleOutlined fontSize="small" />,
      text: "Documents",
      sx: { pl: 4 },
    },
    {
      icon: <PeopleOutlined fontSize="small" />,
      text: "Followers",
      sx: { pl: 4 },
    },
  ];

  const pagesList = [
    {
      icon: <AccountCircleOutlined fontSize="small" />,
      text: "Orders",
      to: "/orders",
      selected: location.pathname === "/orders",
    },
    {
      icon: <CorporateFareOutlined fontSize="small" />,
      text: "Corporate",
    },
    {
      icon: <ArticleOutlined fontSize="small" />,
      text: "Blog",
    },
    {
      icon: <SocialDistanceOutlined fontSize="small" />,
      text: "Social",
    },
  ];

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        bgcolor: theme === "light" ? "#f8f9fa" : "#303030",
        height: "100vh",
        color: theme === "light" ? "black" : "white",
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#1976d2" }}>
          <PersonIcon fontSize="small" />
        </Avatar>
        <Typography variant="subtitle1" fontWeight="600">
          ByeWind
        </Typography>
      </Box>

      {/* Recently Section */}
      <Box
        sx={{
          px: 2,
          pb: 1,

          color: theme == "light" ? "black" : "white",
        }}
      >
        <Box sx={{ pb: 1, display: "flex", gap: 3 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "11px", fontWeight: 500 }}
          >
            Favorites
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "11px", fontWeight: 500 }}
          >
            Recently
          </Typography>
        </Box>
        <RenderList items={favoritesList} theme={theme} />
      </Box>

      {/* Dashboards Section */}
      <Box
        sx={{
          px: 2,
          pb: 1,
          textAlign: "left",
          color: theme == "light" ? "black" : "white",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: "11px",
            fontWeight: 500,
            color: theme == "light" ? "black" : "white",
          }}
        >
          Dashboards
        </Typography>
        <List
          dense
          sx={{ py: 0.5, color: theme == "light" ? "black" : "white" }}
        >
          <CollapsibleSection
            theme={theme}
            open={dashboardsOpen}
            handleToggle={() => setDashboardsOpen((o) => !o)}
            label="Default"
          >
            {dashboardsList.map((item, idx) => (
              <NavListItem key={idx} {...item} />
            ))}
          </CollapsibleSection>
        </List>
      </Box>

      {/* Pages Section */}
      <Box sx={{ px: 2, pb: 1, textAlign: "left" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: "11px", fontWeight: 500 }}
        >
          Pages
        </Typography>
        <List dense sx={{ py: 0.5 }}>
          <CollapsibleSection
            open={pagesOpen}
            handleToggle={() => setPagesOpen((o) => !o)}
            label="User Profile"
          >
            {pagesCollapsibleList.map((item, idx) => (
              <NavListItem key={idx} {...item} />
            ))}
          </CollapsibleSection>
          {pagesList.map((item, idx) => (
            <NavListItem key={idx} {...item} />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: isDesktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          ml: { sm: isDesktopOpen ? `${drawerWidth}px` : "" },
          bgcolor: theme == "light" ? "white" : "#1e1e1e",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            color: theme == "light" ? "black" : "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen((o) => !o)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <MenuOpenIcon
              onClick={() => setIsDesktopOpen((o) => !o)}
              sx={{ cursor: "pointer" }}
            />
            <StarOutline sx={{ cursor: "pointer" }} />
            <Path color={theme} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <SearchBar />
            {isLight ? (
              <Sunny
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setIsLight(theme === "light" ? false : true);
                  dispatch(setTheme("dark"));
                }}
              />
            ) : (
              <SunnySnowing
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setIsLight(theme === "light" ? false : true);
                  dispatch(setTheme("light"));
                }}
              />
            )}
            <RestoreIcon />
            <NotificationsNoneOutlined />
            <ViewSidebarOutlined
              onClick={() => setIsDesktopOpen((o) => !o)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          flexShrink: { sm: 0 },
          display: isDesktopOpen ? "block" : "none",
          overflowX: "hidden",
          backgroundColor: theme == "light" ? "#f8f9fa" : "#1e1e1e",
          color: theme == "light" ? "black" : "white",
        }}
        aria-label="navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen((o) => !o)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
              backgroundColor: theme == "light" ? "#f8f9fa" : "#1e1e1e",
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
              border: "none",
              backgroundColor: theme == "light" ? "#f8f9fa" : "#1e1e1e",
            },
          }}
          open={isDesktopOpen}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: isDesktopOpen ? `calc(100% - ${drawerWidth}px)` : "" },
          mt: 8,
          pl: 8,
          bgcolor: "#fafafa",
          minHeight: "100vh",
          background: theme == "light" ? "#fafafa" : "#121212",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
