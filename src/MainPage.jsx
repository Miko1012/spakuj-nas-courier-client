import React, {useEffect, useState} from "react";
import "./mainPage.css";
import {getPackages} from "./api";

export const MainPage = () => {

    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const loadPackages = async() => {
            try {
                let res = await getPackages();
                console.log(res);
                setPackages(res);
            } catch (e) {
                console.log("ups!");
            }
        };
        loadPackages();
    }, []);

    return (
        <>
            <div className="navbar">
                <div className="navbar-text">
                    Cześć kurierze!
                </div>
            </div>
            <div className="page">
                <table>
                    <tbody>
                    <tr>
                        <th>Adresat</th>
                        <th>Skrytka docelowa</th>
                        <th>Wymiary paczki</th>
                        <th>Identyfikator etykiety</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>

                    {packages.map((p) =>

                        <tr key={p.label_id}>
                            <td>{p.receiver}</td>
                            <td>{p.box}</td>
                            <td>{p.size}</td>
                            <td>{p.label_id}</td>
                            <td>{p.status}</td>
                            <td>aaa</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MainPage;