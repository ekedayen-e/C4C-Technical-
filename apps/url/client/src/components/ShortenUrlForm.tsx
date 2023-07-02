import React, { useState } from 'react'
import { Button, Input } from '@chakra-ui/react';
import {useFormik} from 'formik'


interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    inputUrl: string;
    setInputUrl: React.Dispatch<React.SetStateAction<string>>;
    error: string;
}




const ShortenUrlForm: React.FC<Props> = ({error, onSubmit, inputUrl, setInputUrl }) => {
    return (
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
            <div style={{color: 'red', fontSize: '15px'}}>
            {error}
            </div>
            <Button id="submit-btn" type="submit" colorScheme="teal" size="lg">Generate</Button>
        </form>
        )
    }

export default ShortenUrlForm