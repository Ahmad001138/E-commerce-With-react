import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import { removeFromCart, clearCart } from "../features/cartSlice";

function Navbar() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [orderSuccess, setOrderSuccess] = React.useState(false);
  const [orderError, setOrderError] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("Cash"); // default

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const ActiveTab = React.useMemo(() => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/Men":
        return 1;
      case "/Women":
        return 2;
      case "/Kids":
        return 3;
      default:
        return false;
    }
  }, [location.pathname]);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const toggleMenuDrawer = () => setMenuOpen(!menuOpen);
  const toggleCartDrawer = () => setCartOpen(!cartOpen);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const address = formData.get("address")?.trim();
    const payment = formData.get("paymentMethod");
    const cardNumber = formData.get("cardNumber")?.trim();

    if (!name || !phone || !address) {
      setOrderError("Please fill in all required fields.");
      return;
    }

    // ✅ Updated Phone Number Validation for exactly 11 digits
    if (phone.length !== 11 || !/^\d+$/.test(phone)) {
      setOrderError("Please enter a valid 11-digit phone number.");
      return;
    }

    if (payment === "Debit Card") {
      if (!cardNumber || cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        setOrderError("Please enter a valid 16-digit card number.");
        return;
      }
    }

    // Process the order
    console.log("Order Submitted:");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Payment Method:", payment);
    if (payment === "Debit Card") {
      console.log("Card Number:", cardNumber);
    }

    // Reset and close
    setOrderError(null);
    setOrderSuccess(true);
    e.target.reset();
    dispatch(clearCart());
    setCartOpen(false);
    setPaymentMethod("Cash");
  };

  return (
    <>
      <AppBar
        sx={{ backgroundColor: 'white' }}
        position="sticky"
        elevation={3}
        className="bg-white shadow-sm"
      >
        <Toolbar className="flex justify-between items-center px-4 py-2">
          <IconButton
            edge="start"
            onClick={toggleMenuDrawer}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <StorefrontIcon className="text-red-600" />
            <Typography variant="h6" className="font-bold text-black">
              SHOPPER
            </Typography>
          </div>

          <Box className="hidden sm:flex">
            <Tabs
              value={ActiveTab}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { backgroundColor: "#FF6600" } }}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  minHeight: 0,
                  color: "gray",
                  fontWeight: "500",
                  mx: 1,
                  transition: "color 0.5s",
                  "&:hover": {
                    color: "#FF6600",
                  },
                },
                "& .Mui-selected": {
                  color: "#FF6600",
                },
              }}
            >
              <Tab label="Shop" component={Link} to="/" />
              <Tab label="Men" component={Link} to="/Men" />
              <Tab label="Women" component={Link} to="/Women" />
              <Tab label="Fashion" component={Link} to="/Kids" />
            </Tabs>
          </Box>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button
                variant="outlined"
                size="small"
                onClick={handleLogout}
                sx={{
                  color: '#FF6600',
                  borderColor: '#FF6600',
                  '&:hover': {
                    backgroundColor: '#CC3D00',
                    color: '#fff',
                    borderColor: '#FF6600',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to="/login"
                sx={{
                  color: '#FF6600',
                  borderColor: '#FF6600',
                  '&:hover': {
                    backgroundColor: '#FF6600',
                    color: '#fff',
                    borderColor: '#FF6600',
                  },
                }}
              >
                Login
              </Button>
            )}

            <IconButton onClick={toggleCartDrawer}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Left Mobile Menu Drawer */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenuDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMenuDrawer}
          onKeyDown={toggleMenuDrawer}
        >
          <div className="flex justify-center items-center gap-2 cursor-pointer my-4">
            <StorefrontIcon className="text-red-600" />
            <Typography variant="h6" className="font-bold text-black">
              SHOPPER
            </Typography>
          </div>

          <Divider />
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => setActiveTab(0)}
            >
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Men"
              onClick={() => setActiveTab(1)}
            >
              <ListItemText primary="Men" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Women"
              onClick={() => setActiveTab(2)}
            >
              <ListItemText primary="Women" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Kids"
              onClick={() => setActiveTab(3)}
            >
              <ListItemText primary="Kids" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Right Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCartDrawer}>
        <Box sx={{ width: 350, p: 2, height: '100vh', overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleCartDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>

          {cartItems.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <>
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.id} alignItems="flex-start" sx={{ py: 1 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 6,
                        marginRight: 12,
                      }}
                    />
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <>
                          Qty: {item.quantity} <br />
                          Price: Rs. {item.price * item.quantity}
                        </>
                      }
                    />
                    <Button
                      size="small"
                      color="error"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))}
              </List>

              <Box className="pt-4 border-t mt-2">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total: Rs. {cartTotal}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  
                  onClick={() => dispatch(clearCart())}
                  sx={{ mt: 2 , backgroundColor:'orangered', }}
                >
                  Clear Cart
                </Button>
              </Box>

              {/* Order Form with Validation */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Place Order
                </Typography>
                <form onSubmit={handleOrderSubmit}>
                  <Box mb={2}>
                    <TextField
                      name="name"
                      label="Your Name"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      fullWidth
                      required
                      variant="outlined"
                      // ✅ Updated inputProps for exactly 11 digits
                      inputProps={{
                        pattern: "\\d{11}", // Exactly 11 digits
                        maxLength: 11,
                        minLength: 11,
                      }}
                      // ✅ Helper text for restriction
                      helperText="Exactly 11 digits required"
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      name="address"
                      label="Delivery Address"
                      fullWidth
                      required
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </Box>

                  <Box mb={2}>
                    <TextField
                      name="paymentMethod"
                      label="Payment Method"
                      select
                      fullWidth
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="Cash">Cash on Delivery</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                      <MenuItem value="EasyPaisa">EasyPaisa</MenuItem>
                    </TextField>
                  </Box>

                  {paymentMethod === "Debit Card" && (
                    <Box mb={2}>
                      <TextField
                        name="cardNumber"
                        label="Card Number"
                        type="text"
                        fullWidth
                        required
                        // Change variant from "outlined" to "standard"
                        variant="standard"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "\\d{16}",
                          maxLength: 16,
                          title: "Please enter a valid 16-digit card number",
                        }}
                        helperText="Exactly 16 digits required"
                      />
                    </Box>
                  )}


                  <button
                    className="bg-orange-600 text-white w-full py-2 rounded hover:bg-orange-700 transition">
                    Order Submit
                  </button>
                </form>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* Snackbar for Success */}
      {orderSuccess && (
        <Snackbar
          open={orderSuccess}
          autoHideDuration={3000}
          onClose={() => setOrderSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOrderSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            🎉 Order Placed Successfully!
          </Alert>
        </Snackbar>
      )}

      {/* Snackbar for Errors */}
      {orderError && (
        <Snackbar
          open={!!orderError}
          autoHideDuration={4000}
          onClose={() => setOrderError(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOrderError(null)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {orderError}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Navbar;