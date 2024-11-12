import React from "react";
import { Guitar } from "../guitars.types";

type Props = {
    guitar: Guitar,
    addToCart: (guitar: Guitar) => void
}

export default function Guitar({ guitar, addToCart }: Props) {
    const { id, image, name, price, description } = guitar;

    const handleClick = (guitar) => {
        addToCart(guitar)
    }

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`./img/${image}.jpg`} alt={name} />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">{price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => handleClick(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}