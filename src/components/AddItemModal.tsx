import React, {useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import InputField from "./InputField";
import {inputType} from "./InputField";
import axios, {AxiosRequestConfig} from "axios";
import ErrorModal from "./ErrorModal";
import {REACT_APP_API_KEY, REACT_APP_PROXY_URL} from "../Env"
import {useDispatch} from "react-redux";
import {addNewData} from "../store/companySlice"

interface AddItemModalProps {
    closeModal: () => void,
    status: boolean
}

interface FnsApiCN {
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

interface FnsApiIP {
    items: Array<{
        "ИП": {
            "ИНН": number,
            "ОГРН": number,
            "ОснВидДеят": string,
            "ДатаОГРН": string,
            "Статус": string,
            "АдресПолн": string,
            "ГдеНайдено": string,
            "ФИОПолн": string
        }
    }>,
    "Count": number
}

enum CompanyType {
    IP, // individual business
    CN // other type of it
}


const fetchWithInn = (inn: string, companyType: CompanyType) => {
    const axiosParams:[string, AxiosRequestConfig] = [
        (REACT_APP_PROXY_URL !== undefined ? (REACT_APP_PROXY_URL + "api-fns.ru/api/search") : "https://api-fns.ru/api/search"),
        {
            params: {
                q: inn,
                key: REACT_APP_API_KEY
            },
            // headers for proxy server
            headers: (REACT_APP_PROXY_URL ? {
                "X-Requested-With": "XMLHttpRequest"
            } : {})
        }
    ]
    // im running a proxy instance on vds, to avoid f*ing with CORS
    // in case no proxy link present in env, goes with nothing and dies from cors, nice
    if (companyType === CompanyType.CN) {
        return axios.get<FnsApiCN>(...axiosParams)
    } else {
        return axios.get<FnsApiIP>(...axiosParams)
    }
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
            if (inn.length != 10 && inn.length != 12) {
                triggerModalError("ИНН не соответствует формату")
            } else {
                let innType = inn.length != 10 ? CompanyType.CN : CompanyType.IP
                setSearch(true);
                fetchWithInn(inn, innType)
                    .then((response) => {
                        if (response.data.Count == 0) {
                            triggerModalError("Компаний с таким ИНН не существует")
                        } else {
                            // some scary shit, not gonna lie
                            if(response.data.items[0].hasOwnProperty("ЮЛ")){
                                // @ts-ignore
                                setOrgName(response.data.items[0].ЮЛ.НаимСокрЮЛ)
                                // @ts-ignore
                                setAddr(response.data.items[0].ЮЛ.АдресПолн)
                                // @ts-ignore
                                setOgrn(response.data.items[0].ЮЛ.ОГРН.toString())
                                // @ts-ignore
                                setDate(response.data.items[0].ЮЛ.ДатаОГРН)
                            } else {
                                // @ts-ignore
                                setOrgName("ИП " + response.data.items[0].ИП.ФИОПолн)
                                // @ts-ignore
                                setAddr(response.data.items[0].ИП.АдресПолн)
                                // @ts-ignore
                                setOgrn(response.data.items[0].ИП.ОГРН.toString())
                                // @ts-ignore
                                setDate(response.data.items[0].ИП.ДатаОГРН)
                            }
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

        const stub = () => {
            setOrgName("company")
            setAddr("address")
            setOgrn("4569782145542")
            setDate("2018-02-28")
            setInn("4569782145")
        }
        const bulkStub = () => {
            for (let i = 0; i < 23; i++) {
                dispatch(addNewData({
                    companyName: "company" + i,
                    address: "address" + i,
                    ogrn: "ogrn" + i,
                    inn: "inn" + i,
                    regDate: "2018-02-28"
                }))
            }
            props.closeModal()
        }

        return (
            <>

                <Dialog open={props.status} onClose={() => props.closeModal()}>
                    <Dialog.Overlay/>
                    {showModal &&
                    <ErrorModal error={ModalErrorString} closeModal={() => closeModal()} status={showModal}/>}
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
                        shadow-lg px-4">
                        <div className="flex flex-col">
                            <div className="flex justify-between pt-4">
                                <span className="text-lg text-gray-900 font-light border-b border-gray-400">Добавить компанию</span>
                                <button type="button" onClick={() => props.closeModal()}
                                        className="">
                                    <svg className="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor"
                                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="15" y1="9" x2="9" y2="15"/>
                                        <line x1="9" y1="9" x2="15" y2="15"/>
                                    </svg>
                                </button>

                            </div>
                            <form onSubmit={(e) => handleSave(e)}>
                                <div className="flex grow flex-col overflow-y">
                                    <InputField value={orgName} onChange={setOrgName} title="Наименование"
                                                hint="ООО 'Нечто'"
                                                pattern={"[\\s\\S]{1,200}"}
                                                onInvalid={"От 1 до 100 символов"}/>
                                    <InputField value={addr} onChange={setAddr} title="Адрес"
                                                hint="Город, улица, фонарь, аптека"
                                                pattern={"[\\s\\S]{1,200}"}
                                                onInvalid={"От 1 до 100 символов"}/>
                                    <InputField value={ogrn} onChange={setOgrn} title="ОГРН" hint="ИП: 15 цифр, Иные: 13 цифр"
                                                pattern={"[0-9]{13}|[0-9]{15}"}
                                                onInvalid={"Либо 13 либо 15 цифр"}/>
                                    <div className="flex flex-row">
                                        <InputField value={inn} onChange={setInn} title="ИНН" hint="ИП: 12 цифр, Иные: 10 цифр"
                                                    pattern={"[0-9]{10}|[0-9]{12}"}
                                                    onInvalid={"Либо 10 либо 12 цифр"}/>

                                        {!searchProcess && <button type="button"
                                                                   onClick={() => {
                                                                       handleInn()
                                                                   }}
                                                                   className="h-9 mb-6 ml-1 self-end rounded-md bg-emerald-400 transition duration-300 ease-out hover:bg-emerald-500">
                                            <span
                                                className="font-mono tracking-tighter p-4 text-white text-lg">Загрузить</span>
                                        </button>}

                                        {searchProcess && <button type="button" disabled
                                                                  className="text-center px-4 h-9 mb-6 ml-1 self-end rounded-md bg-emerald-200 transition duration-300 ease-out hover:bg-emerald-500">

                                            <svg className="animate-spin h-5 w-5 text-white"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>

                                        </button>}

                                    </div>
                                    <InputField value={date} onChange={setDate} title="Дата регистрации" hint=""
                                                type={inputType.date}/>
                                </div>
                                <div className="flex grow-0 justify-around">
                                    <button type="submit"
                                            className="block rounded-md bg-emerald-400 mx-auto h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500">
                                        <span
                                            className="font-mono tracking-tighter p-4 text-white text-lg">Сохранить</span>
                                    </button>
                                    <div className="flex flex-row">
                                        <button type="button" onClick={() => {
                                            stub()
                                        }}
                                                className="mr-1 block rounded-md bg-emerald-400 mx-auto h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500">
                                            <span
                                                className="font-mono tracking-tighter p-4 text-white text-lg">TEST</span>
                                        </button>
                                        <button type="button" onClick={() => {
                                            bulkStub()
                                        }}
                                                className="block rounded-md bg-emerald-400 mx-auto h-10 mb-5 transition duration-300 ease-out hover:bg-emerald-500">
                                            <span
                                                className="font-mono tracking-tighter p-4 text-white text-lg">BULK</span>
                                        </button>
                                    </div>
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