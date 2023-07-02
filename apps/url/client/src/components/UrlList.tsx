import React, { useState } from 'react'
import { Button, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import {Shortened} from '../app/types'
import axios from 'axios';

interface Props {
    urls: Shortened[];
}

const UrlList: React.FC<Props> = ({urls}) => {
  const [selected, setSelected] = useState('')

  const removeLink = async(original:string) => {
    setSelected(original)
    await axios.delete(`http://localhost:3333/api/delete`, {original: selected})
    setSelected('');
  }

  return (
    <UnorderedList id="url-list" textAlign="left">
    {urls.map((u) => (
      <ListItem marginY={2}>
        <Link href={u.short} color="teal.500">
          {u.short}
        </Link>{' '}
        - {u.original}
        <Button onClick={event => removeLink(u.original)} marginLeft={2} id="delete-btn" colorScheme="red" size="xs">Delete</Button>
      </ListItem>
    ))}
  </UnorderedList>
  )
}

export default UrlList