import React from "react";

export interface DataItemProps {
    data: {
        id?: number,
        companyName: string,
        address: string,
        ogrn: string,
        inn: string,
        regDate: string
    }
}

function TableItem(props: DataItemProps) {
    return (
        <>
            <tr className="border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {props.data.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.companyName}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.address}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.ogrn}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {props.data.inn}
                </td>
                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                    {props.data.regDate}
                </td>
                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">

                </td>
            </tr>
        </>
    )
}

export default TableItem;