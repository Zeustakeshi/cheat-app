import AddAns from "./AddAns";
import Search from "./Search";

function App() {
    return (
        <div className="App">
            <div className="w-full bg-white flex  justify-center items-center shadow-md p-5">
                <h1 className="text-lg font-semibold">
                    This is not cheating. We call it technology
                </h1>
            </div>
            <div className="p-5 flex justify-center items-start gap-5 flex-wrap">
                <Search></Search>
                <div className="w-[1px] bg-slate-500 min-h-screen"></div>
                <AddAns></AddAns>
            </div>
        </div>
    );
}

export default App;
