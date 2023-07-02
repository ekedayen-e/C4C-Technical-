import React from 'react'
import { Button, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import {Shortened} from '../app/types'
import axios from 'axios'

interface Props {
    urls: Shortened[];
}

const UrlList: React.FC<Props> = ({urls}) => {

  const removeLink = async(short: string) => {
    const id = short.substring(short.lastIndexOf('/') + 1)
    await axios.delete(`http://localhost:3333/api/delete/${id}`)
  }

  return (
    <UnorderedList id="url-list" textAlign="left">
    {urls.map((u) => (
      <ListItem marginY={2}>
        <Link href={u.short} color="teal.500">
          {u.short}
        </Link>{' '}
        - {u.original}
        <Button onClick={(event) => {event.preventDefault();removeLink(u.short)}} marginLeft={2} id="delete-btn" colorScheme="red" size="xs">Delete</Button>
      </ListItem>
    ))}
  </UnorderedList>
  )
}

export default UrlList