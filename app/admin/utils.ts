export const uploadProductsFromLocal = async (products: any[]) => {
    console.log(products)
  for (const product of products) {
    try {
      // 1. Fetch local image
      const res = await fetch(product.image)
      const blob = await res.blob()

      // 2. Convert to File
      const file = new File([blob], product.name + '.jpg', {
        type: blob.type,
      })

      // 3. Upload to your API (Cloudinary)
      const formData = new FormData()
      formData.append('file', file)

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        console.error('Upload failed:', product.name)
        continue
      }

      // 4. Send product data
      const createRes = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          description: product.description,
          image: uploadData.imageUrl,
          shades: product.shades,
          colors: product.colors,
        }),
      })

      if (!createRes.ok) {
        console.error('Product create failed:', product.name)
      } else {
        console.log('✅ Added:', product.name)
      }

    } catch (err) {
      console.error('Error processing:', product.name, err)
    }
  }
}