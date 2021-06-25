import React from 'react'
import {Link} from "react-router-dom"
import { Button, Card, CardBody, Table } from 'reactstrap'
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
                            <td className="d-flex">
                                <Link to={`/markets/${market.id}`} className="mr-2">View</Link>
                                <Button color="warning" className="mr-2" onClick={()=> props.toggleEdit(market)}>Edit</Button>
                                <Button color="danger" className="mr-2" onClick={()=> props.onDelete(market.id)}>Delete</Button>
                            </td>
                        </tr>

                       ))}
                </tbody>

            }
        </Table>
    )
}
