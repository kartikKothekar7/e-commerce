# Product Seeding Script

This script migrates all static product data from the frontend assets folder to MongoDB, uploading images to Cloudinary in the process.

## What it does

1. **Reads product data** - Takes all 52 products from the assets.js file
2. **Uploads images to Cloudinary** - Uploads all product images to your Cloudinary account
3. **Saves to MongoDB** - Stores product data with Cloudinary image URLs in the database
4. **Clears old data** - Removes any existing products before seeding

## Prerequisites

Make sure you have:

- Backend server dependencies installed (`npm install` in backend folder)
- MongoDB connection string in `.env` as `MONGODB_URI`
- Cloudinary credentials in `.env`:
  - `CLOUDINARY_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

## How to Run

1. **From backend directory:**

   ```bash
   npm run seed
   ```

   Or directly:

   ```bash
   node scripts/seedProducts.js
   ```

2. **Monitor the output** - The script will:
   - Show each product being processed
   - Display image upload progress
   - Report success/failure for each product
   - Show final summary with success/failure counts

## Expected Output

```
✓ Database connected successfully
✓ Cleared existing products

⏳ Processing product: Women Round Neck Cotton Top
  ⏳ Uploading image: p_img1.png
  ✓ Image uploaded: p_img1.png
✓ Product saved: Women Round Neck Cotton Top (1 images)

⏳ Processing product: Men Round Neck Pure Cotton T-shirt
  ⏳ Uploading image: p_img2_1.png
  ✓ Image uploaded: p_img2_1.png
  ...

==================================================
✓ Seeding completed!
  - Successfully saved: 52 products
  - Failed: 0 products
==================================================
```

## File Structure

```
backend/
├── scripts/
│   └── seedProducts.js    (The seeding script)
├── models/
│   └── productModel.js
├── config/
│   └── cloudinary.js
└── package.json           (Updated with "seed" script)
```

## After Seeding

Once completed:

1. All 52 products will be in your MongoDB database
2. All images will be hosted on Cloudinary
3. Frontend ShopContext.jsx will automatically fetch from the database
4. Users can view and purchase products
5. Admin can continue adding new products via the dashboard

## Notes

- The script uses the same Cloudinary configuration as your backend
- If an image file is not found, it skips that image and logs a warning
- The script preserves the original product structure (name, price, category, etc.)
- You can run this script multiple times - it clears old data each time

## Troubleshooting

**Error: "Database connection failed"**

- Check your `.env` file has `MONGODB_URI` configured correctly
- Make sure MongoDB is running

**Error: "Image file not found"**

- Verify all product image files exist in `frontend/src/assets/`
- Check image filenames match exactly

**Error: "Cloudinary upload failed"**

- Check your Cloudinary credentials in `.env`
- Verify your Cloudinary account is active
- Check your upload quota hasn't been exceeded
