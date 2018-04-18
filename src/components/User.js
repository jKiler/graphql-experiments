import React from 'react'
import { TableCell, TableRow } from 'material-ui';

export const User = (props) => (
  <TableRow>
    <TableCell>{props.user.firstName}</TableCell>
    <TableCell>{props.user.lastName}</TableCell>
    <TableCell>{props.user.email}</TableCell>
  </TableRow>
)
