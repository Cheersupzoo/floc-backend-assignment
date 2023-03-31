import { useGlobalContext } from "@/contexts";
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import React from "react";

export const Header = () => {
  const { isLogin, logout, tokenPayload } = useGlobalContext();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CartCart
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
            {isLogin ? (
              <>
                <Typography
                  marginRight={"8px"}
                  sx={{ color: grey[400] }}
                  marginY={"auto"}
                >
                  User: {tokenPayload?.username} Email: {tokenPayload?.email}
                </Typography>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {tokenPayload?.username.slice(0, 1)}
                </Avatar>
                <Button onClick={logout} sx={{ color: "white" }}>
                  Logout
                </Button>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
