import React from "react";

function PurchasedItem(props) {
    const details = props.allPurchases
    return <tr >
        <th scope="row">{details.itemDetail.item_name}</th>
        <td>{details.quantity}</td>
        <td>{details.units}</td>
        <td>{details.price}</td>
        <td>{details.date_of_purchase}</td>
    </tr>



}

export default PurchasedItem;