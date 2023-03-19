import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface Props {
  window?: () => Window;
  toggleColorMode: () => void;
}

const drawerWidth = 240;
const navItems: string[] = [];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ my: 2 }} fontFamily={"Expletus Sans"}>
        Hokmah
      </Typography>
      <List>
        <Divider />

        {navItems.map((item) => (
          <React.Fragment key={item}>
            <ListItem disablePadding>
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                color={theme.palette.mode === "light" ? "primary" : "inherit"}
                style={{ width: "100%", height: "100%" }}
                passHref
                aria-label={item}
              >
                <ListItemButton sx={{ textAlign: "center", height: 70 }}>
                  <ListItemText>{item}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <AppBar
        position="sticky"
        style={{
          boxShadow: "none",
        }}
      >
        <Toolbar
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flex: "row",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <Image
                priority
                src="/apple-touch-icon.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </Link>
            <Typography fontSize={35} marginLeft={2}>
              Hokmah
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                color={theme.palette.mode === "light" ? "primary" : "inherit"}
                style={{ padding: 10 }}
              >
                {item}
              </Link>
            ))}
          </Box>
          <Box>
            <IconButton
              sx={{ ml: 1 }}
              onClick={props.toggleColorMode}
              aria-label={
                theme.palette.mode === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              color={theme.palette.mode === "light" ? "primary" : "inherit"}
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>
          </Box>
          {navItems.length > 0 && (
            <IconButton
              color={theme.palette.mode === "light" ? "primary" : "inherit"}
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
