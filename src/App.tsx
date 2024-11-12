import React, { useState } from 'react'
import Header from './components/Header.tsx'
import Guitar from './components/Guitar'
import { db } from './db-guitars'
import { useCart } from './hooks/useCart'


function App() {

  const [guitars, setGuitars] = useState(db);
  const {
    cart,
    handleAddToCart,
    handleClearCart,
    handleDecrement,
    handleIncrement,
    handleDeleteProduct,
    total,
    isEmpty } = useCart();


  return (
    <>

      <Header
        cart={cart}
        handleDeleteProduct={handleDeleteProduct}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleClearCart={handleClearCart}
        total={total}
        isEmpty={isEmpty} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map(guitar => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={handleAddToCart} />
            ))
          }

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
