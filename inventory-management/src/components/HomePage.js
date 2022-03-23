import React, { useState, useEffect } from "react";
import CurrentItemDetail from "./CurrentItemDetail";
import axios from "axios";
const HomePage = (props) => {
    const [currentItemList, setCurrentItemList] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        axios.get('http://localhost:3010/items/currentitems')
            .then(function (response) {
                setCurrentItemList(response.data.items);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    return <section className="mt-3 wrapper ">
        <h2>Current grocery at home</h2>
        {/* <div className="container">
                <div className="row">
                    {
                        tempArray.map((element) => {
                            return <ItemDetail detail={element} />
                        })
                    }
                </div>

            </div> */}
        <table className="table table-bordered table-hover" >
            <thead>
                <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Change</th>
                </tr>
            </thead>
            <tbody>
                {currentItemList.map((item) => {
                    return <CurrentItemDetail currentItems={item} fetchData={fetchData} />
                })}
            </tbody>
        </table>

    </section>

}

export default HomePage