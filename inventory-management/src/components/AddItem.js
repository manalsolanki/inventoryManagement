import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
function AddItem() {
    const navigate = useNavigate();
    //Checking Whether other new item is added
    const [newItem, setNewItem] = useState(false);
    const [itemList, setItemList] = useState([]);
    // Status check
    const [responseError, setResponseError] = useState(false);
    // FormInput
    const [itemName, setItemName] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unit, setUnit] = useState("");
    const [price, setPrice] = useState(0);
    const [dateOfPurchase, setDateOfPurchase] = useState();
    const [error, setError] = useState({ itemNameErr: "", quantityErr: "", unitErr: "", priceErr: "", dateOfPurchaseErr: "", newItemNameErr: "" })
    useEffect(() => {
        axios.get('http://localhost:3010/items')
            .then(function (response) {
                setItemList(response.data.items);
                setItemList((items) => [...items, { item_name: "Other", id: 0 }])
            })
            .catch(function (error) {
                console.log(error);
            })

    }, []);

    const addNewItem = (e) => {
        e.preventDefault();
        setItemName(e.target.value)
        if (e.target.value.toLowerCase() === 'other') {
            setNewItem(true);
        }
    }
    const validateItem = (e) => {
        e.preventDefault();
        const errorSet = { itemNameErr: "", quantityErr: "", unitErr: "", priceErr: "", dateOfPurchaseErr: "", newItemNameErr: "" }
        let flag = true;
        if (!(itemName)) {
            errorSet.itemNameErr = "Please select a appropriate value."
            flag = false;
        }
        if (itemName === "Other" && !(newItemName)) {
            errorSet.newItemNameErr = "Please add a proper name"
            flag = false;

        }
        if (!(quantity)) {
            errorSet.quantityErr = "Please add the quantity."
            flag = false;
        }
        else if ((quantity < 1)) {
            errorSet.quantityErr = "Please add a quantity more than 0."
            flag = false;
        }
        if (!(unit)) {
            errorSet.unitErr = "Please select a unit from the list."
            flag = false;
        }
        if (!(price)) {
            errorSet.priceErr = "Please add a appropiate value ."
            flag = false;
        }
        if (!(dateOfPurchase)) {
            errorSet.dateOfPurchaseErr = "Please select a date."
            flag = false;
        }
        setError(errorSet)
        if (flag) {
            addPurchasedItem()
        }
    }
    const addPurchasedItem = async () => {
        let itemNo = (itemList.find((item) => item.item_name === itemName)).id
        const newData = { item_no: itemNo, item_name: newItemName, date_of_purchase: dateOfPurchase, quantity: parseFloat(quantity), units: unit, price: parseFloat(price) }
        const response = await axios.post('http://localhost:3010/items/addpurchaseditem', newData)
            .then(function (response) {
                return (response);
            })
            .catch(function (error) {
                return (error);
            });
        console.log(response.status)
        if (response.status == 200) {
            navigate("/", { replace: true });
        }
        else {
            console.log("else")
            setResponseError(true)
        }
        // setResponseStatus(response.status);
    }


    return <section className="mt-3 text-center">
        <div className="wrapper" >
            {console.log(responseError)}
            {responseError &&
                <Alert variant="danger" onClose={() => setResponseError(false)} dismissible>
                    <Alert.Heading>Sorry ! Please try again</Alert.Heading>
                    <p>
                        Enter the same details
                    </p>
                </Alert>}
            <h2 className="text-center">Add A New Purchase</h2>
            <form onSubmit={validateItem} method="POST">
                <div className="form-floating mb-3">
                    <input className="form-control" name="itemName" list="datalistOptions" placeholder="Type to search..." onChange={addNewItem} />
                    <datalist id="datalistOptions">
                        {itemList.map((item) => {
                            return <option value={item.item_name} key={item.id} />
                        })}
                    </datalist>
                    <label>Item Name</label>
                    {error.itemNameErr && <div className="text-start ms-2 text-danger "><span>{error.itemNameErr}</span></div>}
                </div>
                {newItem && <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="newItemName" onChange={(e) => { setNewItemName(e.target.value) }} />
                    <label className="form-label">New Item Name</label>
                    {error.newItemNameErr && <div className="text-start ms-2 text-danger "><span>{error.newItemNameErr}</span></div>}
                </div>}
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" min="0.00" max="10000.00" step="0.01" name="quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                    <label className="form-label">Quantity</label>
                    {error.quantityErr && <div className="text-start ms-2 text-danger "><span>{error.quantityErr}</span></div>}

                </div>
                <div className="form-floating mb-3">
                    <select className="form-select" aria-label="Unit" name="unit" onChange={(e) => { setUnit(e.target.value) }}>
                        <option defaultValue="lbs" value="lbs">Lbs</option>
                        <option value="grams">grams</option>
                        <option value="quantity">quantity</option>
                    </select>
                    <label for="unit">Unit</label>
                    {error.unitErr && <div className="text-start ms-2 text-danger "><span>{error.unitErr}</span></div>}

                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" min="0.00" max="10000.00" step="0.01" name="price" onChange={(e) => { setPrice(e.target.value) }} />
                    <label className="form-label">Price</label>
                    {error.priceErr && <div className="text-start ms-2 text-danger "><span>{error.priceErr}</span></div>}

                </div>
                <div className="form-floating mb-3">
                    <input type="date" className="form-control" name="dateOfPurchase" onChange={(e) => { setDateOfPurchase(e.target.value) }} />
                    <label className="form-label">Date of Purchase</label>
                    {error.dateOfPurchaseErr && <div className="text-start ms-2 text-danger "><span>{error.dateOfPurchaseErr}</span></div>}
                </div>
                <div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </div>
            </form>
        </div>

    </section>
}





export default AddItem;