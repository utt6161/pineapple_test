import React, {useState} from "react"
import ResponsiveTable from "./components/ResponsiveTable";
import AddItemModal from "./components/AddItemModal";
import {useDispatch, useSelector} from "react-redux";
import {deleteChecked, selectIfAnyChecked} from "./store/companySlice";

function App() {

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const dispatch = useDispatch()
    const allChecked = useSelector(selectIfAnyChecked)

    return (
        <div className="flex min-h-screen bg-gray-200">
            <div className="flex m-auto w-full min-h-4/6
                sm:w-5/6 shadow-md border border-gray-200 rounded-lg bg-gray-100">
                <div className="mx-auto mt-10 w-full">
                    <div className="flex flex-row justify-center">
                        {allChecked && <button type="button"
                                               className="block rounded-md bg-red-400 min-h-10 mb-5 mr-4 transition duration-300 ease-out hover:bg-red-500"
                                               onClick={() => dispatch(deleteChecked())}>
                            <span className="font-mono tracking-tighter text-white text-lg flex justify-center p-2">Удалить</span>
                        </button>}
                        <button type="button"
                                className="block rounded-md bg-emerald-400 min-h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500"
                                onClick={() => openModal()}>
                            <span className="font-mono tracking-tighter text-white text-lg flex justify-center p-2">Добавить компанию</span>
                        </button>
                    </div>

                    <ResponsiveTable/>
                </div>
            </div>
            <AddItemModal closeModal={() => closeModal()} status={showModal}/>

        </div>

    )
}

export default App
