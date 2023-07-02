import React from 'react'
import { Link, ListItem, UnorderedList } from '@chakra-ui/react';
import {Shortened} from '../app/types'

interface Props {
    urls: Shortened[];
}

const UrlList = ({urls}:Props) => {
  return (
    <UnorderedList id="url-list" textAlign="left">
    {urls.map((u) => (
      <ListItem>
        <Link href={u.short} color="teal.500">
          {u.short}
        </Link>{' '}
        - {u.original}
      </ListItem>
    ))}
  </UnorderedList>
  )
}

export default UrlList