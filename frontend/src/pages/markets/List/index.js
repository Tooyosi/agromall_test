import React from 'react'
import {Link} from "react-router-dom"
import { Card, CardBody, Table } from 'reactstrap'
import { getAddress } from '../../../utilities'

export default function MarketList(props) {
    return (
        <Table>
            <thead>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Address</th>
                <th>Action</th>
            </thead>
            {props.list.length < 1 ?
                <tbody>

                    <tr>
                        <td colSpan={12}>No Markets to display</td>
                    </tr>
                </tbody>
                :
                <tbody>
                    {props.list.map((market) => (
                        <tr key={market.id}>
                            <td>{market.name}</td>
                            <td>{market.description}</td>
                            <td>{market.category.name}</td>
                            <td>{getAddress(market.address)}</td>
                            <td><Link to={`/market/${market.id}`}>View</Link></td>
                        </tr>

                    ))}
                </tbody>

            }
        </Table>
    )
}
