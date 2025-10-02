import "./CartItem.scss";

export function CartItem({ cartItem }) {
    const { imageUrl, price, name, quantity } = cartItem;

    return (
        <article className="cart-item-container">
            <img src={imageUrl} alt={`photo of ${name}`}/>
            <div className="cart-item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity} x {price} USD</span>
            </div>
        </article>
    );
}