import React, {useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import InputField from "./InputField";
import {inputType} from "./InputField";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import {REACT_APP_API_KEY} from "../Env"
import {useDispatch} from "react-redux";
import {addNewData} from "../store/companySlice"

interface AddItemModalProps {
    closeModal: () => void,
    status: boolean
}

interface FnsApi {
    items: Array<{
        "ЮЛ": {
            "ИНН": number,
            "ОГРН": number,
            "ОснВидДеят": string,
            "НаимПолнЮЛ": string,
            "ДатаОГРН": string,
            "Статус": string,
            "ДатаПрекр": string,
            "АдресПолн": string,
            "ГдеНайдено": string,
            "НаимСокрЮЛ": string
        }
    }>,
    "Count": number
}

const fetchWithInn = (inn: string) => {
    return axios.get<FnsApi>("https://api-fns.ru/api/search", {
            params: {
                q: inn,
                key: REACT_APP_API_KEY
            },
        }
    )
}

const AddItemModal = (props: AddItemModalProps) => {
    const dispatch = useDispatch();
    const [orgName, setOrgName] = useState<string>("");
    const [addr, setAddr] = useState<string>("");
    const [inn, setInn] = useState<string>("");
    const [ogrn, setOgrn] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [searchProcess, setSearch] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    const [ModalErrorString, setError] = useState("")
    const triggerModalError = (error: string) => {
        setError(error);
        openModal()
    }

    const handleInn = () => {
        if (inn.length < 10) {
            triggerModalError("ИНН не соответствует формату")
        } else {

            setSearch(true);
            fetchWithInn(inn)
                .then((response) => {
                    if (response.data.Count == 0) {
                        triggerModalError("Компаний с таким ИНН не существует")
                    } else {
                        setOrgName(response.data.items[0].ЮЛ.НаимСокрЮЛ)
                        setAddr(response.data.items[0].ЮЛ.АдресПолн)
                        setOgrn(response.data.items[0].ЮЛ.ОГРН.toString())
                        setDate(response.data.items[0].ЮЛ.ДатаОГРН)
                    }
                }).catch((e) => {

                triggerModalError(e.toString())
            }).finally(() => {
                setSearch(false);
            })
        }
    }

    const clearInputs = () => {
        setOrgName("")
        setOgrn("")
        setAddr("")
        setInn("")
        setDate("")
    }

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(addNewData({
            companyName: orgName,
            address: addr,
            ogrn: ogrn,
            inn: inn,
            regDate: date
        }))
        clearInputs()
        props.closeModal()
    }


    return (
        <>

            <Dialog open={props.status} onClose={() => props.closeModal()}>
                <Dialog.Overlay/>
                {showModal && <ErrorModal error={ModalErrorString} closeModal={() => closeModal()} status={showModal}/>}
                <div className="absolute
                        top-1/2
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        min-h-2/3
                        sm:w-3/6
                        w-full
                        bg-white
                        rounded-md
                        shadow-lg p-4">
                    <div className="flex flex-col">
                        <div className="flex grow-0 justify-end">
                            <button type="button" onClick={() => props.closeModal()}
                                    className="p-3">
                                <svg className="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                            </button>

                        </div>
                        <form onSubmit={(e)=>handleSave(e)}>
                            <div className="flex grow flex-col overflow-y">
                                <InputField value={orgName} onChange={setOrgName} title="Наименование"
                                            hint="ООО 'Нечто'"/>
                                <InputField value={addr} onChange={setAddr} title="Адрес"
                                            hint="Город, улица, фонарь, аптека"/>
                                <InputField value={ogrn} onChange={setOgrn} title="ОГРН" hint="13 цифр"
                                            pattern={"[0-9]{13}"}/>
                                <div className="flex flex-row justify-start">
                                    <InputField value={inn} onChange={setInn} title="ИНН" hint="10 цифр"
                                                pattern={"[0-9]{10}"}/>

                                    {!searchProcess && <button type="button"
                                                               onClick={() => {
                                                                   handleInn()
                                                               }}
                                                               className="h-9 mb-6 ml-1 self-end rounded-md bg-emerald-400 transition duration-300 ease-out hover:bg-emerald-500">
                                        <span className="font-mono tracking-tighter p-4 text-white text-lg">Найти</span>
                                    </button>}

                                    {searchProcess && <button type="button" disabled
                                                              className="text-center px-4 h-9 mb-6 ml-1 self-end rounded-md bg-emerald-200 transition duration-300 ease-out hover:bg-emerald-500">

                                        <svg className="animate-spin h-5 w-5 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>

                                    </button>}

                                </div>
                                <InputField value={date} onChange={setDate} title="Дата регистрации" hint=""
                                            type={inputType.date}/>
                            </div>
                            <div className="flex grow-0 jutify-arund">
                                <button type="submit"
                                        className="block rounded-md bg-emerald-400 mx-auto h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500">
                                    <span className="font-mono tracking-tighter p-4 text-white text-lg">Сохранить</span>
                                </button>
                                <button type="button" onClick={()=>{
                                    setOrgName("ООО Рога и копыта")
                                    setAddr("Мск, ул. Лесная, д 75")
                                    setOgrn("1027739642281")
                                    setDate("2018-02-28")
                                    setInn("7710140679")
                                }}
                                        className="block rounded-md bg-emerald-400 mx-auto h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500">
                                    <span className="font-mono tracking-tighter p-4 text-white text-lg">STUB</span>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                <button onClick={() => props.closeModal()}>Deactivate</button>
                <button onClick={() => props.closeModal()}>Cancel</button>
            </Dialog>
        </>
    )
}

export default AddItemModal;