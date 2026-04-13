# Admin Panel Documentation

## Overview
The admin panel allows you to manage products in your OEM & ODM store. You can add new products with images, descriptions, and color variations.

## Access
- **Login URL**: `/admin/login`
- **Dashboard URL**: `/admin/dashboard` (protected - requires login)
- **Admin Link**: Available in the header navigation (visible on all pages)

## Default Credentials
- **Username**: `admin`
- **Password**: `admin`

> ⚠️ **Important**: Change these credentials in production (`lib/auth.ts`)

## Features

### 1. Login Page
- Clean, professional login interface
- Username and password authentication
- Error handling for invalid credentials
- Redirect to dashboard on successful login
- Quick access back to store

### 2. Admin Dashboard
- Overview of all products in the system
- Product grid displaying:
  - Product image
  - Product name
  - Category
  - Description (truncated)
  - Available shades with color previews
  - Product ID

### 3. Add Product Form
#### Required Fields:
- **Product Image**: Upload image file (JPEG, PNG, WebP, GIF)
  - Max size: 5MB
  - Image preview after upload
- **Product Name**: Name of the product (e.g., "Velvet Matte Lipstick")
- **Category**: Select from predefined categories:
  - Lips
  - Eyes
  - Face
  - Skincare
  - Eye Shadow
  - Highlighter
  - Primer
- **Description**: Detailed product description
- **Shades & Colors**: 
  - Add multiple shade options
  - Specify shade names (e.g., "Ruby Red")
  - Select color using color picker
  - Add/remove shades dynamically

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout and destroy session

### Products
- `GET /api/products` - Fetch all products (admin only)
- `POST /api/products` - Create new product (admin only)

### Upload
- `POST /api/upload` - Upload product image (admin only)
  - Accepts: JPEG, PNG, WebP, GIF
  - Max size: 5MB
  - Returns image URL for use in product

## Session Management
- Sessions are stored in HTTP-only cookies
- Session duration: 24 hours
- Automatic redirect to login if session expires
- Secure cookie configuration for production

## Image Upload
- Images are saved to `/public/images/products/`
- Unique filenames prevent conflicts
- Images can be accessed immediately after upload
- URL returned in format: `/images/products/[filename]`

## Data Storage
Current implementation uses in-memory storage for products. To persist data in production:
1. Migrate to a database (PostgreSQL, MongoDB, etc.)
2. Update `/api/products` endpoint
3. Store uploaded images in cloud storage (AWS S3, Vercel Blob, etc.)

## Security Considerations
1. **Change Default Credentials**: Update `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `lib/auth.ts`
2. **HTTPS Only**: Ensure the site uses HTTPS in production
3. **Session Expiry**: Configure session duration based on your needs
4. **Input Validation**: All inputs are validated on both client and server
5. **File Upload Restrictions**:
   - Only images allowed
   - Maximum 5MB file size
   - Safe filename generation

## Troubleshooting

### Login Issues
- Verify credentials are correct (case-sensitive)
- Check browser cookies are enabled
- Clear browser cache and try again

### Upload Issues
- Ensure file is an image (JPEG, PNG, WebP, GIF)
- Check file size doesn't exceed 5MB
- Verify `/public/images/products/` directory exists

### Session Expired
- You'll be automatically redirected to login
- Create a new session by logging in again

## Future Enhancements
- Edit/delete products
- User account management
- Product analytics
- Database integration
- Cloud storage for images
- Role-based access control
