import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import {
    doc,
    onSnapshot,
    collection,
    getDocs,
    query,
} from "firebase/firestore";
import { db } from "./firebase-config";
import parse from "html-react-parser";

function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}
let datas = [];

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [results, setResults] = useState([]);
    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        // const unsub = onSnapshot(doc(db, "App", "Datas"), (doc) => {
        //     datas = doc.data().q1;
        // });

        // return unsub;

        const q = query(collection(db, "App"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push({ ...doc.data() });
            });
            datas = cities;
        });
        return unsubscribe;
    }, []);
    useEffect(() => {
        if (searchValue !== "") {
            const results = datas.filter((data) => {
                const data2 = removeAccents(data.q);
                const searchValue2 = removeAccents(searchValue);

                return data2
                    .toLowerCase()
                    .trim()
                    .includes(searchValue2.toLowerCase().trim());
            });

            setResults(results);
        } else {
            setResults([]);
        }
    }, [debounce]);

    return (
        <div className="flex-1 mt-8 p-5 flex flex-col justify-start items-start min-w-[50vw]">
            <div className="w-full mx-auto  border border-gray-200 rounded-full shadow-sm mb-10 group">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border-none outline-none bg-transparent px-5 py-3 min-w-[300px]   w-full"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>
            <div className="w-full border border-transparent border-t-gray-600 p-10">
                <ul className="flex flex-col gap-4">
                    {results?.map((item, index) => (
                        <Ans key={index} keyword={searchValue}>
                            {item.q}
                        </Ans>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Ans = ({ keyword, children }) => {
    const res = children.split(keyword);
    return (
        <li className="border border-gray-200 p-5 rounded-lg">
            {parse(children)}
        </li>
    );
};

export default Search;
