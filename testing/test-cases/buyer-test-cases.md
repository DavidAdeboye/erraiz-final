# Buyer Role Test Cases

## 1. User Registration and Authentication

### 1.1 User Registration
- **TC-B-001**: Register with valid information
- **TC-B-002**: Attempt registration with existing email
- **TC-B-003**: Attempt registration with invalid email format
- **TC-B-004**: Attempt registration with weak password
- **TC-B-005**: Verify email verification process

### 1.2 User Login
- **TC-B-006**: Login with valid credentials
- **TC-B-007**: Attempt login with invalid credentials
- **TC-B-008**: Test password reset functionality
- **TC-B-009**: Test remember me functionality
- **TC-B-010**: Test account lockout after multiple failed attempts

### 1.3 Social Login
- **TC-B-011**: Login with Google account
- **TC-B-012**: Login with Facebook account
- **TC-B-013**: Link social account to existing account

## 2. Product Browsing and Search

### 2.1 Category Navigation
- **TC-B-014**: Browse products by main categories
- **TC-B-015**: Navigate through subcategories
- **TC-B-016**: Test breadcrumb navigation

### 2.2 Search Functionality
- **TC-B-017**: Search for products with exact keywords
- **TC-B-018**: Search with partial keywords
- **TC-B-019**: Search with misspelled keywords
- **TC-B-020**: Test advanced search filters
- **TC-B-021**: Test search result pagination

### 2.3 Product Listing
- **TC-B-022**: Test product sorting (price, popularity, etc.)
- **TC-B-023**: Test product filtering by attributes
- **TC-B-024**: Verify product information display
- **TC-B-025**: Test quick view functionality

## 3. Product Details

### 3.1 Product Information
- **TC-B-026**: Verify complete product information display
- **TC-B-027**: Test product image gallery
- **TC-B-028**: Verify product variant selection
- **TC-B-029**: Test product availability status

### 3.2 Product Reviews
- **TC-B-030**: View product reviews
- **TC-B-031**: Sort and filter reviews
- **TC-B-032**: Submit product review (text only)
- **TC-B-033**: Submit product review with rating
- **TC-B-034**: Submit product review with images

## 4. Shopping Cart

### 4.1 Cart Management
- **TC-B-035**: Add product to cart
- **TC-B-036**: Update product quantity in cart
- **TC-B-037**: Remove product from cart
- **TC-B-038**: Test cart persistence across sessions
- **TC-B-039**: Test cart synchronization across devices

### 4.2 Cart Functionality
- **TC-B-040**: Apply valid coupon code
- **TC-B-041**: Attempt to apply invalid coupon code
- **TC-B-042**: Test cart total calculation
- **TC-B-043**: Test tax calculation
- **TC-B-044**: Test shipping cost calculation

## 5. Checkout Process

### 5.1 Shipping Information
- **TC-B-045**: Add new shipping address
- **TC-B-046**: Edit existing shipping address
- **TC-B-047**: Select from saved addresses
- **TC-B-048**: Test address validation

### 5.2 Shipping Method
- **TC-B-049**: Select different shipping methods
- **TC-B-050**: Verify shipping cost updates
- **TC-B-051**: Test shipping restrictions by location

### 5.3 Payment Processing
- **TC-B-052**: Pay with credit card
- **TC-B-053**: Pay with PayPal
- **TC-B-054**: Pay with bank transfer
- **TC-B-055**: Test payment error handling
- **TC-B-056**: Verify order confirmation

## 6. Order Management

### 6.1 Order Tracking
- **TC-B-057**: View order history
- **TC-B-058**: Track order status
- **TC-B-059**: View order details
- **TC-B-060**: Download invoice

### 6.2 Order Actions
- **TC-B-061**: Cancel order (when eligible)
- **TC-B-062**: Request return/refund
- **TC-B-063**: Add review after purchase
- **TC-B-064**: Reorder previous purchase

## 7. Wishlist

### 7.1 Wishlist Management
- **TC-B-065**: Add product to wishlist
- **TC-B-066**: Remove product from wishlist
- **TC-B-067**: Move product from wishlist to cart
- **TC-B-068**: Share wishlist

## 8. User Account Management

### 8.1 Profile Management
- **TC-B-069**: Update personal information
- **TC-B-070**: Change password
- **TC-B-071**: Update communication preferences

### 8.2 Address Book
- **TC-B-072**: Add multiple addresses
- **TC-B-073**: Edit existing address
- **TC-B-074**: Delete address
- **TC-B-075**: Set default address

### 8.3 Payment Methods
- **TC-B-076**: Add payment method
- **TC-B-077**: Edit payment method
- **TC-B-078**: Delete payment method
- **TC-B-079**: Set default payment method

## 9. Multi-Currency Support

### 9.1 Currency Selection
- **TC-B-080**: Change currency
- **TC-B-081**: Verify price conversion
- **TC-B-082**: Test currency persistence

## 10. Responsive Design

### 10.1 Device Compatibility
- **TC-B-083**: Test on desktop (various resolutions)
- **TC-B-084**: Test on tablet (portrait and landscape)
- **TC-B-085**: Test on mobile phone (various sizes)

### 10.2 Functionality Across Devices
- **TC-B-086**: Verify navigation menu on mobile
- **TC-B-087**: Test checkout process on mobile
- **TC-B-088**: Test product filtering on mobile
