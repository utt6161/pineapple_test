import React, {useState} from "react"
//import Table from "./components/Table";
//import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {useMediaQuery} from 'react-responsive'
import ResponsiveTable from "./components/ResponsiveTable";
import AddItemModal from "./components/AddItemModal";

function App() {

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="flex m-auto w-full h-4/6
                sm:w-4/6 shadow-md border border-gray-200 rounded-lg bg-gray-100">
                <div className="mx-auto mt-10">
                    <button type = "button"
                            className="block rounded-md bg-emerald-400 mx-auto h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500"
                    onClick={()=>openModal()}>
                        <span className="font-mono tracking-tighter p-4 text-white text-lg">Добавить компанию</span>
                    </button>
                    <ResponsiveTable/>
                </div>
            </div>
            <AddItemModal closeModal = {()=>closeModal()} status={showModal}/>

        </div>

    )
}

export default App
