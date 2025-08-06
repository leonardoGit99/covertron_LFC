"use client"
import React, { ChangeEvent } from 'react'
import { Input } from '../ui/input'
import { Card } from '../ui/card'

type Props = {
  handleChange: (search: ChangeEvent<HTMLInputElement>) => void
}

function SearchInput({ handleChange }: Props) {

  return (
    <div className='flex justify-end mt-10 w-full'>
      <Card
        className='w-full max-w-md shadow-sm'
      >
        <Input
          placeholder='Buscar productos...'
          onChange={(event) => handleChange(event)}
        />
      </Card>
    </div>
  )
}

export default React.memo(SearchInput)