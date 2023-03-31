import { useGlobalContext } from "@/contexts";
import { API } from "@/libs/api";
import {
  Container,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Grid,
  TextField,
  Snackbar,
} from "@mui/material";
import type { Product, Translation } from "@prisma/client";
import React, { useEffect, useState } from "react";

export const Products = () => {
  const { accessToken } = useGlobalContext();
  const [products, setProducts] = useState<
    (Product & {
      title: Translation;
    })[]
  >([]);

  async function refresh() {
    if (accessToken.current) {
      const result = await API.findProducts(accessToken.current);

      if (!result.success) return location.reload();
      setProducts(result?.data?.products ?? []);
    }
  }
  useEffect(() => {
    refresh();
  }, [accessToken]);

  return (
    <Container>
      <Typography variant="h4" marginTop={"8px"}>
        Products
      </Typography>
      <Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Product Title (TH)</TableCell>
                <TableCell align="right">Product Title (EN)</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      width={"120px"}
                      height={"120px"}
                      style={{
                        objectFit: "cover",
                      }}
                      src={product.imageUrl}
                    />
                  </TableCell>
                  <TableCell align="right">{product.title.contentTH}</TableCell>
                  <TableCell align="right">{product.title.contentEN}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    <EditButton product={product} refresh={refresh} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EditButton = ({
  product,
  refresh,
}: {
  product: Product & {
    title: Translation;
  };
  refresh: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [titleTH, setTitleTH] = useState(product.title.contentTH);
  const [titleEN, setTitleEN] = useState(product.title.contentEN);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const { accessToken, tokenPayload } = useGlobalContext();

  const updateProduct = async () => {
    if (!accessToken.current) return location.reload();
    try {
      await API.updateProduct(accessToken.current, product.id, {
        titleTH,
        titleEN,
        description,
        price,
      });
      await refresh();
      setIsAlert(true);
      setOpen(false);
    } catch (error) {}
  };

  return (
    <>
      <Snackbar
        open={isAlert}
        autoHideDuration={3000}
        message="Product Updated"
      />
      <Button
        disabled={!tokenPayload?.permission.includes("WRITE")}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <img
              width={"120px"}
              height={"120px"}
              style={{
                objectFit: "cover",
              }}
              src={product.imageUrl}
            />
            <Button onClick={updateProduct}>Update</Button>
          </Box>
          <Grid container columns={{ xl: 2 }} rowGap={"8px"}>
            <Grid item xl={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Product title (Thai)
              </Typography>
            </Grid>
            <Grid item xl={1}>
              <TextField
                value={titleTH}
                onChange={(e) => setTitleTH(e.target.value)}
                label="product title"
                variant="outlined"
              />
            </Grid>
            <Grid item xl={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Product title (English)
              </Typography>
            </Grid>
            <Grid item xl={1}>
              <TextField
                value={titleEN}
                onChange={(e) => setTitleEN(e.target.value)}
                label="product title"
                variant="outlined"
              />
            </Grid>
            <Grid item xl={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Price
              </Typography>
            </Grid>
            <Grid item xl={1}>
              <TextField
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                label="product title"
                variant="outlined"
              />
            </Grid>
            <Grid item xl={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Description
              </Typography>
            </Grid>
            <Grid item xl={1}>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                label="product title"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
