import React, {useEffect, useState} from "react";
import "./mainPage.css";
import {getPackages, putPackage} from "./api";

export const MainPage = () => {

    const [packages, setPackages] = useState([]);
    const [links, setLinks] = useState([]);

    const loadPackages = async() => {
        try {
            let res = await getPackages();
            console.log(res);
            setPackages(res.labels);
            let tlinks = {};
            for (const property in res._links) {
                var splitted = property.split(':');
                if(splitted.length > 1) {
                    tlinks[splitted[0]] = res._links[property];
                    tlinks[splitted[0]].message = splitted[1];
                    console.log(tlinks);
                }
                // console.log(property.split(':'));
            }
            setLinks(tlinks);
        } catch (e) {
            console.log("ups!");
        }
    };

    const modifyPackage = (href, e) => {
        e.preventDefault();
        try {
            let res = putPackage(href);
        } catch (e) {
            console.log("ups!");
        }
        console.log(href);
    }

    useEffect(() => {
        loadPackages();
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-text">
                    Cześć kurierze!
                </div>
            </nav>
            <div className="page">
                <div className="content">
                    <div className="header">
                        <div className="title-div">
                            <span className="title">
                                Kokpit
                            </span>
                        </div>
                        <div className="description-div">
                            <span className="description">
                                Centrum dowodzenia paczek!
                            </span>
                        </div>
                    </div>
                    <div className="mt">
                        <span className="text">
                            Paczki w systemie:
                        </span>
                    </div>
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
                                <td>
                                    {links[p.label_id]?.href ?
                                        <a onClick={(e) => modifyPackage(links[p.label_id].href, e)}>{links[p.label_id].message}</a>
                                        :null
                                    }
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <footer>
                <a href="mailto:mczarkowski7@outlook.com">
                    2020 Mikołaj Czarkowski
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                    Repozytorium projektu
                </a>
                <a href="https://www.youtube.com/watch?v=PCQs3vSJ6xA" target="_blank" rel="noopener noreferrer">
                    Grafiki: Tomasz Domański, Mikołaj Olizar-Zakrzewski, Łukasz Partyka
                </a>
            </footer>
        </>
    )
}

export default MainPage;