import React from 'react'
import { Button, Input } from '@chakra-ui/react';

interface props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    inputUrl: string;
    setInputUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ShortenUrlForm = ({onSubmit, inputUrl, setInputUrl}:props): JSX.Element => (
        <form onSubmit={onSubmit}>
            <Input
            id="url-input"
            size="lg"
            marginBlock={4}
            value={inputUrl}
            onChange={(e) => {
                setInputUrl(e.target.value)
            }}
            placeholder="www.my-super-long-url-here.com/12345" />
            <Button id="submit-btn" type="submit" colorScheme="teal" size="lg">Generate</Button>
        </form>
)

export default ShortenUrlForm