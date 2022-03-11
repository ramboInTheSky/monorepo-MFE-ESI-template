import React from "react"
import Product from "../../components/product"
import useGTMOnHydrate from "../../hooks/useGTMOnHydrate"

const ProductSummary = () => {
  useGTMOnHydrate()
  
  return <Product />
}

export default ProductSummary
