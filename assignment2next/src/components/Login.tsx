import { useGlobalContext } from "@/contexts";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export const Login = () => {
  const { login } = useGlobalContext();
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box
      paddingTop={"16px"}
      maxWidth={"md"}
      marginLeft={"auto"}
      marginRight={"auto"}
    >
      <form>
        <Grid container columns={{ xl: 5 }} rowGap={"8px"}>
          <Grid item xs={1}>
            <Typography>Username/Email:</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Username/Email"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography>Password:</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={async () => {
            const success = await login(username, password);
            setIsError(!success)
          }}
        >
          Login
        </Button>
        {isError && <Alert severity="error">Wrong Username or Password!</Alert>}
      </form>
    </Box>
  );
};
