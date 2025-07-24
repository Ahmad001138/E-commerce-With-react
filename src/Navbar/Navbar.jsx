import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
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
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MenuIcon from "@mui/icons-material/Menu";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { useLocation } from "react-router-dom";





function Navbar() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false); // ✅ for mobile menu drawer
  const [cartOpen, setCartOpen] = React.useState(false); // ✅ for cart drawer
  const [orderSuccess, setOrderSuccess] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("Cash"); // default
  const formRef = React.useRef();

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

  return (
    <>
      <AppBar
      sx={{backgroundColor:'white'}}
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
            <>

              <Button
                variant="outlined"
                size="small"
                onClick={handleLogout}
                sx={{
                  color: '#FF6600', // Orange text
                  borderColor: '#FF6600', // Orange border
                  '&:hover': {
                    backgroundColor: '#CC3D00', // Orange background on hover
                    color: '#fff',              // White text on hover
                    borderColor: '#FF6600',     // Keep border orange
                  },
                }}
              >
                Logout
              </Button>

            </>
          ) : (
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to="/login"
              sx={{
                color: '#FF6600', // Orange text
                borderColor: '#FF6600', // Orange border
                '&:hover': {
                  backgroundColor: '#FF6600', // Orange background on hover
                  color: '#fff',              // White text on hover
                  borderColor: '#FF6600',     // Keep border orange
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
    </AppBar >

      {/* Left Mobile Menu Drawer */ }
      < Drawer anchor = "left" open = { menuOpen } onClose = { toggleMenuDrawer } >
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
      </Drawer >

    {/* Right Cart Drawer */ }
    < Drawer anchor = "right" open = { cartOpen } onClose = { toggleCartDrawer } >
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Your Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  alignItems="flex-start"
                  sx={{ py: 1 }}
                >
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
                color="error"
                onClick={() => dispatch(clearCart())}
                sx={{ mt: 2 }}
              >
                Clear Cart
              </Button>
            </Box>

            {/* Order Form */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Place Order
              </Typography>
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const name = formData.get("name");
                  const phone = formData.get("phone");
                  const address = formData.get("address");
                  const payment = formData.get("paymentMethod");
                  const cardNumber = formData.get("cardNumber");

                  // ✅ Show form data in the console
                  console.log("Order Submitted:");
                  console.log("Name:", name);
                  console.log("Phone:", phone);
                  console.log("Address:", address);
                  console.log("Payment Method:", payment);
                  if (payment === "Debit Card") {
                    console.log("Card Number:", cardNumber);
                  }

                  // Optional: send to backend here

                  setOrderSuccess(true);
                  formRef.current.reset();
                  dispatch(clearCart());
                  setCartOpen(false);
                  setPaymentMethod("Cash");
                }}
              >

                <Box mb={2}>
                  <input
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-2 border rounded"
                  />
                </Box>
                <Box mb={2}>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    type="tel"
                    required
                    className="w-full p-2 border rounded"
                  />
                </Box>
                <Box mb={2}>
                  <textarea
                    name="address"
                    placeholder="Delivery Address"
                    required
                    className="w-full p-2 border rounded resize-none"
                    rows={3}
                  />
                </Box>

                {/* Payment Method */}
                <Box mb={2}>
                  <select
                    name="paymentMethod"
                    className="w-full p-2 border rounded"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Cash">Cash on Delivery</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="EasyPaisa">EasyPaisa</option>
                  </select>
                </Box>

                {/* Show card number only if Debit Card is selected */}
                {paymentMethod === "Debit Card" && (
                  <Box mb={2}>
                    <input
                      name="cardNumber"
                      placeholder="Card Number"
                      type="number"
                      required
                      className="w-full p-2 border rounded"
                    />
                  </Box>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit Order
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
      </Drawer >

    { orderSuccess && (
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
    )
}
    </>
  );
}

export default Navbar;
