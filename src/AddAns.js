import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase-config";

const AddAns = () => {
    const [q, setQ] = useState("");
    const [ans, setAns] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddQ = () => {
        const addQ = async () => {
            setLoading(true);
            const docRef = await addDoc(collection(db, "App"), {
                q: `<div style = "color: red">Question:</div><p> <strong>${q}</strong></p><div style= "color: skyblue">Answer: </div><p>${ans}</p>`,
            });
            setLoading(false);
            setAns("");
            setQ("");
        };
        addQ();
    };

    return (
        <div className="flex-1 mt-8 p-5 flex flex-col justify-start items-start">
            <div className="w-full mx-auto  border border-gray-200 rounded-full shadow-sm mb-10 group">
                <input
                    type="text"
                    placeholder="Add Question"
                    className="border-none outline-none bg-transparent px-5 py-3 min-w-[300px]   w-full"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </div>
            <div className="w-full mx-auto  border border-gray-200 shadow-sm mb-10 group">
                <textarea
                    type="text"
                    placeholder="Add answer"
                    className="min-h-[50vh] border-none outline-none bg-transparent px-5 py-3 min-w-[300px]   w-full"
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                />
            </div>

            <button
                onClick={handleAddQ}
                className={`bg-blue-500 text-white font-semibold rounded-lg px-5 py-3 hover:opacity-90 transition-all ${
                    loading ? "hidden" : ""
                }`}
            >
                Add
            </button>
        </div>
    );
};

export default AddAns;
