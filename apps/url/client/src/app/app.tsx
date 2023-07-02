// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormEvent, useCallback, useState } from 'react';
import UrlList from '../components/UrlList';
import ShortenUrlForm from '../components/ShortenUrlForm';
import axios from 'axios';
import {Container, Text} from '@chakra-ui/react';
import { Shortened } from './types';

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      });

      const newUrl: Shortened = {
        original: response.data.original,
        short: response.data.short
      }
      //const newUrl = response.data as Shortened; // 🚨 This should set off alarm bells in your head! Why?

      setUrls([newUrl, ...urls]);
      setInputUrl('');
    },
    [urls, setUrls, inputUrl, setInputUrl]
  );
  
  return (
    <Container maxWidth="4xl" marginBlock={10} textAlign="center">
      <Text fontSize="4xl">My URL Shortener</Text>
      <ShortenUrlForm onSubmit={onSubmit} inputUrl={inputUrl} setInputUrl={setInputUrl}/>
      <UrlList urls={urls}/>
    </Container>
  );
}

export default App;